import React, { FC, Suspense } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import CircularProgress from '@mui/material/CircularProgress';
import { TPersonalCard } from "../../../type/type";


const PersonalCard:FC<TPersonalCard> = ({content, error, loading, serchErr, catalog}) => {
console.log(content)
    return (

        <section className={styles.section_card}>
            {error && <h2 className={styles.error}>{serchErr}</h2>}
            <Suspense fallback={<CircularProgress />}>
              {catalog?.length > 0 ? 
              catalog.map( (item) => {
                 return (<Card title={item.brand} img={item.images[0]} 
                   discr={item.description} key={item.id}/>)}) :
              content.map( (item) => {
                 return (<Card title={item.brand} img={item.images[0]} 
                   discr={item.description} key={item.id}/>)})}
            </Suspense>
        </section>
    );
}

export default PersonalCard;