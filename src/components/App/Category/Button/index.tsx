import React, {FC} from "react";
import styles from "./styles.module.scss"
import { TButton } from "../../../../type/type";

const Button: FC<TButton> = ({name, onClick}) => {
  const str:string = name[0].toUpperCase() + name.slice(1);

    return (
        <button className={styles.button} onClick={() => onClick(name)} >
         {str}
        </button>
    );
}
export default Button;