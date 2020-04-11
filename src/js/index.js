//import '@babel/polyfill'; //js兼容性处理

import $ from 'jquery';
import '../css/index.css';

$('#title').click(() => {
  // eslint-disable-next-line no-console
  console.log('title');
  $('body').css('backgroundColor', 'red');
});
