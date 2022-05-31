import React from 'react';
import Category from './Category';
import Header from './Header';
import PersonalCard from './Personal-Card';
import styles from './styles.module.scss';

function App() {
  return (
    <>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.app}>
        <Category />
        <PersonalCard />
      </main>
    </>
  );
}

export default App;
