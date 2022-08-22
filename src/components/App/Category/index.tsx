import React, {FC} from "react";
import { DEFAULT_URL } from "..";
import styles from "./styles.module.scss";


type TCatergory = {
    categories: string[],
    onClick: Function,
    setURL: Function,
}

const Category: FC<TCatergory> =  ({categories, onClick, setURL}) => {

    return (
        <section className={styles.buttons}>
            <button type="button" className={styles.button} onClick={() => setURL(DEFAULT_URL)}>All</button>
         {categories.map( (item:string) => {
            const str:string = item[0].toUpperCase() + item.slice(1);
            return (  
                <button type="button" key={item} className={styles.button} onClick={() => onClick(item)} >
                    {str}
                </button>
            )
          })}
        </section>
    );
}

export default Category;