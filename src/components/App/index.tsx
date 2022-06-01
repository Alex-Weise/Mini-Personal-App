import React from 'react';
import Category from './Category';
import Header from './Header';
import PersonalCard from './Personal-Card';
import styles from './styles.module.scss';
import { TContent } from "../../type/type"

const DEFAULT_REQUEST_LIMIT = 9;

function App() {
  const [categories, setCat] = React.useState<string[]>([]);

  React.useEffect( () => {
    fetch('https://dummyjson.com/products/categories')
      .then(response => response.json())
      .then(obj => setCat(obj))
  }, [])

  const [category, setCategory] = React.useState<string>('')
  const [products, setProducts] = React.useState<TContent[]>([])
  const [isError, setIsError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
//!(!!products.find( item => item.category === category))
  React.useEffect (() => {
    !!category &&
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then(response => response.json())
        .then(obj => setProducts(obj.products))
        .catch(err => setIsError(true))
        .finally(() => setIsLoading(false)) 

    return () => setCategory('');
  }, [category])

  const [limit, setLimit] = React.useState<number>(DEFAULT_REQUEST_LIMIT);

  React.useEffect ( () => {
    fetch(`https://dummyjson.com/products?limit=${limit}`)
      .then(response => response.json())
      .then(obj => setProducts(obj.products))
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [limit])

  const [isEndlist, setIsEndlist] = React.useState(false)

  React.useEffect ( () => {
        window.addEventListener('scroll', handlerscroll);
        return () => window.removeEventListener('scroll', handlerscroll);
  }, [isEndlist, limit])

  const handlerscroll = (event:Event) => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.ceil(window.scrollY);
      if (scrollable === scrolled && !isEndlist && !!category) {
        setLimit(limit + DEFAULT_REQUEST_LIMIT);
        console.log(limit)
      }
      if (limit >= 100) {
          setLimit(100);
          setIsEndlist(true)
        }
}

  return (
    <>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.app}>
        <Category categories={categories} onClick={(str:string) => setCategory(str)} />
        <PersonalCard content={products} error={isError} loading={isLoading}
        />
      </main>
    </>
  );
}

export default App;

