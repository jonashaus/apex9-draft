import "../styles/globals.css";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import AppContextProvider from "../context/AppContextProvider";
import GenerateToasts from "../components/elements/GenerateToasts";

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <AppContextProvider>
        <Component {...pageProps} />
        <GenerateToasts />
      </AppContextProvider>
    </SessionContextProvider>
  );
}
export default MyApp;
