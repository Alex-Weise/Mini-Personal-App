import React, { Suspense } from 'react';
import Category from './Category';
import Header from './Header';
import PersonalCard from './Personal-Card';
import styles from './styles.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Collapse } from '@mui/material';
import heart from "../../icon-heart.png";



export const DEFAULT_REQUEST_LIMIT = 12;
export const DEFAULT_URL = `https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`;

function App() {
  const [categories, setCat] = React.useState<string[]>([])
  const [isHide, setIsHide] = React.useState(true)

  React.useEffect( () => {
    fetch('https://dummyjson.com/products/categories')
      .then(response => response.json())
      .then(data => setCat(data))
  }, [])

  const [search, setSearch] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('')
  const [skip, setSkip] = React.useState<number>(DEFAULT_REQUEST_LIMIT)
  const [URL, setURL] = React.useState<string>(DEFAULT_URL)
  const [total, setTotal] = React.useState<number>(0)
  const [concatURL, setConcatURL] = React.useState<string>(``)

  React.useEffect ( () => {
    if (!!search) {
      setURL(`https://dummyjson.com/products/search?q=${search}&limit=${DEFAULT_REQUEST_LIMIT}`)
    }
    return () => {
      setSearch('')
      setTotal(0)
    }
  }, [search])

  React.useEffect ( () => {
    if(!!category) {
      setURL(`https://dummyjson.com/products/category/${category}?limit=${DEFAULT_REQUEST_LIMIT}`)
    }
    return () => {
      setCategory('')
    }
  }, [category])

  React.useEffect ( () => {
    const handlerscroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.ceil(window.scrollY);
       if (scrolled === scrollable) {
          setSkip(skip + DEFAULT_REQUEST_LIMIT)
          setConcatURL(URL + `&skip=${skip}`)
        }
  }
    if (total > 9 && !(skip >= total)) {
        window.addEventListener('scroll', handlerscroll)
    }
    return () => {
      window.removeEventListener('scroll', handlerscroll)
      setConcatURL(``)
    }
    
  }, [skip, total, URL])
  
  return (
    <>
      <header className={styles.header}>
        <Header onClick={setSearch} setURL={setURL} total={total}
          setIsHide={setIsHide} isHide={isHide} />
      </header>
      <main className={styles.app}>
        <Collapse orientation="horizontal" in={!isHide}>
           <Category categories={categories} onClick={setCategory} />
        </Collapse>
        <Suspense fallback={<CircularProgress />}>
          <PersonalCard URL={URL} total={setTotal} concatURL={concatURL} 
            clearSkip={setSkip}/>
        </Suspense>
      </main>
      <footer className={styles.footer}> 
        <div className={styles.foottext}>С заботой о природе.<img className={styles.img} src={heart} alt="Heart"/> 2022</div>
      </footer>
    </>
  );
}

export default App;
