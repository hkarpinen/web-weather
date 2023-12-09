import OpenWeatherMap from "openweathermap-ts";
import {GeoCoordinates, getUserAgentGeographicCoordinates} from "./LocationHelpers";

const openWeatherMap_API_KEY = process.env.REACT_APP_API_KEY;

if(!openWeatherMap_API_KEY) {
    throw new Error('NO OpenWeatherMap API Key defined');
}

export const openWeatherMapClient = new OpenWeatherMap({
    apiKey: openWeatherMap_API_KEY,
    units: 'imperial'
});

export function openWeatherClientHasCityNameSet() {
    return openWeatherMapClient.getAllLocations().city.cityName !== undefined;
}

getUserAgentGeographicCoordinates(() => {
    console.log('Could not get user geocoordinates')
})
    .then((userCoordinates: GeoCoordinates) => {
        openWeatherMapClient.setGeoCoordinates(userCoordinates.latitude, userCoordinates.longitude);
    })

export function getOpenWeatherMapClientUnits() {
    return openWeatherMapClient.getAllSettings().units;
}