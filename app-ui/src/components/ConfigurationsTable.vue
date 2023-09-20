<template>
    <header>
        <img src="../assets/icon.png" alt="App Icon" class="header-icon">    
    </header>
    <div>
        <table v-if="configurations.length">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
            </thead>
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
                        <button v-if="chosenConfig === config.parameterKey" class="done"
                            @click="editConfig(config)">Done</button>
                        <button v-else class="edit" @click="makeConfigEditable(config)">Edit</button>
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
            configurations: [],
            chosenConfig: null
        };
    },
    methods: {
        async fetchConfigurations() {
            try {
                const response = await axios.get('http://localhost:3000/configurations');
                console.log(response);
                this.headers = response.data.headers;
                this.configurations = response.data.data;
            } catch (error) {
                console.error("An error occurred:", error);
            }
        },
        makeConfigEditable(config) {
            this.chosenConfig = config.parameterKey;
        },
        async editConfig(config) {
            try {
                const response =await axios.put('http://localhost:3000/configurations/' + config.parameterKey, config);
                console.log(response);
                
                const updatedConfigIndex = this.configurations.indexOf(config);
                this.configurations[updatedConfigIndex].value = config.value;
                this.configurations[updatedConfigIndex].type = config.type;
                this.configurations[updatedConfigIndex].description = config.description;
            } catch (error) {
                console.error("An error occurred:", error);
            }
            this.chosenConfig = null;
        },
        async deleteConfig(config) {
            try {
                const response = await axios.delete('http://localhost:3000/configurations/' + config.parameterKey);
                console.log(response);
                this.configurations = this.configurations.filter(c => c.parameterKey !== config.parameterKey);
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
header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.header-icon {
  width: 2rem;
}

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

.done {
    background-image: linear-gradient(45deg, #379237, #1ECD97);
}

.edit {
    background-image: linear-gradient(45deg, #3161F5, #2089F8);
}

.delete {
    background-image: linear-gradient(45deg, #EF363B, #FB5681);
}

select, 
input[type="text"] {
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    background-image: linear-gradient(#1E1E2E, #1E1E25);
    color: #FFFF;
}


@media only screen and (max-width: 600px) {
    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>
  