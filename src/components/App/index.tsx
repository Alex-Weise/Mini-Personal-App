import React, { Suspense } from 'react';
import Category from './Category';
import Header from './Header';
import PersonalCard from './Personal-Card';
import styles from './styles.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

const DEFAULT_REQUEST_LIMIT = 9;

function App() {
  const [categories, setCat] = React.useState<string[]>([]);

  React.useEffect( () => {
    fetch('https://dummyjson.com/products/categories')
      .then(response => response.json())
      .then(data => setCat(data))
  }, [])

  const [search, setSearch] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const [skip, setSkip] = React.useState<number>(0);
  const [URL, setURL] = React.useState<string>(`https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`);
  
  React.useEffect ( () => {
    if (!!search) {
      // console.log("setURL(Search)");
      setURL(`https://dummyjson.com/products/search?q=${search}&limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`);
    } else {
      // console.log("setURL(Products)");
      setURL(`https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`);
    }
  }, [search, skip])

  React.useEffect ( () => {
    if(!!category) {
      // console.log("setURL(Category)");
      setURL(`https://dummyjson.com/products/category/${category}?limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`);
    } else {
      // console.log("setURL(Products)");   
      setURL(`https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`);
    }
  }, [category, skip])


  // React.useEffect ( () => {
  //   async function Content() {
  //   if(!!search) {
  //     await fetch(`https://dummyjson.com/products/search?q=${search}&limit=${DEFAULT_REQUEST_LIMIT}`)
  //     .then(response => response.json())
  //     .then(data => { console.log("Сработал серч", search, data.products);
  //           setProducts(data.products);
  //           if(data.products.length === 0 || !data.products) setIsSearchErr("Поиск не дал результатов.");})
  //     .catch(err => setIsError(true))
  //     .finally(() => setIsLoading(false)) 
  //   } else if (!!category) {
  //     await fetch(`https://dummyjson.com/products/category/${category}?limit=${DEFAULT_REQUEST_LIMIT}`)
  //     .then(response => response.json())
  //     .then(data => {
  //           console.log(category, 'Сработали категории');
  //           setProducts(data.products)
  //         })
  //     .catch(err => setIsError(true))
  //     .finally(() => setIsLoading(false)) 
  //   } else { 
  //     await fetch(`https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`)
  //     .then(response => response.json())
  //     .then(data => { console.log("Сработал Елсе - products", products, "Скип", skip);
  //        if(products.length === 0 || !products) {
  //          console.log(products, 'Продуктс === 0')
  //          setProducts(data.products)}})
  //     // } else {setProducts( (prevState) => {
  //     //   console.log(prevState, 'предыдущее состояние');
  //     //   return prevState.concat(data.products)})}
  //     //   })
  //     .catch(err => setIsError(true))
  //     .finally(() => setIsLoading(false)) 
  //   }
  // }
  // Content()

  //  return () => {
  //       setIsSearchErr('');
  //       setCategory('');
  //       setSearch('');}
  // }, [category, search, skip, products])


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

console.log(URL)

  return (
    <>
      <header className={styles.header}>
        <Header onClick={setSearch} />
      </header>
      <main className={styles.app}>
        <Category categories={categories} onClick={setCategory} />
        <Suspense fallback={<CircularProgress />}>
        <PersonalCard URL={URL} />
        </Suspense>
      </main>
    </>
  );
}

export default App;
