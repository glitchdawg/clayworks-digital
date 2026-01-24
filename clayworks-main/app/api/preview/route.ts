import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Preview mode API route
 * 
 * Usage: /api/preview?secret=YOUR_SECRET&slug=/path-to-preview
 * 
 * This enables Next.js draft mode for previewing unpublished Strapi content.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const slug = searchParams.get('slug') || '/';
    const contentType = searchParams.get('type');
    const id = searchParams.get('id');

    // Check the secret
    const previewSecret = process.env.PREVIEW_SECRET || 'preview-secret';
    if (secret !== previewSecret) {
        return new Response('Invalid preview secret', { status: 401 });
    }

    // Enable draft mode
    const draft = await draftMode();
    draft.enable();

    // Set a cookie to indicate preview is active
    const headers = new Headers();
    headers.set('Set-Cookie', `strapi_preview=true; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`);

    // Build preview URL
    let redirectUrl = slug;
    if (contentType && id) {
        // Content-specific preview
        switch (contentType) {
            case 'blog-post':
                redirectUrl = `/blogs/${id}`;
                break;
            case 'location':
                redirectUrl = `/location/${id}`;
                break;
            default:
                redirectUrl = slug;
        }
    }

    // Redirect to the content page
    redirect(redirectUrl);
}
