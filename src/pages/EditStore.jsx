import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStore, updateStore } from "../functions";

const EditStore = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState({});
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    if (store !== {}) {
      const {name, value} = e.target;
      setStore({ ...store, [name]: value });
      console.log(name, value);
    }
  };

  const handleImage = (e) => {
    if (store !== {}) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (store !== {}) {
        updateStore(storeId, store, image);
        navigate("/store/" + storeId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpgrade = async () => {
    const token = window.prompt("Enter Token");
    if (token === process.env.REACT_APP_UPGRADE_TOKEN) {
      updateStore(storeId, { ...store, plus: true });
      navigate("/store/" + storeId);
    }
  };

  useEffect(() => {
    const password = window.prompt("Admin Password");
    getStore(storeId)
      .then((result) => {
        if (password !== result.password) {
          console.log(password, result.password);
          alert("incorrect password");
          navigate("/store/" + storeId);
        } else {
          setStore(result);
        }
      })
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
        {(() => {
          if (!store.plus) {
            return (
              <button onClick={handleUpgrade} className="w-full btn bg-yellow-500">Upgrade to Premium for 100PHP</button>
            )
          }
        })()}
      </div>
    </div>
  );
};

export default EditStore;