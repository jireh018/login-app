import React from 'react'
import {Link} from 'react-router-dom'
import errorImg from '../assets/images/not-found.svg'

const Error = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className=''>
        <img src={errorImg} alt='not found' />
        <div className='text-center'>
          <h3 className='uppercase font-bold'>Ohh! 404 - page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <button class="bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full">
          <Link to='/'>Go To HomePage</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

//blue-500 blue-700
export default Error
