import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import BlogCard from './BlogCard';
import { fetchPublishedPosts } from '../../lib/supabase';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  async function loadPosts() {
    setLoading(true);
    const data = await fetchPublishedPosts();
    setPosts(data);
    setFilteredPosts(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white pt-20 overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="py-8 md:py-12 px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            {/* Back to Portfolio */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="tracking-wide">Back to Portfolio</span>
            </Link>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-4">
                BLOG
              </h1>
              <div className="w-24 h-px bg-black mx-auto mb-4"></div>
              <p className="text-sm md:text-base font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Thoughts, tutorials, and insights on web development, design, and technology
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm tracking-wide"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-gray-200 animate-pulse">
                  <div className="w-full h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            // Empty state
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h2 className="text-2xl font-light text-gray-700 mb-2">
                {searchQuery ? 'No posts found' : 'No posts yet'}
              </h2>
              <p className="text-gray-500">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Check back later for new content'}
              </p>
            </div>
          ) : (
            // Posts grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
