import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Example basic draft mode toggler
  const draft = await draftMode();
  draft.enable()

  if (slug) {
    redirect(slug)
  }

  redirect('/')
}
