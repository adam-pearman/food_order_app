import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import {useCartContext} from '../../../Store/cart-context'

const MealItem = (props) => {
    const cartContext = useCartContext()

    const price = `£${props.price.toFixed(2)}`

    const handleAddToCart = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={handleAddToCart}/>
            </div>
        </li>
    )
}

export default MealItem