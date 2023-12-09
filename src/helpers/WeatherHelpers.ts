import {Unit} from "openweathermap-ts/dist/types";

export function getTemperatureMetricSymbolFromUnit(unit: Unit) {
    switch (unit) {
        case 'imperial':
            return 'F';
        case 'metric':
            return  'C';
    }
}

export function getWindMeasurementSymbolFromUnit(unit: Unit) {
    switch (unit) {
        case "imperial":
            return 'mph';
        case "metric":
            return 'm/s'
    }
}

export function getWindImageUrlFromSpeedMeasurement(speed: number) {
    if(speed < 20) {
        return '/wind/wind-thin.png';
    } else if(speed > 20 && speed <= 35) {
        return  '/wind/wind-light.png';
    } else if(speed > 35 && speed <= 57) {
        return  '/wind/wind.png';
    } else if(speed > 57) {
        return '/wind/wind-bold.png'
    } else {
        return '/wind/wind.png';
    }
}

export function getWindDirectionFromMeteorologicalMeasurement(measurement: number) {
    if(measurement >= 348.75 && measurement < 33.75) {
        return 'N';
    } else if(measurement >= 33.75 && measurement < 78.75) {
        return 'NE';
    } else if(measurement >= 78.75 && measurement < 123.75) {
        return 'E';
    } else if(measurement >= 123.75 && measurement < 168.75) {
        return 'SE';
    } else if(measurement >= 168.75 && measurement < 213.75) {
        return 'S';
    } else if(measurement >= 213.75 && measurement < 258.75) {
        return 'SE';
    } else if(measurement >= 258.75 && measurement < 303.75) {
        return 'W';
    } else if(measurement >= 303.75 && measurement < 348.75) {
        return 'NW';
    }
}