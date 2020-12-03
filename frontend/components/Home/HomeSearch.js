import React, { useState, useEffect } from "react";

import styles from "./home.module.css";
import Link from "next/link";

export default function HomeSearch() {
  const [search, setSearch] = useState(null);
  //const [isClicked, setIsClicked] = useState(false);
  function onChangeHandler(e) {
    setSearch(e.target.value);
  }

  const handleKeyPress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      console.log("enter");
      document.getElementById("search").click();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>SoundQuest</h1>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search SoundQuest"
          onChange={onChangeHandler}
          onKeyDown={handleKeyPress}
        />
        <div className={styles.searchBtnContainer}>
          <Link href="/search/[search]" as={`/search/${search}`}>
            <button id="search" className={styles.searchBtn}>
              Go!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
