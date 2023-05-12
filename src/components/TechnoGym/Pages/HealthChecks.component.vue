<template>
    <pv-data-table :value="filteredHealthChecks" tableStyle="min-width: 50rem" :paginator="true" :rows="10">
        <template #header>
            <div class="flex flex-wrap align-items-start justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Health Checks</span>
                <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <pv-input-text v-model="globalFilter" placeholder="Search" />
                    <!--
                    <pv-button icon="pi pi-search" aria-label="Search" @click="filterHealthChecks" />
                    -->
                </span>
            </div>
        </template>

        <pv-column field="id" sortable header="Record Id"></pv-column>
        <pv-column field="treadmillId" sortable header="Treadmill Id"></pv-column>
        <pv-column field="serialNumber" sortable header="Serial Number"></pv-column>
        <pv-column field="centerName" sortable header="Center Name"></pv-column>
        <pv-column field="date" sortable header="Date"></pv-column>
        <pv-column field="time" sortable header="Time"></pv-column>
        <pv-column field="volts" sortable header="Volts"></pv-column>
        <pv-column field="watts" sortable header="Watts"></pv-column>
        <pv-column field="hp" sortable header="HP"></pv-column>
    </pv-data-table>
</template>

<script setup>
import { ref, computed } from 'vue';
import { MarathonApiService } from "../services/marathon-api.service";

const marathonService = new MarathonApiService();
const healthChecks = ref([]);
const treadmills = ref([]);
const centers = ref([]);
const globalFilter = ref(null);

const loadData = async () => {
    const [healthChecksResponse, treadmillsResponse, centersResponse] = await Promise.all([
        marathonService.getAllHealthChecks(),
        marathonService.getAllTreadmills(),
        marathonService.getAllCenters(),
    ]);
    healthChecks.value = healthChecksResponse.data;
    treadmills.value = treadmillsResponse.data;
    centers.value = centersResponse.data;
};

loadData();

const getSerialNumber = (treadmillId) => {
    const treadmill = treadmills.value.find(t => t.id === treadmillId);
    return treadmill ? treadmill.serialNumber : '';
};

const getCenterName = (treadmillId) => {
    const treadmill = treadmills.value.find(t => t.id === treadmillId);
    const center = centers.value.find(c => c.id === (treadmill ? treadmill.centerId : null));
    return center ? center.name : '';
};

const processedHealthChecks = computed(() => healthChecks.value.map(hc => ({
    ...hc, //se usa para copiar todos los atributos de hc que se optienen del json
    serialNumber: getSerialNumber(hc.treadmillId),
    centerName: getCenterName(hc.treadmillId),
    //obtenemos la fecha en formato yyyy-mm-dd
    date: `${hc.year}-${hc.month.toString().padStart(2, '0')}-${hc.day.toString().padStart(2, '0')}`,
    //obtenemos la hora en formato hh:mm:ss
    time: `${hc.hour.toString().padStart(2, '0')}:${hc.minutes.toString().padStart(2, '0')}:${hc.seconds.toString().padStart(2, '0')}`,
    //   toString().padStart(2, '0') -> convierte el numero a string y si el numero tiene menos de 2 digitos le agrega un 0 al inicio
})));

//implementacion de busqueda(filtering)
const filteredHealthChecks = computed(() => {
    if (!globalFilter.value) {
        return processedHealthChecks.value;
    }
    const filter = globalFilter.value.toLowerCase();
    return processedHealthChecks.value.filter(hc => Object.values(hc).some(value => value.toString().toLowerCase().includes(filter)));
});

</script>


