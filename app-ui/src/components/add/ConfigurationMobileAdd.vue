<template>
    <div class="mobile-config">
        <span class="mobile-add-title">New Config</span>
        <div class="config-field" v-for="(value, key) in newConfig" :key="key">
            <span class="mobile-key">{{ key }}:</span>
            <select v-if="key === 'type'" v-model="newConfig[key]">
                <option value="int">int</option>
                <option value="float">float</option>
                <option value="string">string</option>
            </select>
            <input v-else-if="key === 'parameterKey'" placeholder="New Parameter (snake_case)" v-model="newConfig[key]"
                type="text" />
            <input v-else-if="key === 'value'" placeholder="Value" v-model="newConfig[key]" type="text" />
            <input v-else-if="key === 'description'" placeholder="New Description" v-model="newConfig[key]" type="text" />
            <span v-else-if="key === 'createDate'" class="mobile-value">{{ currentDate }}</span>
            <span class="mobile-value" v-else>{{ value }}</span>
        </div>
        <button v-if="isButtonClicked" class="button-done" style="margin-left: 0;"
            @click="addConfig(newConfig); isButtonClicked = false; clearNewConfig();">&#10003;
        </button>
        <button v-else class="button-add" @click="isButtonClicked = true">Add</button>

    </div>
</template>

<script>
import { toHumanReadableFormat } from "../../utils.js";

export default {
    data() {
        return {
            currentDate: toHumanReadableFormat(new Date()),
            isButtonClicked: false,
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
        addConfig: Function,
    },
    methods: {
        clearNewConfig() {
            this.newConfig = {
                parameterKey: '',
                value: '',
                type: 'string',
                description: '',
                createDate: '',
            };
        },
    },
};
</script>

<style scoped>
.button-done {}
</style>