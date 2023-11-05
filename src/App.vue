<script setup>
import { ref } from 'vue';
import { defineAsyncComponent, onMounted, reactive } from 'vue';
import { useResource } from './composables/resource';

import RegisteredLabs from './components/RegisteredLabs.vue';
import HealthcareTrends from './components/HealthcareTrends.vue';
import PositiveCases from './components/PositiveCases.vue';
import NegativeCases from './components/NegativeCases.vue';
import StatesLeaderboard from './components/StatesLeaderboard.vue';
import LabLeaderboard from './components/LabLeaderboard.vue';
import CasesByMonth from './components/CasesByMonth.vue';
import TopologyMap from './components/charts/TopologyMap.vue';

const currentDuration = ref('day');
const labInfo = reactive({});
const positiveCases = reactive({});
const negativeCases = reactive({});
const countyCases = ref([]);
const labCases = ref([]);
const casesByMonth = ref([]);
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    try {
        const fetchedData = await useResource('today');
        const {
            registered_labs,
            registered_labs_increase,
            citizens_positive_cases,
            citizens_positive_cases_increase,
            males,
            females,
            citizens_negative_cases_increase,
            citizens_negative_cases,
            cases_by_county,
            lab_tests,
            cases_by_month,
        } = fetchedData;
        // setting the lab data
        labInfo.registered_labs = registered_labs;
        labInfo.registered_labs_increase = registered_labs_increase;

        // setting the positive cases
        positiveCases.positive_cases = citizens_positive_cases;
        positiveCases.positive_cases_increase =
            citizens_positive_cases_increase;
        positiveCases.males = males;
        positiveCases.females = females;

        // setting negative cases
        negativeCases.negative_cases_increase =
            citizens_negative_cases_increase;
        negativeCases.negative_cases = citizens_negative_cases;
        negativeCases.males = males;
        negativeCases.females = females;

        // setting county cases
        countyCases.value = cases_by_county;

        // setting lab cases
        labCases.value = lab_tests;
    } catch (err) {
        console.log(err);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <main class="p-8 px-10 md:px-20 md:p-16">
        <!-- group of buttons -->
        <div class="flex items-center">
            <button
                @click="currentDuration = 'day'"
                class="outline-none border border-primary rounded-l-lg text-xs md:text-base px-2 py-1 md:px-4 md:py-2"
                :class="
                    currentDuration === 'day'
                        ? 'bg-primary text-black'
                        : 'bg-transparent text-primary hover:bg-primary/10'
                "
            >
                Today
            </button>
            <button
                @click="currentDuration = 'week'"
                class="outline-none border border-primary text-xs md:text-base px-2 py-1 md:px-4 md:py-2"
                :class="
                    currentDuration === 'week'
                        ? 'bg-primary text-black'
                        : 'bg-transparent text-primary hover:bg-primary/10'
                "
            >
                This Week
            </button>
            <button
                @click="currentDuration = 'month'"
                class="outline-none border border-primary text-xs md:text-base px-2 py-1 md:px-4 md:py-2 hover:bg-primary/10"
                :class="
                    currentDuration === 'month'
                        ? 'bg-primary text-black'
                        : 'bg-transparent text-primary hover:bg-primary/10'
                "
            >
                This Month
            </button>
            <button
                @click="currentDuration = 'year'"
                class="outline-none border border-primary text-xs md:text-base rounded-r-lg px-2 py-1 md:px-4 md:py-2 hover:bg-primary/10"
                :class="
                    currentDuration === 'year'
                        ? 'bg-primary text-black'
                        : 'bg-transparent text-primary hover:bg-primary/10'
                "
            >
                This Year
            </button>
        </div>
        <!-- grid layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
            <HealthcareTrends :duration="currentDuration" />
            <RegisteredLabs :labInfo="labInfo" />
            <PositiveCases :positiveCases="positiveCases" />
            <NegativeCases :negativeCases="negativeCases" />
            <TopologyMap />
            <StatesLeaderboard :countyCases="countyCases" />
            <LabLeaderboard :labCases="labCases" />
            <CasesByMonth />
        </div>
    </main>
</template>
