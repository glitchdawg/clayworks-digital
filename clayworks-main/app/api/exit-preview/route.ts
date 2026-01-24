import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Exit preview mode API route
 * 
 * Usage: /api/exit-preview?redirect=/path
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const redirectUrl = searchParams.get('redirect') || '/';

    // Disable draft mode
    const draft = await draftMode();
    draft.disable();

    // Clear preview cookie
    const headers = new Headers();
    headers.set('Set-Cookie', 'strapi_preview=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');

    // Redirect to the specified page
    redirect(redirectUrl);
}
