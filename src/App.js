import React, { useEffect, useState,useRef} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Userprofile from './userprofile';
import JsonData from './data/data.json';
import Home from './home.js';
import { ChakraProvider } from '@chakra-ui/react';
import ProductView from './productview.js';
import Navbar from './navbar.js';
import MyChatbot from './chatbbot.js';
import Map from './map.js';

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
 const comp=useRef(null);
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <div className="App">
        <MyChatbot data={landingPageData.Userprofile}/>

          <Routes>
            <Route path="/myprofile" element={<Userprofile data={landingPageData.Userprofile} /> } />
            <Route path="/" element={<Home data={landingPageData.Home} />} />
            <Route path="/map" element={<Map />} />
            <Route path="/product/:category/:id" element={<ProductView />} />
          
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
