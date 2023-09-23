<template>
    <div>
        <div class="mobile-config" v-for="config in configurations" :key="config.parameterKey">
            <div class="config-field" v-for="(value, key) in config" :key="key">
                <div v-if="chosenConfig === config.parameterKey && !isDeleteButtonClicked">
                    <span class="mobile-key">{{ key }}:</span>
                    <select v-if="key === 'type'" v-model="config[key]">
                        <option value="int">int</option>
                        <option value="float">float</option>
                        <option value="string">string</option>
                    </select>
                    <input v-else-if="key !== 'createDate' && key !== 'parameterKey'" v-model="config[key]" type="text" />
                    <span class="mobile-value" v-else>{{ value }}</span>
                </div>
                <div v-else>
                    <span class="mobile-key">{{ key }}:</span> <span class="mobile-value">{{ value }}</span>
                </div>
            </div>

            <div>
                <div v-if="chosenConfig === config.parameterKey" class="config-buttons">
                    <button v-if="!isDeleteButtonClicked" class="button-done"
                        @click="editConfig(config).then(chosenConfig = null)">&#10003;</button>
                    <button v-if="!isDeleteButtonClicked" style="z-index: -1"></button>

                    <button v-if="isDeleteButtonClicked" style="z-index: -1"></button>
                    <button v-if="isDeleteButtonClicked" class="button-done"
                        @click="deleteConfig(config).then(chosenConfig = null)">&#10003;</button>

                </div>
                <div v-else class="config-buttons">
                    <button class="button-edit"
                        @click="chosenConfig = config.parameterKey; isDeleteButtonClicked = false">Edit</button>
                    <button class="button-delete" @click="chosenConfig = config.parameterKey; isDeleteButtonClicked = true">
                        Delete</button>
                </div>

            </div>
        </div>
        <ConfigurationMobileAdd :addConfig="addConfig" />
    </div>
</template>

<script>
import ConfigurationMobileAdd from "./add/ConfigurationMobileAdd.vue";

export default {
    components: {
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
