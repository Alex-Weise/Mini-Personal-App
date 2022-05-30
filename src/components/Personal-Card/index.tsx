import React, { useState, useEffect, FC } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import { TpropsContent } from "./type.module";
import CircularProgress from '@mui/material/CircularProgress';
// async function Content () {
//     let response = await fetch('https://dummyjson.com/products/category/motorcycle');
//     let content = await response.json();

//     return JSON.parse(content);
// }
// 'https://dummyjson.com/products/category/motorcycle?select=id,brand,description,images'
// console.log(Content());


const PersonalCard:FC = () => {
  const [content, setContent] = useState<TpropsContent[]>([])
  const [isLoade, setIsLoade] = useState(true);

    useEffect( () => {
       fetch('https://dummyjson.com/products?limit=10&skip=20')
                .then(response => response.json())
                .then(obj => setContent(obj.products))
                .finally( () => setIsLoade(false));
       return setContent([]);
    }, [])

    return (
        <section className={styles.section_card}>
           { isLoade ? (<CircularProgress color="inherit"/>): 
           (content.map( (item) => {
                return (<Card title={item.brand} img={item.images[0]} 
                    discr={item.description} key={item.id}/>)
            }))}
        </section>
    );
}

export default PersonalCard;