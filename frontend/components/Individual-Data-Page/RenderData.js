import React from "react";
import Link from "next/link";
// import Player from "./Player";

export default class Data extends React.Component {
  render() {
    return (
      <div>
        <Link href="/">
          <div
            style={{
              padding: 10,
              color: "blue",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            Home
          </div>
        </Link>

        <Link style={{ margin: 10 }} href="/search">
          <div
            style={{
              padding: 10,
              color: "blue",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            Search
          </div>
        </Link>
        <h1>Hello World</h1>
      </div>
    );
  }
}
