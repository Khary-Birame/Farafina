"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  onExport?: () => void
  onRowClick?: (row: T) => void
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  searchPlaceholder = "Rechercher...",
  onExport,
  onRowClick,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = data.filter((row) => {
    if (!searchQuery) return true
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#E5E7EB] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F9FAFB]">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-[#E5E7EB] shadow-lg">
              <DropdownMenuItem className="hover:bg-[#F9FAFB]">Par statut</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#F9FAFB]">Par date</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#F9FAFB]">Par catégorie</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F9FAFB]"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-[#F9FAFB] to-[#F3F4F6] hover:bg-[#F3F4F6]">
              {columns.map((column) => (
                <TableHead key={column.key} className="text-[#1A1A1A] font-semibold">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-[#737373]">
                  Aucun résultat trouvé
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]",
                    onRowClick && "hover:bg-[#D4AF37]/10"
                  )}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="text-[#1A1A1A]">
                      {column.render ? column.render(row) : String(row[column.key as keyof T])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#737373]">
            Affichage {(currentPage - 1) * itemsPerPage + 1} à{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} sur {filteredData.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F9FAFB]"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-[#1A1A1A] font-medium">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F9FAFB]"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

