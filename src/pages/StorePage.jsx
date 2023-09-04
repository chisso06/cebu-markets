import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { MdWorkspacePremium } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from "./../config/firebase";

const StorePage = () => {
	const { storeId } = useParams();
	const navigate = useNavigate();
	const [store, setStore] = useState({});
	const [imageURI, setImageURI] = useState("");

	useEffect(() => {
		const getStore = async () => {
      console.log("GetStore");
      try {
        const storeRef = doc(db, "market", storeId);
        const storeDoc = await getDoc(storeRef);
        const store = storeDoc.data();
        setStore(store);
      } catch(err) {
        console.log(err);
      };
    };
		getStore();
		if (store.plus === false) {
			navigate("/");
		}
		getDownloadURL(ref(storage, "gs://eventgo-b229a.appspot.com/images/" + storeId + ".png"))
			.then((url) => {
				console.log(url);
				setImageURI(url);
			})
			.catch((err) => { console.log(err) })
	}, []);

	return (
		<div className='w-5/6 mx-auto my-10'>
			<div className='mb-6 flex justify-center items-center'>
				<MdWorkspacePremium className='mr-0.5 text-2xl text-yellow-500' />
				<h1 className='text-xl font-bold text-yellow-500'>{store.name}</h1>
				<a href={'/store/' + storeId + '/edit'}>
					<FaPen className='ml-2 text-gray-400' />
				</a>
			</div>
			<img
				src={imageURI}
				alt='sampleImage1'
				className="mb-6"
			/>
			{/* <div className="flex mb-6 overflow-x-auto">
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
			</div> */}
			<p className='text-left'>
				<strong>Category: </strong>{store.category}
			</p>
			<p className='text-left'>
				<strong>Details: </strong>{store.details}
			</p>
			{/*
				<div>
					<p className='font-bold'>Items:</p>
				</div>
			*/}
		</div>
	);
};

export default StorePage;