export async function   encryptText  (text: string){
    const publicKeyBase64 = process.env.APP_DEV_IV_ENCRYPTION_SECRET_KEY || "";

    const publicKeyBytes = Uint8Array.from(atob(publicKeyBase64), (c) => c.charCodeAt(0));
    const publicKey = await crypto.subtle.importKey(
        "spki",
        publicKeyBytes.buffer,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
        },
        false,
        ["encrypt"]
    );

    const encoder = new TextEncoder();
    const encodedPassword = encoder.encode(text);

    const encryptedPassword = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedPassword
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedPassword)));
    // return text;
}