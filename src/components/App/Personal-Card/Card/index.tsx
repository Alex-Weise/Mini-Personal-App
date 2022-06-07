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
          <div className={styles.image}>
            <img src={img} alt={title} className={styles.img}></img>
          </div>
          <span className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.p}>
          {discr}</p>
          </span>
        </div>
    );
}

export default Card;

// style={{
//   backgroundImage: `url(${img})`,
//   backgroundSize: `contain`,
//   backgroundPosition: `center`,
//   backgroundRepeat: `no-repeat`,
//  }}