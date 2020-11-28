import React from "react";
import Link from "next/link";
import styles from "./renderData.module.css";
// import Player from "./Player";

const IndividualData = ({ data }) => {
  return (
    <div>
      <Link href="/" className={styles.linkStyles}>
        <div>Home</div>
      </Link>

      <Link
        href={{ pathname: "/search/[search]", query: { search: data.title } }}
        className={styles.linkStyles}
      >
        <div>Search</div>
      </Link>
      <h1>{data.title}</h1>
    </div>
  );
};

export default IndividualData;
