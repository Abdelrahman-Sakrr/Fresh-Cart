import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
	let {userLogin,setuserLogin}=useContext(UserContext);
	let navigate = useNavigate()
	
	

	//on click signout
	function signOut(){
		//delete local storage
		localStorage.removeItem("userToken");
		//empty userLoginState
		setuserLogin(null)
		//Navigate To Login Page
		navigate("/");
	}



  return (
  
  <>
  

<nav className=" bg-slate-700 border-gray-300 text-white fixed right-0 left-0 top-0 z-10">
    <div className="flex flex-wrap justify-center gap-2 md:justify-between md items-center mx-auto max-w-screen-xl p-4">
		<div className='flex items-center gap-4'>
		<Link to="" className="flex items-center gap-2">
		<i className="fa-solid fa-cart-shopping text-emerald-300 text-xl"></i>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Fresh Cart</span>
        </Link>
{userLogin !== null?

<ul className='flex gap-3'>
			<li><NavLink to="home">Home</NavLink></li>
			<li><NavLink to="cart">Cart</NavLink></li>
			<li><NavLink to="products">Products</NavLink></li>
			<li><NavLink to="categories">Categories</NavLink></li>
			<li><NavLink to="brands">Brands</NavLink></li>
		</ul>:null}
		</div>
	<div className='flex  gap-3 flex-row-reverse items-center justify-center'>
	<div className="flex items-center gap-2">
			{userLogin?<span onClick={signOut} className="text-sm cursor-pointer">SignOut</span>
			:<><Link to="" className="text-sm">Login</Link>
				<Link to="signup" className="text-sm">SignUp</Link></>}
            
        </div>
		<div className='flex gap-2 items-center'>
		<i className="fa-brands fa-facebook"></i>
		<i className="fa-brands fa-facebook-messenger"></i>
		<i className="fa-brands fa-linkedin"></i>
		<i className="fa-brands fa-youtube"></i>
		</div>
	</div>

	
    </div>
</nav>


  </>
  )
}
