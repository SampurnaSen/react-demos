import {useState } from 'react'
import Button from '../Button'
import styles from "./SimpleForm.module.css"

const SimpleInput = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
        setEnteredNameIsValid(true);
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if(enteredName.trim() === "") {
            setEnteredNameIsValid(false);
            return;
        }
        setEnteredName("");
        setEnteredNameIsValid(true);
    };

    const formStyles = enteredNameIsValid ? `${styles["form-control"]}` : `${styles["form-control"]} ${styles["invalid"]}}`

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={formStyles}>
                <label htmlFor="name">Your Name</label>
                <input 
                    type="text"
                    id="name"
                    value={enteredName}
                    onChange={nameInputChangeHandler}
                />
                {!enteredNameIsValid && (<p className={styles["error-text"]}>Name field must not be empty</p>)}
            </div>
            <div className={styles["form-actions"]}>
                <Button>Submit</Button>
            </div>
        </form>
    )

}

export default SimpleInput