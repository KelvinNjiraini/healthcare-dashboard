<script setup>
import { watchEffect, ref } from 'vue';
const props = defineProps({
    labCases: Array,
});

const casesSorted = ref([]);

watchEffect(() => {
    const { labCases } = props;
    casesSorted.value = labCases.sort((a, b) => b.tests - a.tests);
});
</script>
<template>
    <div class="bg-white rounded-lg md:row-span-2 h-[20rem] flex flex-col">
        <div class="border-b border-b-light-gray p-3">
            <h4 class="font-semibold">Laboratories Leader board</h4>
        </div>
        <div class="overflow-y-scroll">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tr
                    class="border-b border-b-light-gray bg-primary/5 text-primary uppercase text-xs"
                >
                    <td width="70%" class="p-3" align="left">
                        <span>Laboratory</span>
                    </td>
                    <td width="30%" class="p-3" align="right">
                        <span>Total Tests</span>
                    </td>
                </tr>
                <tr
                    class="border-b border-b-light-gray text-black capitalize text-xs"
                    v-for="lab in casesSorted"
                    :key="lab.name"
                >
                    <td width="70%" class="p-3" align="left">
                        <span class="capitalize"
                            >{{ lab.name }} Laboratories</span
                        >
                    </td>
                    <td width="30%" class="p-3" align="right">
                        <span>{{ lab.tests }}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
