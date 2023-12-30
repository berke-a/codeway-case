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
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css';
import { useToast } from "vue-toastification";
import ConfigurationsTableComponent from '@/components/ConfigurationsTableComponent.vue';
import ConfigurationsMobileComponent from '@/components/ConfigurationsMobileComponent.vue';
import { checkScreenSize } from '../utils.js';
import AuthService from '@/services/authService';
import ConfigurationsService from '@/services/configurationsService';

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
            authService: new AuthService(this),
            isTokenRefreshedBefore: false,
            // API_URL: 'https://backend-dot-codeway-task-399914.lm.r.appspot.com',
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
            const response = await ConfigurationsService.fetchConfigurations();
            if (response.success) {
                this.headers = response.data.headers;
                this.configurations = response.data.configurations;
            }
            else {
                this.toast.error(response.message);
            }
            this.headers = response.data.headers;
            this.configurations = response.data.configurations;
        },
        async editConfig(config) {
            const response = await ConfigurationsService.editConfig(config);
            if (response.success) {
                const updatedConfigIndex = this.configurations.indexOf(config);
                this.configurations[updatedConfigIndex].value = config.value;
                this.configurations[updatedConfigIndex].type = config.type;
                this.configurations[updatedConfigIndex].description = config.description;

                this.toast.success('Configuration updated successfully!');

                await this.fetchJson(false);
            }
            else {
                this.toast.error(response.message);
            }
            this.chosenConfig = null;
        },
        async deleteConfig(config) {
            const response = await ConfigurationsService.deleteConfig(config);
            if (response.success) {
                const deletedConfigIndex = this.configurations.indexOf(config);
                this.configurations.splice(deletedConfigIndex, 1);

                this.toast.success('Configuration deleted successfully!');

                await this.fetchJson(false);
            }
            else {
                this.toast.error(response.message);
            }
            this.chosenConfig = null;
        },
        async fetchJson(isButtonClicked = true) {
            if (isButtonClicked) {
                this.showJson = this.showJson ? false : true;
                if (!this.showJson) return;
            }

            const response = await ConfigurationsService.fetchJson();

            if (response.success) {
                this.json = JSON.stringify(response.data, null, 4);
                this.$nextTick(() => {
                    Prism.highlightAll();
                });
            }
            else {
                this.toast.error(response.message);
            }
        },
        async addConfig(newConfig) {
            const response = await ConfigurationsService.addConfig(newConfig);
            if (response.success) {
                this.configurations.push(response.data);

                this.toast.success('Configuration added successfully!');

                await this.fetchJson(false);
            }
            else {
                this.toast.error(response.message);
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
  