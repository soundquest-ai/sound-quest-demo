import React from "react";
import styles from "./home.module.css";
import Link from "next/link";

export default class HomeSearch extends React.Component {
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
          <div className={styles.searchSection}>
            <h1 className={styles.title}>SoundQuest</h1>
            <input
              className={styles.searchInput}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="doesn't work yet... click go"
            />
            <div className={styles.searchBtnContainer}>
              <button className={styles.searchBtn} onClick={this.handleClick}>
                <Link href="/search">Go!</Link>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
