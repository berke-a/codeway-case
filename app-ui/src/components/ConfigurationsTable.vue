<template>
    <div>
        <table v-if="configurations.length">
            <thead>
                <tr>
                    <th>Parameter Key</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Create Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="config in configurations" :key="config.id">
                    <td>{{ config.parameterKey }}</td>
                    <td>{{ config.value }}</td>
                    <td>{{ config.type }}</td>
                    <td>{{ config.description }}</td>
                    <td>{{ config.createDate }}</td>
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
            configurations: []
        };
    },
    methods: {
        async fetchConfigurations() {
            try {
                const response = await axios.get('http://localhost:3000/');
                console.log(response);
                this.configurations = response.data.data;
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    },
    mounted() {
        this.fetchConfigurations();
    }
};
</script>
  
<style scoped>
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

table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    text-align: left;
}

@media only screen and (max-width: 600px) {
    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>
  