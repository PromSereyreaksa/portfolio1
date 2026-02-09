import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract post ID from request body
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    // Increment views using service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .update({ views: supabaseAdmin.raw('views + 1') })
      .eq('id', postId);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to increment views' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
