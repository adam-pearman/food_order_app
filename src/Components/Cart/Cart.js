import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import {useCartContext} from '../../Store/cart-context'
import CartItem from './CartItem'

const Cart = (props) => {
    const cartContext = useCartContext()

    const handleAddCartItem = (item) => {
        cartContext.addItem({...item, amount: 1})
    }

    const handleRemoveCartItem = (id) => {
        cartContext.removeItem(id)
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

    const totalPrice = `£${cartContext.totalAmount.toFixed(2)}`

    const hasItems = cartContext.items.length > 0

    return (
        <Modal onClose={props.onHideCart}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button-alt']} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart