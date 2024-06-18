import React from "react";
import * as local from "expo-location"

const locationStatus = {
  Onsite: 0,
  Offsite: 1,
  Denied: 2
}

export function useLocation() {

  const [location, setLocation] = React.useState(locationStatus.Offsite);

  const targetLocation = {
    latitude: -23.463708429791517,
    longitude:  -46.55305690694249
  };

  async function checkLocation() {

    let { status } = await local.requestForegroundPermissionsAsync();

    if (status !== 'granted') {

      setLocation(locationStatus.Denied);

      return locationStatus.Denied;
    }

    let loc = await local.getCurrentPositionAsync({});

    const dLat = (targetLocation.latitude - loc.coords.latitude);
    const dLon = (targetLocation.longitude - loc.coords.longitude);

    if (Math.abs(dLat) > 0.00045 || Math.abs(dLon) > 0.00045) {

      setLocation(locationStatus.Offsite);

      return locationStatus.Offsite;
    }

    setLocation(locationStatus.Onsite);

    return locationStatus.Onsite;
  }

  return { location, checkLocation }
}
