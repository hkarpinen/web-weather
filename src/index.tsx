import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from "./components/Navbar";
import {Col, Image, Row} from "react-bootstrap";
import Weather from "./components/weather/Weather";
import Container from "react-bootstrap/Container";
import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }
])


function App() {
    return (
        <Container className='d-flex flex-column h-100' fluid>
            <Row>
                <TopNavbar />
            </Row>
            <Row className='flex-grow-1'>
                <Weather />
            </Row>
            <Row className='bg-body-tertiary'>
                <ul className='d-flex list-unstyled m-0 p-2 align-items-center'>
                    <li>
                        <p className='m-0'>Created With Love {`\u2665`}</p>
                    </li>
                    <li>
                        <a className='text-decoration-none' href='https://github.com/hkarpinen' target='_blank'>
                            <Image src='social/github.png' />
                        </a>
                    </li>
                    <li className='d-flex align-items-center'>
                        <p className='m-0'>Icons from: </p>
                        <ul className='d-flex list-unstyled'>
                            <li className='p-1'><a href='https://phosphoricons.com/'>Phosphor</a></li>
                            <li className='p-1'><a href='https://carbondesignsystem.com/guidelines/icons/library/'>Carbon</a></li>
                            <li className='p-1'><a href='https://icon-sets.iconify.design/dashicons/'>Dashicons</a></li>
                        </ul>
                    </li>
                </ul>
            </Row>
        </Container>
    )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
