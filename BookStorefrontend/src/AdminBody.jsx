import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminBody = () => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");

    alert("Logout succesfully")
    navigate("/login")
  }

  return (
    <div>
      {/* Sidebar */}
      <nav
        style={{
          width: "260px",
          height: "100vh",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "20px",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "30px", cursor: "pointer" }}
          onClick={() => setActive("home")}
        >
          📚 Admin Panel
        </h2>

        <div
          style={active === "books" ? activeMenu : menuItem}
          onClick={() => setActive("books")}
        >
          Books
        </div>

        <div
          style={active === "orders" ? activeMenu : menuItem}
          onClick={() => setActive("orders")}
        >
          Orders
        </div>

        <div
          style={active === "users" ? activeMenu : menuItem}
          onClick={() => setActive("users")}
        >
          Users
        </div>

        <button style={{ backgroundColor: "red", color: "black", marginTop: "50px", marginLeft: "40px", width: "80px", padding: "8px", cursor: "pointer", borderRadius: "6px" }} onClick={handleLogout}>Logout</button>
      </nav>

      {/* RIGHT SIDE CONTENT */}
      <main
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
        }}
      >
        {active === "home" && <Home />}
        {active === "books" && <Books />}
        {active === "orders" && <Orders />}
        {active === "users" && <Users />}
      </main>
    </div>
  );
};

/* ----------Home Pages ---------- */

const Home = () => {
  const [admin, setadmin] = useState(null);

  useEffect(() => {

  })

  useEffect(() => {
    const storeadmin = localStorage.getItem("admin");
    if (storeadmin) {
      setadmin(JSON.parse(storeadmin));
    }
  }, [])

  if (!admin) {
    return <h2>Loading admin data</h2>
  }
  return (
    <>
      <div style={container1}>
        <h2>👋 Welcome Admin</h2>

        <div style={card}>
          <p><strong>Name : </strong>{admin.fullName}</p>
          <p><strong>Email : </strong>{admin.email}</p>
          <p><strong>PhoneNumber : </strong>{admin.phoneNumber}</p>
        </div>
      </div>
    </>
  )
}

const container1 = {
  padding: "30px",
};

const card = {
  marginTop: "20px",
  padding: "20px",
  maxWidth: "400px",
  backgroundColor: "#f9fafb",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};


/*books*/


