import { defineConfig } from 'vite';
import i18never from '../dist';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        i18never({
            exclude: [/node_modules/],
        }),
    ],
});
