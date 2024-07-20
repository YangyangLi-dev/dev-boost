import { supabase } from './supabase'
import { Website, ReleaseNote, Todo } from './types'

export const websiteDao = {
  create: async (website: Omit<Website, 'id' | 'createdAt' | 'updatedAt'>): Promise<Website | null> => {
    const { data, error } = await supabase
      .from('websites')
      .insert(website)
      .single()
    
    if (error) throw error
    return data
  },

  readAll: async (): Promise<Website[]> => {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  readById: async (id: string): Promise<Website | null> => {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  update: async (id: string, updateData: Partial<Website>): Promise<Website | null> => {
    const { data, error } = await supabase
      .from('websites')
      .update({ ...updateData, updated_at: new Date() })
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', id)
    
    return !error
  }
}

