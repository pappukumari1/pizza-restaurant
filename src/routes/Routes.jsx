import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewOrder from '../pages/newOrder/NewOrder'
import OrderInfo from '../pages/orderInfo/OrderInfo'

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OrderInfo/>}/>
        <Route path='/new-order' element={<NewOrder/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes
