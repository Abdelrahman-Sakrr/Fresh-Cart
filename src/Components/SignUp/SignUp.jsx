import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"

export default function SignUp() {
	// const [sucess, setSucess] = useState("")
	const[emailFound,setemailFound] = useState("")
	const[spinner , setspinner]=useState(false)
	let navigate = useNavigate()


	function register(values){
		setspinner(true);
	axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
	.then((res)=>{
		localStorage.setItem("userToken" , res.data.token)
		setspinner(false);
		navigate("/")
	})
	.catch((res)=>{
		setemailFound(res.response.data.message)
		setspinner(false);	
	})		
	}
	

	// function myValidation(values){
	// 	// console.log(values);
	// 	let errors = {};
	// if(!values.name){
	// 		errors.name = "Name is required";
	// 	}
	// 	else if(!/^[A-Z][a-z]{3,}$/.test(values.name)){
	// 		errors.name="Name at least 3 characters"
	// 	}
	// 	if(!values.email){
	// 		errors.email = "Email is required";
	// 	}
	// 	else if (!/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(values.email)){
	// 		errors.email = "Invalid email address"
	// 	}
	// 	if(!values.phone){
	// 		errors.phone = "Phone is required";
	// 	}
	// 	else if (!/^01[0125][0-9]{8}$/.test(values.phone)){
	// 			errors.phone = "Invalid phone number"
	// 	}
	// 	if(!values.passowrd){
	// 		errors.passowrd="Password required"
	// 	}

	// 	return errors;
	// }
	let validationSchema = yup.object().shape({
		
		name:yup.string("name must be letters").min(3 , "at least 3 characters").max(10 , "max 10 characters").required("name is required"),
		email:yup.string().email("Invalid email format").required("Mail is required"),
		phone:yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone number").required(),
		password:yup.string().required().matches(/^[0-9]{6}$/),
		rePassword:yup.string().required().oneOf([yup.ref("password")], "password and repassword must be the same")
	
	})
	let formik = useFormik({
		initialValues:{
			name:"",
			email:"",
			phone:"",
			password:"",
			rePassword:""
		},
		validationSchema:validationSchema,
		onSubmit: register
	})
  return (
<>
<h2  className='text-3xl text-emerald-500 font-mono font-bold'>SignUp</h2>


	{/* {sucess?<div className='text-2xl bg-emerald-500 w-full md:w-1/3 mx-auto my-2 rounded-lg text-white p-1'>{sucess}</div>:null} */}
	{emailFound?<div className='text-2xl bg-red-500 w-full md:w-1/3 mx-auto my-2 rounded-lg text-white p-1'>{emailFound}</div>:null}
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-5">
  <div className="relative z-0 mb-5 group">
      <input 
	  type="text" 
	  name="name" 
	  value={formik.values.name} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur}
	  id="name" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="name" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>

  </div>
{/*start error name */}
{formik.errors.name && formik.touched.name? <div className='bg-red-600 text-white py-1  text-center rounded-lg mx-auto w-1/2 '>
			<h2 className='text-xl text-red-500'>{formik.errors.name}</h2>
		</div>:null}
{/* end error name */}

{/* email */}
  <div className="relative z-0 mb-5 group ">
      <input type="email"
	  name="email"
	  value={formik.values.email} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur} 
	  id="email" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="email" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>

  {/*start error email */}
{formik.errors.email && formik.touched.email? <div className='bg-red-600 text-white py-1  text-center rounded-lg mx-auto w-1/2'>
			<h2 className='text-2xl'>{formik.errors.email}</h2>
		</div>:null}
{/* end error email */}

  <div className="relative z-0 mb-5 group">
      <input type="tel" 
	  name="phone"
	  value={formik.values.phone} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur} 
	  id="phone" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="phone" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
  </div>
{/* error passowrd */}
  {formik.errors.phone && formik.touched.phone? <div className='bg-red-600 text-white py-1  text-center rounded-lg mx-auto w-1/2 '>
			<h2 className='text-2xl'>{formik.errors.phone}</h2>
		</div>:null}


  <div className="relative z-0 mb-5 group">
      <input type="password" 
	  name="password"
	  value={formik.values.password} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur} 
	  id="password" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="password" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {/* error password */}
  {formik.errors.password && formik.touched.password? <div className='bg-red-600 text-white py-1  text-center rounded-lg my-2 mx-auto w-1/2'>
			<h2 className='text-2xl'>{formik.errors.passowrd}</h2>
		</div>:null}

		<div className="relative z-0 mb-5 group">
      <input type="password" 
	  name="rePassword"
	  value={formik.values.rePassword} 
	  onChange={formik.handleChange} 
	  onBlur={formik.handleBlur} 
	  id="rePassword" 
	  className="block py-2.5 px-0 w-full text-sm text-emerald-500 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none  peer" placeholder=" "  />
      <label htmlFor="rePassword" className="absolute left-0 peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
  </div>
  {/* error password */}
  {formik.errors.rePassword && formik.touched.rePassword? <div className='bg-red-600 text-white py-1  text-center rounded-lg my-2 mx-auto w-1/2'>
			<h2 className='text-2xl'>{formik.errors.rePassword}</h2>
		</div>:null}

  <button type="submit" className="outline-emerald-500 outline p-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300 w-1/3">
  {spinner?<i className='fa-solid fa-spinner animate-spin'></i>:"Submit"}</button>

  </form>
</>
  )
}
