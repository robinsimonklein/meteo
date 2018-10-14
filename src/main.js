// eslint-disable-next-line
import App from './App.vue';


// Import all components


import Header from './components/header';
import SearchEngine from './components/search';

// eslint-disable-next-line
import CurrentPosition from './components/geoloc';

// eslint-disable-next-line
import Forecast from './components/forecast';

const WeatherApp = {

    init(){
        Header.init();
        SearchEngine.init();
        CurrentPosition.getPosition();
    }
};

document.addEventListener('DOMContentLoaded', WeatherApp.init());



