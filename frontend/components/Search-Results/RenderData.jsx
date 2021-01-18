import useSWR from "swr";
import Link from "next/link";

import Player from "../MusicPlayer/Player";

import styles from "./renderData.module.css";

const RenderData = ({ value }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `/api/v1/filter?filter=${value}&skip=0&limit=100`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const dataComponents = data.map((item) =>
    value === "" ? (
      <></>
    ) : (
      <DisplayData
        key={item.document.id}
        title={item.document.title}
        document_id={item.document.id}
        words={item.document.words.length}
        headlines={item.headlines}
      />
    )
  );

  return <div>{dataComponents}</div>;
};

const Headlines = ({ headlines }) => {
  const listItems = headlines.map((item) => <li key={item}>{item}</li>);
  return <ul>{listItems}</ul>;
};

const DisplayData = ({ title, document_id, words, headlines }) => {
  const { container, dataInfo } = styles;

  return (
    <div className={container}>
      <div className={dataInfo}>
        <h3>
          <Link
            href={{
              pathname: "/docs/[document_id]",
              query: { document_id: document_id },
            }}
          >
            {title}
          </Link>
        </h3>
        <Headlines headlines={headlines} />
      </div>
      <Player document_id={document_id} />
    </div>
  );
};

export default RenderData;
