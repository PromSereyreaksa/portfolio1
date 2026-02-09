import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, ArrowRight } from 'lucide-react';
import { fetchLatestPost } from '../lib/supabase';
import { getOptimizedImageUrl } from '../lib/cloudinary';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function BlogPreviewSection() {
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatestPost();
  }, []);

  async function loadLatestPost() {
    const post = await fetchLatestPost();
    setLatestPost(post);
    setLoading(false);
  }

  if (loading) {
    return (
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!latestPost) {
    return null; // Don't show section if no posts
  }

  const formattedDate = format(new Date(latestPost.created_at), 'MMMM dd, yyyy');
  const thumbnailUrl = latestPost.thumbnail
    ? getOptimizedImageUrl(latestPost.thumbnail, { width: 800, height: 500 })
    : '/placeholder.webp';

  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={100}>
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-4">
              LATEST FROM BLOG
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-4"></div>
            <p className="text-sm md:text-base font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Recent thoughts, tutorials, and insights
            </p>
          </div>

          {/* Featured Post Card */}
          <Link
            to={`/blog/${latestPost.slug}`}
            className="group block max-w-4xl mx-auto bg-white border-l-4 border-gray-300 hover:border-black transition-all duration-300"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-full overflow-hidden bg-gray-100">
                <img
                  src={thumbnailUrl}
                  alt={latestPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* Date */}
                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-medium tracking-wide text-black mb-4 group-hover:text-gray-700 transition-colors">
                  {latestPost.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {latestPost.description}
                </p>

                {/* Read More */}
                <div className="flex items-center text-sm text-gray-700 group-hover:text-black transition-colors">
                  <span className="tracking-wide">Read Article</span>
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors duration-300"
            >
              <span className="text-sm tracking-wide">VIEW ALL POSTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
