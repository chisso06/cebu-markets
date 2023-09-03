import React from 'react';
import { FaHome, FaPlus, FaStore } from 'react-icons/fa';

const Footer = () => {
	return (
		<div className='w-full h-12 flex space-x-2 bg-lime-300 absolute bottom-0'>
			<div className='flex-1 m-auto'>
				<a href='/' className='text-2xl'><FaHome className='m-auto' /></a>
			</div>
			<div className='flex-1 m-auto'>
				<a href='/add' className='text-2xl'><FaPlus className='m-auto' /></a>
			</div>
			<div className='flex-1 m-auto'>
				<a href='/store/1' className='text-2xl'><FaStore className='m-auto' /></a>
			</div>
		</div>
	);
};

export default Footer;