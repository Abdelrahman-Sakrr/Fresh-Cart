import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';

export default function Categories() {
	const [Categories, setCategories] = useState([])
	const[spinner , setspinner]=useState(false);

	function GetAllCategories(){
		setspinner(true);
		axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
		.then((response)=>{
			setCategories(response.data.data)
			setspinner(false);
		}).catch((response)=>{
			console.log(response.data.data);
			setspinner(false);

		})
	}
	useEffect(()=>{
		GetAllCategories()
	},[])

	return(
		<>
		<div className='row justify-center items-center'>

		
		{Categories?Categories.map((category)=>
				<div key={category._id} className='md:w-1/5 m-5 '>
				<div className=''>
					<img src={category.image} className='md:h-[400px] cursor-pointer sm:h-[200px] w-full object-cover hover:scale-95 transition-all duration-300' alt="" />
					<h4 className='text-2xl text-emerald-500'>{category.name}</h4>
				</div>
		

		</div>)
		:null}
		{spinner?<Loader/>:false	}

</div>	
		</>
	)
}
