<script setup>
// import { Highcharts } from 'highcharts/modules/map';
import kenyaMap from './../../data/kenya-map.json';
import { ref, onMounted } from 'vue';

const topologyData = ref(null);
const data = [
    ['ke-co', 10],
    ['ke-ny', 11],
    ['ke-ce', 12],
    ['ke-na', 13],
    ['ke-565', 14],
    ['ke-rv', 15],
    ['ke-we', 16],
    ['ke-ne', 17],
];

const chartOptions = ref({
    chart: {
        map: kenyaMap,
    },

    title: {
        text: 'Highcharts Maps basic demo',
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/ke/ke-all.topo.json">Kenya</a>',
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom',
        },
    },

    colorAxis: {
        min: 0,
    },

    series: [
        {
            data: data,
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55',
                },
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
            },
        },
    ],
});
onMounted(async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/ke/ke-all.topo.json'
    ).then((response) => response.json());
    topologyData.value = topology;
});
</script>
<template>
    <div>
        <highcharts :constructor-type="'mapChart'" :options="chartOptions" />
    </div>
</template>
