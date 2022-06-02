import React, { FC } from "react";
import styles from "./styles.module.scss"

type TCard = {
  title: string,
  img: string,
  discr: string,
}

const Card:FC<TCard> = ({title, img, discr}) =>  {
    return (
      <div className={styles.card}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.p}>
          <img className={styles.img} src={img} alt={title}></img>
          {discr}</p>
      </div>
    );
}

export default Card;