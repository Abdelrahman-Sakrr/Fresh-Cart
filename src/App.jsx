import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Brands from './Components/Brands/Brands'
import Error from './Components/Error/Error'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import UserContextProvider, { UserContext } from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout'


function App() {
  // const [count, setCount] = useState(0)

  let routing = createBrowserRouter([
    {path:"" , element:<Layout/> , children:[
      {path:"home", element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:"checkout", element:<ProtectedRoute><Checkout/></ProtectedRoute> },
      {path:"categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"cart" , element:<ProtectedRoute><Cart/> </ProtectedRoute>},
      {path:"products" , element:<ProtectedRoute><Products/> </ProtectedRoute>},
      {path:"brands" , element:<ProtectedRoute><Brands/> </ProtectedRoute>},
      {path:"productdetails/:id/:category" , element:<ProtectedRoute><ProductDetails/> </ProtectedRoute>},
      {index:"login" , element:<Login/>},
      {path:"signup" , element:<SignUp/>},
      {path:"*" , element:<Error/>},
    ]}
  ])

  return (
    <>
        <UserContextProvider>
          <CartContextProvider>
            <RouterProvider router={routing}></RouterProvider>
            <Toaster />
          </CartContextProvider>
        </UserContextProvider>
    </>
    
  )
}

export default App
