export class Utils {
  static CHARSET_ALPHANUMERIC: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // ArrayBuffer → Base64
  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(binary);
  }

  // Generate string random dengan crypto.getRandomValues
  static generateRandomString(
    length: number,
    charset: string = Utils.CHARSET_ALPHANUMERIC
  ): string {
    let result = "";
    const charsetLength = charset.length;
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += charset.charAt(randomValues[i] % charsetLength);
    }
    return result;
  }

  // String → ArrayBuffer
  static strToArrayBuffer(str: string): ArrayBuffer {
    return new TextEncoder().encode(str).buffer;
  }

  // Base64 URL encode
  static base64urlEncode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // Base64 URL decode → Uint8Array
  static base64urlDecode(base64url: string): Uint8Array {
    const pad = "=".repeat((4 - (base64url.length % 4)) % 4);
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; ++i) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  static toUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str); // pasti Uint8Array
  }

  static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length); // Uint8Array murni
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer; // ArrayBuffer murni
  }

  // Uint8Array → String
  static toString(bytes: Uint8Array): string {
    return new TextDecoder().decode(bytes);
  }

  static camelToKebab(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2") // sisipkan "-" sebelum huruf kapital
      .toLowerCase(); // ubah semua jadi lowercase
  }
}
