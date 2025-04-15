import CryptoJS from "crypto-js";

export  function  encryptText  (text: string){
    const encryptionKey = process.env.APP_DEV_IV_ENCRYPTION_SECRET_KEY;
    const ivKey = process.env.APP_DEV_IV_KEY;
    let iv;
    if (ivKey) {
        iv = CryptoJS.enc.Utf8.parse(ivKey);
    }

    let secretKey;
    if (encryptionKey) {
        secretKey = CryptoJS.enc.Utf8.parse(encryptionKey.padEnd(16, " "));
        text = CryptoJS.AES.encrypt(text, secretKey, {iv: iv}).toString();
        return text;
    }
}