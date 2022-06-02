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
      .then(data => setCat(data))
  }, [])
  const [search, setSearch] = React.useState<string>('')
  const [isSerchErr, setIsSearchErr] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('')
  const [products, setProducts] = React.useState<TContent[]>([])
  const [isError, setIsError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [skip, setSkip] = React.useState<number>(0);

  // fetch(`https://dummyjson.com/products?&/search?q=${search}?/category/${category}`)
  // ?limit=${DEFAULT_REQUEST_LIMIT}
  React.useEffect ( () => {
    async function Content() {
    if(!!search) {
      await fetch(`https://dummyjson.com/products/search?q=${search}&limit=${DEFAULT_REQUEST_LIMIT}`)
      .then(response => response.json())
      .then(data => { console.log("Сработал серч", search, data.products);
            setProducts(data.products);
            if(data.products.length === 0 || !data.products) setIsSearchErr("Поиск не дал результатов.");})
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false)) 
    } else if (!!category) {
      await fetch(`https://dummyjson.com/products/category/${category}?limit=${DEFAULT_REQUEST_LIMIT}`)
      .then(response => response.json())
      .then(data => {
            console.log(category, 'Сработали категории');
            setProducts(data.products)
          })
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false)) 
    } else { 
      await fetch(`https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`)
      .then(response => response.json())
      .then(data => { console.log("Сработал Елсе - products", products, "Скип", skip);
         if(products.length === 0 || !products) {
           console.log(products, 'Продуктс === 0')
           setProducts(data.products)}})
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false)) 
    }
  }
  Content()

   return () => {
        setIsSearchErr('');
        setCategory('');
        setSearch('');}
  }, [category, search, skip, products])


//   const [isEndlist, setIsEndlist] = React.useState(false)

//   const handlerscroll = useCallback( () => {
//     const scrollable = document.documentElement.scrollHeight - window.innerHeight;
//     const scrolled = Math.ceil(window.scrollY);
//     console.log(skip, category)

//       if (scrollable === scrolled && !isEndlist && !(!!category) && !(!!serch) ) {
//         setSkip(skip + DEFAULT_REQUEST_LIMIT);
//       }
//       if (skip >= 91) {
//           setSkip(100);
//           setIsEndlist(true)
//         }
// }, [skip, category, isEndlist, serch])

//   React.useEffect ( () => {
//         window.addEventListener('scroll', handlerscroll);
//         return () => window.removeEventListener('scroll', handlerscroll);
//   }, [isEndlist, skip, handlerscroll])

  return (
    <>
      <header className={styles.header}>
        <Header onClick={setSearch} />
      </header>
      <main className={styles.app}>
        <Category categories={categories} onClick={setCategory} />
        <Suspense fallback={<CircularProgress />}>
        <PersonalCard content={products} error={isError} loading={isLoading} serchErr={isSerchErr}/>
        </Suspense>
      </main>
    </>
  );
}

export default App;
