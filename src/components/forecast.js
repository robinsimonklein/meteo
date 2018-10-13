const Forecast = {

    tempUnit: '°C',
    windUnit: 'km/h',
    precipUnit: 'mm',

    apixuKey: 'eaec92b550f54883881122307180210',

    displayForecast(forecast){
        // Afficher la ville des prévisions
        document.querySelector('.location span').innerHTML = forecast.location.name;

        // Afficher la météo actuelle
        const el = document.querySelector('.actualForecast_wrap');

        el.querySelector('.actualForecast_temp').innerHTML = forecast.current.temp_c + this.tempUnit;
        el.querySelector('.actualForecast_condition').innerHTML = forecast.current.condition.text;

        el.querySelector('.actualForecast_wind .actualForecast_more_item_info').innerHTML = forecast.current.wind_kph +' '+ this.windUnit;
        el.querySelector('.actualForecast_wind .actualForecast_more_item_legend').innerHTML = forecast.current.wind_dir;

        el.querySelector('.actualForecast_humidity .actualForecast_more_item_info').innerHTML = forecast.current.humidity +' %';

        el.querySelector('.actualForecast_rain .actualForecast_more_item_info').innerHTML = forecast.current.precip_mm + ' '+ this.precipUnit;
    },


    getForecast(latitude, longitude){
        let fcDatas = {};
        //const url = 'http://api.apixu.com/v1/current.json?key='+this.apixuKey+'&lang=fr&q='+latitude+','+longitude;
        const url = 'http://api.apixu.com/v1/forecast.json?key='+this.apixuKey+'&lang=fr&days=5&q=45.45,4.3';
        let fcRequest = new XMLHttpRequest();
        fcRequest.open('GET', url, true);
        fcRequest.addEventListener('readystatechange', () => {
            if(fcRequest.readyState === 4) {
                if(fcRequest.status === 200){
                    fcDatas = JSON.parse(fcRequest.responseText);
                    console.log(fcDatas);
                    this.displayForecast(fcDatas);
                }
            }
        });
        fcRequest.send();
    }
};

export default Forecast;