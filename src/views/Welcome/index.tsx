import React, { FC } from "react";
import styles from "./index.module.less";

const Welcome: FC = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React18通用后台管理系统</div>
        <div className={styles.desc}>
          React18+ReactRouter5.0+AntD5.4+TypeScript5.0+Vite实现通用后台
        </div>
      </div>

      <div className={styles.img}></div>
    </div>
  );
};

export default Welcome;
