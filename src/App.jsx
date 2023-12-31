import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {
  Footer
} from './components';
import {
  AddStore,
  EditStore,
  StoreList,
  StorePage,
  Test,
  Top,
} from './pages';

function App() {
  return (
    <div className="App flex flex-col h-screen bg-pink-50">
      {/* <Header /> */}
      <div className='mb-16 overflow-scroll'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/add" element={<AddStore />} />
          <Route path="/store/:storeId" element={<StorePage />} />
          <Route path="/store/:storeId/edit" element={<EditStore />} />
          <Route path="/storelist" element={<StoreList />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
};

export default App;
