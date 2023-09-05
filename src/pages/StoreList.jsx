import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "./../config/firebase";

const StoreList = () => {
	const [stores, setStores] = useState([]);
	useEffect(() => {
		const getStores = async () => {
      console.log("GetStoreList");
      try {
        const storesRef = query(collection(db, "market"));
        const data = await getDocs(storesRef);
        const storeList = data.docs.map((doc) => ({
          ...doc.data(),
          storeId: doc.id,
        }));
        setStores(storeList);
      } catch (err) {
        console.error(err);
      };
    };
    getStores();
  }, []);

	return (
		<div className='my-10'>
			<h1 className='text-xl font-bold mb-10'>Store List</h1>
			<div className='flex flex-col mx-auto space-y-2 w-11/12'>
				{stores.map((store, i) => {
					return (
						<a href={"/store/" + store.storeId} key={i} className="p-4 bg-white rounded">
							{store.name}
						</a>
					)
				})}
			</div>
		</div>
	);
};

export default StoreList;