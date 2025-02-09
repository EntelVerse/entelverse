export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      ai_tools: {
        Row: {
          id: string
          name: string
          description: string
          website_url: string
          category: string
          logo_url: string | null
          created_at: string
          updated_at: string
          user_id: string
          status: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id?: string
          name: string
          description: string
          website_url: string
          category: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
          status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          name?: string
          description?: string
          website_url?: string
          category?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
      }
      tool_reviews: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          rating: number
          review_text: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_id: string
          rating: number
          review_text: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_id?: string
          rating?: number
          review_text?: string
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          user_id?: string
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          user_id: string
          post_id: string | null
          tool_id: string | null
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          user_id: string
          post_id?: string | null
          tool_id?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          user_id?: string
          post_id?: string | null
          tool_id?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          user_id: string
          post_id: string | null
          tool_id: string | null
          comment_id: string | null
          vote_type: 'up' | 'down'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id?: string | null
          tool_id?: string | null
          comment_id?: string | null
          vote_type: 'up' | 'down'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string | null
          tool_id?: string | null
          comment_id?: string | null
          vote_type?: 'up' | 'down'
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          created_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string
          icon_url: string
          points_required: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon_url: string
          points_required: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon_url?: string
          points_required?: number
          created_at?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          created_at?: string
        }
      }
    }
  }
}