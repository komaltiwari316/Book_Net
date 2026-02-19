import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BodyPart = ({ category,search }) => {
  const [books, setBooks] = useState([])

  useEffect(()=>{
    const url= search ? `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20` : `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=20`

    axios.get(url).then(res=>setBooks(res.data.items || [])).catch(err=>console.error(err))
  },[category,search])


  const handleAddCart = (book, price) => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    alert("Please login first")
    return
  }

  const cartKey = `cart_${user.id}`
  const cart = JSON.parse(localStorage.getItem(cartKey)) || []

  const existingBook = cart.find(item => item.id === book.id)

  if (existingBook) {
    existingBook.quantity += 1
  } else {
    cart.push({
      id: book.id,
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.thumbnail || "",
      price: price,
      quantity: 1
    })
  }

  localStorage.setItem(cartKey, JSON.stringify(cart))

  // 🔔 notify navbar
  window.dispatchEvent(new Event("cartUpdated"))

  alert("Book added to cart")
}

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {books.map(book => {
        const info = book.volumeInfo
        const price=Math.floor(Math.random()*500)+150

        return (
          <div key={book.id} style={cardStyle}>
            
            {/* Book Image */}
            {info.imageLinks?.thumbnail ? (
              <img
                src={info.imageLinks.thumbnail}
                alt={info.title}
                style={imgStyle}
              />
            ) : (
              <div style={noImageStyle}>No Image</div>
            )}

            {/* Title */}
            <h4 style={titleStyle}>
              {info.title}
            </h4>

            {/* Author */}
            <p style={authorStyle}>
              {info.authors?.[0] || "Unknown Author"}
            </p>

            {/*price*/}
            <p style={pricestyle}>₹ {price}</p>

            {/* Buttons */}
            <div style={btnContainer}>
              <button style={cartBtn} onClick={()=>handleAddCart(book,price)}>Add to Cart</button>
            </div>

          </div>
        )
      })}
    </div>
  )
}
const cardStyle = {
  width: "180px",
  margin: "10px",
  padding: "10px",
  background: "#d8d3cfff",
  borderRadius: "10px",
  textAlign: "center",
  marginLeft:"22px",
  border:"1px solid #e0e0e0",
  boxShadow:"0 4px 8px rgba(0,0,0,0.5)",
  transition:"transform 0.3s, box-shadow 0.3s"
}

const imgStyle = {
  width: "120px",
  height: "180px",
  objectFit: "cover"
}

const noImageStyle = {
  width: "120px",
  height: "180px",
  background: "#ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px"
}

const titleStyle = {
  fontSize: "14px",
  margin: "5px 0"
}

const authorStyle = {
  fontSize: "12px",
  color: "gray"
}

const btnContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "8px"
}

const cartBtn = {
  padding: "6px 8px",
  fontSize: "12px",
  cursor: "pointer",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
}

const orderBtn = {
  padding: "6px 8px",
  fontSize: "12px",
  background: "#ff9900",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
}


const pricestyle={
  fontSize:"14px",
  fontWeight:"bold",
  margin:"5px 0",
  color:"#333"
}

export default BodyPart



