import Header from "../Header/Header";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
}
