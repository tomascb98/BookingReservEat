import { GoogleMap } from "@react-google-maps/api";

import React from "react";

const Map = () => {
  return <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }}   mapContainerClassName="map-container"></GoogleMap>;
};

export default Map;
