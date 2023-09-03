import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditStore = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = () => {
    console.log(store);
  };

  useEffect(() => {
    const sample = {
      name: 'Happy Store',
      category: 'fruits',
      details: 'In our store we sell delicious fruits!\nPlease come and visit us!',
      plus: true,
    }
    setStore(sample);
  }, []);

  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>Add Store</h1>
      <form className='form'>
        <div>
          <p>Store Name</p>
          <input type='text' name='name' value={store.name} onChange={handleChange} className='input' />
        </div>
        <div>
          <p>Category</p>
          <select name='category' value={store.category} className='input'>
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
          <p>Details</p>
          <textarea name='details' value={store.details} onChange={handleChange} className='textarea' />
        </div>
        <button className='mx-auto mt-2 w-full btn' onChange={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default EditStore;