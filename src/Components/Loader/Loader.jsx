import React from 'react'

export default function Loader() {
  return (
<>
	<div className='flex myLoader justify-center items-center gap-2 flex-col absolute left-[50%] top-[50%]'>
	<a className="flex items-center justify-center gap-2 ">
		<i className="fa-solid fa-cart-shopping text-emerald-300 text-3xl"></i>
            <span className="self-center text-3xl font-semibold whitespace-nowrap">Fresh Cart</span>
        </a>
		
		<div className='progress'></div>
	</div>
</>
  )
}
