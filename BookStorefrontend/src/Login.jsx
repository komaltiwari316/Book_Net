import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()

  const Handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://book-net-4.onrender.com/users/login", {
        email,
        password
      })


      const data = res.data;

      localStorage.setItem("user", JSON.stringify({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role
      }))


      const cartKey = `cart_${data.id}`
      if (!localStorage.getItem(cartKey)) {
        localStorage.setItem(cartKey, JSON.stringify([]))
      }

      if (data.role === "Admin") {
        localStorage.setItem("admin", JSON.stringify({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          role: data.role
        }))
        alert("Admin login succfully")
        navigate("/adminbody")
      } else if (data.role === "User") {
        alert("User login successfully")
        navigate("/body")
      } else {
        alert("Invalid")
      }
      console.log("LOGIN RESPONSE 👉", res.data)


    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Invalid password")
      } else if (err.response && err.response.status === 404) {
        alert("Email not found")
      } else {
        console.log("Error during login", err)
        alert("Something went wrong")
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}
    >
      <form
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#111",
          padding: "30px",
          borderRadius: "10px"
        }}
        onSubmit={Handlelogin}>

        <input style={inputstyle} type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setemail(e.target.value)} />

        <input style={inputstyle} type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setpassword(e.target.value)} />


        <button
          style={{
            padding: "10px",
            backgroundColor: "#ec1b17ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Login up
        </button>

        <hr style={{ color: "white", height: "1px" }} />
        <Link
          to="/signup"
          style={{
            color: "#ec1b17ff",
            textAlign: "center",
            textDecoration: "none"
          }}
        >
          Don’t have an account? Sign up
        </Link>
      </form>
    </div>
  )
}

const inputstyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  fontSize: "16px",
  outline: "none",
  backgroundColor: "#222"
}

export default Login
