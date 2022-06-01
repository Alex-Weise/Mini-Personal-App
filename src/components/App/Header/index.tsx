import React from "react";
import styles from "./styles.module.scss"

function Header () {
    const [serch, setSerch] = React.useState<string>('');
    const [result, setResult] = React.useState<[]>([])


    const handleSerch = async () => {
        try {
          let response = await fetch(`https://dummyjson.com/products/search?q=${serch}`);
          let product = await response.json();
          setResult(product);
        } catch (err) {
          return "Поиск не дал результатов.";
        }

    }

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
                onChange={(e) => setSerch(e.target.value) }></input>
                <button className={styles.button} 
                 onClick={handleSerch}>Искать</button>
            </div>
        </section>
    );
}

export default Header;