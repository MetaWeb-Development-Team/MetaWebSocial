import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateFile from './pages/CreateFiles';
import ShowFile from './pages/ShowFile';
import EditFile from './pages/EditFile';
import DeleteFile from './pages/DeleteFile';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/files/create' element={<CreateFile />} />
      <Route path='/files/details/:id' element={<ShowFile />} />
      <Route path='/files/edit/:id' element={<EditFile />} />
      <Route path='/files/delete/:id' element={<DeleteFile />} />
    </Routes>
    
  );
};

export default App;

//{<div className='bg-red-400 text-white'>App</div>}