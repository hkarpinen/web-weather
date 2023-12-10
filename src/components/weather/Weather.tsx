import {useEffect, useState} from "react";
import {GeoCoordinates, getUserAgentGeographicCoordinates} from "../../helpers/LocationHelpers"
import {CurrentResponse, Unit} from "openweathermap-ts/dist/types";
import Container from "react-bootstrap/Container";
import {
    getOpenWeatherMapClientUnits,
    openWeatherClientHasCityNameSet,
    openWeatherMapClient
} from "../../helpers/OpenWeatherMap";
import WeatherInformation from "./WeatherInformation";
import WeatherMap from "./WeatherMap";
import {Col, Row} from "react-bootstrap";
import WeatherSearch from "./WeatherSearch";

function Weather() {
    const [weather, setWeather] = useState<CurrentResponse>();
    const [geoCoordinates, setGeoCoordinates] = useState<GeoCoordinates>();
    const [metricUnit, setMetricUnit] = useState<Unit>('imperial');
    const [searchError, setSearchError] = useState<boolean>(false);
    const [error, setError] = useState<any>();

    useEffect(() => {
        getUserAgentGeographicCoordinates(() => setError('Could not load user geo coordinates'))
            .then((position) => {
                const { longitude, latitude } = position;
                setGeoCoordinates({ latitude, longitude });
                openWeatherMapClient.getCurrentWeatherByGeoCoordinates(latitude, longitude)
                    .then((res) => setWeather(res))
                    .catch((err) => setError(err));
            })
    }, [])

    if(error) {
        return <p>{error}</p>
    }

    const updateWeatherBasedOffUserInput = (userInput: string) => {
        if(!userInput) {
            setSearchError(true);
            return;
        }

        const locationProperties = userInput
            .split(',')
            .filter((input) => input.length > 0)
            .map((input) => input.trim());

        switch (locationProperties.length) {
            case 1:
                if(typeof locationProperties[0] != "string") {
                    openWeatherMapClient.setZipCode(locationProperties[0]);
                } else {
                    openWeatherMapClient.setCityName({
                        cityName: locationProperties[0]
                    });
                }
                break;
            case 2:
                openWeatherMapClient.setCityName({
                    cityName: locationProperties[0],
                    state: locationProperties[1]
                });
                break;
        }
        getLatestWeatherByCurrentCityNameAndUpdateState();
    }

    const getLatestWeatherByCurrentCityNameAndUpdateState = () => {
        openWeatherMapClient.getCurrentWeatherByCityName().then((weatherData: CurrentResponse) => {
            const coords = weatherData.coord;
            openWeatherMapClient.setGeoCoordinates(coords.lat, coords.lon);
            setGeoCoordinates({
                longitude: coords.lon,
                latitude: coords.lat
            })
            setWeather(weatherData);
            if(searchError) {
                setSearchError(false);
            }
        }).catch(() => {
            setSearchError(true);
        })
    }

    const getLatestWeatherByCurrentGeoCoordinatesAndUpdateState = () => {
        openWeatherMapClient.getCurrentWeatherByGeoCoordinates().then((weatherData) => {
            setGeoCoordinates({
                longitude: weatherData.coord.lon,
                latitude: weatherData.coord.lat
            })
            setWeather(weatherData);
        }).catch((err) => setError(err))
    }

    const updateMetricUnits = (unit: Unit) => {
        setMetricUnit(unit);
        openWeatherMapClient.setUnits(unit);
        openWeatherClientHasCityNameSet() ?
            getLatestWeatherByCurrentCityNameAndUpdateState() :
            getLatestWeatherByCurrentGeoCoordinatesAndUpdateState()
    }


    return <Col className='d-flex flex-column justify-content-center p-0'>
        <Container className='d-flex flex-column h-100 border-1 border-start border-end'>
            <Row>
                {(!weather && geoCoordinates) && <p>Loading Weather Data...</p>}
                {weather && <WeatherInformation
                    weatherData={weather}
                    currentMetricUnit={getOpenWeatherMapClientUnits() || 'imperial' }
                />}
            </Row>
            <Row md='auto'>
                <WeatherSearch
                    updateWeatherBasedOffUserInput={updateWeatherBasedOffUserInput}
                    updateMetricUnits={updateMetricUnits}
                    currentMetricUnits={metricUnit}
                    searchError={searchError}
                />
            </Row>
            {(!geoCoordinates && !error) && <p>Loading user geo coordinates</p>}
            {geoCoordinates && <WeatherMap geoCoordinates={geoCoordinates} />}
        </Container>
    </Col>
}

export default Weather;