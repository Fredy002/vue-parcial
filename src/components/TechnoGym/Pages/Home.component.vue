<template>
    <pv-card v-if="averagePerformance" style="width: 25em">
        <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Average Performance</span>
            </div>
        </template>
        <template #title>
            Volts: {{ averagePerformance.volts }}
            <br />
            Watts: {{ averagePerformance.watts }}
            <br />
            Hp: {{ averagePerformance.hp }}
        </template>
    </pv-card>
</template>

<script >
import { MarathonApiService } from "../services/marathon-api.service"

export default {
    name: "marathon",
    data() {
        return {
            marathons: [],
            marathonService: null,
            averagePerformance: null,
        };
    },
    created() {
        this.marathonService = new MarathonApiService();
        this.marathonService.getAllHealthChecks()
            .then((response) => {
                this.marathons = response.data;
                this.calculateAveragePerformance();
            });
    },
    methods: {
        calculateAveragePerformance() {
            let totalVolts = 0, totalWatts = 0, totalHp = 0, count = 0;

            for (let marathon of this.marathons) {
                if (marathon.hp > 0) {
                    totalVolts += marathon.volts; //obtiene el valor de volts de cada registro
                    totalWatts += marathon.watts; //obtiene el valor de watts de cada registro
                    totalHp += marathon.hp; //obtiene el valor de hp de cada registro
                    count++;
                }
            }

            if (count > 0) {
                this.averagePerformance = {
                    volts: totalVolts / count, //calcula el promedio de volts
                    //redondear a 3 decimales -> 13.0999999...
                    volts: Math.round((totalVolts / count) * 1000) / 1000, //13.1
                    watts: totalWatts / count, //calcula el promedio de watts
                    hp: totalHp / count, //calcula el promedio de hp
                };
            }
        },
    },
}
</script>

<style scoped>
    .p-card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
