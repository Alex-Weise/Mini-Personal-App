import React, { FC } from "react";
import styles from "./styles.module.scss"

type TProps = {
  title: string,
  img: string,
  discr: string,
}

const Card:FC<TProps> = ({title, img, discr}) =>  {
    return (
      <div className={styles.card}>
          <h3 className={styles.title}>{title}</h3>
          <img className={styles.img} src={img} alt={title}></img>
          <p>{discr}</p>
      </div>
    );
}

export default Card;