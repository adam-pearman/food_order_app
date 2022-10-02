import classes from './Checkout.module.css'
import {useRef, useState} from "react";

const isNotEmpty = value => value.trim() !== ''

const isPostcodeLength = value => value.replace(' ', '').length > 5 && value.replace(' ', '').length < 8

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postCode: true,
        city: true,
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postCodeInputRef = useRef()
    const cityInputRef = useRef()

    const handleSubmit = event => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostCode = postCodeInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const isEnteredNameValid = isNotEmpty(enteredName)
        const isEnteredStreetValid = isNotEmpty(enteredStreet)
        const isEnteredPostCodeValid = isPostcodeLength(enteredPostCode)
        const isEnteredCityValid = isNotEmpty(enteredCity)

        setFormInputsValidity({
            name: isEnteredNameValid,
            street: isEnteredStreetValid,
            postCode: isEnteredPostCodeValid,
            city: isEnteredCityValid,
        })

        const isFormValid = isEnteredNameValid && isEnteredStreetValid && isEnteredPostCodeValid && isEnteredCityValid

        if (!isFormValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postCode: enteredPostCode,
            city: enteredCity,
        })
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={`${classes.control} ${!formInputsValidity.name && classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.street && classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.postCode && classes.invalid}`}>
                <label htmlFor="post-code">Post Code</label>
                <input type="text" id="post-code" ref={postCodeInputRef}/>
                {!formInputsValidity.postCode && <p>Please enter a valid post code (6-7 characters long).</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.city && classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please enter a valid city.</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit} type="submit">Confirm</button>
            </div>
        </form>
    )
}

export default Checkout