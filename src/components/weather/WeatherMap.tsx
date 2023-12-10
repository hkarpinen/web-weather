import {useEffect, useState} from "react";
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import {MapContainer, TileLayer, TileLayerProps, useMap } from "react-leaflet";
import Container from "react-bootstrap/Container";
import {Image, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {GeoCoordinates} from "../../helpers/LocationHelpers";

function WeatherMap(props: {
    geoCoordinates: GeoCoordinates
}) {
    const [componentMounted, setComponentMounted] = useState<boolean>()
    const [weatherLayerTemplateURL, setWeatherLayerTemplateURL] = useState<string | null>()
    const [layerAttribution, setLayerAttribution] = useState<string>();
    const API_KEY =  process.env.REACT_APP_API_KEY;

    useEffect(() => {
        setComponentMounted(true);
    })

    const updateWeatherLayerAndTemplateURL = (newTemplateURL: string | null) => {
        setWeatherLayerTemplateURL(weatherLayerTemplateURL === newTemplateURL ? null : newTemplateURL);
    }

    const WeatherToolbarButton = (props: {
        imgSrc: string,
        templateURL: string | null,
        tooltipText: string,
        attribution?: string
    }) => {
        return <li>
            <Button
                className='bg-body border rounded-0'
                onClick={() => {
                    updateWeatherLayerAndTemplateURL(props.templateURL);
                    setLayerAttribution(props.attribution);
                }}
                data-toggle="tooltip"
                data-placement="right"
                title={props.tooltipText}
                >
                <Image src={props.imgSrc} width={25} height={25} />
            </Button>
        </li>
    }


    if(componentMounted) {
        const { latitude, longitude } = props.geoCoordinates;
        return (
            <>
                <Row>
                    <ul className='d-flex list-unstyled m-0 p-0'>
                        <WeatherToolbarButton
                            imgSrc='map_toolbar/reset.png'
                            templateURL={null}
                            tooltipText="Remove all layers"
                        />
                        <WeatherToolbarButton
                            imgSrc='map_toolbar/cloud.png'
                            templateURL={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                            tooltipText="Add cloud layer"
                            attribution="Open Weather Map"
                        />
                        <WeatherToolbarButton
                            imgSrc='map_toolbar/precipitation.png'
                            templateURL={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                            tooltipText="Add precipitation layer"
                            attribution="Open Weather Map"
                        />
                        <WeatherToolbarButton
                            imgSrc= 'atmosphere/pressure.png'
                            templateURL={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                            tooltipText="Add Sea level pressure layer"
                            attribution="Open Weather Map"
                        />
                        <WeatherToolbarButton
                            imgSrc='wind/wind.png'
                            templateURL={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                            tooltipText="Add wind layer"
                            attribution="Open Weather Map"
                        />
                        <WeatherToolbarButton
                            imgSrc='temp/temp-low.png'
                            templateURL={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                            tooltipText="Add temperature layer"
                            attribution="Open Weather Map"
                        />
                        <WeatherToolbarButton
                            imgSrc='map_toolbar/cycling.png'
                            templateURL={'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'}
                            tooltipText={"Add bicycling layer"}
                            attribution="CyclOSM"
                        />
                    </ul>
                </Row>
                <Row className='flex-grow-1 p-0' sm={12}>
                    <MapContainer
                        key={latitude}
                        className='h-100'
                        style={{
                            minHeight: '400px'
                        }}
                        center={[latitude, longitude]}
                        zoom={13}
                        scrollWheelZoom={true}
                        zoomControl={false}
                    >
                        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='Open Street Map' />
                        {weatherLayerTemplateURL && <TileLayer url={weatherLayerTemplateURL} attribution={layerAttribution} />}
                    </MapContainer>
                </Row>
        </>
        )
    }

    return (
        <Container>
            Loading Weather Map...
        </Container>
    )
}

export default WeatherMap;