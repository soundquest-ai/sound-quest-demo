import Head from "next/head";
import mainStyles from "../styles/main.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <main>
        {/* logos */}

        <div className={mainStyles.logoContainer}>
          <div className={mainStyles.logoImgContainer}></div>
          <div className={mainStyles.logoImgContainer}></div>
        </div>

        {/* search section */}

        <div className={mainStyles.searchContainer}>
          <div className={mainStyles.searchMain}>
            <select className={mainStyles.searchSelect}></select>
            <input
              className={mainStyles.searchInput}
              type="text"
              placeholder="search"
            />
            <button className={mainStyles.searchBtn}>Go!</button>
            {/* components go here */}
          </div>
          <div className={mainStyles.searchSide}>
            {/* components go here */}
          </div>
        </div>
      </main>
    </div>
  );
}
