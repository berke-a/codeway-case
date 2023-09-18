<template>
    <div>
        <table v-if="configurations.length">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="config in configurations" :key="config.parameterKey">
                    <td v-for="(value, key) in config" :key="key">{{ value }}</td>
                    <td>
                        <button class="edit" @click="editConfig(config)">Edit</button>
                    </td>
                    <td>
                        <button class="delete" @click="deleteConfig(config)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Loading configurations...</p>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'ConfigurationsTable',
    data() {
        return {
            headers: [],
            configurations: []
        };
    },
    methods: {
        async fetchConfigurations() {
            try {
                const response = await axios.get('http://localhost:3000/');
                console.log(response);
                this.headers = response.data.headers;
                this.configurations = response.data.data;
            } catch (error) {
                console.error("An error occurred:", error);
            }
        },
        editConfig(config) {
            console.log("Editing configuration:", config);
        },
        deleteConfig(config) {
            console.log("Deleting configuration:", config);
        }
    },
    mounted() {
        this.fetchConfigurations();
    }
};
</script>
  
<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    text-align: left;
}

thead {
    color: #778CA3;
    font-size: larger;

}

tbody {
    color: #FFFF;
    font-size: small;
}

th,
td {
    padding: 8px 12px 8px 0px;
}

button {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    color: #FFFF;
    font-weight: bold;
}

.edit {
    background-image: linear-gradient(45deg, #3161F5, #2089F8) ;
}

.delete {
    background-image: linear-gradient(45deg, #EF363B, #FB5681) ;
}

@media only screen and (max-width: 600px) {
    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>
  