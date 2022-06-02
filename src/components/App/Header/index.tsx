import React, { FC, useState } from "react";
import styles from "./styles.module.scss"
import { THeader } from "../../../type/type";

const Header:FC<THeader> =  ({onClick}) => {
  const [value, setValue] = useState<string>('')


    return (
        <section className={styles.head}>
            <div className={styles.category}>
               <h3 className={styles.p}> Категории: </h3>
            </div>
            <div className={styles.titles}>
                <h2 className={styles.title}>Собственно товары</h2>
            </div>
            <div className={styles.onserch}>
                <input type='text' placeholder='Поиск...' size={30} 
                onChange={(e) => setValue(e.target.value) }></input>
                <button className={styles.button} 
                 onClick={() => onClick(value)}>Искать</button>
            </div>
        </section>
    );
}

export default Header;