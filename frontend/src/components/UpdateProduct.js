import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


 

const UpdateProduct = ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();

    useEffect(()=>{
        // console.log(params.id)
        getProductDetails();
    },[])

    const getProductDetails = async()=>{
        console.log(params);
        let result = await fetch(`http://127.0.0.1:5000/product/${params.id}`)
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = ()=>{
        console.log(name, price, category, company);
    }
    return(
        <div className="product">
        <h1>Update Product</h1>

      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
      />
       

      <input
        type="text"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
      />
       

      <input
        type="text"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
      />
       

      <input
        type="text"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Product Company"
      />
       
      <button type="button" onClick={updateProduct} className="appbtn">
        Update Product
      </button>
    </div>
    )
}

export default UpdateProduct;