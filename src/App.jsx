import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {
  Footer,
  Header
} from './components';
import {
  AddStore,
  EditStore,
  StorePage,
  Test,
  Top,
} from './pages';

function App() {
  return (
    <div className="App flex flex-col h-screen bg-pink-50">
      <Header />
      <div className='my-10 overflow-scroll'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/add" element={<AddStore />} />
          <Route path="/store/:storeId" element={<StorePage />} />
          <Route path="/store/:storeId/edit" element={<EditStore />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
};

export default App;
