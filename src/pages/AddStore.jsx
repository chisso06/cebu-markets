import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import StoreMap from "../components/StoreMap";
import { db } from "./../config/firebase";

const AddStore = () => {
  const navigate = useNavigate();
  const [isAvailable, setAvailable] = useState(false);
  const [store, setStore] = useState({
    name: '',
    lat: 0,
    lng: 0,
    category: '',
    details: '',
    plus: false,
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "market"), store);
      console.log("Document written with ID: ", docRef.id);
      navigate("/");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    console.log(store);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setStore({ ...store, lat: latitude, lng: longitude });
      })
    };
    getCurrentPosition();
  }, []);

  return (
    <div className='my-10'>
      <h1 className='text-xl font-bold mb-6'>Add Store</h1>
      <div className='form'>
        <div>
          <p>Store Name</p>
          <input type='text' name='name' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>Category</p>
          <select name='category' className='input'>
            <option value='' selected disabled></option>
            <option value='meats'>meats</option>
            <option value='fishes'>fishes</option>
            <option value='vegetables'>vegetables</option>
            <option value='fruits'>fruits</option>
            <option value='clothes'>clothes</option>
            <option value='shoes'>shoes</option>
            <option value='bags'>bags</option>
            <option value='sundries'>sundries</option>
            <option value='accessories'>accessories</option>
            <option value='other'>other</option>
          </select>
        </div>
        <div>
          <p>Location</p>
          <StoreMap
            page="add"
            style={{ height: "200px", width: "100%" }}
            stores={[store]}
          />
        </div>
        <div>
          <p>Details</p>
          <textarea name='details' onChange={handleChange} className='textarea' />
        </div>
        <div>
          <p>Admin Password</p>
          <input type='password' name='password' onChange={handleChange} className='input' />
        </div>
        <button className='mx-auto w-full btn' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddStore;