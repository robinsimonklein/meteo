import EventManager from '../tools/eventManager';
import Forecast from './forecast';

const SearchEngine = {
    el : document.querySelector('.searchLayout'),
    searchInput : '',
    searchResultsEl : '',
    closeBtn : '',
    results: '',

    apixuKey: 'eaec92b550f54883881122307180210',

    init(){
        this.searchInput = this.el.querySelector('.search_field');
        this.searchResultsEl = this.el.querySelector('.search_results');
        this.closeBtn = this.el.querySelector('.btn-close');

        // Events for open and close search view
        EventManager.addEventListener('WA::OpenSearchEngine', (e) => this.openLayout(e));
        this.closeBtn.addEventListener('click', (e) => this.closeLayout(e));

        this.el.querySelector('form').addEventListener('submit', (e) => {this.getSearchResults(e);});

    },

    getSearchResults(e){
        e.preventDefault();
        const query = this.searchInput.value;
        const url = 'https://api.apixu.com/v1/search.json?key='+this.apixuKey+'&q='+ query;

        let searchRequest = new XMLHttpRequest();
        searchRequest.open('GET', url, true);
        searchRequest.addEventListener('readystatechange', () => {
            if(searchRequest.readyState === 4) {
                if(searchRequest.status === 200){
                    this.results = JSON.parse(searchRequest.responseText);
                    this.dispSearchResults(this.results);
                }
            }
        });
        searchRequest.send();
    },
    dispSearchResults(results){
        this.searchResultsEl.innerHTML = '';
        if(results.length >= 1){
            for(const result of results) {
                const resultItem = new SearchResultItem();
                resultItem.build(result.name);
                this.searchResultsEl.appendChild(resultItem.el);
            }
        }else{
            console.log('Aucun résultat');
        }
    },

    selectCity(name){
        const data = name;
        Forecast.getForecast(data);
        this.closeLayout();
    },

    openLayout(){
        // Open the search view
        this.el.classList.add('visible');
        this.searchInput.focus();
    },
    closeLayout(){
        // Close the search view
        this.el.classList.remove('visible');
    }



};

class SearchResultItem{
    constructor(name){
        this.el = null;
        this.name = name;
    }

    init(el, name){
        this.el = el;
        this.el.innerHTML = '<span class="result-city">' + name +'</span>';
        this.el.addEventListener('click', (e) => this.select(e, name));
    }

    build(name){
        this.el = document.createElement('div');
        this.el.classList.add('search_results_item');
        this.init(this.el, name);
    }

    select(e, name){
        SearchEngine.selectCity(name);
    }
}

export default SearchEngine ;