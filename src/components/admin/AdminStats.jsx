import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FileText, Eye, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalViews: 0,
    posts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/blog/posts', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const posts = await response.json();
        const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
        const publishedPosts = posts.filter((p) => p.published).length;

        setStats({
          totalPosts: posts.length,
          publishedPosts,
          totalViews,
          posts: posts.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5),
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-thin tracking-[0.2em] text-black mb-8">
        STATISTICS
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Posts */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-gray-600" />
            <div className="text-3xl font-light text-black">
              {stats.totalPosts}
            </div>
          </div>
          <div className="text-sm text-gray-600 tracking-wide">Total Posts</div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.publishedPosts} published
          </div>
        </div>

        {/* Published Posts */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="text-3xl font-light text-black">
              {stats.publishedPosts}
            </div>
          </div>
          <div className="text-sm text-gray-600 tracking-wide">Published</div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.totalPosts - stats.publishedPosts} drafts
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-blue-600" />
            <div className="text-3xl font-light text-black">
              {stats.totalViews.toLocaleString()}
            </div>
          </div>
          <div className="text-sm text-gray-600 tracking-wide">Total Views</div>
          <div className="text-xs text-gray-500 mt-1">
            All time
          </div>
        </div>
      </div>

      {/* Most Viewed Posts */}
      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium tracking-wide text-black">
            Most Viewed Posts
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.posts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No posts yet
            </div>
          ) : (
            stats.posts.map((post, index) => (
              <div key={post.id} className="p-6 flex items-center gap-6">
                <div className="text-2xl font-light text-gray-400 w-8">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-black mb-1">
                    {post.title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    {format(new Date(post.created_at), 'MMM dd, yyyy')}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{post.views || 0}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
