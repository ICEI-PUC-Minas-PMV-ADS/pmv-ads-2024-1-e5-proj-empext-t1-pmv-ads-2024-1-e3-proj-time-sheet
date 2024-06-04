import React from "react";
import * as local  from "expo-location"

export function useLocation(){
    const[lat, setLat] =React.useState(0);
    const[long, setLong] = React.useState(0);
    const[latLoja, setLatLoja] = React.useState(-3.803148);
    const[longLoja, setLongLoja] = React.useState(-38.550105);
    const [locationValid, setLocationValid] = React.useState(true);


  async function checkLocation(){
      let pos = await local.getCurrentPositionAsync()
      setLat(pos.coords.latitude)
      setLong(pos.coords.longitude)
  
  if((lat <= latLoja + 0.0045 && lat >= latLoja - 0.0045 ) && (long <= longLoja +0.0045 && lat >= latLoja - 0.0045)){

      setLocationValid(true)
      return(true)
  } else{
      setLocationValid(false)
      return(false)
  }
}
  return{
    locationValid,checkLocation
  }
}
   