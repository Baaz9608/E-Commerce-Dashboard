import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
    alert("Item added successfully")
    setName('');
    setPrice('');
    setCategory('');
    setCompany('');
  };

  
  return (
    <div className="product">
      <h1>Add Product</h1>

      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Product Company"
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button type="button" onClick={addProduct} className="appbtn">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
