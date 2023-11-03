<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import BarGraph from './charts/BarGraph.vue';
import { useResource } from './../composables/resource';

const casesByMonth = ref([]);
const negativeCases = ref([]);
const positiveCases = ref([]);

onMounted(async () => {
    const fetchedData = await useResource('cases_by_month');
    casesByMonth.value = fetchedData;
});
</script>
<template>
    <div class="bg-white rounded-lg md:row-span-2 flex flex-col">
        <div class="border-b border-b-light-gray p-3">
            <h4 class="font-semibold">Covid-19 Cases</h4>
        </div>
        <div class="w-full">
            <BarGraph :casesByMonth="casesByMonth" />
        </div>
    </div>
</template>
