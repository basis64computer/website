/// <reference types="vite/client" />

declare global {
  interface Window {
    onSignIn: (response: any) => void;
  }
}
