<template>
    <div>
        <!-- <div></div> -->
    </div>
</template>
<script>
import Highcharts from 'highcharts';
export default {
    name: 'BasicBarChart',
    props: {
        casesByMonth: Array,
    },
    data: function () {
        return {
            target: undefined,
            positive: [],
            negative: [],
        };
    },

    mounted() {
        this.positive = this.casesByMonth.map((month) => month.cases.positive);
        this.negative = this.casesByMonth.map((month) => month.cases.negative);

        this.target = Highcharts.chart(this.$el, {
            chart: {
                type: 'column',
                height: 270,
                // width: 700,
            },
            colors: ['#D2DDEC', '#D13F4A'],
            // subtitle: {
            //     text:
            //         'Source: <a target="_blank" ' +
            //         'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
            //     align: 'left',
            // },
            title: {
                text: null,
            },

            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
                // crosshair: true,
                accessibility: {
                    description: 'Months',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: null,
                },
                labels: {
                    style: {
                        color: '#95AAC9',
                    },
                },
            },
            tooltip: {
                // valueSuffix: ' (1000 MT)',
                shared: true,
                useHTML: true,
                headerFormat:
                    '<h2 style="font-weight:bold; text-align:center; font-size:0.8rem; margin:0.3rem 0;">{point.key}</h2>',
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'Negative',
                    data: this.negative,
                },
                {
                    name: 'Positive',
                    data: this.positive,
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 1000,
                        },
                    },
                ],
            },
        });
    },
    beforeDestroy: function () {
        this.target.destroy();
    },
};
</script>
