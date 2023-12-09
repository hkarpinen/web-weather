export interface GeoCoordinates {
    latitude: number,
    longitude: number
}

export function getUserAgentGeographicCoordinates(fallback: any) : Promise<GeoCoordinates> {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position.coords);
            })
        } else {
            reject('Geolocation is not supported by this browser.');
        }
    })
}