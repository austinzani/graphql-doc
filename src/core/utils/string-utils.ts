/**
 * String utility functions for URL-friendly transformations.
 */

/**
 * Converts text to a URL-friendly slug.
 *
 * - Handles camelCase by inserting hyphens (getUser → get-user)
 * - Converts to lowercase
 * - Replaces non-alphanumeric characters with hyphens
 * - Removes leading/trailing hyphens
 *
 * @param text - The text to slugify
 * @returns A URL-friendly slug
 *
 * @example
 * slugify('getUser')           // 'get-user'
 * slugify('getUserById')       // 'get-user-by-id'
 * slugify('User Management')   // 'user-management'
 * slugify('get"User#1')        // 'get-user-1'
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between camelCase
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
