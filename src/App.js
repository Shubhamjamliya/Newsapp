import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';


const App=()=>{
  const pagesize=15;

const apiKey=process.env.REACT_APP_NEWS_API

const [progress, setProgress] = useState(0)
  
    return (
      <div>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        height={2}
        setProgress={progress}
      />
        <Routes>
        <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="top-headlines" pageSize={pagesize} country="in" category="general" />}/>
        <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pagesize} country="in" category="business" />}/>
        <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pagesize} country="in" category="entertainment" />}/>
        <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pagesize} country="in" category="general" />}/>
        <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pagesize} country="in" category="health" />}/>
        <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pagesize} country="in" category="science" />}/>
        <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pagesize} country="in" category="sports" />}/>
        <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pagesize} country="in" category="technology" />}/>
        </Routes>
      </div>

    )
  }
export default App;  


