import useSWR from "swr";
import styles from "./player.module.css";
import {
  PlayButton,
  VolumeControl,
  Progress,
  Timer,
} from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";

const AWSSoundPlayer = withCustomAudio((props) => {
  const { trackTitle, currentTime, duration } = props;
  // console.log(props.trackTime);

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.title}>{trackTitle}</h2> */}
      <PlayButton className={styles.playBtn} {...props} />
      <VolumeControl
        className={styles.volumeControl}
        buttonClassName={styles.btnVolumeControl}
        rangeClassName={styles.rangeVolumeControl}
        {...props}
      />
      <Progress
        className={styles.progress}
        innerClassName={styles.inner}
        value={(currentTime / duration) * 100 || 0}
        {...props}
      />
      <Timer className={styles.timer} {...props} />
    </div>
  );
});

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
    <AWSSoundPlayer
      streamUrl={streamUrl}
      trackTitle={data.title}
      // trackTime={currentTime}
      preloadType="auto"
    />
  );
}
