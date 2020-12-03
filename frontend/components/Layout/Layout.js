import Header from "../Header/Header";
import Head from "next/head";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <Header />
      <main className={styles.container}>{children}</main>
    </div>
  );
}
