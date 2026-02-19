import React from 'react'
import bookstore from './BK.avif'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Image */}
      <img
        src={bookstore}
        alt="Bookstore"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      {/* Center Buttons */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "20px"
        }}
      >
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button style={btnStyle}>Login</button>
        </Link>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <button style={btnStyle}>Signup</button>
        </Link>
      </div>
    </div>
  )
}

const btnStyle = {
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#ec1b17ff",
  color: "#fff"
}

export default MainPage
