import React, { useState } from "react";

import styles from "./home.module.css";
import Link from "next/link";

export default function HomeSearch() {
  const [search, setSearch] = useState(null);
  function onChangeHandler(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>SoundQuest</h1>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="doesn't work yet... click go"
          onChange={onChangeHandler}
        />
        <div className={styles.searchBtnContainer}>
          <button className={styles.searchBtn}>
            <Link href={`/search/[search]`} as={`/search/${search}`}>
              Go!
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
