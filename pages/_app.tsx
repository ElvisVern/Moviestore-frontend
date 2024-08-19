import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ItemProvider } from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ItemProvider>
      <Component {...pageProps} />
    </ItemProvider>
  );
}
