<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { useResource } from './../composables/resource';
import { useInitializeData } from './../composables/initializeTrends';
import LineGraph from './charts/LineGraph.vue';

const props = defineProps({
    duration: {
        type: String,
        default: 'day',
    },
});
const currentDuration = ref(props.duration);

const trends = reactive({
    total_tested: null,
    citizens_tested: null,
    foreigners_tested: null,
    travel: null,
    screening: null,
});

async function initializeLocalTrends() {
    const fetchedTrends = await useResource('today');
    const { totalTested, citizensTested, travel, screening, foreignersTested } =
        useInitializeData(fetchedTrends, currentDuration);
    // setting reactive data
    trends.total_tested = totalTested;
    trends.citizens_tested = citizensTested;
    trends.travel = travel;
    trends.screening = screening;
    trends.foreigners_tested = foreignersTested;
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
            <div class="flex justify-between items-center">
                <div class="flex flex-col space-y-2">
                    <span class="capitalize text-primary text-sm">
                        Total Tested
                    </span>
                    <h1 class="text-3xl font-bold">
                        {{ trends.total_tested }}
                    </h1>
                </div>
                <div class="self-end">
                    <img
                        src="./../assets/graph-placeholder.svg"
                        alt="Graph placeholder"
                    />
                    <!-- <LineGraph /> -->
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex gap-1 text-sm text-primary">
                    <span class="font-semibold uppercase">Travel:</span
                    ><span>{{ trends.travel }}</span>
                </div>
                <div class="flex gap-1 text-sm text-primary">
                    <span class="font-semibold uppercase">Screening:</span
                    ><span>{{ trends.screening }}</span>
                </div>
            </div>
        </div>
        <div
            class="p-3 border-r md:border-r-background flex flex-col space-y-4 justify-between"
        >
            <div class="flex justify-between items-center">
                <div class="flex flex-col space-y-2">
                    <span class="text-sm capitalize text-primary">
                        Citizens Tested
                    </span>
                    <h1 class="text-3xl font-bold">
                        {{ trends.citizens_tested }}
                    </h1>
                </div>
                <div class="self-end">
                    <img
                        src="./../assets/graph-placeholder.svg"
                        alt="Graph placeholder"
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
                    <span class="text-xs"> 123,932</span>
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
                    <span class="text-xs"> 123,932</span>
                </div>
            </div>
        </div>
        <div class="p-3 border-r flex flex-col space-y-4 justify-between">
            <div class="flex justify-between items-center">
                <div class="flex flex-col space-y-2">
                    <span class="capitalize text-primary">
                        Foreigners Tested</span
                    >
                    <h1 class="text-3xl font-bold">
                        {{ trends.foreigners_tested }}
                    </h1>
                </div>
                <div class="self-end">
                    <img
                        src="./../assets/graph-placeholder.svg"
                        alt="Graph placeholder"
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
                    <span class="text-xs"> 123,932</span>
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
                    <span class="text-xs"> 123,932</span>
                </div>
            </div>
        </div>
    </div>
</template>
