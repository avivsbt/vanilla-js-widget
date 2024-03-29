import './style.css';
import { getRecommendations } from './api';
import { store } from './store';
import './components';

const sponsored = document.querySelectorAll('.recommendations[type="sponsored"]');

store.subscribe(sponsored, "updateSponsoredRecommendations", function (recommendations, action, store) {

  sponsored.forEach(element => {
    let component = element.getAttribute("component");
    let category = element.getAttribute("category");
    var item = document.createElement(component);

    console.log(recommendations[category]);

    var textNode = document.createTextNode("Text for the slot");
    var slot = item.shadowRoot.querySelector('slot[name="title"]');
    slot.appendChild(textNode);

    element.appendChild(item);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  getRecommendations();
});


