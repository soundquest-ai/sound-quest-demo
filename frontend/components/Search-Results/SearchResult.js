import React, { useState } from "react";
import Link from "next/link";
import styles from "./searchResult.module.css";
import RenderData from "./RenderData";

export default function SearchResult(props) {
  const [search, setSearch] = useState(props.search);
  const [value, setValue] = useState(props.search);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit() {
    event.preventDefault();
    setValue(search);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <div className={styles.searchMain}>
        <Link href="/">
          <div
            style={{
              padding: 10,
              color: "blue",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            Home
          </div>
        </Link>
        <input
          className={styles.searchInput}
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="search"
        />
        <button className={styles.searchBtn}>Go!</button>
        {value && <RenderData value={value} />}
      </div>
    </form>
  );
}
