import React from "react";
import local from "expo-location"

export default function Location(){
    const[lat, setLat] =React.useState(0);
    const[long, setLong] = React.useState(0);
    const[latLoja, setLatLoja] = React.useState(-20.297);
    const[longLoja, setLongLoja] = React.useState(-40.297);

   (async ()=>{ 
        let pos = await local.getCurrentPositionAsync()
        setLat(pos.coords.latitude)
        setLong(pos.coords.longitude)
        }
    )
    
    if((lat <= latLoja + 0.001 && lat >= latLoja - 0.001 ) && (long <= longLoja +0.001 && lat >= latLoja - 0.001)){
        return(true)
    } else{
        return(false)
    }


}