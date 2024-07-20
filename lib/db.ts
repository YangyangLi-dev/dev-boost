import { supabase } from './supabase'
import { Website, ReleaseNote, Todo, TodoStatus } from './types'

export const websiteDao = {
  create: async (website: Omit<Website, 'id' | 'created_at' | 'updated_at'>): Promise<Website | null> => {
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

// ReleaseNote CRUD operations
export const releaseNoteDao = {
  create: async (releaseNote: Omit<ReleaseNote, 'id' | 'created_at' | 'updated_at'>): Promise<ReleaseNote | null> => {
    const { data, error } = await supabase
      .from('release_notes')
      .insert({
        ...releaseNote,
        year: new Date(releaseNote.timestamp).getFullYear(),
        month: new Date(releaseNote.timestamp).getMonth() + 1
      })
      .single()
    
    if (error) throw error
    return data
  },

  readAll: async (): Promise<ReleaseNote[]> => {
    const { data, error } = await supabase
      .from('release_notes')
      .select('*')
      .order('timestamp', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  readById: async (id: string): Promise<ReleaseNote | null> => {
    const { data, error } = await supabase
      .from('release_notes')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  update: async (id: string, updateData: Partial<ReleaseNote>): Promise<ReleaseNote | null> => {
    const { data, error } = await supabase
      .from('release_notes')
      .update({
        ...updateData,
        year: updateData.timestamp ? new Date(updateData.timestamp).getFullYear() : undefined,
        month: updateData.timestamp ? new Date(updateData.timestamp).getMonth() + 1 : undefined,
        updated_at: new Date()
      })
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('release_notes')
      .delete()
      .eq('id', id)
    
    return !error
  }
}

// Todo CRUD operations
export const todoDao = {
  create: async (todo: Omit<Todo, 'id' | 'created_at' | 'updated_at'>): Promise<Todo | null> => {
    const { data, error } = await supabase
      .from('todos')
      .insert(todo)
      .single()
    
    if (error) throw error
    return data
  },

  readAll: async (): Promise<Todo[]> => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  readById: async (id: string): Promise<Todo | null> => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  update: async (id: string, updateData: Partial<Todo>): Promise<Todo | null> => {
    const { data, error } = await supabase
      .from('todos')
      .update({ ...updateData, updated_at: new Date() })
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  updateStatus: async (id: string, status: TodoStatus): Promise<Todo | null> => {
    const { data, error } = await supabase
      .from('todos')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
    
    return !error
  }
}
