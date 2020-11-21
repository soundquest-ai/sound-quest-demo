import useSWR from "swr";
import styles from "./player.module.css";
import {
  PlayButton,
  VolumeControl,
  Progress,
  Timer,
} from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";

// audio source
const streamUrl = "/api/v1/docs/2/file";

// some track meta information
const trackTitle = "Great song by random artist";

const AWSSoundPlayer = withCustomAudio((props) => {
  const { trackTitle, currentTime, duration } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{trackTitle}</h2>
      <PlayButton className={styles.playBtn} {...props} />

      <Progress
        className={styles.progress}
        innerClassName={styles.inner}
        value={(currentTime / duration) * 100 || 0}
        {...props}
      />
    </div>
  );
});

export default function Player(props) {
  const { document_id } = props;
  const docUrl = `/api/v1/docs/${document_id}`;
  const streamUrl = `/api/v1/docs/${document_id}/file`;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(docUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <AWSSoundPlayer
      streamUrl={streamUrl}
      trackTitle={data.title}
      preloadType="auto"
    />
  );
}
