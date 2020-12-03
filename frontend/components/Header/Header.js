import styles from "./logo.module.css";

export default function Header() {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoImgContainer}>First Logo</div>
      <div className={styles.logoImgContainer}>Second Logo</div>
    </div>
  );
}
