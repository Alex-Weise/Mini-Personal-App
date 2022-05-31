import React, { useState, useEffect, FC } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import { TContent } from "../../../type/type";
import CircularProgress from '@mui/material/CircularProgress';


const PersonalCard:FC = () => {
  const [content, setContent] = useState<TContent[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [limit, setLimit] = useState<number>(9);

    useEffect( () => {
            fetch(`https://dummyjson.com/products?limit=${limit}`)
                .then(response => response.json())
                .then(obj => setContent(obj.products))
                // .catch(error => setIsError(true))
                .finally( () => setIsLoading(false));
    }, [limit])
// console.log(isError)

const handlerscroll = (event:Event) => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.ceil(window.scrollY);
    console.log(scrollable, "document - inner", scrolled);
    for (let i=0; i <= 11; i++) {
      if (scrollable === scrolled) {
        // if (limit >= 100) {
        //    setLimit(100);
        //    break;
        // };
        console.log('scroll');
        setLimit(limit + 9);
      }
    }
};

    useEffect( () => {
        window.addEventListener('scroll', handlerscroll);

    //   return window.removeEventListener('scroll', handlerscroll);
    }, [])

    return (
        <section className={styles.section_card}>
           {/* {isError && <h2>{isError}</h2>} */}
           { isLoading ? (<CircularProgress />): 
           (content.map( (item) => {
                return (<Card title={item.brand} img={item.images[0]} 
                    discr={item.description} key={item.id}/>)
            }))}
        </section>
    );
}

export default PersonalCard;