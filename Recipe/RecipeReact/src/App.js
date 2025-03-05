import { useState,useRef,useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import './sass/reciperPage.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main_home from './components/Main_home';
import Recipe_frame from './components/Recipe_frame';

function App() {
  const loading = useRef(null);
  const [loloaing,setLoading] = useState(null);
  useEffect(()=>{
    setLoading(loading);   
  },[])
  return (
    <div id="app">
      <div ref={loading} className='loading' style={{display:"none"}}></div>
      <Header title="요리랑"></Header>
        <Routes>
            <Route path="/"  element={<Main_home loading={loading} />} />
            <Route path="/recipe" element={<Recipe_frame  loading={loading}/>} />
        </Routes>
        <Footer title="People who created the project!"></Footer>
        
    </div>
  );
}

export default App;
