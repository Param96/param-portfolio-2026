import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Validate preview secret only if one is configured in the environment
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return new Response('Invalid token', { status: 401 })
  }

  const draft = await draftMode();
  draft.enable()

  if (slug) {
    redirect(slug)
  }

  redirect('/')
}
