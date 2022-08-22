import React, { FC, useState } from "react";
import styles from "./styles.module.scss"
import { DEFAULT_URL } from "../../App"

type THeader = {
    onClick: Function,
    setURL: Function,
    setIsHide: Function,
    total: number,
    isHide: boolean,
    changeID: Function,
}

const Header:FC<THeader> =  ({onClick, setURL, total, setIsHide, isHide, changeID}) => {
  const [value, setValue] = useState<string>('');

    return (
        <section className={styles.head}>
            <div className={styles.category} 
              onClick={ () => isHide ? setIsHide(false) : setIsHide(true)}>
                <h3 className={styles.p}> Категории </h3>
            </div>
            <div className={styles.titles} onClick={() => {setURL(DEFAULT_URL); changeID(0)}} >
                <h2 className={styles.title}>Собственно товары</h2>
                <h3 className={styles.total}>Всего <i>{total}</i></h3>
            </div>
            <div className={styles.serch} >
                <input className={styles.input} type='text' placeholder='Поиск...' id="inputSearch"
                onChange={(e) => setValue(e.target.value)} value={value}></input>
                <button className={!!value ? styles.buttonX : styles.hide} type="button" 
                  onClick={() => {
                    setValue('');
                    setURL(DEFAULT_URL)
                  }}>X</button>
              <button className={styles.button} type="button"
                 onClick={() => onClick(value)}>Искать</button>
           </div>
        </section>
    );
}

export default Header;