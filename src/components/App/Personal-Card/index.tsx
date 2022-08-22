import React, { FC, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import Card from "./Card"
import CircularProgress from '@mui/material/CircularProgress'
import { TContent } from "../../../type/type"
import { DEFAULT_REQUEST_LIMIT } from "../index"
import ItemCard from "./Item"

type TPersonalCard = {
  URL: string,
  setTotal: Function,
  concatURL: string,
  clearSkip: Function,
  changeID: Function,
  itemID: number,
}

const PersonalCard:FC<TPersonalCard> = ({URL, setTotal, concatURL, clearSkip, changeID, itemID}) => {
  const [product, setProduct] = useState<TContent>({} as TContent)
  const [products, setProducts] = useState<TContent[]>([])
  const [isError, setIsError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSerchErr, setIsSearchErr] = React.useState<string>('')

  useEffect ( () => {
    fetch(URL)
      .then(response => response.json())
      .then(data => { 
        if(data.products.length === 0) setIsSearchErr("Поиск не дал результатов")
        else { 
          setProducts(data.products)
          setTotal(data.total);}
      })
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false)) 
    
    return () => {
      clearSkip(DEFAULT_REQUEST_LIMIT);
      setIsError(false);
      setIsSearchErr('');
      changeID(0);
    }
  },[URL, clearSkip, setTotal, changeID])

  useEffect ( () => {
    async function Concat() {
      await fetch(concatURL)
             .then(response => response.json())
             .then(data => setProducts(products.concat(data.products)))
    };
    if (!!concatURL) Concat();

  }, [concatURL, products])

  const GetProductOne = (id:number) => {
    const one = products.find( item => item.id === id);
    changeID(id);
    setProduct(one!);  
  }

  if (isError || isSerchErr) {
   return (<section className={styles.error}>
             {isSerchErr &&<h2>{isSerchErr}</h2>}
             {isError && <h2>Произошла ошибка</h2>}
          </section>)
  }
  return (
        <section className={styles.section_card}>
          {isLoading ? <CircularProgress /> : 
            itemID ? <ItemCard product={product} goBack={changeID} /> :
              products.map( (item) => {
                 return (<Card title={item.brand} img={item.images} id={item.id}
                   discr={item.description} key={item.id} setItemID={GetProductOne}/>)})}
        </section>
      );
}
export default PersonalCard;