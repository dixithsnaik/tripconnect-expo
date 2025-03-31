import { useState, useEffect } from "react";
import { LocationObject, getCurrentPositionAsync, watchPositionAsync, Accuracy } from "expo-location";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const useTrackingPath = (source: "current" | Coordinates, destination: Coordinates) => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(null);
  const [path, setPath] = useState<{ from: Coordinates; to: Coordinates } | null>(null);

  useEffect(() => {
    let watchSubscription: { remove: () => void } | null = null;

    const fetchLocation = async () => {
      if (source === "current") {
        try {
          const location: LocationObject = await getCurrentPositionAsync({ accuracy: Accuracy.High });
          const { latitude, longitude } = location.coords;

          setCurrentPosition({ latitude, longitude });
          setPath({ from: { latitude, longitude }, to: destination });

          // Start tracking movement
          watchSubscription = await watchPositionAsync(
            { accuracy: Accuracy.High, timeInterval: 2000, distanceInterval: 5 },
            (location) => {
              setCurrentPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            }
          );
        } catch (error) {
          console.error("Error getting location:", error);
        }
      } else {
        setCurrentPosition(source);
        setPath({ from: source, to: destination });
      }
    };

    fetchLocation();

    return () => {
      watchSubscription?.remove();
    };
  }, [source, destination]);

  return { currentPosition, path };
};

export default useTrackingPath;

