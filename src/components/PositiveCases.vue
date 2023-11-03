<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    positiveCases: Object,
});

const { positiveCases } = props;
</script>
<template>
    <div class="bg-white rounded-lg p-3 md:p-5 flex flex-col justify-between">
        <div class="flex space-x-2 items-center mb-5">
            <div class="w-12">
                <img
                    src="./../assets/positive-cases-icon.svg"
                    alt="positive cases"
                    class="w-full"
                />
            </div>
            <div class="flex flex-col justify-between">
                <span class="capitalize text-primary text-sm">
                    Positive cases
                </span>
                <div class="flex space-x-2 items-center">
                    <h3 class="text-2xl font-semibold">
                        {{ positiveCases.positive_cases }}
                    </h3>
                    <div class="flex space-x-1 self-end text-light-green">
                        <Icon icon="formkit:arrowup" />
                        <span
                            >{{ positiveCases.positive_cases_increase }}%</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center">
                <div class="flex gap-1 text-sm text-primary">
                    <span class="font-semibold uppercase">Males:</span
                    ><span>{{ positiveCases.males }}</span>
                </div>
                <div class="flex gap-1 text-sm text-primary">
                    <span class="font-semibold uppercase">Females:</span
                    ><span>{{ positiveCases.females }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
