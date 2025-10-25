import { encryptText } from '@/utils/encrypt';
//
// export async function POST(request: Request) {
//     const { text } = await request.json();
//     const encrypted = encryptText(text);
//     return Response.json({ encrypted });
// }
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { text } = await request.json();
    const encrypted = encryptText(text); // ✅ pure function, no fetch
    return NextResponse.json({ encrypted });
}
