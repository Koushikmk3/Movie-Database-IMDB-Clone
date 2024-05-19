import React from 'react'
import Logo from '../Logo.png'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
        <img className='w-[50px]' src={Logo} alt=""/>

        <Link to='/' className='text-3xl text-blue-900 font-bold'>Movies</Link>
        <Link to='/watchlist' className=' text-3xl text-blue-900 font-bold'>WatchList</Link>
        
    </div>
  )
}

export default NavBar