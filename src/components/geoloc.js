import Forecast from "./forecast";

const CurrentPosition = {
    latitude : 0,
    longitude : 0,
    sendPosition(position){
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        Forecast.getForecast(this.latitude, this.longitude);
    },
    getPosition() {
        if(navigator.geolocation) {
            // L'API de géolocalisation est disponible
            navigator.geolocation.getCurrentPosition((position) => {this.sendPosition(position)});
        } else {
            // Pas de support, proposer une alternative ?
            console.log('API de géolocalisation pas dispo');
        }
    }
};

console.log(CurrentPosition);
export default CurrentPosition;