import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import Cart from './Components/Cart/Cart'
import {useState} from 'react'
import {CartProvider} from "./Store/cart-context";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false)

    const handleShowCart = () => {
        setCartIsShown(true)
    }

    const handleHideCart = () => {
        setCartIsShown(false)
    }

    return (
        <CartProvider>
            {cartIsShown && <Cart onHideCart={handleHideCart}/>}
            <Header onShowCart={handleShowCart}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    )
}

export default App
