import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import {useCartContext} from '../../Store/cart-context'
import CartItem from './CartItem'
import Checkout from "./Checkout";
import {useState} from "react";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartContext = useCartContext()

    const totalPrice = `£${cartContext.totalAmount.toFixed(2)}`

    const hasItems = cartContext.items.length > 0

    const handleAddCartItem = (item) => {
        cartContext.addItem({...item, amount: 1})
    }

    const handleRemoveCartItem = (id) => {
        cartContext.removeItem(id)
    }

    const handleOrder = () => {
        setIsCheckout(true)
    }

    const handleSubmitOrder = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://react-food-order-2e9c3-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartContext.items,
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartContext.clearCart()
    }

    const cartItems = cartContext.items.map(item =>
        <CartItem key={item.id}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                  onAdd={() => handleAddCartItem(item)}
                  onRemove={() => handleRemoveCartItem(item.id)}
        />
    )

    const modalActions =  (
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={handleOrder}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={handleSubmitOrder}/>}
            {!isCheckout && modalActions}
        </>
    )

    const isSubmittingModalContent = (
        <p>Sending order data...</p>
    )

    const didSubmitModalContent = (
        <>
            <p>Order Successful!</p>
            <div className={classes.actions}>
                <button className={classes['button']} onClick={props.onHideCart}>Close</button>
            </div>
        </>
    )

    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart