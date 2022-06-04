import React, { FC, useState } from "react";
import styles from "./styles.module.scss"
import { DEFAULT_URL } from "../../App"

type THeader = {
    onClick: Function,
    setURL: Function,
    setIsHide: Function,
    total: number,
    isHide: boolean,
}

const Header:FC<THeader> =  ({onClick, setURL, total, setIsHide, isHide}) => {
  const [value, setValue] = useState<string>('');
console.log(isHide);
    return (
        <section className={styles.head}>
            <div className={styles.category} onClick={
                () => isHide ? setIsHide(false) : setIsHide(true)}>
               <h3 className={styles.p}> Категории: </h3>
            </div>
            <div className={styles.titles} onClick={() => setURL(DEFAULT_URL)} >
                <h2 className={styles.title}>Собственно товары</h2>
                <h3 className={styles.total}>Всего {total}</h3>
            </div>
            <div className={styles.onserch}>
                <input type='text' placeholder='Поиск...' size={30} id="inputSearch"
                onChange={(e) => setValue(e.target.value)} value={value}></input>
                <button type="reset" onClick={ () => setValue('')}>X</button>
                <button className={styles.button} 
                 onClick={(e) => onClick(value)}>Искать</button>
            </div>
        </section>
    );
}

export default Header;