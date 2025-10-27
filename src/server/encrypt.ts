'use server';
import CryptoJS from 'crypto-js';
export async function encryptText(text: string):  Promise<string> {
    const encryptionKey = process.env.APP_DEV_IV_ENCRYPTION_SECRET_KEY;
    const ivKey = process.env.APP_DEV_IV_KEY;
    if (!encryptionKey || !ivKey) {
        throw new Error('Missing encryption environment variables.');
    }

    // AES requires both key and IV to be WordArrays
    const iv = CryptoJS.enc.Utf8.parse(ivKey);
    const secretKey = CryptoJS.enc.Utf8.parse(encryptionKey.padEnd(16, ' '));

    const encrypted = CryptoJS.AES.encrypt(text, secretKey, { iv });
    return encrypted.toString(); // returns base64 string
}