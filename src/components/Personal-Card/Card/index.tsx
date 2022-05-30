import React, { FC } from "react";
import styles from "./styles.module.scss"

type TProps = {
  title: string,
  img: string,
  href: string,
}

const Card:FC<TProps> = ({title, img, href}) =>  {
    return (
      <div className={styles.card}>
          <h3 className={styles.title}>{title}</h3>
          <img className={styles.img} src={img} alt={title}></img>
          <a href={href}>{title}</a>
      </div>
    );
}

export default Card;