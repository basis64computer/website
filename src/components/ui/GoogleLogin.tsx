import { useEffect } from "react";
import { AuthManager } from "../../utils/AuthManager";

interface Props {
  isDarkMode: boolean;
}

const GoogleLogin = ({ isDarkMode }: Props) => {
  useEffect(() => {
    const handleSignIn = async (response: any) => {
      // console.log("JWT credential:", response.credential);
      await AuthManager.login(response.credential);
    };

    // init Google Identity (sekali aja, jangan tiap rerender)
    // @ts-ignore
    if (typeof google !== "undefined") {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: "883133646995-j5adre0hvaooif1gs83800u91m7s1u8c.apps.googleusercontent.com",
        callback: handleSignIn,
      });
    }

    // tiap kali isDarkMode berubah → clear tombol lama & render ulang
    const container = document.getElementById("google-signin-btn");
    if (container) {
      container.innerHTML = ""; // hapus tombol lama

      // @ts-ignore
      google.accounts.id.renderButton(container, {
        theme: isDarkMode ? "filled_black" : "outline",
        size: "large",
      });
    }
  }, [isDarkMode]);

  return (
    <div className="flex w-full">
      <div
        id="google-signin-btn"
        className="w-full [&>div]:w-full [&>div]:flex [&>div]:justify-center"
      ></div>
    </div>
  );
};

export default GoogleLogin;
