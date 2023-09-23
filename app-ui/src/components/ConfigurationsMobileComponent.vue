<template>
    <div>
        <ConfigurationsMobileBody :configurations="configurations" :editConfig="editConfig" :deleteConfig="deleteConfig" />
        <ConfigurationMobileAdd :addConfig="addConfig" />
    </div>
</template>

<script>
import ConfigurationMobileAdd from "./add/ConfigurationMobileAdd.vue";
import ConfigurationsMobileBody from "./ConfigurationsMobileBody.vue";

export default {
    components: {
        ConfigurationsMobileBody,
        ConfigurationMobileAdd,
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
