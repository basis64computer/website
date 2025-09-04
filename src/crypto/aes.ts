import { Utils } from '../utils/utils.js';

export class AES {
	static async importKey(rawKey: string): Promise<CryptoKey> {
		const keyBuffer: ArrayBuffer = Utils.strToArrayBuffer(rawKey);
		return await crypto.subtle.importKey(
			"raw",
			keyBuffer,
			{ name: "AES-GCM" },
			true,
			["encrypt", "decrypt"]
		);
	}

	static async encrypt(key: string, data: string, iv: Uint8Array): Promise<string> {
		const encoded: ArrayBuffer = new TextEncoder().encode(data).buffer;
		const cryptoKey: CryptoKey = await AES.importKey(key);

		const ciphertext: ArrayBuffer = await crypto.subtle.encrypt(
			{
				name: "AES-GCM",
				iv: Utils.strToArrayBuffer(Utils.toString(iv))
			},
			cryptoKey,
			encoded
		);

		return Utils.arrayBufferToBase64(ciphertext);
	}

	static async decrypt(key: string, ciphertext: string, iv: Uint8Array): Promise<string> {
		const cryptoKey: CryptoKey = await AES.importKey(key);

		const decrypted: ArrayBuffer = await crypto.subtle.decrypt(
			{
				name: "AES-GCM",
				iv: Utils.strToArrayBuffer(iv.toString())
			},
			cryptoKey,
			Utils.base64ToArrayBuffer(ciphertext)
		);

        return new TextDecoder().decode(decrypted);
    }

	static generateKey(): string {
        return Utils.generateRandomString(32, Utils.CHARSET_ALPHANUMERIC);
    }

	static generateIV(): string {
        return Utils.generateRandomString(12, Utils.CHARSET_ALPHANUMERIC);
    }
}