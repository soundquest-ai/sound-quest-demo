import React from "react";
import styles from "./form.module.css";
import DisplayData from "./ShowData";
import useSWR from "swr";

export default class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  search() {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR("/api/v1/docs", fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return <DisplayData item={data} />;
  }

  // handleSubmit(){
  //   this.setState({

  //   })
  // }

  handleChange() {
    this.setState({
      [name]: value,
    });
  }

  render() {
    // const requests = this.state.search.map((item) => (
    //   <DisplayData key={item.id} item={item} handleChange={this.handleChange} />
    // ));

    return (
      <div className={styles.searchContainer}>
        <div className={styles.searchMain}>
          <select className={styles.searchSelect}>
            <option>----</option>
            <option>Page Numbers go here</option>
          </select>
          <input
            className={styles.searchInput}
            type="text"
            name="search"
            placeholder="search"
          />
          <button className={styles.searchBtn}>Go!</button>
          {/* <div>{requests}</div> */}
        </div>
        <div className={styles.searchSide}></div>
      </div>
    );
  }
}
