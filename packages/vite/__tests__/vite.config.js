import { defineConfig } from 'vite';
import i18never from '../dist';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [i18never()],
});
