import EventManager from '../tools/eventManager';

const FavouriteLayout = {

    el : document.querySelector('.favLayout'),
    btn: null,

    init(){
        this.btn = document.querySelector('header .btn-menu');
        EventManager.addEventListener('WA::OpenFavourites', (e) => this.openLayout(e));
    },

    openLayout(){
        // On vérifie si le menu n'est pas déjà ouvert
        if(this.el.classList.contains('visible')){
            this.closeLayout();
        }else {
            // Open the search view
            this.btn.classList.add('open');
            this.el.classList.add('visible');
            this.searchInput.focus();
        }
    },
    closeLayout(){
        // Close the search view
        this.btn.classList.remove('open');
        this.el.classList.remove('visible');
    }

};

const FavoutiteList = {

    el: document.querySelector('.fav_list'),

    init(){

        FavouriteNew.init();

        EventManager.addEventListener('WA::AddFavItem', (event) => this.addItem(event));
    },

    addItem(e){
        const existant = document.querySelectorAll('.fav_list .fav_name');
        let repeat = false;
        for (let item of existant){
            if(item.innerHTML === e.detail){
                repeat = true;
            }
        }
        if(repeat != true) {
            const favItem = new FavItem();
            favItem.build(e.detail);
            this.el.appendChild(favItem.el);
        }
    },

};

const FavouriteNew = {
    el: document.querySelector('.fav_new'),

    model: document.querySelector('.fav_new_model'),

    init(){

        FavouriteLayout.init();

        this.name = this.el.querySelector('.fav_name');
        this.el.classList.add('hidden');
        EventManager.addEventListener('WA::UpdateNewFav', (event => this.update(event)));
    },

    update(e){
        this.name.innerHTML = e.detail;
        this.el.querySelector('.btn-add').addEventListener('click', (e) => this.add(e, this.el));
        this.el.classList.remove('hidden');
    },


    add(e, el){
        const name = el.querySelector('.fav_name').innerHTML;
        EventManager.dispatchEvent(new CustomEvent('WA::AddFavItem', {detail: name}));
        this.el.classList.add('hidden');
    }
};



class FavItem{
    constructor() {
        this.el=null;
    }

    init(el, name){
        this.el = el;
        this.el.querySelector('.fav_name').innerHTML = name;

        this.el.querySelector('.btn-remove').addEventListener('click', (e) =>this.remove(e));


    }

    remove(e){
        e.preventDefault();
        this.el.parentNode.removeChild(this.el);
        delete this;
    }

    build(name){

        this.el = document.createElement('div');
        this.el.classList.add('fav_list_item');
        this.el.innerHTML = document.querySelector('.fav_list_item_model').innerHTML;
        this.init(this.el, name);
    }


}


export default FavoutiteList;