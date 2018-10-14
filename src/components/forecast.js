const Forecast = {

    tempUnit: '°C',
    windUnit: 'km/h',
    precipUnit: 'mm',

    daysTexts : ["Dim.","Lun.","Mar.","Mer.","Jeu.","Ven.","Sam."],

    apixuKey: 'eaec92b550f54883881122307180210',

    iconModel(is_day, conditionCode){
        let moment = '';

        if(is_day === 0){
            moment = 'night';
        }else{
            moment = 'day';
        }

        return '<i class="wi wi-apixu-'+moment+'-'+conditionCode+'"></i>';
    },

    displayForecast(forecast){
        // Afficher la ville des prévisions
        document.querySelector('.location span').innerHTML = forecast.location.name;

        /**
         * CURRENT FORECAST
         */

        const currentForecastEl = document.querySelector('#actualForecast');

        // Changer de background en fonction des conditions

        if(forecast.current.is_day === 0){
            currentForecastEl.setAttribute('class', 'bg-night');
        }else{
            currentForecastEl.setAttribute('class', 'bg-sun');
        }


        // Insérer les datas dans les modules



        currentForecastEl.querySelector('.actualForecast_icon').innerHTML = this.iconModel(forecast.current.is_day, forecast.current.condition.code);

        currentForecastEl.querySelector('.actualForecast_temp').innerHTML = forecast.current.temp_c + this.tempUnit;
        currentForecastEl.querySelector('.actualForecast_condition').innerHTML = forecast.current.condition.text;

        currentForecastEl.querySelector('.actualForecast_wind .actualForecast_more_item_info').innerHTML = forecast.current.wind_kph +' '+ this.windUnit;
        currentForecastEl.querySelector('.actualForecast_wind .actualForecast_more_item_legend').innerHTML = forecast.current.wind_dir;

        currentForecastEl.querySelector('.actualForecast_humidity .actualForecast_more_item_info').innerHTML = forecast.current.humidity +' %';

        currentForecastEl.querySelector('.actualForecast_rain .actualForecast_more_item_info').innerHTML = forecast.current.precip_mm + ' '+ this.precipUnit;

        /**
         * DAYS FORECAST
         */
        const dayForecastEl = document.querySelector('#dayForecast');
        const dayForecastItems = dayForecastEl.querySelectorAll('.dayForecast_item');


        for(let i = 0; i < 6; i+=1){

            const dayDate = new Date(forecast.forecast.forecastday[i+1].date);

            dayForecastItems[i].querySelector('.dayForecast_item_day span').innerHTML = this.daysTexts[dayDate.getDay()];
            dayForecastItems[i].querySelector('.dayForecast_item_icon').innerHTML = this.iconModel(1, forecast.forecast.forecastday[i+1].day.condition.code);


            dayForecastItems[i].querySelector('.dayForecast_item_temp-max').innerHTML = forecast.forecast.forecastday[i+1].day.maxtemp_c + '°C';
            dayForecastItems[i].querySelector('.dayForecast_item_temp-min').innerHTML = forecast.forecast.forecastday[i+1].day.mintemp_c + '°C';

            console.log(dayForecastItems[i]);
            console.log(forecast.forecast.forecastday[i+1]);
        }

    },


    getForecast(latitude, longitude){
        let fcDatas = {};
        const url = 'http://api.apixu.com/v1/forecast.json?key='+this.apixuKey+'&lang=fr&days=7&q='+latitude+','+longitude;
        //const url = 'http://api.apixu.com/v1/forecast.json?key='+this.apixuKey+'&lang=fr&days=5&q=45.45,4.3';
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