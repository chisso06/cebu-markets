import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { MdWorkspacePremium } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const StorePage = () => {
	const { storeId } = useParams();
	const [store, setStore] = useState({});

	useEffect(() => {
		const sample = {
			name: 'Happy Store',
			category: 'fruits',
			details: 'In our store we sell delicious fruits!\nPlease come and visit us!',
			plus: true,
		};
		setStore(sample);
		console.log(process.env.REACT_APP_YOLP_CLIENT_KEY);
	}, []);

	return (
		<div className='w-5/6 mx-auto'>
			{(() => {
				if (store.plus === true) {
					return (
						<div className='mb-6 flex justify-center items-center'>
							<MdWorkspacePremium className='mr-0.5 text-2xl text-yellow-500' />
							<h1 className='text-xl font-bold text-yellow-500'>{store.name}</h1>
							<a href={'/store/' + storeId + '/edit'}><FaPen className='ml-2 text-gray-400' /></a>
						</div>
					);
				} else {
					return (
						<div>
							<h1 className='mb-6 text-xl font-bold'>{store.name}</h1>
						</div>
					)
				}
			})()}
			<div className="flex mb-6 overflow-x-auto">
				<div className="flex-none w-full">
					<img src='/samples/sample1.jpg' alt='sampleImage1' />
				</div>
				<div className="flex-none w-full">
					<img src='/samples/sample2.jpg' alt='sampleImage2' />
				</div>
				<div className="flex-none w-full">
					<img src='/samples/sample3.jpg' alt='sampleImage3' />
				</div>
				<div className="flex-none w-full">
					<img src='/samples/sample4.jpg' alt='sampleImage4' />
				</div>
			</div>
			<p className='text-left'>
				<strong>Category: </strong>{store.category}
			</p>
			<p className='text-left'>
				<strong>Details: </strong>{store.details}
			</p>
			{/* {(() => {
				if (store.plus === true) {
					return (
						<div>
							<p className='font-bold'>Items:</p>
						</div>
					);
				}
			})()} */}
		</div>
	);
};

export default StorePage;