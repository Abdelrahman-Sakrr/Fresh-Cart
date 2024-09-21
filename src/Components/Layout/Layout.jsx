import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
	<>
			<Navbar/>
		<div className='container mx-auto py-16 md:py-10'>
			<Outlet/>
		</div>
			<Footer/>
	</>

  )
}
