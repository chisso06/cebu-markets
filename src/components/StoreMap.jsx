import MapboxLanguage from "@mapbox/mapbox-gl-language";
import React, { useState } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Map, Marker, NavigationControl } from 'react-map-gl';

const StoreMap = ({page, style, stores}) => {
	console.log(stores);
	// const [showModal, setShowModal] = useState(false);
	const [zoom, setZoom] = useState(15);

  const onLoadMap = (e) => {
    const map = e?.target;
    if (map) {
      // 言語設定
      const language = new MapboxLanguage({
        defaultLanguage: "en",
      });
      map.addControl(language);
      language._initialStyleUpdate();
    }
  }

	// const openModal = () => {
	// 	setShowModal(true);
	// }

	return (
		<Map
			initialViewState={{
				latitude: 10.293330461151596,
				longitude: 123.89935715198042,
				zoom, zoom,
			}}
			mapStyle="mapbox://styles/mapbox/streets-v11"
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			style={style}
			attributionControl={false}
			// onDragEnd={onDragEnd}
			onLoad={onLoadMap}
		>
			{stores.map((store, i) => { return (
				<div key={i}>
					<Marker
						latitude={store.lat}
						longitude={store.lng}
					>{(() => {
						if (page === "add" || page === "store") {
							return (<FaMapMarkerAlt className="text-pink-500 text-2xl" />)
						} else if (store.plus) {
							return (
								<a href={"/store/" + store.storeId}>
									<FaMapMarkerAlt className="text-yellow-500 text-lg" />
								</a>
							);
						} else {
							console.log("normal pin");
							return (
								<a href={"/store/" + store.storeId}>
									<FaMapMarkerAlt className="text-lg" />
								</a>
							)
						}
					})()}
					</Marker>
					{/* {showModal ? (
						<StoreModal store={store} setShowModal={setShowModal} />
					) : (
						<></>
					)} */}
				</div>
			)})}
			<NavigationControl />
		</Map>
	)
}

export default StoreMap;
