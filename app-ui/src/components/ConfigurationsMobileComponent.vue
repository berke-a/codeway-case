<template>
    <div>
        <div class="mobile-config" v-for="config in configurations" :key="config.parameterKey">
            <div class="config-field" v-for="(value, key) in config" :key="key">
                <div v-if="chosenConfig === config.parameterKey">
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

            <div class="config-buttons">
                <div>
                    <button v-if="chosenConfig === config.parameterKey" class="button-done"
                        @click="editConfig(config).then(chosenConfig = null)">Done</button>
                    <button v-else class="button-edit" @click="chosenConfig = config.parameterKey">Edit</button>
                </div>
                <button class="button-delete" @click="deleteConfig(config)">Delete</button>
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
            currentDate: this.toHumanReadableFormat(new Date()),
            chosenConfig: null,
            newConfig: {
                parameterKey: '',
                value: '',
                type: 'string',
                description: '',
                createDate: '',
            },
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
        toHumanReadableFormat(date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }

    }
};
</script>

<style scoped></style>
