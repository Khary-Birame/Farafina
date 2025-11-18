import { supabase } from '@/lib/supabase/client'

export async function checkAdminAccess() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { isAdmin: false, user: null, error: null }
    }

    // Vérifier le rôle dans la table users
    const { data: userData, error } = await supabase
      .from('users')
      .select('role, id, email, first_name, last_name')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Erreur vérification admin:', error)
      return { isAdmin: false, user: null, error }
    }

    return {
      isAdmin: userData?.role === 'admin',
      user: userData,
      error: null,
    }
  } catch (error: any) {
    console.error('Erreur checkAdminAccess:', error)
    return { isAdmin: false, user: null, error: error.message }
  }
}

