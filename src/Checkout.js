import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from "./Subtotal"

function Checkout() {
    const [{basket,user},dispatch]=useStateValue();
    return (
        <div className="checkout">
            <div className="checkout_left">
               <h3>Hello,{user?.email}</h3>
               <div className="checkout_title">
                   <h2>Your Shopping Basket</h2>
                   {basket.map(item=>(
                       <CheckoutProduct
                       id={item.id}
                       title={item.title}
                       image={item.image}
                       price={item.price}
                       rating={item.rating}/>
                   ))}
               </div>
            </div>

            <div className="checkout_right">
            <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
