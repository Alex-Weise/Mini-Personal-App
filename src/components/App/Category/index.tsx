import React from "react";
import Button from "./Button";
import styles from "./styles.module.scss";

function Category () {
    const [categories, setCat] = React.useState([]);

    React.useEffect( () => {
        fetch('https://dummyjson.com/products/categories')
          .then(response => response.json())
          .then(obj => setCat(Array.from(obj)))
    }, [])


    return (
        <section className={styles.buttons}>
         {categories.map( (item:string, index) => {
             let str = item[0].toUpperCase() + item.slice(1);
             return <Button name={str} key={index} />
          })}
        </section>
    );
}

export default Category;