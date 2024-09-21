import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import UserContextProvider, { UserContext } from '../../Context/UserContext'
// import "../node_modules/wow.js/css/libs/animate.css"
// import "../node_modules/wow.js/src/WOW.js"
// import "../node_modules/wow.js/dist/wow.js"



export default function Login() {
	let {userLogin , setuserLogin}=useContext(UserContext)
	const[emailFound,setemailFound] = useState(null);
	const[spinner , setspinner]=useState(false);
	let navigate = useNavigate();
	
	useEffect(()=>{
		if(localStorage.getItem("userToken")){
			navigate("/")
			navigate("/home")
		}
	},[])


	function signIn(values){
		setspinner(true);
	axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
	.then((res)=>{
		localStorage.setItem("userToken" , res.data.token)
		setspinner(false);
		setuserLogin(res.data.token);
		navigate("home")

		// if(userLogin!==null){
		// 	return <Home/>
		// }
	})
	.catch((res)=>{
		setemailFound(res.response.data.message)
		setspinner(false);	
	})		
	}



	let validationSchema = yup.object().shape({
		email:yup.string().email("Invalid email format").required("Mail is required"),
		password:yup.string().required("Password Is Required").matches(/^[0-9]{6}$/),
	})
	let formik = useFormik({
		initialValues:{
			email:"",
			password:"",
		},
		validationSchema:validationSchema,
		onSubmit: signIn
	})



  return (
<>



	{/* {sucess?<div className='text-2xl bg-emerald-500 w-full md:w-1/3 mx-auto my-2 rounded-lg text-white p-1'>{sucess}</div>:null} */}
	{emailFound?<div className='text-2xl w-full md:w-1/3 mx-auto my-2 rounded-lg text-red-600 p-1'>{emailFound}</div>:null}
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-5 ">



<div className='box-shadow p-5 rounded-lg'>
<h2  className='text-3xl text-emerald-600 font-mono font-bold'>Sign In</h2>
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
		{formik.errors.email && formik.touched.email? <div className='text-red-600 my-3 '>
			<h2 className='text-2xl'>{formik.errors.email}</h2>
		</div>:null}
{/* end error email */}


	{/* password */}
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
  {formik.errors.password && formik.touched.password? <div className=' text-red-600 rounded-lg my-4'>
			<h2 className='text-2xl w-full'>{formik.errors.password}</h2>
		</div>:null}

{/* button */}
  <button type="submit" className="outline-emerald-600 outline p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300 w-full">
  {/* spinner or loader till the response is here */}
  {spinner?<i className='fa-solid fa-spinner animate-spin'></i>:"Submit"}</button>
</div>

  </form>


</>
  )
}
