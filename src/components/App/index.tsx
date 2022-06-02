import React, { Suspense, useCallback } from 'react';
import Category from './Category';
import Header from './Header';
import PersonalCard from './Personal-Card';
import styles from './styles.module.scss';
import { TContent } from "../../type/type"
import CircularProgress from '@mui/material/CircularProgress';

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
  const [catalog, setCatalog] = React.useState<TContent[]>([])

  React.useEffect (() => {
    !!category &&
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then(response => response.json())
        .then(obj => setCatalog(obj.products))
        .catch(err => setIsError(true))
        .finally(() => setIsLoading(false)) 

    return () => setCategory('');
  }, [category])
  const [serch, setSerch] = React.useState<string>('')
  const [isSerchErr, setIsSerchErr] = React.useState<string>('')
  const [skip, setSkip] = React.useState<number>(0);

  React.useEffect ( () => {
    fetch(`https://dummyjson.com/products/search?q=${serch}`)
      .then(response => response.json())
      .then(obj => setCatalog(obj.product))
      .catch(err => setIsError(true))
    catalog?.length && setIsSerchErr("Поиск не дал результатов.")

  }, [serch, catalog])

  React.useEffect ( () => {
    if (!!skip) {
     fetch(`https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`)
      .then(response => response.json())
      .then(obj => setProducts( (state) => state.concat(obj.products)))
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false))
    } else {
      fetch(`https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`)
      .then(response => response.json())
      .then(obj => setProducts(obj.products))
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false))
    }

    return ( () => setProducts( (state) => state))
  }, [skip])

  const [isEndlist, setIsEndlist] = React.useState(false)

  const handlerscroll = useCallback( () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.ceil(window.scrollY);
    console.log(skip, category)

      if (scrollable === scrolled && !isEndlist && !(!!category) && !(!!serch) ) {
        setSkip(skip + DEFAULT_REQUEST_LIMIT);
      }
      if (skip >= 91) {
          setSkip(100);
          setIsEndlist(true)
        }
}, [skip, category, isEndlist, serch])

  React.useEffect ( () => {
        window.addEventListener('scroll', handlerscroll);
        return () => window.removeEventListener('scroll', handlerscroll);
  }, [isEndlist, skip, handlerscroll])

  return (
    <>
      <header className={styles.header}>
        <Header onClick={(str:string) => setSerch(str)} />
      </header>
      <main className={styles.app}>
        <Category categories={categories} onClick={(str:string) => setCategory(str)} />
        <Suspense fallback={<CircularProgress />}>
        <PersonalCard content={products} catalog={catalog} error={isError} loading={isLoading} serchErr={isSerchErr}/>
        </Suspense>
      </main>
    </>
  );
}

export default App;

