import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from "./../config/firebase";

const EditStore = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState({});
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setStore({ ...store, [name]: value });
    console.log(name, value);
  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      console.log("UpdateStore", store);
      const storeRef = doc(db, "market", storeId);
      await setDoc(storeRef, store, { merge: true });
      console.log("updated store Id: ", storeId);
      if (image !== "") {
        const storageRef = ref(storage, "images/" + storeId + ".png");
        uploadBytes(storageRef, image);
        console.log("image uploaded: " + storeId);
      }
      navigate("/store/" + storeId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
		const getStore = async () => {
      console.log("GetStore");
      try {
        const storeRef = doc(db, "market", storeId);
        const storeDoc = await getDoc(storeRef);
        const store = storeDoc.data();
        setStore(store);
        const password = window.prompt("Admin Password");
        if (password !== store.password) {
          console.log(password, store.password);
          alert("incorrect password");
          navigate("/store/" + storeId);
        }
      } catch(err) {
        console.log(err);
        // navigate("/store/" + storeId);
      };
    };
		getStore();
  }, []);

  return (
    <div className='my-10'>
      <h1 className='text-xl font-bold mb-6'>Edit Store</h1>
      <div className='form'>
        <div>
          <p>Store Name</p>
          <input type='text' name='name' value={store.name} onChange={handleChange} className='input' />
        </div>
        <div>
          <p>Category</p>
          <select name='category' value={store.category} onChange={handleChange} className='input'>
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
          <p>Time</p>
          <select name='time' className='input' onChange={handleChange} value={store.time}>
            <option value='' selected disabled></option>
            <option value='daytime'>daytime</option>
            <option value='night'>night</option>
            <option value='all day'>all day</option>
          </select>
        </div>
        {(() => {
          if (store.plus) {
            return (
              <div>
                <p>Image</p>
                <input type='file' id='file' className='input' onChange={handleImage} />
              </div>
            )
          }
        })()}
        <div>
          <p>Details</p>
          <textarea name='details' value={store.details} onChange={handleChange} className='textarea' />
        </div>
        <button className='mx-auto w-full btn' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EditStore;