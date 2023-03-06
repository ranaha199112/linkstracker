import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <NextNProgress options={{ showSpinner: false }} />
        <ToastContainer
          className="mt-[72px] lg:mt-[52px] z-10"
          autoClose={1500}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
