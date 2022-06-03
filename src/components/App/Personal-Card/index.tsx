import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import CircularProgress from '@mui/material/CircularProgress';
import { TContent } from "../../../type/type"

type TPersonalCard = {
  URL: string,
};

const PersonalCard:FC<TPersonalCard> = ({URL}) => {
  const [products, setProducts] = useState<TContent[]>([]);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSerchErr, setIsSearchErr] = React.useState<string>('')

  useEffect ( () => {
    fetch(URL)
      .then(response => response.json())
      .then(data => { 
        if(data.products.length === 0) setIsSearchErr("Поиск не дал результатов")
        else setProducts(data.products)})
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false)) 
    
    return () => {
      setIsError(false);
      setIsSearchErr('')}
  },[URL])

 if (isError || isSerchErr) {
   return (<section className={styles.error}>
             {isSerchErr &&<h2>{isSerchErr}</h2>}
             {isError && <h2>Произошла ошибка</h2>}
          </section>)
  } else {
     return (
        <section className={styles.section_card}>
            { isLoading ? <CircularProgress /> :
              products.map( (item) => {
                 return (<Card title={item.brand} img={item.images[0]} 
                   discr={item.description} key={item.id}/>)})}
        </section>
      );
  }
}

export default PersonalCard;