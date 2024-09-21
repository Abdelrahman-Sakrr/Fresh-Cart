import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [myCart, setmyCart] = useState(null);
  const [loader , setloader] = useState(false)

  let {GetUserCart , DeleteProductCart , UpdateProdcutCount , ClearUserCart} = useContext(CartContext)

  useEffect(()=>{
    GetLoggedUserCart();
  },[])

  async function GetLoggedUserCart(){
        setloader(true)
        try{
          let response = await GetUserCart();
          if (response?.data?.data) {
            setloader(false)
            setmyCart(response.data.data);
          }else{
            setloader(false)
            return
          }
        }catch{
          setloader(false)
            return
        }
        
  }




  async function DeletedProductFromCart(id){
    setloader(true)
    let response = await DeleteProductCart(id);
    if(response.data.status == "success"){
      toast.success("Deleted")
      setmyCart(response.data.data)
      setloader(false)
      }else{
        setloader(false)
        toast.error("error")
      }
    // console.log(response);
  }

  async function ToUpdateProductQuantity(id , newCount){
    setloader(true)
    let response = await UpdateProdcutCount(id , newCount)
    // console.log(response);
    if(newCount<=0){
      DeletedProductFromCart(id);
      setloader(false)
    }
    if(response.data.status == "success"){
    toast.success("Product Updated Successfully!")
    setmyCart(response.data.data)
    setloader(false)
    }else{
      setloader(false)
      toast.error("error")
    }
  }

 async function ToClearUserCart(){
  setloader(true)
  let response = await ClearUserCart()
  setmyCart(response.data.data)
    // console.log(response.data.message);
    
  if(response.data.message == "success"){
    toast.success("Cart Cleared")
    setmyCart(response.data.data)
    setloader(false)
    }else{
      setloader(false)
      toast.error("error")
    }
  }





  return (
<>
	{loader?<Loader/>
  :<>
  {myCart?.products.length>0?<>
  <h2 className='text-emerald-500 text-2xl my-5 font-bold'>Total Price = {myCart?.totalCartPrice}</h2>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white uppercase bg-emerald-500">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 text-lg">
          Product
        </th>
        <th scope="col" className="px-6 py-3 text-lg">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 text-lg">
          Price
        </th>
        <th scope="col" className="px-6 py-3 text-lg">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {myCart?.products.map((product)=>
      <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        {/* image */}
      <td className="p-4 ">
        <img src={product.product.imageCover}  className="w-32 md:w-32 max-w-full max-h-full rounded-full" alt="Apple Watch" />
      </td>
      {/* title */}
      <td className="px-6 py-4 font-semibold text-emerald-500 text-2xl">
       {product.product.title}
      </td>
      {/* update quantity */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          {/* - */}
          <button 
          onClick={()=>ToUpdateProductQuantity(product.product.id ,product.count-1)} className="h-6 w-6 p-3 mx-2 rounded-full bg-gray-700 text-white text-center flex justify-center items-center hover:bg-gray-500 transition-all duration-300" type="button">
            -
          </button>
          {/* number */}
          <div>
            <span className='bg-gray-700 text-white p-3 w-10 h-10 rounded-3xl cursor-pointer hover:bg-gray-500 duration-300 transition-all'>
                {product.count}
            </span>
          </div>

          {/* + */}
          <button 
          onClick={()=>ToUpdateProductQuantity(product.product.id ,product.count+1)} className="h-6 w-6 p-3 mx-2 rounded-full bg-gray-700 text-white text-center flex justify-center items-center hover:bg-gray-500 transition-all duration-300" type="button">
            +
          </button>
       
        </div>
      </td>
      {/* price */}
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
       ${product.price * product.count}
      </td>
      {/* remove button */}
      <td className="px-6 py-4">
        <button onClick={()=>DeletedProductFromCart(product.product.id)}  className="font-medium bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition-all duration-300">Remove</button>
      </td>
    </tr>
    )}



    </tbody>
  </table>
</div>

<div className='my-5'>
  <Link to="/checkout" className='bg-emerald-700 text-gray-100 rounded-2xl  hover:bg-emerald-500 transition-all duration-300 !px-20 py-3  !my-8'>CheckOut Now</Link>
  <br />
  <button className='bg-red-700 text-gray-100 rounded-2xl  hover:bg-red-500 transition-all duration-300 px-20 py-3 my-5 ' onClick={()=>ToClearUserCart()}>Clear Cart</button>
</div>
</>:<><h2 className='capitalize text-red-700 text-4xl my-8 font-bold'>no items in the cart</h2> <span className="loader text-5xl w-1/2 text-red-700"></span></>}

  </>}


</>
  )
}
