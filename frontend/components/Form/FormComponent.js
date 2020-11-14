import styles from "./form.module.css";

import Search from "./ShowData";

export default function FormComponent(props) {
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
          name={props.data.name}
          placeholder="search"
        />
        <button className={styles.searchBtn}>Go!</button>
        <Search />
      </div>
      <div className={styles.searchSide}></div>
    </div>
  );
}
