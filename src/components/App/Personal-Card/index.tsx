import React, { FC, Suspense, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import Card from "./Card"
import CircularProgress from '@mui/material/CircularProgress'
import { TContent } from "../../../type/type"
import { DEFAULT_REQUEST_LIMIT } from "../index"
import ItemCard from "./Item"

type TPersonalCard = {
  URL: string,
  total: Function,
  concatURL: string,
  clearSkip: Function,
}

const PersonalCard:FC<TPersonalCard> = ({URL, total, concatURL, clearSkip}) => {
  const [product, setProduct] = useState<TContent>(Object)
  const [products, setProducts] = useState<TContent[]>([])
  const [isError, setIsError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSerchErr, setIsSearchErr] = React.useState<string>('')
  const [itemID, setItemID] = useState<number>(0)

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
      clearSkip(DEFAULT_REQUEST_LIMIT);
      setIsError(false);
      setIsSearchErr('')}
  },[URL, clearSkip, total])

  useEffect ( () => {
    async function Concat() {
      await fetch(concatURL)
             .then(response => response.json())
             .then(data => setProducts(products.concat(data.products)))
    };
    if (!!concatURL) Concat();

  }, [concatURL, products])

  // useEffect ( () => {
  //   const GetProductOne = (id:number) => {
  //     const one = products.find( item => item.id === id);
  //     setProduct(one);
  //     console.log(one, "Use Effect")
  //   }
  //   if (itemID > 0) {
  //    GetProductOne(itemID)
  //   }

  //   return () => {setItemID(0)}
  // }, [itemID])
  const GetProductOne = (id:number) => {
    const one = products.find( item => item.id === id);
    setItemID(id);
    // setProduct(one);     // Для проверки!
    console.log(one, "Use Effect")
  }

 if (isError || isSerchErr) {
   return (<section className={styles.error}>
             {isSerchErr &&<h2>{isSerchErr}</h2>}
             {isError && <h2>Произошла ошибка</h2>}
          </section>)
  // } else if (!!itemID) {
  //   return (<section>
  //             <ItemCard product={product} /> 
  //           </section>);
  } else {
     return (
        <section className={styles.section_card}>
          {!!itemID ? <ItemCard product={product} /> : 
              products.map( (item) => {
                 return (<Card title={item.brand} img={item.thumbnail} id={item.id}
                   discr={item.description} key={item.id} setItemID={GetProductOne}/>)})}
        </section>
      );
  }
}
export default PersonalCard;
            // { isLoading ? <CircularProgress /> : 