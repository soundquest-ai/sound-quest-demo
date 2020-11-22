import React from "react";
import Link from 'next/link'
import styles from "./form.module.css";
import stylesTwo from "./data.module.css";
import useSWR from "swr";
import Player from "./Player";

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", search: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ search: this.state.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.searchContainer}>
          <div className={styles.searchMain}>
            <input
              className={styles.searchInput}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="search"
            />
            <button onClick={this.handleClick} className={styles.searchBtn}>
              Go!
            </button>
            <Data value={this.state.search} />
          </div>
        </div>
      </form>
    );
  }
}

function Data(props) {
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
    ) :
      <DisplayData key={item.id} title={item.title} document_id={item.id} />

    );
  return <div>{dataComponents}</div>;
}

function DisplayData(props) {
  const date = new Date();
  return (
    <div className={stylesTwo.container}>
      <div>
          <h3>Response: <Link href={`/docs/${encodeURIComponent(props.document_id)}`}>{props.title}</Link></h3>
        <h3>Time: {date.toLocaleDateString()}!</h3>

      </div>
      <Player document_id={props.document_id} />
    </div>
  );
}
