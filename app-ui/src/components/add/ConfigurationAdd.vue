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
import { toHumanReadableFormat } from "../../utils.js";

export default {
    props: {
        addConfig: Function,
    },
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