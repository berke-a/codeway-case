<template>
    <header>
        <img src="../assets/icon.png" alt="App Icon" class="header-icon">

        <div class="user-container" @mouseenter="showUserDetails = true" @mouseleave="showUserDetails = false">
            <img src="../assets/user.png" alt="User Icon" class="header-icon user-icon">

            <div v-if="showUserDetails" class="user-details">
                <p>{{ $store.getters.user.email }}</p>

                <button v-if="isSignoutButtonClicked" class="button-done"
                    @click="signout(); isSignoutButtonClicked = false">&#10003;</button>
                <button v-else class="button-delete" @click="isSignoutButtonClicked = true">Sign Out</button>
            </div>
        </div>

    </header>
    <div>
        <div v-if="configurations.length >= 0" class="configurations-table">

            <ConfigurationsTableComponent v-if="isDesktop" :configurations="configurations" :headers="headers"
                :editConfig="editConfig" :deleteConfig="deleteConfig" :addConfig="addConfig" />

            <ConfigurationsMobileComponent v-else :configurations="configurations" :headers="headers"
                :editConfig="editConfig" :deleteConfig="deleteConfig" :addConfig="addConfig" />


            <button v-if="configurations.length > 0" @click="fetchJson" class="button-json">
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
import { isStringSnakeCase, checkScreenSize } from '../utils.js';


export default {
    name: 'ConfigurationsView',
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
            isSignoutButtonClicked: false,
            headers: [],
            configurations: [],
            showUserDetails: false,
            json: '',
            showJson: false,
            API_URL: 'http://localhost:3000',
        };
    },
    mounted() {
        this.fetchConfigurations();
        window.addEventListener('resize', checkScreenSize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', checkScreenSize);
    },
    methods: {
        async fetchConfigurations() {
            try {
                const response = await this.sendRequest('GET', '', null);
                this.headers = response.data.headers;
                this.configurations = response.data.data;
                console.log(this.configurations)
            } catch (error) {
                console.error("An error occurred:", error);
                this.toast.error('An error occurred while fetching configurations!')
            }
        },
        async editConfig(config) {
            try {
                await this.sendRequest('PUT', '/' + config.parameterKey, config)

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
                await this.sendRequest('DELETE', '/' + config.parameterKey, null);

                this.configurations = this.configurations.filter(c => c.parameterKey !== config.parameterKey);

                this.toast.success('Configuration deleted successfully!');



                await this.fetchJson(false);
            } catch (error) {
                console.error("An error occurred:", error);
                this.toast.error('An error occurred while deleting configuration!')
            }
            this.chosenConfig = null;
        },
        async fetchJson(isButtonClicked = true) {
            if (isButtonClicked) {
                this.showJson = this.showJson ? false : true;
                if (!this.showJson) return;
            }

            try {
                const response = await this.sendRequest('GET', '/json', null);

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

            if (!isStringSnakeCase(newConfig.parameterKey)) {
                this.toast.warning('Parameter key must be in snake_case!');
                return;
            }

            try {
                const response = await this.sendRequest('POST', '', newConfig);

                console.log(response.data.data)
                this.configurations.push(response.data.data);

                this.toast.success('Configuration added successfully!');

                await this.fetchJson(false);
            } catch (error) {
                console.error("An error occurred:", error);
                this.toast.error(error.response.data.message);
            }
        },
        async sendRequest(method, extraUrl, data) {
            const url = this.API_URL + '/configurations' + extraUrl;
            const headers = {
                headers: {
                    'Authorization': 'Bearer ' + store.getters.token
                }
            }

            switch (method) {
                case 'GET':
                    return await axios.get(url, headers)
                case 'POST':
                    return await axios.post(url, data, headers)
                case 'PUT':
                    return await axios.put(url, data, headers)
                case 'DELETE':
                    return await axios.delete(url, headers)
            }
        },
        signout() {
            this.$store.dispatch('signout');
            this.$router.push({ path: '/signin' })
        },
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

@media screen and (max-width: 600px) {
    .json-content {
        font-size: small;
    }

}
</style>
  