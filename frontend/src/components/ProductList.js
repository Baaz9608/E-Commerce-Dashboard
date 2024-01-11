import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await fetch("http://127.0.0.1:5000/products", {
      method: "get",
    });
    let data = await result.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://127.0.0.1:5000/product/${id}`, {
      method: "delete",
    });
    result = await result.json();

    if (result) {
      getProducts();
      // alert('Record is deleted!!!')
    }
  };

  const searchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);

      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        placeholder="Search Product"
        onChange={searchHandler}
        className="searchInput"
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products["product"]?.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button
                className="btn"
                onClick={() => {
                  deleteProduct(item._id);
                }}
              >
                Delete
              </button>
              <Link className="btn" to={"/update/10" + item._id}>
                Update
              </Link>
            </li>
          </ul>
        ))
      }
    </div>
  );
};

export default ProductList;
