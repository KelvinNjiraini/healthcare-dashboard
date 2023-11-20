<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import BarGraph from './charts/BarGraph.vue';
import { useResource } from './../composables/resource';
import records from './../data/records.json';

const casesByMonth = ref([]);
const isLoading = ref(false);
// const negativeCases = ref([]);
// const positiveCases = ref([]);

onMounted(async () => {
    // isLoading.value = true;
    const fetchedData = await useResource('cases_by_month');
    casesByMonth.value = fetchedData;
    // isLoading.value = false;
});
</script>
<template>
    <div class="bg-white rounded-lg md:col-span-2 flex flex-col">
        <div class="border-b border-b-light-gray p-3">
            <h4 class="font-semibold">Covid-19 Cases</h4>
        </div>
        <div class="w-full">
            <BarGraph :casesByMonth="records.cases_by_month" />
        </div>
    </div>
</template>
