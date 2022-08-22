import React, {FC} from "react";
import styles from "./styles.module.scss";


type TCatergory = {
    categories: string[],
    onClick: Function,
}

const Category: FC<TCatergory> =  ({categories, onClick}) => {

    return (
        <section className={styles.buttons}>
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