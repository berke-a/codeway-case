<template>
    <header>
        <img src="../assets/icon.png" alt="App Icon" class="header-icon">

        <div class="user-container" @mouseenter="showUserDetails = true" @mouseleave="showUserDetails = false">
            <img src="../assets/user.png" alt="User Icon" class="header-icon user-icon">

            <div v-if="showUserDetails" class="user-details">
                <p>{{ $store.getters.user.email }}</p>
                <button class="delete" @click="logout">Logout</button>
            </div>
        </div>

    </header>
    <div>
        <div v-if="configurations.length" class="configurations-table">
            <table>
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
                            <input
                                v-else-if="chosenConfig === config.parameterKey && key !== 'createDate' && key !== 'parameterKey'"
                                v-model="config[key]" type="text" />
                            <span v-else>{{ value }}</span>
                        </td>

                        <td>
                            <button v-if="chosenConfig === config.parameterKey" class="button-done"
                                @click="editConfig(config)">Done</button>
                            <button v-else class="button-edit" @click="makeConfigEditable(config)">Edit</button>
                        </td>

                        <td>
                            <button class="button-delete" @click="deleteConfig(config)">Delete</button>
                        </td>

                    </tr>

                    <tr>
                        <td>
                            <input v-model="newConfig.parameterKey" type="text" />
                        </td>
                        <td>
                            <input v-model="newConfig.value" type="text" />
                        </td>
                        <td>
                            <select v-model="newConfig.type">
                                <option value="int">int</option>
                                <option value="float">float</option>
                                <option value="string">string</option>
                            </select>
                        </td>
                        <td>
                            <input v-model="newConfig.description" type="text" />
                        </td>
                        <td>
                            <span> {{ currentDate }} </span>
                        </td>
                        <td>
                            <button class="button-add" @click="addConfig(newConfig)">Add</button>
                        </td>

                    </tr>

                </tbody>
            </table>
            <button @click="fetchJson" class="button-json">
                Preview JSON file
            </button>
            <div v-if="showJson" class="json-content">
                <pre><code class="language-json">{{ json }}</code></pre>
            </div>
        </div>
        <p v-else>Loading configurations...</p>
    </div>
</template>
  
<script>
import store from '@/store';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css';

export default {
    name: 'ConfigurationsTable',
    data() {
        return {
            headers: [],
            configurations: [],
            chosenConfig: null,
            showUserDetails: false,
            json: '',
            showJson: false,
            currentDate: this.toHumanReadableFormat(new Date()),
            newConfig: {
                parameterKey: '',
                value: '',
                type: '',
                description: ''
            }
        };
    },
    methods: {
        async fetchConfigurations() {
            console.log(store.getters.user)
            try {
                const response = await axios.get('http://localhost:3000/configurations', {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters.token
                    }
                });
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
                const response = await axios.put('http://localhost:3000/configurations/' + config.parameterKey, config, {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters.token
                    }
                });
                console.log(response);
                const updatedConfigIndex = this.configurations.indexOf(config);
                this.configurations[updatedConfigIndex].value = config.value;
                this.configurations[updatedConfigIndex].type = config.type;
                this.configurations[updatedConfigIndex].description = config.description;

                await this.fetchJson(false);
            } catch (error) {
                console.error("An error occurred:", error);
            }
            this.chosenConfig = null;
        },
        async deleteConfig(config) {
            try {
                const response = await axios.delete('http://localhost:3000/configurations/' + config.parameterKey, {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters.token
                    }
                });
                console.log(response);
                this.configurations = this.configurations.filter(c => c.parameterKey !== config.parameterKey);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        },
        async fetchJson(isButtonPressed = true) {
            if (isButtonPressed) {
                this.showJson = this.showJson ? false : true;
                if (!this.showJson) return;
            }

            try {
                const response = await axios.get('http://localhost:3000/configurations/json', {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters.token
                    }
                });
                console.log(response);
                this.json = JSON.stringify(response.data.data, null, 4);
                this.$nextTick(() => {
                    Prism.highlightAll();
                });
            } catch (error) {
                console.error("An error occurred:", error);
            }
        },
        async addConfig(newConfig) {
            if (!newConfig.parameterKey || !newConfig.value || !newConfig.type || !newConfig.description) {
                console.error("All fields are required!");
                return;
            }

            if (!this.isStringSnakeCase(newConfig.parameterKey)) {
                console.error("Parameter key must be in snake case!");
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/configurations/', newConfig, {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters.token
                    }
                });
                this.configurations.push(response.data.data);

                await this.fetchJson(false);
            } catch (error) {
                console.error("An error occurred:", error)
            }
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push({ path: '/login' })
        },
        isStringSnakeCase(string) {
            return string === string.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        },
        toHumanReadableFormat(date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header-icon {
    width: 2rem;
}

.user-icon {
    border: 1px solid #FFFF;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
}

.user-container {
    position: relative;
    display: inline-block;
}

.user-details {
    position: absolute;
    top: 100%;
    right: 0;
    box-shadow: rgba(255, 255, 255, 0.3) 0 2px 10px;
    background-color: white;
    border: 1px solid #FFFF;
    border-radius: 5px;
    padding: 10px 20px;
    background-image: linear-gradient(#1E1E2E, #1E1E25);
    color: #FFFF;
    z-index: 1;
    white-space: nowrap;
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
    padding: 8px 8px;
}

td {
    vertical-align: middle;
}

button {
    display: block;
    margin-left: auto;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    color: #FFFF;
    font-weight: bold;
    cursor: pointer;
}

.button-done {
    background-image: linear-gradient(45deg, #379237, #1ECD97);
}

.button-edit {
    background-image: linear-gradient(45deg, #3161F5, #2089F8);
}

.button-delete {
    background-image: linear-gradient(45deg, #EF363B, #FB5681);
}

.button-json {
    background-image: linear-gradient(45deg, #00A8E9, #07E9C8);
    margin-left: 0;
}

.button-add {
    background-image: linear-gradient(45deg, #00A8E9, #07E9C8);
}

select,
input[type="text"] {
    border: 0.5px solid #2B3453;
    border-radius: 5px;
    padding: 5px 5px;
    width: 100%;
    box-sizing: border-box;
    background-image: linear-gradient(#1E1E2E, #1E1E25);
    color: #99a4b0;
}

.json-content {
    margin-top: 20px;
    border: 1px solid #FFFF;
    border-radius: 5px;
    padding: 10px 20px;
    width: fit-content;
}


@media only screen and (max-width: 600px) {
    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>
  