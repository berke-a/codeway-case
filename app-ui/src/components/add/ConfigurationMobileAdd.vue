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
        <button @click="addConfig(newConfig)" class=" button-add">Add</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: this.toHumanReadableFormat(new Date()),
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