import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import {useCartContext} from "../../Store/cart-context";
import {useEffect, useState} from "react";

const HeaderCartButton = (props) => {
    const [isButtonHighlighted, setIsButtonHighlighted] = useState(false)
    const cartContext = useCartContext()

    const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)

    const {items} = cartContext

    const buttonClasses = `${classes.button} ${isButtonHighlighted && classes.bump}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setIsButtonHighlighted(true)

        const timer = setTimeout(() => {
            setIsButtonHighlighted(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton