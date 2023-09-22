<template>
    <tbody>
        <tr v-for="config in configurations" :key="config.parameterKey">

            <td v-for="(value, key) in config" :key="key">
                <select v-if="chosenConfig === config.parameterKey && key === 'type'" v-model="config[key]">
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="string">string</option>
                </select>
                <input v-else-if="chosenConfig === config.parameterKey && key !== 'createDate' && key !== 'parameterKey'"
                    v-model="config[key]" type="text" />
                <span v-else>{{ value }}</span>
            </td>

            <td>
                <button v-if="chosenConfig === config.parameterKey" class="button-done"
                    @click="editConfig(config).then(chosenConfig = null)">Done</button>
                <button v-else class="button-edit" @click="chosenConfig = config.parameterKey">Edit</button>
            </td>

            <td>
                <button class="button-delete" @click="deleteConfig(config)">Delete</button>
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
            currentDate: this.toHumanReadableFormat(new Date()),
            newConfig: {
                parameterKey: "",
                value: "",
                type: "string",
                description: "",
                createDate: "",
            },
        };
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
    },
};
</script>
