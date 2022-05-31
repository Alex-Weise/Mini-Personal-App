import styles from "./styles.module.scss"

type TProps = {
    name: string,
};

function Button(props:TProps) {

    return (
        <button className={styles.button} >
         {props.name}
        </button>
    );
}
export default Button;