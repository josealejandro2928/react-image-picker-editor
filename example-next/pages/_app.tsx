import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "../styles/dark-editor.scss";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
