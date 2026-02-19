import React, { useEffect, useState } from 'react'
import BodyPart from './BodyPart'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Body = () => {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [cartcount, setcartcount] = useState(0)
  const [username, setusername] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(search)  
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      navigate("/")
      return
    }

    setusername(user.fullName)

    const cartKey = `cart_${user.id}`

    const loadCartCount = () => {
      const cart = JSON.parse(localStorage.getItem(cartKey)) || []
      setcartcount(cart.length)
    }

    loadCartCount()

    // 🔔 listen for cart updates
    window.addEventListener("cartUpdated", loadCartCount)

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount)
    }

  }, [])


  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate('/')
  }
  return (
    <>
      <nav style={styles.nav}>

        {/* Search Bar */}
        <form style={styles.searchWrapper} onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search books..."
            style={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button style={styles.searchBtn} type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Cart */}
        <div>
          <span style={styles.username}>Hello, {username}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>logout</button>

          <Link
            to='/cart'
            style={{ position: "relative", display: "inline-block", color: "white" }}
          >
            <i className="fa-solid fa-basket-shopping" 
            style={{ fontSize: "24px" }}
            ></i>
            <span style={styles.badge}>{cartcount}</span> 
          </Link>
        </div>



      </nav>

      {query ? (
        <BodyPart search={query} />
      ) : (
        <>
          <BodyPart category="fiction" />
          <BodyPart category="mystery" />
          <BodyPart category="science" />
        </>
      )}
    </>
  )
}
const styles = {
  nav: {
    backgroundColor: "black",
    color: "white",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px"
  },

  /* 🔍 SEARCH BAR */
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "20px",
    overflow: "hidden"
  },

  searchInput: {
    width: "250px",
    padding: "8px 12px",
    border: "none",
    outline: "none"
  },

  searchBtn: {
    padding: "8px 14px",
    background: "#ff9900",
    border: "none",
    cursor: "pointer"
  },

  cart: {
    fontSize: "18px",
    cursor: "pointer",
    position: "relative",
    display: "inline-block"
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "red",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold"
  }
}


export default Body


