import styles from "./logo.module.css";

export default function Header() {
  const { logoContainer, logoImgContainer } = styles;

  return (
    <div className={logoContainer}>
      <div className={logoImgContainer}>First Logo</div>
      <div className={logoImgContainer}>Second Logo</div>
    </div>
  );
}
