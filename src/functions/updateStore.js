import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./../config/firebase";

const updateStore = async (storeId, store, image="") => {
	console.log("UpdateStore", store);
	const storeRef = doc(db, "market", storeId);
	await setDoc(storeRef, store, { merge: true });
	console.log("updated store Id: ", storeId);
	if (image !== "") {
		const storageRef = ref(storage, "images/" + storeId + ".png");
		uploadBytes(storageRef, image);
		console.log("image uploaded: " + storeId);
	}
	return storeId;
}

export default updateStore;