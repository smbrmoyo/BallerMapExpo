import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { useAuth, getUprofile } from "./AuthProvider";

export const MapContext = React.createContext();

const MapProvider = ({ children }) => {
  const { user } = useAuth();
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    const placesRealm = await user.callFunction("getPlaces");
    let temp = [];
    placesRealm.map((place) => {
      temp.push({
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
    return temp;
  };

  // Charge les données sur les places
  useEffect(() => {
    getPlaces().then((result) => setPlaces(result));

    const placesUpdate = setInterval(() => {
      getPlaces().then((result) => setPlaces(result));
      console.log("from provider");
    }, 1800000);
    return () => {
      clearInterval(placesUpdate);
      setPlaces(null);
    };
  }, []);

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
