<template>
    <header>
        <img src="../assets/icon.png" alt="App Icon" class="header-icon">

        <div class="user-container" @mouseenter="showUserDetails = true" @mouseleave="showUserDetails = false">
            <img src="../assets/user.png" alt="User Icon" class="header-icon user-icon">

            <div v-if="showUserDetails" class="user-details">
                <p>{{ $store.getters.user.email }}</p>
                <button class="button-delete" @click="signout">Sign Out</button>
            </div>
        </div>

    </header>
    <div>
        <div v-if="configurations.length" class="configurations-table">

            <ConfigurationsTableComponent v-if="isDesktop" :configurations="configurations" :headers="headers"
                :editConfig="editConfig" :deleteConfig="deleteConfig" :addConfig="addConfig"
                :addConfigMobile="addConfigMobile" />

            <ConfigurationsMobileComponent v-else :configurations="configurations" :headers="headers"
                :editConfig="editConfig" :deleteConfig="deleteConfig" :addConfig="addConfig"
                :addConfigMobile="addConfigMobile" />


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
import { useToast } from "vue-toastification";

import ConfigurationsTableComponent from '@/components/ConfigurationsTableComponent.vue';
import ConfigurationsMobileComponent from '@/components/ConfigurationsMobileComponent.vue';

export default {
    name: 'ConfigurationsTable',
    components: {
        ConfigurationsTableComponent,
        ConfigurationsMobileComponent,
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            isDesktop: window.innerWidth > 600,
            isMobileAddConfig: false,
            headers: [],
            configurations: [],
            showUserDetails: false,
            json: '',
            showJson: false,
        };
    },
    mounted() {
        this.fetchConfigurations();
        window.addEventListener('resize', this.checkScreenSize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkScreenSize);
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
                this.toast.error('An error occurred while fetching configurations!')
            }
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

                this.toast.success('Configuration updated successfully!');

                await this.fetchJson(false);
            } catch (error) {
                console.error("An error occurred:", error);
                this.toast.error('An error occurred while updating configuration!')
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

                this.toast.success('Configuration deleted successfully!');

                await this.fetchJson(false);
            } catch (error) {
                console.error("An error occurred:", error);
                this.toast.error('An error occurred while deleting configuration!')
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
                this.toast.error('An error occurred while fetching JSON preview!')
            }
        },
        async addConfig(newConfig) {
            if (!newConfig.parameterKey || !newConfig.value || !newConfig.type || !newConfig.description) {
                this.toast.warning('All fields are required!');
                return;
            }

            if (!this.isStringSnakeCase(newConfig.parameterKey)) {
                this.toast.warning('Parameter key must be in snake_case!');
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/configurations/', newConfig, {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters.token
                    }
                });
                this.configurations.push(response.data.data);

                this.toast.success('Configuration added successfully!');

                await this.fetchJson(false);
            } catch (error) {
                console.error("An error occurred:", error);
                this.toast.error(error.response.data.message);
            }
        },
        addConfigMobile() {
            this.isMobileAddConfig = true;
        },
        signout() {
            this.$store.dispatch('signout');
            this.$router.push({ path: '/signin' })
        },
        isStringSnakeCase(string) {
            return string === string.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        },
    },

    checkScreenSize() {
        this.isDesktop = window.innerWidth > 600;
    },

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


.json-content {
    margin-top: 20px;
    border: 1px solid #FFFF;
    border-radius: 5px;
    padding: 10px 20px;
    width: fit-content;
}
</style>
  