const Books = () => {
  const [active1, setactive1] = useState("Add Books")
  const [search, setsearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    setsearch(search);

  }
  return (
    <>
      {/* TOP BAR */}
      <div
        style={{
          height: "80px",
          backgroundColor: "#493fa1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <p style={active1 === "Add Books" ? activeMenu : menuItem} onClick={() => setactive1("Add Books")}>Add Books</p>

          <p style={active1 === "Delete Books" ? activeMenu : menuItem} onClick={() => setactive1("Delete Books")}>Delete Books</p>

          <p style={active1 === "Update Books" ? activeMenu : menuItem} onClick={() => setactive1("update Books")}>Update Books</p>

          <p style={active1 === "All Books" ? activeMenu : menuItem} onClick={() => setactive1("All Books")}>All Books</p>
        </div>

        <form style={searchWrapper} onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search books..."
            style={searchInput}
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />

          <button style={searchBtn} type="button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>


      {active1 === "Add Books" && <AddBooks />}
      {active1 === "Delete Books" && <DeleteBooks />}
      {active1 === "update Books" && <UpdateBooks />}
      {active1 === "All Books" && <AllBooks search={search} />}
    </>
  );
};

const AddBooks = () => {
  const [title, settitle] = useState("")
  const [author, setauthor] = useState("")
  const [price, setprice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setimage] = useState(null)

  const HandleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const res = await axios.post("https://book-net-4.onrender.com/books/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      alert("book are added")
    } catch (error) {
      console.log("failed to add books")
    }
  }

  return (
    <>
      <form onSubmit={HandleAdd}>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "25px",
            margin: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>➕ Add New Book</h2>

          <div style={field}>
            <label>Book Name</label>
            <input
              type="text"
              placeholder="Enter book name"
              style={input}
              value={title} onChange={(e) => settitle(e.target.value)} />
          </div>

          <div style={field}>
            <label>Author Name</label>
            <input
              type="text"
              placeholder="Enter author name"
              style={input}
              value={author} onChange={(e) => setauthor(e.target.value)} />
          </div>

          <div style={field}>
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              style={input}
              value={price} onChange={(e) => setprice(e.target.value)} />
          </div>

          <div style={field}>
            <label>Category</label>
            <input
              type="text"
              placeholder="Programming / Fiction"
              style={input}
              value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div style={field}>
            <label>Image upload</label>
            <input
              type="file"
              placeholder="upload your image"
              accept="image/*"
              style={input}
              onChange={(e) => setimage(e.target.files[0])} />
          </div>

          <button style={btn} type="submit">Add Book</button>
        </div>
      </form>
    </>
  );
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const btn = {
  padding: "10px",
  backgroundColor: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  width: "100%",
};


const DeleteBooks = () => {
  const [books, setbooks] = useState([]);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    fetchBook();
  }, [])

  const fetchBook = async () => {
    try {
      const res = await axios.get("https://book-net-4.onrender.com/books/all");
      setbooks(res.data)
      setloading(false);
    } catch (error) {
      console.log("failed to fetch books", error)
      setloading(false);
    }
  }

  const HandleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://book-net-4.onrender.com/books/delete/${id}`)
      alert("books deleted succefully")
      fetchBook();
    } catch (error) {
      console.log("Failed to delete books", error)
    }
  }

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Books.....</h2>
  }


  return (
    <>
      <div style={container}>
        <h2 style={title}>📚 Delete Books</h2>

        {books.length === 0 ? (
          <p>No Books found</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={thead}>
                <th style={th}>Title</th>
                <th style={th}>Author</th>
                <th style={th}>Price</th>
                <th style={th}>Category</th>
                <th style={th}>Image</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id} style={row}>
                  <td style={td}>{book.title}</td>
                  <td style={td}>{book.author}</td>
                  <td style={{ ...td, textAlign: "center" }}>₹{book.price}</td>
                  <td style={td}>{book.category}</td>
                  <td style={td}>
                    {book.image ? (
                      <img src={`https://book-net-4.onrender.com/uploads/${encodeURIComponent(book.image)}`} alt={book.title} style={{ width: "50px", height: "50px" }} />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td style={td}>
                    <button style={deletebtn} onClick={() => HandleDelete(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

const deletebtn = {
  padding: "6px 12px",
  backgroundColor: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
}

const UpdateBooks = () => {
  const [books, setbooks] = useState([]);
  const [loading, setloading] = useState(true);
  const [selected, setselected] = useState(null)

  const [title, settitle] = useState("")
  const [author, setauthor] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("")
  const [image, setimage] = useState(null)

  useEffect(() => {
    fetchBook();
  }, [])

  const fetchBook = async () => {
    try {
      const res = await axios.get("https://book-net-4.onrender.com/books/all");
      setbooks(res.data)
      setloading(false);
    } catch (error) {
      console.log("failed to fetch books", error)
      setloading(false);
    }
  }

  const Handleselect = async (book) => {
    setselected(book)
    settitle(book.title)
    setauthor(book.author)
    setprice(book.price)
    setcategory(book.category)
    setimage(null)
  }

  const HandleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("price", price);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }
      await axios.put(`https://book-net-4.onrender.com/books/update/${selected.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      alert("books update successfully")
      setselected(null)
      fetchBook()
    } catch (error) {
      console.log("update failed", error)
    }
  }
  return (
    <>
      <div style={container}>
        <h2 style={titleStyle}>📚 Update Books</h2>

        {books.length === 0 ? (
          <p>No Books found</p>
        ) : (
          <>
            {/* BOOK LIST */}
            <table style={table}>
              <thead>
                <tr style={thead}>
                  <th style={th}>Title</th>
                  <th style={th}>Author</th>
                  <th style={th}>Price</th>
                  <th style={th}>Category</th>
                  <th style={th}>Image</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {books.map(book => (

                  <tr key={book.id} style={row}>
                    <td style={td}>{book.title}</td>
                    <td style={td}>{book.author}</td>
                    <td style={td}>₹{book.price}</td>
                    <td style={td}>{book.category}</td>
                    <td>
                      {book.image && book.image.trim() !== "" ? (
                        <img
                          key={book.image}
                          src={`https://book-net-4.onrender.com/uploads/${encodeURIComponent(book.image)}`}
                          width="50"
                          alt="book"
                          onError={(e) => {
                            e.target.style.display = "none"
                          }}
                        />
                      ) : (
                        <span>No image</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => Handleselect(book)}
                        style={updatebtn}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* UPDATE FORM */}
            {selected && (
              <form onSubmit={HandleUpdate} style={{ marginTop: "20px" }}>
                <input value={title} onChange={e => settitle(e.target.value)} />
                <input value={author} onChange={e => setauthor(e.target.value)} />
                <input value={price} onChange={e => setprice(e.target.value)} />
                <input value={category} onChange={e => setcategory(e.target.value)} />

                <input
                  type="file"
                  onChange={e => setimage(e.target.files[0])}
                />

                <button type="submit">Save Update</button>
              </form>
            )}
          </>
        )}

      </div >
    </>
  )
}

const titleStyle = { marginBottom: "20px" };
const updatebtn = {
  padding: "6px 12px",
  backgroundColor: "#1a4203ff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
}

const updateBtn = {
  padding: "6px 12px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const form = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "10px",
  maxWidth: "400px",
};

const styleinput = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const savebtn = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};


