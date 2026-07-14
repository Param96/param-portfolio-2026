import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    // We'll read the secret from environment variables
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      secret
    );

    // If there is no secret set, we'll log a warning and still allow it (for local testing without a secret)
    // However, in production, you should ALWAYS have a secret set for security.
    if (secret && !isValidSignature) {
      const message = 'Invalid signature';
      return NextResponse.json({ message, isValidSignature, body }, { status: 401 });
    }

    if (!body?._type) {
      const message = 'Bad Request';
      return NextResponse.json({ message, body }, { status: 400 });
    }

    // Revalidate all pages layout by default. 
    // This ensures any page fetching from Sanity will be rebuilt with new data.
    revalidatePath('/', 'layout');

    return NextResponse.json({ 
      status: 200,
      revalidated: true, 
      now: Date.now(), 
      body 
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
