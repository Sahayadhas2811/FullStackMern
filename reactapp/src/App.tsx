import React from 'react'
import MainPage from './MainPage';
import TableFormBranchData from './pages/TableFormBranchData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/ReactSample' element={<MainPage/>}/>
        <Route path='/ReactSample/sam' element={<TableFormBranchData/>} />
      </Routes>
    </Router>
  )
}

export default App