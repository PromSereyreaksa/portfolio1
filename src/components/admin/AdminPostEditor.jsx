import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/cloudinary';
import { Upload, Save, ArrowLeft } from 'lucide-react';

export default function AdminPostEditor() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);
  const adminPath = import.meta.env.VITE_ADMIN_PATH;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    thumbnail: '',
    published: false,
  });

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  async function loadPost() {
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
        const post = posts.find((p) => p.id === postId);
        if (post) {
          setFormData({
            title: post.title,
            slug: post.slug,
            description: post.description,
            content: post.content,
            thumbnail: post.thumbnail,
            published: post.published,
          });
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function handleTitleChange(title) {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  }

  async function handleThumbnailUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, thumbnail: url });
    } catch (error) {
      alert('Failed to upload image');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  async function handleImageInsert() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const url = await uploadImage(file);
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', url);
        }
      } catch (error) {
        alert('Failed to upload image');
        console.error(error);
      }
    };
    input.click();
  }

  async function handleSave(e) {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const endpoint = postId ? '/api/blog/update' : '/api/blog/create';
      const body = postId
        ? { postId, ...formData }
        : formData;

      const response = await fetch(endpoint, {
        method: postId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(postId ? 'Post updated successfully!' : 'Post created successfully!');
        navigate(`/${adminPath}/dashboard/posts`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setSaving(false);
    }
  }

  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: handleImageInsert,
      },
    },
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-thin tracking-[0.2em] text-black">
          {postId ? 'EDIT POST' : 'CREATE POST'}
        </h1>
        <button
          onClick={() => navigate(`/${adminPath}/dashboard/posts`)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Title */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 tracking-wide">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
            placeholder="Enter post title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 tracking-wide">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors font-mono text-sm"
            placeholder="post-slug"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL: /blog/{formData.slug || 'post-slug'}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 tracking-wide">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
            placeholder="Brief description for preview cards"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 tracking-wide">
            Thumbnail Image
          </label>
          <div className="flex items-center gap-4">
            <label
              className={`flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-black transition-colors cursor-pointer ${
                uploading ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm">{uploading ? 'Uploading...' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {formData.thumbnail && (
              <img
                src={formData.thumbnail}
                alt="Thumbnail preview"
                className="w-20 h-20 object-cover border border-gray-200"
              />
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 tracking-wide">
            Content
          </label>
          <div className="bg-white border border-gray-300">
            <ReactQuill
              ref={quillRef}
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              modules={quillModules}
              theme="snow"
              placeholder="Write your post content here..."
              className="min-h-[400px]"
            />
          </div>
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-4 h-4 border-gray-300 focus:ring-black"
          />
          <label htmlFor="published" className="text-sm text-gray-700 tracking-wide">
            Publish immediately
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors text-sm tracking-wide"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
