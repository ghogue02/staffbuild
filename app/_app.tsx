// app/_app.tsx
import type { AppProps } from 'next/app'
import { SessionProvider } from '../utils/SessionContext';
import '../styles/globals.css' // Or your global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;