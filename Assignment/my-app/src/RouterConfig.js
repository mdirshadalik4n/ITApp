import React from 'react'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"


import UserLogin from './Components/UserLogin';
import RegisterUser from './Components/RegisterUser';
import PageNotFound from './Components/PageNotFound'

import Home from './Components/Home'
import TicketInfo from './Components/TicketInfo';





export default function RouterConfig() {
  return (
    <>
   
    <BrowserRouter>
   
    <Routes>
       
        <Route path='/' element={<TicketInfo></TicketInfo>}></Route>
       <Route path='/Home' element={<Home></Home>}></Route>
       <Route path='/login' element={<UserLogin></UserLogin>}></Route>
        <Route path='/Register' element={<RegisterUser></RegisterUser>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
