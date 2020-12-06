import React, { useState } from "react";
import Link from "next/link";
import styles from "./searchResult.module.css";
import RenderData from "./RenderData";
import { useRouter, Router } from "next/router";

function SearchResult() {
  const Router = useRouter();
  console.log(Router.query.title);
  /**
   *! the problem is Router.query.title comes up as undefined and then defines, this will only show if you edit title in the url, aparty from that the functionallity works
   *! I was looking at getInitialProps to fix this, but my solutions didnt work out
   */
  const [search, setSearch] = useState(Router.query.title);
  const [value, setValue] = useState(Router.query.title);

  const updateQuery = (newQuery) => {
    Router.push({
      pathname: "/search",
      query: { title: encodeURI(newQuery) },
    });
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setValue(search);
    updateQuery(search);
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

SearchResult.getInitialProps = async (context) => {
  console.log(context.query);
  return { Router };
};

export default SearchResult;
