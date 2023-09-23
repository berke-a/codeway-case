<template>
    <div>
        <ConfigurationsMobileBody :configurations="configurations" :editConfig="editConfig" :deleteConfig="deleteConfig" />
        <ConfigurationsMobileAdd :addConfig="addConfig" />
    </div>
</template>

<script>
import ConfigurationsMobileAdd from "./add/ConfigurationsMobileAdd.vue";
import ConfigurationsMobileBody from "./ConfigurationsMobileBody.vue";

export default {
    components: {
        ConfigurationsMobileBody,
        ConfigurationsMobileAdd,
    },
    data() {
        return {
            isDeleteButtonClicked: false,
            chosenConfig: null,
        };
    },
    props: {
        configurations: Array,
        headers: Array,
        editConfig: Function,
        deleteConfig: Function,
        addConfig: Function,
    },
    methods: {
    }
};
</script>

<style scoped>
button {
    margin-right: auto;
    margin-left: auto;
}
</style>
