<template>
    <tbody>
        <tr v-for="config in  configurations " :key="config.parameterKey">

            <td v-for="(value, key) in  config " :key="key">
                <select v-if="chosenConfig === config.parameterKey && !isDeleteButtonClicked && key === 'type'"
                    v-model="config[key]">
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="string">string</option>
                </select>
                <input
                    v-else-if="chosenConfig === config.parameterKey && !isDeleteButtonClicked && key !== 'createDate' && key !== 'parameterKey'"
                    v-model="config[key]" type="text" />
                <span v-else>{{ value }}</span>
            </td>

            <td>
                <div class="config-buttons">
                    <button v-if="chosenConfig === config.parameterKey && !isDeleteButtonClicked" class="button-done"
                        @click="editConfig(config).then(chosenConfig = null)">&#10003;</button>
                    <button v-else class="button-edit"
                        @click="chosenConfig = config.parameterKey; isDeleteButtonClicked = false">Edit</button>
                </div>
            </td>

            <td>
                <div class="config-buttons">
                    <button v-if="chosenConfig === config.parameterKey && isDeleteButtonClicked" class="button-done"
                        @click="deleteConfig(config).then(chosenConfig = null)">&#10003;</button>
                    <button v-else class="button-delete"
                        @click="chosenConfig = config.parameterKey; isDeleteButtonClicked = true">
                        Delete</button>
                </div>
            </td>

        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        configurations: Array,
        editConfig: Function,
        deleteConfig: Function,
    },
    data() {
        return {
            chosenConfig: "",
            isDeleteButtonClicked: false,
        };
    },
    methods: {
    },
};
</script>
