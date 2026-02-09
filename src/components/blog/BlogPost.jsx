import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, Clock } from 'lucide-react';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { fetchPostBySlug } from '../../lib/supabase';
import { getOptimizedImageUrl } from '../../lib/cloudinary';
import 'highlight.js/styles/github.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [slug]);

  async function loadPost() {
    setLoading(true);
    const data = await fetchPostBySlug(slug);
    
    if (!data) {
      // Post not found, redirect to blog page
      navigate('/blog');
      return;
    }

    setPost(data);
    setLoading(false);

    // Increment views
    incrementViewCount(data.id);
  }

  async function incrementViewCount(postId) {
    try {
      await fetch('/api/blog/increment-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }

  function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 overflow-x-hidden">
        <div className="animate-pulse py-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const formattedDate = format(new Date(post.created_at), 'MMMM dd, yyyy');
  const readingTime = calculateReadingTime(post.content);
  const thumbnailUrl = post.thumbnail
    ? getOptimizedImageUrl(post.thumbnail, { width: 1200, height: 630 })
    : null;
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="min-h-screen bg-white pt-20 overflow-x-hidden">
      {/* Back to Blog */}
      <div className="py-6 px-8 md:px-16 lg:px-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-wide">Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.views || 0} views</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-wide text-black mb-6 leading-tight break-words">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-12 pb-12 border-b border-gray-200 break-words">
            {post.description}
          </p>

          {/* Thumbnail */}
          {thumbnailUrl && (
            <div className="mb-12">
              <img
                src={thumbnailUrl}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="blog-content prose prose-lg max-w-none break-words overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </article>
    </div>
  );
}
