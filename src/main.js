// eslint-disable-next-line
import App from './App.vue';

// Import all components
import CurrentPosition from './components/geoloc';

// eslint-disable-next-line
import Forecast from './components/forecast';

const WeatherApp = {



    init(){
        CurrentPosition.getPosition();
    }
};

document.addEventListener('DOMContentLoaded', WeatherApp.init());



