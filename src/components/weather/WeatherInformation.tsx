import {CurrentResponse, Unit} from "openweathermap-ts/dist/types";
import {Col, Image, Row} from "react-bootstrap";
import React from "react";
import {
    convertUnixUtcTimeToLocaleTime,
    getCurrentDatetimeForUser
} from "../../helpers/TimeHelpers"
import {
    getWindMeasurementSymbolFromUnit,
    getWindDirectionFromMeteorologicalMeasurement,
    getWindImageUrlFromSpeedMeasurement,
    getTemperatureMetricSymbolFromUnit
} from "../../helpers/WeatherHelpers"
import { Accordion } from "react-bootstrap";

function WeatherInformation(props: {
    weatherData: CurrentResponse,
    currentMetricUnit: Unit
}) {
    const {
        main,
        name,
        weather,
        wind,
        sys,
        visibility
    } = props.weatherData;

    const temperatureMetricSymbol = getTemperatureMetricSymbolFromUnit(props.currentMetricUnit)
    const windMetricSymbol = getWindMeasurementSymbolFromUnit(props.currentMetricUnit);
    const windDirection = getWindDirectionFromMeteorologicalMeasurement(wind.deg);

    const WeatherStatistic = (props: {
        imgSrc: string,
        data: string,
        tooltipText: string
    }) => {
        return <Col
            sm={5}
            xs={3}
            className='d-flex align-items-center'
            data-toggle="tooltip"
            data-placement="bottom"
            title={props.tooltipText}
            >
                <Image src={props.imgSrc} />
                <p className='m-0' style={{
                    paddingLeft: '5px'
                }}>
                    {props.data}
                </p>
            </Col>
    }

    return (
        <Col>
            <Row md='auto' className='align-items-center pt-3'>
                <Col>
                    <h4 className='m-0 p-1'>{name}, {sys.country}</h4>
                </Col>
                <Col className='h-100'>
                    <p className='m-0'>{getCurrentDatetimeForUser()}</p>
                </Col>
            </Row>
            <Row md='auto' className='p-1'>
                <WeatherStatistic
                    imgSrc={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
                    data={`${Math.round(main.temp)} ${temperatureMetricSymbol} (Feels like ${Math.round(main.feels_like)}${temperatureMetricSymbol})`}
                    tooltipText='Current Temperature'
                />
                <WeatherStatistic
                    imgSrc={'temp/temp-low.png'}
                    data={`${Math.round(main.temp_min)} ${temperatureMetricSymbol}`}
                    tooltipText={`Today's lowest temperature`}
                />
                <WeatherStatistic
                    imgSrc={'temp/temp-high.png'}
                    data={`${Math.round(main.temp_max)} ${temperatureMetricSymbol}`}
                    tooltipText={`Today's highest temperature`}
                />
                <WeatherStatistic
                    imgSrc={getWindImageUrlFromSpeedMeasurement(wind.speed)}
                    data={`${wind.speed}${windMetricSymbol} ${windDirection}`}
                    tooltipText='Wind speed'
                />
                <WeatherStatistic
                    imgSrc={'atmosphere/humidity.png'}
                    data={`${Math.abs(main.humidity)}%`}
                    tooltipText={"Air humidity"}
                />
                <WeatherStatistic
                    imgSrc={'atmosphere/visibility.png'}
                    data={`${Math.round(visibility / 1000)}km`}
                    tooltipText='Visual Visibility Distance'
                />
                <WeatherStatistic
                    imgSrc={'atmosphere/pressure.png'}
                    data={`${main.pressure}hPa`}
                    tooltipText='Atmospheric pressure'
                />
                <WeatherStatistic
                    imgSrc={'time/sunrise.png'}
                    data={`${convertUnixUtcTimeToLocaleTime(sys.sunrise)}`}
                    tooltipText='Time of sunrise'
                />
                <WeatherStatistic
                    imgSrc={'time/sunset.png'}
                    data={`${convertUnixUtcTimeToLocaleTime(sys.sunset)}`}
                    tooltipText='Time of sunset'
                />
            </Row>
        </Col>
    )
}

export default WeatherInformation;