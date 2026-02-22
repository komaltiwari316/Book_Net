import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Sign = () => {
  const [fullName, setfullname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setrole] = useState("")
  const navigate = useNavigate();

  const HandleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://book-net-6.onrender.com/users/signup", {
        fullName,
        email,
        password,
        phoneNumber,
        role
      })
      if (res) {
        alert("Signup Successful")
        navigate('/Login')
      }
    } catch (err) {
      console.log("Error during signup:", err);
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
  onSubmit={HandleSignup} >

        <input style={inputstyle} type="text" placeholder="Enter Your Full Name" value={fullName} onChange={(e) => setfullname(e.target.value)} />

        <input style={inputstyle} type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setemail(e.target.value)} />

        <input style={inputstyle} type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setpassword(e.target.value)} />

        <input style={inputstyle} type="tel" placeholder="Enter Your Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <input style={inputstyle} type="text" placeholder="Enter Your Role" value={role} onChange={(e) => setrole(e.target.value)} />

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
          Signup
        </button>

        <hr style={{ color: "white", height: "1px" }} />

        <Link
          to="/login"
          style={{
            color: "#ec1b17ff",
            textAlign: "center",
            textDecoration: "none"
          }}
        >
          Already have an account ? Login
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

export default Sign
