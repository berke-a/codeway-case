<template>
    <tbody>
        <tr>
            <td>
                <input v-model="newConfig.parameterKey" type="text" placeholder="New Parameter (snake_case)" />
            </td>
            <td>
                <input v-model="newConfig.value" type="text" placeholder="Value" />
            </td>
            <td>
                <select v-model="newConfig.type">
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="string" selected>string</option>
                </select>
            </td>
            <td>
                <input v-model="newConfig.description" type="text" placeholder="New Description" />
            </td>
            <td>
                <span> {{ currentDate }} </span>
            </td>
            <td>
                <button v-if="isButtonClicked" class="button-done"
                    @click="addConfig(newConfig); isButtonClicked = false; clearNewConfig()">&#10003;
                </button>
                <button v-else class="button-add" @click="isButtonClicked = true">Add</button>

            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        addConfig: Function,
    },
    data() {
        return {
            currentDate: this.toHumanReadableFormat(new Date()),
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
        toHumanReadableFormat(date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        },
    },
};
</script>