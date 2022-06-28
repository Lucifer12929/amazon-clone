import React from 'react'
import './CheckoutProduct.css'
import {useStateValue} from "./StateProvider"

function CheckoutProduct({id,image,title,price,rating}) {
    const [{basket},dispatch]=useStateValue();

    const removeFromBasket= () =>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,
        })
    }
    return (
        <div className="checkoutproduct">
            <img className="cop_image" 
            src={image}/>
            <div className="cop_info">
                <p className='cop_title'>{title}</p>
                <p className='cop_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='cop_rating'>
                    {Array(rating)
                    .fill()
                    .map((_,i)=>(
                        <p>*</p>
                    ))}
                </div>
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
            
        </div>
    )
}

export default CheckoutProduct
