import React, { useState } from 'react';

const AddStore = () => {
  const [store, setStore] = useState({
    name: '',
    place: '',
    category: '',
    details: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = () => {
    console.log(store);
  };

  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>Add Store</h1>
      <form className='form'>
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
          <p>Details</p>
          <textarea name='details' onChange={handleChange} className='textarea' />
        </div>
        <button className='mx-auto mt-2 w-full btn' onChange={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default AddStore;