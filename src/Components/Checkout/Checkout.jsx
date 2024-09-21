import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import {useFormik } from 'formik';



export default function CheckOut() {	
	let {checkOutSession} = useContext(CartContext)


	let formik = useFormik({
		initialValues:{
			details:"",
			phone:"",
			city:"",
		},
		onSubmit: ()=>handleCheckOut("66c91634ed0dc0016c217bb3","http://localhost:5174")
	})

	async function handleCheckOut(cartId , url){
		let res = await checkOutSession(cartId , url , formik.values)
		console.log(res);
	}



  return (
<>



<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-5 ">
<div className='box-shadow p-5 rounded-lg'>
<h2  className='text-3xl text-emerald-600 font-mono font-bold'>Check Out</h2>
	{/* details */}
	<div className="relative z-0 mb-5 group ">
      <input type="details" 
	  name="details"
	  value={formik.values.details} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur} 
	  id="details" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="details" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>




	{/* phone */}
  <div className="relative z-0 mb-5 group">
      <input type="text" 
	  name="phone"
	  value={formik.values.phone} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur} 
	  id="phone" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="phone" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>


			{/* city */}
			<div className="relative z-0 mb-5 group">
      <input type="city" 
	  name="city"
	  value={formik.values.city} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur} 
	  id="city" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="city" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>


{/* button */}
  <button type="submit" className="outline-emerald-600 outline p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300 w-full">
  {/* spinner or loader till the response is here */}
  Check Out
  </button>
</div>

  </form>


</>
  )
}
