import './style.css';
import { getData } from './api.js';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello!</h1>
  </div>
`;

getData().then((res) => {
  console.log(res);
});
