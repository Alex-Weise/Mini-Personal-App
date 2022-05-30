import React from "react";
import styles from "./styles.module.scss"
import Card from "./Card"


const CONTENT = [
    {title: 'BERGMUND БЕРГМУНД',
     img: 'https://www.ikea.com/ru/ru/images/products/bergmund-stul-barnyy-chernyy-hallarp-bezhevyy__0926462_pe789249_s5.jpg?f=xl',
     href: 'https://www.ikea.com/ru/ru/p/bergmund-bergmund-stul-barnyy-chernyy-hallarp-bezhevyy-s09388105/',
     id: 1,
    },
];

const PersonalCard = () => {
    return (
        <section className={styles.section_card}>
            <Card title={CONTENT[0].title} img={CONTENT[0].img} href={CONTENT[0].href} />
            <Card title={CONTENT[0].title} img={CONTENT[0].img} href={CONTENT[0].href} />
            <Card title={CONTENT[0].title} img={CONTENT[0].img} href={CONTENT[0].href} />
            <Card title={CONTENT[0].title} img={CONTENT[0].img} href={CONTENT[0].href} />
        </section>
    );
}
export default PersonalCard;