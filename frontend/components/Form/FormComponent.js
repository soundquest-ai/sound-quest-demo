import styles from "./form.module.css";

export default function FormComponent(props) {
  return (
    <form>
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
        </div>
        <div className={styles.searchSide}></div>
      </div>
    </form>
  );
}
