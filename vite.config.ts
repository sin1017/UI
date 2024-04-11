import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]s?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ],
        dts: './auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          NaiveUiResolver()
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      // 模塊分割-預設500 kb
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // 模塊分割
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
          sanitizeFileName(fileName) {
            // 去除驅動器名稱（例如在 Windows 系統中）並移除非法字符
            const match = DRIVE_LETTER_REGEX.exec(fileName);
            const driveLetter = match ? match[0] : '';
            // substr 是被淘汰語法，因此要改 slice
            return (
              driveLetter +
              fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
            );
          },
        }
      }
    },
  }
});
