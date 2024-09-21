import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import  { UserContext } from '../../Context/UserContext'
import { Link } from 'react-router-dom'
import HomeSlider from '../HomeSlider/HomeSlider';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';

export default function Home() {
	const [products, setproducts] = useState([])	
	const[spinner , setspinner]=useState(false);
	let {userLogin}= useContext(UserContext)

	let {addProductToCart} = useContext(CartContext) 


	async function addToCart(id){
			let response = await addProductToCart(id)
			if(response?.data?.status=="success"){
	// console.log(response.data.message);
	toast.success(response?.data?.message)
}		else{
	// console.log(response.data.message);
	toast.error("error")

}		
	}
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
	function getProducts(){
		setspinner(true)
		axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
		.then((response)=>{
		setproducts(response.data.data);
		setspinner(false)
		})
		.catch(()=>{
			setspinner(false)
		})
	}
	useEffect(()=>{
		getProducts();
	},[])
	//rgb(30 41 59)=> bg-slate-800

	return (
		<>
		   <HomeSlider/>

		{userLogin!==null?<div className='flex flex-wrap justify-center items-center gap-3'>
			{products.length>0? products.map((product)=>
			
				<div className='md:w-1/6 sm:w-1/2 p-2' key={product.id}>
					<div className='product-item my-3 z-10 hover:scale-95  transition-all duration-300'>
					<Link to={`/productdetails/${product.id}/${product.category.name}`}>
						<img src={product.imageCover} className='w-full rounded-full' alt="" />
							<h2 className='text-emerald-500 my-2'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
						<div className='flex justify-around'>
							<span>{product.price}EGP</span>
							<span><i className='fas fa-star text-yellow-500 mx-2'></i>{product.ratingsAverage}</span>
						</div>
					</Link>
						<button onClick={()=>addToCart(product.id)} className='btn my-2 hover:scale-90 hover:drop-shadow-2xl  transition-all duration-300'>Add To Cart</button>
			</div>
		</div>):<Loader/>}


</div>:null}




		</>
		
  )
}


