const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            appName: 'Electron Quick Start',
            clicks: 0,
            keys: 0
        }
    },
    created() {
        window.electron.handleClicks((event, clicks) => {
            this.clicks += clicks;
        });

        window.electron.handleKeys((event, keys) => {
            this.keys += keys;
        });
    }
});

app.mount('#app');