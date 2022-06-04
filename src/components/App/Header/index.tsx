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

    return (
        <section className={styles.head}>
            <div className={styles.category} onClick={
                () => isHide ? setIsHide(false) : setIsHide(true)}>
               <h3 className={styles.p}> Категории </h3>
            </div>
            <div className={styles.titles} onClick={() => setURL(DEFAULT_URL)} >
                <h2 className={styles.title}>Собственно товары</h2>
                <h3 className={styles.total}>Всего {total}</h3>
            </div>
            <form className={styles.serch} >
              <p className={styles.input}>
                <input type='text' placeholder='Поиск...' size={25} id="inputSearch"
                onChange={(e) => setValue(e.target.value)} value={value}></input>
                <span className={!!value ? styles.buttonX : styles.hide}>
                  <input className={styles.buttonX} type="reset" onClick={ () => setValue('')}
                  value="X"></input>
                </span>
              </p>
              <p>
              <input className={styles.button} value="Искать" type="button"
                 onClick={(e) => {
                     onClick(value)}}></input>
              </p>
           </form>
        </section>
    );
}

export default Header;