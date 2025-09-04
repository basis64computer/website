import { Utils } from '../utils/utils.js';

/**
 * JWT class untuk membuat, memverifikasi, dan membaca token JWT.
 */
export class JWT {
  /**
   * Membuat JWT yang ditandatangani menggunakan algoritma HS256.
   * 
   * @param {Object} payload - Data yang akan dikodekan ke dalam JWT.
   * @param {string} secret - Secret key untuk proses signing.
   * @param {Object} [options] - Opsi tambahan untuk token.
   * @param {number} [options.expiresIn] - Waktu kadaluarsa token dalam detik.
   * @returns {Promise<string>} - Token JWT dalam format string.
   */
  static async sign(payload, secret, options = {}) {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    const now = Math.floor(Date.now() / 1000);
    if (!payload.iat) payload.iat = now;
    if (options.expiresIn) payload.exp = now + options.expiresIn;

    const encodedHeader = Utils.base64urlEncode(Utils.toUint8Array(JSON.stringify(header)));
    const encodedPayload = Utils.base64urlEncode(Utils.toUint8Array(JSON.stringify(payload)));
    const data = `${encodedHeader}.${encodedPayload}`;

    const key = await crypto.subtle.importKey(
      'raw',
      Utils.toUint8Array(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, Utils.toUint8Array(data));
    const encodedSignature = Utils.base64urlEncode(signature);

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  }

  /**
   * Verifikasi JWT yang ditandatangani dengan HS256.
   * 
   * @param {string} token - Token JWT yang akan diverifikasi.
   * @param {string} secret - Secret key untuk proses verifikasi.
   * @returns {Promise<Object>} - Payload yang ter-decode jika token valid.
   * @throws {Error} - Jika signature tidak valid atau token kadaluarsa.
   */
  static async verify(token, secret) {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
    if (!encodedHeader || !encodedPayload || !encodedSignature) {
      throw new Error("Invalid JWT format");
    }

    const data = `${encodedHeader}.${encodedPayload}`;
    const key = await crypto.subtle.importKey(
      'raw',
      Utils.toUint8Array(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      Utils.base64urlDecode(encodedSignature),
      Utils.toUint8Array(data)
    );

    if (!isValid) throw new Error("Invalid signature");

    const payloadJSON = Utils.toString(Utils.base64urlDecode(encodedPayload));
    const payload = JSON.parse(payloadJSON);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now >= payload.exp) throw new Error("Token expired");

    return payload;
  }

  /**
   * Decode payload dari JWT tanpa memverifikasi signature.
   * Hanya untuk membaca isi token secara lokal.
   * 
   * @param {string} token - Token JWT.
   * @returns {Object} - Payload ter-decode dalam bentuk objek.
   * @throws {Error} - Jika format token tidak valid.
   */
  static decodePayload(token) {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error("Invalid JWT format");
    const payloadDecoded = Utils.base64urlDecode(parts[1]);
    return JSON.parse(Utils.toString(payloadDecoded));
  }
}
