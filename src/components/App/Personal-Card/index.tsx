import React, { FC } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import CircularProgress from '@mui/material/CircularProgress';
import { TContent } from "../../../type/type"

type TPersonalCard = {
  content: TContent[],
  error: boolean,
  loading: boolean,
  serchErr: string,
};

const PersonalCard:FC<TPersonalCard> = ({content, error, loading, serchErr}) => {

 if (error || serchErr) {
   return (<section className={styles.error}>
             {serchErr &&<h2>{serchErr}</h2>}
             {error && <h2>Произошла ошибка</h2>}
          </section>)
 }

  return (
        <section className={styles.section_card}>
            { loading ? <CircularProgress /> :
              content.map( (item) => {
                 return (<Card title={item.brand} img={item.images[0]} 
                   discr={item.description} key={item.id}/>)})}
        </section>
    );
}

export default PersonalCard;