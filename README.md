## Technology
This app is built upon various 3rd party APIs and the React framework. All API calls are done via
functional components. There are no class components. 

APIs we used to fetch information:
- OpenWeatherAPI
- OpenStreetMap
- CyclOSM

## Features
- You can select a weather layer to display on top of the map. 
- You can view weather information like:
    - Current Temperature
    - Lowest Temperature (Daily)
    - Highest Temperature (Daily)
    - Wind Speed & Direction
    - Precipitation %
    - Visibility Distance
    - Atmospheric Pressure
    - Sunrise time
    - Sunset time
- You can also change the metrics the measures are calculated in. You have the following options:
    - Imperial
    - Metric

![altext](https://github.com/hkarpinen/web-weather/docs/default_app.png "Default App Look.")

## Supported Weather Layers
You can only have one layer active at a time. Clicking one while another is on will turn off the previous layer. Clicking a layer that is already on will turn it off.

### Cloud Layer
![altext](https://github.com/hkarpinen/web-weather/docs/clouds_app.png "Clouds layer")

### Precipitation Layer
![altext](https://github.com/hkarpinen/web-weather/docs/precipitation.png "Precipitation layer")

### Sea Level Pressure Layer
![altext](https://github.com/hkarpinen/web-weather/docs/sealevelpressure.png "Sea Level Pressure Layer")

### Wind Layer
![altext](https://github.com/hkarpinen/web-weather/docs/wind.png "Wind layer")

### Temperature Layer
![altext](https://github.com/hkarpinen/web-weather/docs/temp.png "Temperature Layer")

### Cycling Layer
![altext](https://github.com/hkarpinen/web-weather/docs/cycling.png "Cycling Layer")