import './style.css';
import { getRecommendations } from './api.js';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello!</h1>
  </div>
`;

getRecommendations();

