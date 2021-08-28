import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { useAuth, getUprofile } from "./AuthProvider";

export const MapContext = React.createContext();

const MapProvider = ({ children }) => {
  const { user } = useAuth();
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    const placesRealm = await user.callFunction("getPlaces");
    placesRealm.map((place) => {
      places.push({
        _id: place._id,
        name: place.name,
        address: place.address,
        partition: place.partition,
        coordinate: {
          latitude: place.coordinates.lat,
          longitude: place.coordinates.long,
        },
      });
    });
    return places;
  };

  // Charge les données sur les places
  useEffect(() => {
    getPlaces().then((result) => setPlaces(result));
    const placesUpdate = setInterval(() => {
      getPlaces().then((result) => setPlaces(result));
    }, 60000);
    return () => {
      clearInterval(placesUpdate);
      setPlaces(null);
    };
  }, [places]);

  return (
    <MapContext.Provider
      value={{
        places,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const useMap = () => {
  const map = useContext(MapContext);
  if (map == null) {
    throw new Error("useMap() called outside of a AuthProvider?");
  }
  return map;
};

export { MapProvider, useMap };
