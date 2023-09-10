import { BrowserRouter, Routes, Route } from 'react-router-dom'


import JoinChat from './JoinChat';
import Home from './Home';

import './App.css';


function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/joinChat" element={<JoinChat />} />
      </Routes>
    </BrowserRouter>

  )
  
}

export default App
