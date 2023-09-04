import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import StoreMap from '../components/StoreMap';
import { db } from "./../config/firebase";

const Top = () => {
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
		<div>
			<StoreMap
				page="top"
				style={{ height: "100vh", width: "100%" }}
				stores={stores}
			/>
		</div>
	)
}

/*
	const Top = () => {
		const mapContainer = useRef(null);
		const map = useRef(null);
		const [lat, setLat] = useState(10.291527708436218);
		const [lng, setLng] = useState(123.89917189987118);
		const [zoom, setZoom] = useState(15);
		useEffect(() => {
			if (map.current) return; // initialize map only once
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [lng, lat],
				zoom: zoom,
			});
			const marker = new mapboxgl.Marker()
				.setLngLat([lng + 1, lat + 1])
				.addTo(map);
			// const language = new MapboxLanguage();
		}, []);
		useEffect(() => {
			if (!map.current) return; // wait for map to initialize
			map.current.on('move', () => {
				setLng(map.current.getCenter().lng.toFixed(4));
				setLat(map.current.getCenter().lat.toFixed(4));
				setZoom(map.current.getZoom().toFixed(2));
			});
		}, []);
		return (
			<div>
				<div className="sidebar">
					Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
				</div>
				<div ref={mapContainer} className='map-container'/>
			</div>
		);
	};
*/

export default Top;