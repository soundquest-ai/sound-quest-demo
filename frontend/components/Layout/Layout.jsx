import Head from "next/head";

import Nav from "../Nav/Nav";

import styles from "./layout.module.css";

const Layout = ({ children }) => {
  const { mainContainer, container } = styles;

  return (
    <main className={mainContainer}>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <Nav />
      <section className={container}>{children}</section>
    </main>
  );
};

export default Layout;
