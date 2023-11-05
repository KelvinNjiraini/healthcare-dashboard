import HighChartsVue from 'highcharts-vue';
import HighCharts from 'highcharts';
import MapModule from 'highcharts/modules/map';

MapModule(HighCharts);
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).use(HighChartsVue).mount('#app');
