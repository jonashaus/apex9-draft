import "../styles/globals.css";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import AppContextProvider from "../context/AppContextProvider";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateToasts from "../components/elements/GenerateToasts";

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <AppContextProvider>
        <NavBar />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          icon={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
        />
        <GenerateToasts />
      </AppContextProvider>
    </SessionContextProvider>
  );
}
export default MyApp;
