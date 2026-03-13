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
      <section className="section-shell px-6 md:px-12 lg:px-20 bg-white">
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
    return (
      <section className="section-shell px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto bg-zinc-50 rounded-2xl p-8 md:p-10 text-center">
          <p className="text-xs tracking-[0.2em] text-zinc-500 mb-3">BLOG</p>
          <h2 className="text-[clamp(1.9rem,5vw,3.4rem)] leading-[0.95] font-semibold text-zinc-950 mb-3">Writing in progress</h2>
          <p className="text-sm md:text-base text-zinc-700 mb-6">
            New technical writeups and product notes are coming soon.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-700 hover:text-zinc-950 transition-colors duration-200 text-sm tracking-[0.12em]"
          >
            <span>VISIT BLOG PAGE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = format(new Date(latestPost.created_at), 'MMMM dd, yyyy');
  const thumbnailUrl = latestPost.thumbnail
    ? getOptimizedImageUrl(latestPost.thumbnail, { width: 800, height: 500 })
    : '/placeholder.webp';

  return (
    <section className="section-shell px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={100}>
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-zinc-500 mb-3">BLOG</p>
            <h2 className="display-hero text-zinc-950 mb-4">
              LATEST FROM BLOG
            </h2>
            <p className="text-sm md:text-base text-zinc-700 max-w-2xl mx-auto leading-relaxed">
              Recent thoughts, tutorials, and insights
            </p>
          </div>

          {/* Featured Post Card */}
          <Link
            to={`/blog/${latestPost.slug}`}
            className="group block max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-45px_rgba(9,9,11,0.8)] transition-all duration-300"
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
                <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500 tracking-[0.12em]">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </div>

                {/* Title */}
                <h3 className="display-brutal text-zinc-950 mb-4 group-hover:text-zinc-700 transition-colors">
                  {latestPost.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-700 leading-relaxed mb-6 line-clamp-3">
                  {latestPost.description}
                </p>

                {/* Read More */}
                <div className="flex items-center text-sm text-zinc-700 group-hover:text-zinc-950 transition-colors">
                  <span className="tracking-[0.12em]">READ ARTICLE</span>
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-100 text-zinc-700 hover:text-zinc-950 transition-colors duration-200"
            >
              <span className="text-sm tracking-[0.12em]">VIEW ALL POSTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}


