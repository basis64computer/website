import { apiFetch } from "../api/apiFetch";
import useAuth from "../state/useAuth";
import { CookieManager } from "./CookieManager";
import { decodeJWT } from "./jwtDecode";

export class AuthManager {
  static async login(googleJwt: string): Promise<boolean> {
    const sessionId = CookieManager.getCookie("session_id");
    const headers: HeadersInit = sessionId ? { "X-Session-ID": sessionId } : {};
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        headers,
        body: JSON.stringify({ idToken: googleJwt }),
      });
      const jsonResult = await response.json();
      const decodedJWT = decodeJWT(jsonResult.accessToken);
      if (!decodedJWT) {
        console.error("Failed to decode JWT from accessToken.");
        return false;
      }
      CookieManager.setCookie(
        "access_token",
        jsonResult.accessToken,
        decodedJWT.exp * 1000
      );
      useAuth.setState({user: true, name: decodedJWT.name, email: decodedJWT.email, picture: decodedJWT.picture});
      return true;
    } catch (e) {
      return false;
    }
  }
}
