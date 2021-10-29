import styles from './Input.module.css'
function Input({ type, text, name, placehoder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input required
                id={name}
                type={type}
                name={name}
                placeholder={placehoder}
                onChange={handleOnChange}
                value={value}>
            </input>
        </div>
    )
}
export default Input;