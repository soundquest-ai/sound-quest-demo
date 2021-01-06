import Header from "../Header/Header";
import Head from "next/head";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  const { container } = styles;
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <Header />
      <main className={container}>{children}</main>
    </div>
  );
};

export default Layout;
