import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";  
import Router from './Components/Router/Router';
import Layout from './Components/Layout/Layout';
import "./font.css";

function App() {
  return(
    <BrowserRouter>
      <Layout>
          <Router/>
      </Layout>
    </BrowserRouter>
    
  
  );

 
}

export default App
