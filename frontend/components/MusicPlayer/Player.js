import useSWR from "swr";
import styles from "./player.module.css";
import ReactPlayer from "react-player";
//import { useState } from "react";

export default function Player(props) {
  const { document_id, currentTime } = props;
  const docUrl = `/api/v1/docs/${document_id}`;
  const streamUrl = `/api/v1/docs/${document_id}/file`;
  //const [seek, setSeek] = useState({ seeking: false });
  //const [played, setPlayed] = useState({ played: 0 });

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(docUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  /*
  const handleTimeChange = () => {
    onChange(setPlayed({ played: currentTime }));
  };

  const handleSeekMouseDown = (e) => {
    setSeek({ seeking: true });
  };

  const handleSeekChange = (e) => {
    setPlayed({ played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setSeek({ seeking: false });
    //ReactPlayer.seekTo(parseFloat(e.target.value));
  };

  console.log(played);

  */

  return (
    <div className={styles.container}>
      <ReactPlayer
        url={streamUrl}
        controls={true}
        width="80%"
        height="100%"
        style={{
          border: "1px groove black",
          borderRadius: "30px",
          outline: "None",
        }}
        //progressInterval={currentTime}
      />
    </div>
  );
}
