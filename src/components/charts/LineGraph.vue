<template>
    <highcharts :options="chartOptions"></highcharts>
</template>

<script setup>
import { computed } from 'vue';

const chartOptions = computed(() => {
    return {
        chart: {
            type: 'area',
        },
        title: {
            text: 'My Area Chart',
        },
        series: [
            {
                name: 'Data',
                data: [
                    {
                        name: 'karis',
                        tests: 417,
                    },
                    {
                        name: 'healthy',
                        tests: 1641,
                    },
                    {
                        name: 'mikaa',
                        tests: 335,
                    },
                    {
                        name: 'emu',
                        tests: 3033,
                    },
                    {
                        name: 'sandhu',
                        tests: 2534,
                    },
                ],
            },
        ],
    };
});
</script>
