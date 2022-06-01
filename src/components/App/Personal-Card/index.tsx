import React, { useState, useEffect, FC } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import CircularProgress from '@mui/material/CircularProgress';
import { TPersonalCard, TContent } from "../../../type/type";


const PersonalCard:FC<TPersonalCard> = ({content, error, loading}) => {

    return (
        <section className={styles.section_card}>
           {error && <h2>Ошибка зыгрузки</h2>}
           { loading ? (<CircularProgress />): 
           content.map( (item) => {
                return (<Card title={item.brand} img={item.images[0]} 
                    discr={item.description} key={item.id}/>)
            })}
        </section>
    );
}

export default PersonalCard;