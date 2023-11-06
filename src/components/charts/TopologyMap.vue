<script setup>
// import { Highcharts } from 'highcharts/modules/map';
import { useResource } from '../../composables/resource';
import kenyaMap from './../../data/kenya-map.json';
import { ref, onMounted } from 'vue';

const isLoading = ref(false);
const data = ref([]);

const chartOptions = ref({
    chart: {
        map: kenyaMap,
    },

    title: {
        text: null,
    },
    plotOptions: {
        //
    },
    subtitle: {
        text: null,
    },

    mapNavigation: {
        enabled: false,
        // buttonOptions: {
        //     verticalAlign: 'bottom',
        // },
    },
    map: {
        borderColor: '#ffffff',
    },

    colorAxis: {
        visible: false,
        // color: '#E5ECF4',
        // minColor: '#E5ECF4',
        // maxColor: '#E5ECF4',
    },
    legend: {
        enabled: false,
    },
    series: [
        {
            data: data,
            name: 'Random data',

            states: {
                hover: {
                    // color: '#BADA55',
                },
            },
            dataLabels: {
                enabled: true,
                format: '<div style="height:0.7rem;width:0.7rem;border-radius:50%;background-color:#D13F4A; color: #AE141F;">{point.value}</div>',
                style: {
                    color: '#D13F4A',
                },
                formatter: function () {
                    const size = Math.min(100, this.point.value);
                    return '<div style="height:0.7rem;width:0.7rem;border-radius:50%;background-color:#D13F4A; color: #AE141F;">{point.value}</div>';
                },
            },
        },
    ],
});
onMounted(async () => {
    isLoading.value = true;
    try {
        const fetchedData = await useResource('today');
        data.value = fetchedData.cases_by_region;
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
    isLoading.value = false;
});
</script>
<template>
    <div
        class="bg-white rounded-lg md:col-span-2 md:row-span-2 flex justify-center items-center"
    >
        <p v-if="isLoading">Loading ...</p>
        <highcharts
            :constructor-type="'mapChart'"
            :options="chartOptions"
            v-if="!isLoading"
        />
    </div>
</template>
