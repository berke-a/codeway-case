<template>
    <table>
        <ConfigurationTableHeader :headers="headers" />
        <ConfigurationTableBody :configurations="configurations" :editConfig="editConfig" :deleteConfig="deleteConfig"
            :addConfig="addConfig" />
        <ConfigurationAdd :addConfig="addConfig" />
    </table>
</template>

<script>

import ConfigurationTableHeader from "./tables/ConfigurationTableHeader.vue";
import ConfigurationTableBody from "./tables/ConfigurationTableBody.vue";
import ConfigurationAdd from "./add/ConfigurationAdd.vue";


export default {
    props: {
        configurations: Array,
        headers: Array,
        editConfig: Function,
        deleteConfig: Function,
        addConfig: Function,
    },
    components: {
        ConfigurationTableHeader,
        ConfigurationTableBody,
        ConfigurationAdd
    },
};
</script>

<style scoped></style>
