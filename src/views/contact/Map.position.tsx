import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {type FC} from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  name?: string;
}

const MapComponent: FC<MapProps> = ({
  latitude,
  longitude,
  name = "Emplacement",
}) => {
  const position: [number, number] = [latitude, longitude];

  return (
    <Box w="90%" h="400px" rounded="sm" overflow="hidden" boxShadow="lg">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
