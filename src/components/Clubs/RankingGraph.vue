<script>

import { VueEcharts } from 'vue3-echarts';
import * as echarts from 'echarts';

import datos from './life-expectancy-table.json';

import { ref } from 'vue';

export default {
    components:{
        VueEcharts
    },
    setup(){
        const countries = [
            'Finland',
            'France',
            'Germany',
            'Iceland',
            'Norway',
            'Poland',
            'Russia',
            'United Kingdom'
        ];
        const datasetWithFilters = [];
        const seriesList = [];

        echarts.util.each(countries, function (country) {
            var datasetId = 'dataset_' + country;
            datasetWithFilters.push({
                id: datasetId,
                fromDatasetId: 'dataset_raw',
                transform: {
                    type: 'filter',
                    config: {
                    and: [
                            { dimension: 'Year', gte: 1950 },
                            { dimension: 'Country', '=': country }
                        ]
                    }
                }
            });
            seriesList.push({
                type: 'line',
                datasetId: datasetId,
                showSymbol: false,
                name: country,
                endLabel: {
                    show: true,
                    formatter: function (params) {
                    return params.value[3] + ': ' + params.value[0];
                    }
                },
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
                encode: {
                    x: 'Year',
                    y: 'Income',
                    label: ['Country', 'Income'],
                    itemName: 'Year',
                    tooltip: ['Income']
                }
            });
        });
        
        const option = ref({
            animationDuration: 10000,
            dataset: [
            {
                id: 'dataset_raw',
                source: datos
            },
            ...datasetWithFilters
            ],
            title: {
                text: 'Histórico de Jugadores por Ranking'
            },
            tooltip: {
                order: 'valueDesc',
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                nameLocation: 'middle'
            },
            yAxis: {
                name: 'Income'
            },
            grid: {
            right: 140
            },
            series: seriesList
        });

        return {
            option
        }
    }
}
</script>

<template>
    <div>
        <vue-echarts :option="option" style="height: 500px" ref="chart" />
    </div>
</template>