import styles from "./renderData.module.css";
import useSWR from "swr";
import Player from "../MusicPlayer/Player";
import Link from "next/link";

export default function RenderData(props) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `/api/v1/filter/?filter=${props.value}&skip=0&limit=100`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const dataComponents = data.map((item) =>
    props.value === "" ? (
      <></>
    ) : (
      <DisplayData
        key={item.id}
        title={item.title}
        document_id={item.id}
        words={item.words.length}
      />
    )
  );
  return <div>{dataComponents}</div>;
}

function DisplayData(props) {
  const date = new Date();
  return (
    <div className={styles.container}>
      <div className={styles.dataInfo}>
        <h3>
          <Link
            href={{
              pathname: "/docs/[document_id]",
              query: { document_id: props.document_id },
            }}
          >
            {props.title}
          </Link>
        </h3>
        <p>Number of words: {props.words}</p>
      </div>
      <Player document_id={props.document_id} />
    </div>
  );
}
