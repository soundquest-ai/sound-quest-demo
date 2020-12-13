import React, { useState } from "react";
import Link from "next/link";
import styles from "./renderData.module.css";
import Player from "../MusicPlayer/Player";

const IndividualData = ({ data }) => {
  const [time, setTime] = useState();
  console.log("time", time);
  const formatedText = [];
  data.words.map((item) => {
    if (item.confidence > 0.9) {
      formatedText.push(
        <a
          onClick={() => {
            setTime(item.start_time);
          }}
          className={styles.black}
        >
          {item.word}
        </a>
      );
    } else {
      formatedText.push(
        <a onClick={() => setTime(item.start_time)} className={styles.red}>
          {item.word}
        </a>
      );
    }
  });

  let transcript_element = <div> </div>;
  if (data.transcription) {
    transcript_element = (
      <div>
        <div className={styles.textContainer}>
          Formatted by confidence : {formatedText}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.linkStyles}>
        <Link href="/">Home</Link>
      </div>

      <div className={styles.linkStyles}>
        <Link
          href={{
            pathname: "/search/",
            query: { title: encodeURI(data.title) },
          }}
        >
          Search
        </Link>
      </div>
      <h1 className={styles.title}>{data.title}</h1>
      <Player currentTime={time} document_id={data.document_id} />
      <div className={styles.dataContainer}>
        <div className={styles.dataLeft}>
          <h1>page info</h1>
        </div>
        <div className={styles.dataRight}>{transcript_element}</div>
      </div>
    </div>
  );
};

export default IndividualData;
