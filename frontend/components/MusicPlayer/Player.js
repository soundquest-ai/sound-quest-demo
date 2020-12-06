import useSWR from "swr";
import styles from "./player.module.css";
import ReactPlayer from "react-player";

export default function Player(props) {
  // console.log(props.currentTime);
  const { document_id, currentTime } = props;
  const docUrl = `/api/v1/docs/${document_id}`;
  const streamUrl = `/api/v1/docs/${document_id}/file`;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(docUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <ReactPlayer
        url={streamUrl}
        controls={true}
        height={styles.height}
        width={styles.width}
      />
    </div>
  );
}
