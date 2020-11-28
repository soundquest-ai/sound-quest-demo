import React from "react";
import Link from "next/link";
import styles from "./renderData.module.css";
import Player from "../MusicPlayer/Player";

const IndividualData = ({ data }) => {
  return (
    <div>
      <div className={styles.linkStyles}>
        <Link href="/">Home</Link>
      </div>

      <div className={styles.linkStyles}>
        <Link
          href={{ pathname: "/search/[search]", query: { search: data.title } }}
        >
          Search
        </Link>
      </div>
      <h1 className={styles.title}>{data.title}</h1>
      <Player document_id={data.document_id} />
    </div>
  );
};

export default IndividualData;
