import { supabase } from './supabase';

/**
 * Upload an image to Supabase Storage
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} Public URL of uploaded image
 */
export async function uploadImage(file) {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase Storage:', error);
    throw error;
  }
}

/**
 * Get optimized image URL (pass-through for Supabase Storage)
 * @param {string} url - Original Supabase Storage URL
 * @param {Object} options - Transformation options (not used for Supabase)
 * @returns {string} Image URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  // Supabase Storage URLs are already optimized
  // If you need transformations, consider using imgproxy or similar service
  return url;
}
