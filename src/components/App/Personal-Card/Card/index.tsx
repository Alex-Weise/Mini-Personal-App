import React, { FC } from "react";
import styles from "./styles.module.scss"

type TCard = {
  title: string,
  img: string,
  discr: string,
  setItemID: Function,
  id:number,
}

const Card:FC<TCard> = ({title, img, discr, setItemID, id}) =>  {
    return (
      <div className={styles.card} onClick={() => setItemID(id)}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.p}>
          <img className={styles.img} src={img} alt={title}></img>
          {discr}</p>
      </div>
    );
}

export default Card;