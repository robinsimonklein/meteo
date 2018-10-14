import EventManager from '../tools/eventManager';

const Header = {
    el : document.querySelector('header'),
    locationBtn : '',
    favBtn : '',

    init(){
        this.locationBtn = this.el.querySelector('.location');
        this.favBtn = this.el.querySelector('.btn-menu');
        this.locationBtn.addEventListener('click', (e) => {
            EventManager.dispatchEvent(new CustomEvent('WA::OpenSearchEngine', {detail: e}));
        });
        this.favBtn.addEventListener('click', (e) => {
            EventManager.dispatchEvent(new CustomEvent('WA::OpenFavourites', {detail: e}));
        });
    }
};
export default Header;