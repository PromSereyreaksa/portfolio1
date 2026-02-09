import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Eye } from 'lucide-react';
import { getOptimizedImageUrl } from '../../lib/cloudinary';

export default function BlogCard({ post }) {
  const formattedDate = format(new Date(post.created_at), 'MMMM dd, yyyy');
  const thumbnailUrl = post.thumbnail
    ? getOptimizedImageUrl(post.thumbnail, { width: 600, height: 400 })
    : '/placeholder.webp';

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white border border-gray-200 hover:border-black transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date and Views */}
        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{post.views || 0} views</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-medium tracking-wide text-black mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {post.description}
        </p>

        {/* Read More Indicator */}
        <div className="mt-4 flex items-center text-sm text-gray-700 group-hover:text-black transition-colors">
          <span className="tracking-wide">Read More</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
}
