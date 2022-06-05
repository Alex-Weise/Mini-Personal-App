import React, { FC, useState } from "react";
import { TContent } from "../../../../type/type";
import styles from "./styles.module.scss";
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

type TItem = {
    product: TContent,
}

const ItemCard:FC<TItem> = ({product}) => {
  const [imageURL, setImageURL] = useState<string>(product.thumbnail)

    return (
        <section className={styles.page}>
            <div className={styles.title}>
                <h2>{product.title}</h2>
                <h3 className={styles.price}>Price {product.price}$</h3>
            </div>
            <div className={styles.image}>
              <div className={styles.img_buttons}>
                  { product.images.map( (item, index) => {
                     return (<button type="button" key={index + 1} className={styles.button}
                      onClick={ () => setImageURL(item) }>{index + 1}</button>)})
                  }
              </div>
              <div className={styles.img}>
                  <img className={styles.img} src={imageURL} alt={product.title}></img>
              </div>
              <div className={styles.rating}>
                  <Typography component="legend">Рейтинг продукта {product.rating}</Typography>
                     <StyledRating
                        name="read-only"
                        defaultValue={product.rating}
                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={0.1}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
              </div>
            </div>
            <div className={styles.descr}>
                <p>{product.description}</p>
            </div>
        </section>
    );
}

export default ItemCard;