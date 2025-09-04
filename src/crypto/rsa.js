import { Utils } from '../utils/utils.js';
export class RSA {
	// =======================================
	// Encrypt & Decrypt
	// =======================================

	static async encrypt(publicKeyPem, plaintext) {
		const publicKey = await RSA.importPublicKey(publicKeyPem);
		const encoded = new TextEncoder().encode(plaintext);
		const encrypted = await crypto.subtle.encrypt({
			name: "RSA-OAEP"
		}, publicKey, encoded);
		const encryptedBase64 = Utils.arrayBufferToBase64(encrypted);
		return RSA.formatPem(encryptedBase64);
	}

	static async decrypt(privateKeyPem, ciphertextBase64) {
		const privateKey = await RSA.importPrivateKey(privateKeyPem);
		const ciphertext = Utils.base64ToArrayBuffer(ciphertextBase64.replace(/\n/g, ""));
		const decrypted = await crypto.subtle.decrypt({
			name: "RSA-OAEP"
		}, privateKey, ciphertext);
		return new TextDecoder().decode(decrypted);
	}

	// =======================================
	// Key Import (PEM)
	// =======================================

	static async importPublicKey(pem) {
		return crypto.subtle.importKey(
			"spki",
			RSA.pemToDer(pem, "public"), {
				name: "RSA-OAEP",
				hash: "SHA-256"
			},
			true,
			["encrypt"]
		);
	}

	static async importPrivateKey(pem) {
		return crypto.subtle.importKey(
			"pkcs8",
			RSA.pemToDer(pem, "private"), {
				name: "RSA-OAEP",
				hash: "SHA-256"
			},
			true,
			["decrypt"]
		);
	}

	// =======================================
	// Key Generation & Export
	// =======================================

	static async generateRSAKeyPair() {
		return await crypto.subtle.generateKey({
				name: "RSA-OAEP",
				modulusLength: 2048,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: "SHA-256",
			},
			true,
			["encrypt", "decrypt"]
		);
	}

	static async exportKeyToPEM(key) {
		const exportFormat = key.type === "public" ? "spki" : "pkcs8";
		const exported = await crypto.subtle.exportKey(exportFormat, key);
		const exportedBase64 = Utils.arrayBufferToBase64(exported);
		const pemHeader = key.type === "public" ? "PUBLIC KEY" : "PRIVATE KEY";
		return `-----BEGIN ${pemHeader}-----\n${exportedBase64.match(/.{1,64}/g).join('\n')}\n-----END ${pemHeader}-----`;
	}

	// =======================================
	// Internal Helpers
	// =======================================

	static pemToDer(pem, type) {
		const header = type === "public" ? "-----BEGIN PUBLIC KEY-----" : "-----BEGIN PRIVATE KEY-----";
		const footer = type === "public" ? "-----END PUBLIC KEY-----" : "-----END PRIVATE KEY-----";
		const pemContents = pem.slice(header.length, pem.length - footer.length).trim();
		const binary = atob(pemContents);
		return Utils.strToArrayBuffer(binary);
	}

	static formatPem(base64) {
		return base64.replace(/(.{64})/g, "$1\n");
	}
}