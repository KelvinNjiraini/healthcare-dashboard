<script setup>
import { Icon } from '@iconify/vue';
import { addComma } from '../utils/constants';

const props = defineProps({
    labInfo: Object || null,
});

const { labInfo } = props;
</script>
<template>
    <div class="bg-white rounded-lg p-3 md:p-5 flex space-x-2">
        <div class="w-12">
            <img
                src="./../assets/registered-labs-icon.svg"
                alt="registared labs"
                class="w-full"
            />
        </div>
        <div class="flex flex-col">
            <span class="capitalize text-primary text-sm">
                Registered labs
            </span>
            <div class="flex space-x-2 items-center">
                <h3 class="text-2xl font-semibold">
                    {{ addComma(labInfo.registered_labs) }}
                </h3>
                <div class="flex space-x-1 self-end text-light-green">
                    <Icon icon="formkit:arrowup" />
                    <span>{{
                        addComma(labInfo.registered_labs_increase)
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
