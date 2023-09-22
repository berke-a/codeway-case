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
        <div class="mobile-config">
            <span class="mobile-add-title">New Config</span>
            <div class="config-field" v-for="(value, key) in newConfig" :key="key">
                <span class="mobile-key">{{ key }}:</span>
                <select v-if="key === 'type'" v-model="newConfig[key]">
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="string">string</option>
                </select>
                <input v-else-if="key !== 'createDate'" v-model="newConfig[key]" type="text" />
            </div>
            <button @click="addConfig(newConfig)" class=" button-add">Add</button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
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
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
    .mobile-config {
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 15px;
        margin-bottom: 20px;
    }


    .mobile-add-title {
        color: #FFFF;
        font-weight: bold;
        font-size: larger;
    }

    .config-field {
        margin-bottom: 10px;
    }

    .mobile-key {
        color: #FFFF;
        font-weight: bold;
    }

    .mobile-value {
        color: #FFFF;

    }

    .config-buttons {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
    }

    .button-add {
        margin: 20px auto 0 0;
    }
}
</style>
