<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { useResource } from './../composables/resource';
import { useInitializeData } from './../composables/initializeTrends';
import LineGraph from './charts/LineGraph.vue';
import { addComma } from '../utils/constants';

const props = defineProps({
    duration: {
        type: String,
        default: 'day',
    },
});
const currentDuration = ref(props.duration);
const isLoading = ref(false);

const trends = reactive({
    total_tested: null,
    citizens_tested: null,
    citizens_positive: null,
    citizens_negative: null,
    foreigners_tested: null,
    foreigners_positive: null,
    foreigners_negative: null,
    travel: null,
    screening: null,
    totalTestedMonthly: [],
    citizensTestedMonthly: [],
    foreignersTestedMonthly: [],
});

async function initializeLocalTrends() {
    isLoading.value = true;
    try {
        const fetchedTrends = await useResource('today');
        const {
            totalTested,
            citizensTested,
            travel,
            screening,
            foreignersTested,
            citizens_positive_cases,
            citizens_negative_cases,
            foreigners_positive_cases,
            foreigners_negative_cases,
        } = useInitializeData(fetchedTrends, currentDuration);
        // setting derived data
        trends.total_tested = totalTested;
        trends.citizens_tested = citizensTested;
        trends.travel = travel;
        trends.screening = screening;
        trends.foreigners_tested = foreignersTested;
        trends.citizens_negative = citizens_negative_cases;
        trends.citizens_positive = citizens_positive_cases;
        trends.foreigners_negative = foreigners_negative_cases;
        trends.foreigners_positive = foreigners_positive_cases;
        // setting area charts
        trends.totalTestedMonthly = fetchedTrends.total_tested_monthly;
        trends.citizensTestedMonthly = fetchedTrends.citizens_tested_monthly;
        trends.foreignersTestedMonthly =
            fetchedTrends.foreigners_tested_monthly;
    } catch (err) {
        console.log(err);
    } finally {
        isLoading.value = false;
    }
}

onMounted(async () => {
    // multiplier acts as a simulator of day, month and year
    await initializeLocalTrends();
});
</script>
<template>
    <div
        class="bg-white rounded-lg md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    >
        <div
            class="w-full flex justify-center items-center p-3 border-r border-r-background"
        >
            <div class="h-14">
                <img
                    src="./../assets/healthcare-logo.svg"
                    alt="Healthcare logo"
                    class="w-full"
                />
            </div>
        </div>
        <div
            class="p-3 border-r md:border-r-background flex flex-col space-y-4 justify-between"
        >
            <div class="flex justify-between w-full">
                <div class="flex flex-col space-y-2">
                    <span class="capitalize text-primary text-sm">
                        Total Tested
                    </span>
                    <h1 class="text-3xl font-bold">
                        {{ addComma(trends.total_tested) }}
                    </h1>
                </div>
                <div class="self-end w-1/2">
                    <p v-if="isLoading">Loading ...</p>
                    <LineGraph
                        :chartData="trends.totalTestedMonthly"
                        v-if="!isLoading"
                    />
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex gap-1 text-sm text-primary">
                    <span class="font-semibold uppercase">Travel:</span
                    ><span>{{ addComma(trends.travel) }}</span>
                </div>
                <div class="flex gap-1 text-sm text-primary">
                    <span class="font-semibold uppercase">Screening:</span
                    ><span>{{ addComma(trends.screening) }}</span>
                </div>
            </div>
        </div>
        <div
            class="p-3 border-r md:border-r-background flex flex-col space-y-4 justify-between"
        >
            <div class="flex justify-between">
                <div class="flex flex-col space-y-2">
                    <span class="text-sm capitalize text-primary">
                        Citizens Tested
                    </span>
                    <h1 class="text-3xl font-bold">
                        {{ addComma(trends.citizens_tested) }}
                    </h1>
                </div>
                <div class="self-end w-1/2">
                    <!-- <img
                        src="./../assets/graph-placeholder.svg"
                        alt="Graph placeholder"
                    /> -->
                    <p v-if="isLoading">Loading ...</p>
                    <LineGraph
                        :chartData="trends.citizensTestedMonthly"
                        v-if="!isLoading"
                    />
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex gap-1 text-sm text-primary items-center">
                    <div
                        class="font-semibold text-[0.7rem] uppercase px-1 bg-custom-red/50 text-custom-red rounded-full flex items-center"
                    >
                        <div
                            class="h-3 w-3 rounded-full bg-transparent border-[3px] border-custom-red mr-1"
                        ></div>
                        Positive
                    </div>
                    <span class="text-xs">
                        {{ addComma(trends.citizens_positive) }}</span
                    >
                </div>
                <div class="flex gap-1 text-sm text-primary items-center">
                    <div
                        class="font-semibold text-[0.7rem] uppercase px-1 bg-custom-green/50 text-custom-green rounded-full flex items-center"
                    >
                        <div
                            class="h-3 w-3 rounded-full bg-transparent border-[3px] border-custom-green mr-1"
                        ></div>
                        Negative
                    </div>
                    <span class="text-xs">
                        {{ addComma(trends.citizens_negative) }}</span
                    >
                </div>
            </div>
        </div>
        <div class="p-3 border-r flex flex-col space-y-4 justify-between">
            <div class="flex justify-between">
                <div class="flex flex-col space-y-2">
                    <span class="capitalize text-primary">
                        Foreigners Tested</span
                    >
                    <h1 class="text-3xl font-bold">
                        {{ addComma(trends.foreigners_tested) }}
                    </h1>
                </div>
                <div class="self-end w-1/2">
                    <p v-if="isLoading">Loading ...</p>
                    <LineGraph
                        :chartData="trends.foreignersTestedMonthly"
                        v-if="!isLoading"
                    />
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex gap-1 text-sm text-primary items-center">
                    <div
                        class="font-semibold text-[0.7rem] uppercase px-1 bg-custom-red/50 text-custom-red rounded-full flex items-center"
                    >
                        <div
                            class="h-3 w-3 rounded-full bg-transparent border-[3px] border-custom-red mr-1"
                        ></div>
                        Positive
                    </div>
                    <span class="text-xs">
                        {{ addComma(trends.foreigners_positive) }}</span
                    >
                </div>
                <div class="flex gap-1 text-sm text-primary items-center">
                    <div
                        class="font-semibold text-[0.7rem] uppercase px-1 bg-custom-green/50 text-custom-green rounded-full flex items-center"
                    >
                        <div
                            class="h-3 w-3 rounded-full bg-transparent border-[3px] border-custom-green mr-1"
                        ></div>
                        Negative
                    </div>
                    <span class="text-xs">
                        {{ addComma(trends.foreigners_negative) }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
