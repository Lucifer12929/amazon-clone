import { DialogTitle } from '@material-ui/core';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import React, { useState ,useEffect} from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link,useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'
import axios from 'axios';

function Payment() {
    const history=useHistory();
    const [{basket,user},dispatch]=useStateValue();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]);

    console.log('The secret is>>>',clientSecret);

    const stripe=useStripe();
    const elements=useElements();

    const handleSubmit=async (event)=>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: elements.getElement(CardElement)
          }
    }).then(({paymentIntent})=>{
      setSucceeded(true);
      setError(null);
      setProcessing(false)
      history.replaceState('./orders')
    })
  }

    const handleChange=event=>{
      setDisabled(event.empty);
      setError(event.error?event.error.message:"");
    }


    return (
        <div className="payment">
            <div className='payment_container'>
                <h1>
                    Checkout ({<Link to='/checkout'>{basket?.length} items</Link>})
                </h1>
             <div className='payment_section'>
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                    <p>{user?.email}</p>
                    <p>B-167/F7 Vishram Appartment</p>
                    <p>Dilshad Gardern,Delhi</p>
                </div>
             </div>

             <div className='payment_section'>
                <div className="payment_title">
                  <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
                  {basket.map(item=>(
                      <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                      />

                  ))}
                </div>
             </div>

             <div className='payment_section'>
                <div className="payment_title">
                  <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    <form onSubmit={handleSubmit}>
                      <CardElement onChange={handleChange}/>
                      <div className='payment_priceContainer'>
                      <CurrencyFormat
                         renderText={(value)=>(
                         <>
                           <h3>Order Total:{value}</h3>
                         </>
                      )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType="text"
                    thousandSeparator={true}
                    prefix={"$"}
                    />
                    <button disabled={processing ||
                    disabled || succeeded}>
                      <span>{processing ? <p>Processing</p>:
                      "Buy now"}</span>
                    </button>
                      </div>
                      {error &&<div>{error}</div>}
                    </form>
                </div>



             </div>
            </div>
            
        </div>
    )
}

export default Payment
