import React, { useState } from "react";
import Link from "next/link";
import styles from "./renderData.module.css";
import Player from "../MusicPlayer/Player";

const IndividualData = ({ data }) => {
  const [time, setTime] = useState();
  // console.log(time);
  const formatedText = [];
  data.words.map((item) => {
    if (item.confidence > 0.9) {
      formatedText.push(
        <a
          onClick={() => {
            setTime(item.start_time);
            // console.log(item.start_time);
          }}
          className={styles.green}
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

    let transcript_element = <div> </div>
    if (data.transcription) {
        transcript_element = (
            <div>
            <div className={styles.textContainer}>
            Full text : {data.transcription.full_text}
        </div>
            <div className={styles.textContainer}>
            Formatted by confidence : {formatedText}
        </div>
                </div>
        )
    }

  return (
    <div className={styles.container}>
      <div className={styles.linkStyles}>
        <Link href="/">Home</Link>
      </div>

      <div className={styles.linkStyles}>
        <Link
          href={{ pathname: "/search/", query: { title: encodeURI(data.title) } }}
        >
          Search
        </Link>
      </div>
      <h1 className={styles.title}>{data.title}</h1>
          <Player currentTime={time} document_id={data.document_id} />
          {transcript_element}
    </div>
  );
};

export default IndividualData;
