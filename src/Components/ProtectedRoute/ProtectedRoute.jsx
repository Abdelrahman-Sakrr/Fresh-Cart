import React from 'react'
import Home from '../Home/Home'
import Login from '../Login/Login'

export default function ProtectedRoute(props) {
  
if(localStorage.getItem("userToken")){
	return props.children
}
else{
	return <Login/>
}

}
