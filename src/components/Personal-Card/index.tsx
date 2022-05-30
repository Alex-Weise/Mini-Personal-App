import React, { useState, useEffect, FC } from "react";
import styles from "./styles.module.scss"
import Card from "./Card"
import { TpropsContent } from "./type.module";

// async function Content () {
//     let response = await fetch('https://dummyjson.com/products/category/motorcycle');
//     let content = await response.json();

//     return JSON.parse(content);
// }
// 'https://dummyjson.com/products/category/motorcycle?select=id,brand,description,images'
// console.log(Content());


const PersonalCard:FC = () => {
  const [content, setContent] = useState<TpropsContent[]>([])

    useEffect( () => {
       fetch('https://dummyjson.com/products?limit=10&skip=20')
                .then(response => response.json())
                .then(obj => setContent(obj.products));
       return setContent([]);
    }, [])

    return (
        <section className={styles.section_card}>
            {content.map( (item) => {
                return (<Card title={item.brand} img={item.images[0]} 
                    discr={item.description} key={item.id}/>)
            })}
        </section>
    );
}

export default PersonalCard;