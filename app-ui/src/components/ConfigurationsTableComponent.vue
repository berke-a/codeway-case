<template>
    <table>
        <ConfigurationsTableHeader :headers="headers" />
        <ConfigurationsTableBody :configurations="configurations" :editConfig="editConfig" :deleteConfig="deleteConfig"
            :addConfig="addConfig" />
        <ConfigurationsAdd :addConfig="addConfig" />
    </table>
</template>

<script>

import ConfigurationsTableHeader from "./tables/ConfigurationsTableHeader.vue";
import ConfigurationsTableBody from "./tables/ConfigurationsTableBody.vue";
import ConfigurationsAdd from "./add/ConfigurationsAdd.vue";


export default {
    props: {
        configurations: Array,
        headers: Array,
        editConfig: Function,
        deleteConfig: Function,
        addConfig: Function,
    },
    components: {
        ConfigurationsTableHeader,
        ConfigurationsTableBody,
        ConfigurationsAdd
    },
};
</script>

<style scoped></style>
