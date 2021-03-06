import React, {FC} from "react";
import Button from "./Button";
import styles from "./styles.module.scss";


type TCatergory = {
    categories: string[],
    onClick: Function,
}

const Category: FC<TCatergory> =  ({categories, onClick}) => {

    return (
        <section className={styles.buttons}>
         {categories.map( (item:string, index) => {
             return <Button name={item} key={index} onClick={(str:string) => onClick(str)} />
          })}
        </section>
    );
}

export default Category;