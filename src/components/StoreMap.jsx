import MapboxLanguage from "@mapbox/mapbox-gl-language";
import React, { useState } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Map, Marker, NavigationControl } from 'react-map-gl';
import { StoreModal } from './index';

const StoreMap = ({page, style, stores}) => {
	const [showModal, setShowModal] = useState(false);
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

	const openModal = () => {
		setShowModal(true);
	}

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
							if (page === "add") {
								console.log("add pin");
								return (<FaMapMarkerAlt className="text-pink-500" />)
							} else if (store.plus) {
								console.log("plus pin");
								return (
									<a href={"/store/" + store.storeId}>
										<FaMapMarkerAlt className="text-yellow-500"/>
									</a>
								);
							} else {
								console.log("normal pin");
								return (
									<button onClick={openModal} className="text-lime-500">
										<FaMapMarkerAlt />
									</button>
								)
							}
						})()}
					</Marker>
					{showModal ? (
						<StoreModal store={store} setShowModal={setShowModal} />
					) : (
						<></>
					)}
				</div>
			)})}
			<NavigationControl />
		</Map>
	)
}

export default StoreMap;
