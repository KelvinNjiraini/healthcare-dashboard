<template>
    <highcharts :options="chartOptions"></highcharts>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    chartData: Array,
});

const localData = ref([]);

const chartOptions = computed(() => {
    return {
        chart: {
            type: 'area',
            height: 100,
        },
        title: {
            text: null,
        },
        yAxis: {
            visible: false,
        },
        xAxis: {
            visible: false,
        },
        plotOptions: {
            area: {
                lineWidth: 3,
            },
        },
        series: [
            {
                name: 'Data',
                data: localData.value,
                color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, '#2C7BE5'], // Start color
                        [1, '#fffffff0'], // End color
                    ],
                },
                showInLegend: false,
                marker: {
                    enabled: false,
                },
            },
        ],
    };
});
onMounted(() => {
    localData.value = props.chartData.map((item) => item.value);
});
</script>
