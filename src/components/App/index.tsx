import React from 'react';
import PersonalCard from '../Personal-Card';
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <h2>Каталог товаров: </h2>
      <PersonalCard />
    </div>
  );
}

export default App;
