'use server';

import { encryptText } from "@/server/encrypt";

export async function encryptAction(text: string) {
    return await encryptText(text);
}