const AllBooks = ({ category, search }) => {
  const [books, setbooks] = useState([]);
  const [Books, setBooks] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get("https://book-net-4.onrender.com/books/all");
      setbooks(res.data);
    } catch (error) {
      console.log("failed to fetch books", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const url = search
      ? `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`
      : `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=20`;

    axios
      .get(url)
      .then(res => setBooks(res.data.items || []))
      .catch(err => console.error(err));
  }, [category, search]);

  useEffect(() => {
    let url = "";

    if (search && search.trim() !== "") {
      url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`;
    } else if (category) {
      url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=20`;
    } else {
      url = `https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=12`;
    }

    axios
      .get(url)
      .then(res => setBooks(res.data.items || []))
      .catch(err => console.error(err));

  }, [category, search]);


  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Books.....</h2>;
  }

  return (
    <>
      {/* BACKEND TABLE */}
      <div style={container}>
        <h2 style={title}>📚 All Books</h2>

        {books.length === 0 ? (
          <p>No Books found</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={thead}>
                <th style={th}>Title</th>
                <th style={th}>Author</th>
                <th style={th}>Price</th>
                <th style={th}>Category</th>
                <th style={th}>Image</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id || book.id || index} style={row}>
                  <td style={td}>{book.title}</td>
                  <td style={td}>{book.author}</td>
                  <td style={{ ...td, textAlign: "center" }}>₹{book.price}</td>
                  <td style={td}>{book.category}</td>
                  <td style={td}>
                    {book.image ? (
                      <img
                        src={`https://book-net-4.onrender.com/uploads/${encodeURIComponent(book.image)}`}
                        alt="book"
                        width="40"
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Books.map((book, index) => {
          const info = book.volumeInfo;
          const price = Math.floor(Math.random() * 500) + 150;

          return (
            <div key={book.id || index} style={cardStyle}>
              {info.imageLinks?.thumbnail ? (
                <img src={info.imageLinks.thumbnail} alt={info.title} style={imgStyle} />
              ) : (
                <div style={noImageStyle}>No Image</div>
              )}

              <h4 style={titleStyle1}>{info.title}</h4>
              <p style={authorStyle}>{info.authors?.[0] || "Unknown Author"}</p>
              <p style={pricestyle}>₹ {price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};


const cardStyle = {
  width: "180px",
  margin: "10px",
  padding: "10px",
  background: "#d8d3cfff",
  borderRadius: "10px",
  textAlign: "center",
  marginLeft: "22px",
  border: "1px solid #e0e0e0",
  boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
  transition: "transform 0.3s, box-shadow 0.3s"
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

const titleStyle1 = {
  fontSize: "14px",
  margin: "5px 0"
}

const authorStyle = {
  fontSize: "12px",
  color: "gray"
}

const cartBtn = {
  padding: "6px 8px",
  fontSize: "12px",
  cursor: "pointer",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
}
const pricestyle = {
  fontSize: "14px",
  fontWeight: "bold",
  margin: "5px 0",
  color: "#333"
}


const container = {
  backgroundColor: "#ffffff",
  padding: "25px",
  margin: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const title = {
  marginBottom: "20px",
  color: "#1e1e2f",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const thead = {
  backgroundColor: "#4f46e5",
  color: "#fff",
};

const th = {
  padding: "12px",
  textAlign: "left",
  fontSize: "15px",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e0e0e0",
  fontSize: "14px",
};

const row = {
  transition: "0.3s",
  cursor: "pointer",
};


/*------orders pages-----*/
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log("ORDERS FROM API 👉", orders);
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://book-net-4.onrender.com/orders/all");
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.log("failed to fetch orders", error);
      setLoading(false);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading Orders...</h2>;

  return (
    <div style={{ padding: "30px", background: "#f5f6fa", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>📦 Orders Details</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0,0.08)" }}>
            <thead style={{ background: "#1e1e2f", color: "#fff" }}>
              <tr>
                <th style={thStyle}>User Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Books</th>
                <th style={thStyle}>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={tdStyle}>{order.userName}</td>
                  <td style={tdStyle}>{order.userEmail}</td>
                  <td style={tdStyle}>{order.userPhoneNum}</td>

                  <td style={tdStyle}>
                    {order.items?.map((item, i) => (
                      <div key={i} style={{ marginBottom: "4px" }}>
                        📘  {item.bookName} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td style={{ ...tdStyle, fontWeight: "bold" }}>₹{order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "14px",
  fontWeight: "600",
  color: "#f1f1f1",
  letterSpacing: "0.4px"
}

const tdStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#333",
  cursor: "pointer",
  cursor: "pointer",
  verticalAlign: "top"
}
/*------- User pages-------*/

const Users = () => {
  const [books, setbooks] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);



  const fetchBook = async () => {
    try {
      const res = await axios.get("https://book-net-4.onrender.com/users/allusers");
      setbooks(res.data)
      setloading(false);
    } catch (error) {
      console.log("failed to fetch Users", error)
      setloading(false);
    }
  }

  return (
    <>
      <div style={container}>

        {books.length === 0 ? (
          <p>No User Found</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={thead}>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Phone Number</th>
              </tr>
            </thead>

            <tbody>
              {books.map((books) => (
                <tr key={books.id} style={row}>
                  <td style={td}>{books.fullName}</td>
                  <td style={td}>{books.email}</td>
                  <td style={{ ...td, textAlign: "center" }}>{books.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
};

const searchWrapper = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "20px",
  overflow: "hidden"
}

const searchInput = {
  width: "250px",
  padding: "8px 12px",
  border: "none",
  outline: "none"
}

const searchBtn = {
  padding: "8px 14px",
  background: "#ff9900",
  border: "none",
  cursor: "pointer"
}

const menuItem = {
  padding: "12px 16px",
  marginBottom: "10px",
  borderRadius: "8px",
  cursor: "pointer",
};

const activeMenu = {
  ...menuItem,
  backgroundColor: "#4f46e5",
};

export default AdminBody;
