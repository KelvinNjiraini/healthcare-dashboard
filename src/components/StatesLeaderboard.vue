<script setup>
import { watchEffect, ref } from 'vue';
import { addComma } from '../utils/constants';
const props = defineProps({
    countyCases: Array,
});

const countiesSorted = ref([]);

watchEffect(() => {
    const { countyCases } = props;
    countiesSorted.value = countyCases.sort(
        (a, b) =>
            b.cases.positive +
            b.cases.negative -
            (a.cases.positive + a.cases.negative)
    );
});
</script>

<template>
    <div class="bg-white rounded-lg md:row-span-2 h-[30rem] flex flex-col">
        <div class="border-b border-b-light-gray p-3">
            <h4 class="font-semibold">States Leader board</h4>
        </div>
        <div class="overflow-y-scroll">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tr
                    class="border-b border-b-light-gray bg-primary/5 text-primary uppercase text-xs"
                >
                    <td width="34%" class="p-3" align="left">
                        <span>County</span>
                    </td>
                    <td width="33%" class="p-3" align="right">
                        <span>Positive cases</span>
                    </td>
                    <td width="33%" class="p-3" align="right">
                        <span>Negative cases</span>
                    </td>
                </tr>

                <tr
                    class="border-b border-b-light-gray text-black capitalize text-xs"
                    v-for="record in countiesSorted"
                    :key="record.county"
                >
                    <td width="34%" class="p-3" align="left">
                        <span class="capitalize"
                            >{{ record.county }} County</span
                        >
                    </td>
                    <td width="33%" class="p-3" align="right">
                        <span>{{ addComma(record.cases.positive) }}</span>
                    </td>
                    <td width="33%" class="p-3" align="right">
                        <span>{{ addComma(record.cases.negative) }}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped></style>
