import React from "react";
import { FaPen } from 'react-icons/fa';

const StoreModal = ({store, setShowModal}) => {
	console.log(store);
	return (
		<div id="overlay">
			<div id="content" className="p-5 rounded">
				<div className="mb-5 space-y-2">
					<div className='mb-6 flex justify-center items-center'>
						<h1 className='text-xl font-bold'>{store.name}</h1>
						<a href={'/store/' + store.storeId + '/edit'}>
							<FaPen className='ml-2 text-gray-400' />
						</a>
					</div>
					<p className="text-base"><strong>category: </strong><br/>{store.category}</p>
					<p className="text-base"><strong>details: </strong><br/>{store.details}</p>
				</div>
				<button onClick={() => setShowModal(false)} className="px-2 bg-lime-500 text-slate-50 rounded">Close</button>
			</div>
		</div>
	)
};

export default StoreModal;