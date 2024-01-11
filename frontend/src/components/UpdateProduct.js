import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


 

const UpdateProduct = ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(params.id)
        getProductDetails();
    },[])

    const getProductDetails = async()=>{
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
          method: 'Get',
           
          headers: {
            'Content-Type': 'application/json'
          }
        })
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
          method: 'Put',
          body: JSON.stringify({name, price, category, company}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        result = await result.json();
        console.log(result);
        navigate('/');
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