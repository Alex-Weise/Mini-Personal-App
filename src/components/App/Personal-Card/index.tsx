import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import CircularProgress from '@mui/material/CircularProgress';
import { TContent } from "../../../type/type"

type TPersonalCard = {
  URL: string,
  total: Function,
  concatURL: string,
  clearSkip: Function,
};

const PersonalCard:FC<TPersonalCard> = ({URL, total, concatURL, clearSkip}) => {
  const [products, setProducts] = useState<TContent[]>([]);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSerchErr, setIsSearchErr] = React.useState<string>('')

  useEffect ( () => {
    fetch(URL)
      .then(response => response.json())
      .then(data => { 
        if(data.products.length === 0) setIsSearchErr("Поиск не дал результатов")
        else { 
          setProducts(data.products)
          total(data.total);}
      })
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false)) 
    
    return () => {
      clearSkip(9);
      setIsError(false);
      setIsSearchErr('')}
  },[URL])

  useEffect ( () => {
    async function Concat() {
      await fetch(concatURL)
             .then(response => response.json())
             .then(data => setProducts(products.concat(data.products)))
    };
    if (!!concatURL) Concat()

  }, [concatURL])

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