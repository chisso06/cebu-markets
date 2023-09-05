import { doc, getDoc } from "firebase/firestore";
import { db } from "./../config/firebase";

const getStore = async (storeId) => {
	console.log("GetStore");
	try {
		const storeRef = doc(db, "market", storeId);
		const storeDoc = await getDoc(storeRef);
		const store = storeDoc.data();
		return store;
	} catch(err) {
		console.log(err);
	};
};

export default getStore;