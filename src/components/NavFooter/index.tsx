import React, { FC } from "react";
import styles from "./index.module.less";

const NavFooter: FC = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a
          href="https://github.com/WwLuo-1024"
          target="_blank"
          rel="noreferrer"
        >
          Github Page
        </a>
        <span className="gutter">|</span>
        <a
          href="https://www.linkedin.com/in/luo-wang-720a30225/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn Page
        </a>
      </div>
      <div>Copyright ©2023 React18通用后台 All Rights Reserved.</div>
    </div>
  );
};

export default NavFooter;
