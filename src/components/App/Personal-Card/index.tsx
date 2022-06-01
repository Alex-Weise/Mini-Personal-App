import React, { useState, useEffect, FC } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import { TContent } from "../../../type/type";
import CircularProgress from '@mui/material/CircularProgress';

const DEFAULT_REQUEST_LIMIT = 9;

const PersonalCard:FC = () => {
  const [content, setContent] = useState<TContent[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [limit, setLimit] = useState<number>(DEFAULT_REQUEST_LIMIT);
  const [isEndlist, setIsEndlist] = useState(false);

    useEffect( () => {
            fetch(`https://dummyjson.com/products?limit=${limit}`)
                .then(response => response.json())
                .then(obj => setContent(obj.products))
                .catch(error => setIsError(true))
                .finally( () => setIsLoading(false));
    }, [limit])

const handlerscroll = (event:Event) => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.ceil(window.scrollY);
      if (scrollable === scrolled && !isEndlist) {
        setLimit(limit + DEFAULT_REQUEST_LIMIT);
      }
      if (limit >= 100) {
          setLimit(100);
          setIsEndlist(true)
        }
};

    useEffect( () => {
        window.addEventListener('scroll', handlerscroll);
        return () => window.removeEventListener('scroll', handlerscroll);
    }, [isEndlist, limit])

    return (
        <section className={styles.section_card}>
           {isError && <h2>Ошибка зыгрузки</h2>}
           { isLoading ? (<CircularProgress />): 
           (content.map( (item) => {
                return (<Card title={item.brand} img={item.images[0]} 
                    discr={item.description} key={item.id}/>)
            }))}
        </section>
    );
}

export default PersonalCard;