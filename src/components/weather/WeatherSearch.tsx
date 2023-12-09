import {Col, Dropdown, Form, InputGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {Unit} from "openweathermap-ts/dist/types";
import {capitalizeFirstLetterOfWord} from "../../helpers/StringHelpers";

function WeatherSearch(props: {
    updateWeatherBasedOffUserInput: Function,
    updateMetricUnits: Function,
    currentMetricUnits: Unit,
    searchError: boolean
}) {
    const [userInput, setUserInput] = useState<string>();

    const handleDropdownItemClick = (event: React.MouseEvent<any>) => {
        let element: any = event.target;
        props.updateMetricUnits(element.innerText.toLowerCase());
    }

    const handleSearchInputKeyUpEvent = (event: any) => {
        let element: any = event.target;
        setUserInput(element.value);
        if(event.keyCode === 13) {
            props.updateWeatherBasedOffUserInput(element.value);
        }
    }

    return (
        <InputGroup className='p-0'>
            <Dropdown>
                <Dropdown.Toggle variant='light' className='rounded-0 border'>
                    {capitalizeFirstLetterOfWord(props.currentMetricUnits)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(event) => handleDropdownItemClick(event)}>Imperial</Dropdown.Item>
                    <Dropdown.Item onClick={(event) => handleDropdownItemClick(event)}>Metric</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <InputGroup.Text id="weather_city_search">City</InputGroup.Text>
            <Form.Control
                className={props.searchError ? 'is-invalid' : ''}
                placeholder="Boise, Idaho"
                aria-label="Search City"
                aria-describedby="weather_city_search"
                onKeyUp={(event) => handleSearchInputKeyUpEvent(event)}
            />
            <Button className="btn rounded-0" variant='primary'
                    onClick={() => props.updateWeatherBasedOffUserInput(userInput)}
            >Search</Button>
        </InputGroup>
    )
}

export default WeatherSearch;