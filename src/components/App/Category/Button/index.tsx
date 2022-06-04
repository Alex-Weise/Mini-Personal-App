import React, {FC} from "react";
import styles from "./styles.module.scss"

type TButton = {
  name: string,
  onClick: Function,
}

const Button: FC<TButton> = ({name, onClick}) => {
  const str:string = name[0].toUpperCase() + name.slice(1);

    return (
        <button className={styles.button} 
        onClick={() => onClick(name)} >
         {str}
        </button>
    );
}
export default Button;