import React from "react";
import styles from "./data.module.css";
// import useSWR from "swr";

export default function DisplayData(props) {
  return (
    <div className={styles.container}>
      <div>
        <h3>Name: {props.title}!</h3>
        <h3>Time: {Date()}!</h3>
      </div>
      <div>Player</div>
    </div>
  );
}

// export default class ShowData extends React.Component {
//   render() {
//     return <Search />;
//   }
// }

// function Search() {
//   const fetcher = (url) => fetch(url).then((res) => res.json());
//   const { data, error } = useSWR("/api/v1/docs");
//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;
//   return <DisplayData item={data} />;
// }
