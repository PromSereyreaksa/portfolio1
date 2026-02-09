import { createClient } from '@supabase/supabase-js';

// Public Supabase client for frontend (uses anon key)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for blog operations

/**
 * Fetch all published blog posts
 * @returns {Promise<Array>} Array of published posts
 */
export async function fetchPublishedPosts() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Post object or null
 */
export async function fetchPostBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

/**
 * Fetch the most recent published post
 * @returns {Promise<Object|null>} Most recent post or null
 */
export async function fetchLatestPost() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching latest post:', error);
    return null;
  }
}

/**
 * Increment view count for a post
 * @param {string} postId - Post ID
 * @returns {Promise<boolean>} Success status
 */
export async function incrementViews(postId) {
  try {
    const { error } = await supabase.rpc('increment_post_views', {
      post_id: postId
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error incrementing views:', error);
    return false;
  }
}
