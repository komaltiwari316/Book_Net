import axios from "axios"
import React, { useEffect, useState } from "react"

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) return

    const cartKey = `cart_${user.id}`
    setCartItems(JSON.parse(localStorage.getItem(cartKey)) || [])
  }, [])

  const saveCart = (cart) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) return

    // const cartKey = `cart_${user.id}`
    // localStorage.setItem(cartKey, JSON.stringify(cart))
    // window.dispatchEvent(new Event("cartUpdated"))

    // const userId = user.id 
    const cartkey = `cart_${user.id}`
    localStorage.setItem(cartkey, JSON.stringify(cart))
  }

  const increaseQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartItems(updated)
    saveCart(updated)
  }

  const decreaseQty = (id) => {
    const updated = cartItems
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)

    setCartItems(updated)
    saveCart(updated)
  }

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id)
    setCartItems(updated)
    saveCart(updated)
  }

  const handleOrder = async (itemToOrder) => {
    const user=JSON.parse(localStorage.getItem("user"))
    if(!user){
      alert("please login first")
      return
    }

    const userId=user.id
    const cartkey=`cart_${userId}`
    const cart=JSON.parse(localStorage.getItem(cartkey)) || []

    if(cart.length===0){
      alert("cart is empty")
      return
    }

    const orderData={
      userid:user.id,
      userName:user.fullName,
      userEmail:user.email,
      userPhoneNum:user.phoneNumber, 

      items:[
        {
          bookName:itemToOrder.title,
          quantity:itemToOrder.quantity,
          price:itemToOrder.price
        }
      ],
      totalAmount:itemToOrder.price * itemToOrder.quantity
    }

    try {
      await axios.post("http://localhost:8080/orders/place", orderData)
      alert("order placed successfully")

    } catch (error) {
      console.log("Order failed")
      alert("Order failed")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map(item => (
        <div key={item.id} style={{ display: "flex", gap: 20, marginBottom: 15 }}>
          <img src={item.image} width="100" alt="" />
          <div>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>

            <button onClick={() => decreaseQty(item.id)}>-</button>
            <b style={{ margin: "0 10px" }}>{item.quantity}</b>
            <button onClick={() => increaseQty(item.id)}>+</button>

            <p>Total: ₹{item.price * item.quantity}</p>

            <button onClick={() => removeItem(item.id)}>Remove</button>
            <button onClick={() => handleOrder(item)}>
              order
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cart
