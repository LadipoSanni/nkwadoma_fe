'use server';

import { encryptText } from "@/server/encrypt";

export async function encryptAction(text: string) {
    console.log('text:', text)
    return await encryptText(text);
}