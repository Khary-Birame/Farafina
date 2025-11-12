[1mdiff --git a/app/messaging/page.tsx b/app/messaging/page.tsx[m
[1mindex ba81ccd..bbca677 100644[m
[1m--- a/app/messaging/page.tsx[m
[1m+++ b/app/messaging/page.tsx[m
[36m@@ -6,12 +6,12 @@[m [mimport { Card, CardContent } from "@/components/ui/card"[m
 import { Button } from "@/components/ui/button"[m
 import { InputField, TextareaField } from "@/components/ui/form-field"[m
 import { useState } from "react"[m
[31m-import { [m
[31m-  MessageSquare, [m
[31m-  Send, [m
[31m-  Search, [m
[31m-  Users, [m
[31m-  Bell, [m
[32m+[m[32mimport {[m
[32m+[m[32m  MessageSquare,[m
[32m+[m[32m  Send,[m
[32m+[m[32m  Search,[m
[32m+[m[32m  Users,[m
[32m+[m[32m  Bell,[m
   BellOff,[m
   Paperclip,[m
   Smile,[m
[36m@@ -147,11 +147,10 @@[m [mexport default function MessagingPage() {[m
                     <button[m
                       key={conversation.id}[m
                       onClick={() => setSelectedConversation(conversation)}[m
[31m-                      className={`w-full p-4 border-b hover:bg-muted/50 transition-colors text-left ${[m
[31m-                        selectedConversation.id === conversation.id[m
[32m+[m[32m                      className={`w-full p-4 border-b hover:bg-muted/50 transition-colors text-left ${selectedConversation.id === conversation.id[m
                           ? "bg-[#D4AF37]/10 border-l-4 border-l-[#D4AF37]"[m
                           : ""[m
[31m-                      }`}[m
[32m+[m[32m                        }`}[m
                     >[m
                       <div className="flex items-start gap-3">[m
                         <div className="relative">[m
[36m@@ -217,7 +216,7 @@[m [mexport default function MessagingPage() {[m
                       <Video className="w-4 h-4" />[m
                     </Button>[m
                     <Button variant="ghost" size="sm">[m
[31m-                      <MoreOrical className="w-4 h-4" />[m
[32m+[m[32m                      <MoreVertical className="w-4 h-4" />[m
                     </Button>[m
                   </div>[m
                 </div>[m
[36m@@ -230,11 +229,10 @@[m [mexport default function MessagingPage() {[m
                       className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}[m
                     >[m
                       <div[m
[31m-                        className={`max-w-[70%] rounded-lg p-3 ${[m
[31m-                          msg.isOwn[m
[32m+[m[32m                        className={`max-w-[70%] rounded-lg p-3 ${msg.isOwn[m
                             ? "bg-[#D4AF37] text-white"[m
                             : "bg-muted text-foreground"[m
[31m-                        }`}[m
[32m+[m[32m                          }`}[m
                       >[m
                         {!msg.isOwn && ([m
                           <div className="text-xs font-medium mb-1 opacity-80">[m
[36m@@ -243,9 +241,8 @@[m [mexport default function MessagingPage() {[m
                         )}[m
                         <div className="text-sm">{msg.content}</div>[m
                         <div[m
[31m-                          className={`text-xs mt-1 ${[m
[31m-                            msg.isOwn ? "text-white/70" : "text-muted-foreground"[m
[31m-                          }`}[m
[32m+[m[32m                          className={`text-xs mt-1 ${msg.isOwn ? "text-white/70" : "text-muted-foreground"[m
[32m+[m[32m                            }`}[m
                         >[m
                           {msg.time}[m
                         </div>[m
