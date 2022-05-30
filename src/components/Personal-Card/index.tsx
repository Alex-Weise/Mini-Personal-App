import React from "react";
import styles from "./styles.module.scss"
import Card from "./Card"

async function Content () {
    let response = await fetch('https://dummyjson.com/products/category/motorcycle');
    let content = await response.json();
    return content;
}
console.log(Content());

const PersonalCard = () => {
    return (
        <section className={styles.section_card}>
        </section>
    );
}
export default PersonalCard;