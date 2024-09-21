import axios from "axios";
import { createContext} from "react";

export let CartContext= createContext();


export default function CartContextProvider(props){

	
	let headers = {token:localStorage.getItem("userToken")}

function addProductToCart(productId){
	return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,		
		{productId:productId},
		{headers})
	.then((response)=>response)
	.catch((error)=>error)
}

function GetUserCart(){
		return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers:headers})
		.then((response)=>response)
		.catch((error)=>error)
  }

  function DeleteProductCart(id){
	return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
		{headers}
	)
	.then((response)=>response)
	.catch((error)=>error)
  }
  function UpdateProdcutCount(id,newCount){
	return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
		{count:newCount},{headers}
	)
		.then((response)=>response)
		.catch((error)=>error)
  }

  function ClearUserCart(){
	return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
	.then((response)=>response)
	.catch((error)=>error)
  }

  	function checkOutSession(cartId , url , formData){
		axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` , {
			shippingAddress:formData
		},{headers}).then((res)=>{
			console.log(res);
		}).catch((err)=>{
			console.log(err)
		})

	}




return(
	<>
	<CartContext.Provider value={{addProductToCart , GetUserCart , DeleteProductCart , UpdateProdcutCount , ClearUserCart , checkOutSession}}>
		{props.children} 
	</CartContext.Provider>
	</>
)

}