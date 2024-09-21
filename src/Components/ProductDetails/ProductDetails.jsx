import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
	const [product, setproduct] = useState(null);
	const [relatedProducts, setrelatedProducts] = useState([]);
	let {id , category} = useParams();
	let {addProductToCart} = useContext(CartContext)

	async function addToCart(id){
		let response = await addProductToCart(id)
		if(response.data.status=="success"){
		toast.success(response.data.message)
			}	
			else{
			toast.error(response.data.message)
				}		
			}


	// console.log(category);
	var settings = {
		// centerMode: true,
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay:true,
		autoplaySpeed:1000
	  };

	function GetProductDetails(id){
		axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
		.then((response)=>{
			setproduct(response.data.data);
			// console.log(response.data.data.id);
		})
		.catch((response)=>{
			console.log(response);
		})
	}
	function GetAllCategory(){
		//get all products first
		//then filter by category
		axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
		.then((response)=>{
			setrelatedProducts(response.data.data.filter((product)=>product.category.name==category)) 
			
			
		})
		// .catch((response)=>{console.log(response);
		// })
	}

	useEffect(()=>{
		GetProductDetails(id);
		GetAllCategory();
		// console.log(product);
		
	},[id , category])

  return(
	<>
	{/* {product?.map()} */}
	<div className='row items-center my-5 text-center'>
		<div className='w-1/4 text-center'>
		<Slider {...settings}>
			{product?.images.map((img)=>
				<div key={product?.id}>					    
					<img src={img} className='w-full' alt="" />
				</div>
			)}
			</Slider>
		</div>
		<div className='w-3/4'>
			<div className='p-3'>
				<h2 className='my-2 text-3xl font-bold font-mono'>
					{product?.title}
				</h2>
				<h3>
					{product?.description}
				</h3>
				<h4 className='text-emerald-500 my-5'>
					{product?.category.name}
				</h4>
						<div className='flex justify-around'>
							<span>{product?.price}EGP</span>
							<span><i className='fas fa-star text-yellow-500 mx-2'></i>{product?.ratingsAverage}</span>
						</div>
				<button  className='my-5 px-4 py-2 w-1/2 rounded-lg outline outline-emerald-500 duration-300 transition-all hover:scale-95 hover:bg-emerald-500 hover:text-white' onClick={()=>addToCart(product.id)}>Add To Cart</button>

			</div>
		</div>
	 </div>

<div className='row items-center justify-center'>
{relatedProducts.length>0? relatedProducts.map((product)=>

			
					<div className='md:w-1/6 sm:w-1/2' key={product.id}>
				<div className='product-item my-3 z-10 hover:scale-110 transition-all duration-300'>
				<Link to={`/productdetails/${product.id}/${product.category.name}`}>
					<img src={product.imageCover} className='w-full rounded-full' alt="" />
					<h2 className='text-emerald-500 my-2'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
					<div className='flex justify-around'>
						<span>{product.price}EGP</span>
						<span><i className='fas fa-star text-yellow-500 mx-2'></i>{product.ratingsAverage}</span>
					</div>
				</Link>
					<button className='btn my-2 hover:scale-90 transition-all duration-300'>Add To Cart</button>
		</div>
	</div>)
:<i className='fa-duotone fa-solid fa-compass text-emerald-500 animate-spin absolute right-[50%] top-[50%] text-5xl'></i>}

</div>
	 </>
	
  )
}
