import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function HomeSlider() {
	const [SliderDetails, setSliderDetails] = useState([])
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 1,
		autoplay:true,
		autoplaySpeed:1000,
		responsive:[{
			breakpoint: 640,
			settings:{
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay:true,
				autoplaySpeed:1000,

			}
		},
		{
		breakpoint: 768,
		settings:{
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay:true,
			autoplaySpeed:1000,
		}
		}
	]
	  };

	function GetCategory(){
		axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
		.then((response)=>{
			setSliderDetails(response.data.data)
			// console.log(response.data.data.name);
			// console.log(response.data.data.image);
			
		}).catch((response)=>{console.log(response);
		})
	}
	useEffect(()=>{
		GetCategory()
	},[])
	
	return(
		<>
		<Slider {...settings} key={1}>
		{SliderDetails?SliderDetails.map((product)=>
			<div className='w-full my-5  cursor-pointer' key={product._id}>
				<img src={product.image} className='md:h-[200px] sm:h-[50px] w-full object-cover hover:scale-95 transition-all duration-300' alt="" />
				<h3 className='text-emerald-500'>{product.name}</h3>
			</div>
		
		):null}
		</Slider>

		</>
	)
}
