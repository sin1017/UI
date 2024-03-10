// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/qianzaidezuopiezi/Desktop/personal%20project/vue-ui-fromework-component/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/qianzaidezuopiezi/Desktop/personal%20project/vue-ui-fromework-component/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { ElementPlusResolver } from "file:///Users/qianzaidezuopiezi/Desktop/personal%20project/vue-ui-fromework-component/node_modules/unplugin-vue-components/dist/resolvers.js";
import AutoImport from "file:///Users/qianzaidezuopiezi/Desktop/personal%20project/vue-ui-fromework-component/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/qianzaidezuopiezi/Desktop/personal%20project/vue-ui-fromework-component/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///Users/qianzaidezuopiezi/Desktop/personal%20project/vue-ui-fromework-component/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///Users/qianzaidezuopiezi/Desktop/personal%20project/vue-ui-fromework-component/vite.config.ts";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]s?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/,
          // .vue
          /\.md$/
          // .md
        ],
        imports: [
          "vue"
          // {
          //   'naive-ui': [
          //     'useDialog',
          //     'useMessage',
          //     'useNotification',
          //     'useLoadingBar'
          //   ]
          // }
        ],
        dts: "./auto-imports.d.ts",
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        }
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          NaiveUiResolver()
        ]
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcWlhbnphaWRlenVvcGllemkvRGVza3RvcC9wZXJzb25hbCBwcm9qZWN0L3Z1ZS11aS1mcm9tZXdvcmstY29tcG9uZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcWlhbnphaWRlenVvcGllemkvRGVza3RvcC9wZXJzb25hbCBwcm9qZWN0L3Z1ZS11aS1mcm9tZXdvcmstY29tcG9uZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9xaWFuemFpZGV6dW9waWV6aS9EZXNrdG9wL3BlcnNvbmFsJTIwcHJvamVjdC92dWUtdWktZnJvbWV3b3JrLWNvbXBvbmVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgL1xcLlt0al1zPyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuICAgICAgICAgIC9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgICAgICAvXFwubWQkLywgLy8gLm1kXG4gICAgICAgIF0sXG4gICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAvLyB7XG4gICAgICAgICAgLy8gICAnbmFpdmUtdWknOiBbXG4gICAgICAgICAgLy8gICAgICd1c2VEaWFsb2cnLFxuICAgICAgICAgIC8vICAgICAndXNlTWVzc2FnZScsXG4gICAgICAgICAgLy8gICAgICd1c2VOb3RpZmljYXRpb24nLFxuICAgICAgICAgIC8vICAgICAndXNlTG9hZGluZ0JhcidcbiAgICAgICAgICAvLyAgIF1cbiAgICAgICAgICAvLyB9XG4gICAgICAgIF0sXG4gICAgICAgIGR0czogJy4vYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICBlc2xpbnRyYzoge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXG4gICAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgICAgICBOYWl2ZVVpUmVzb2x2ZXIoKVxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdaLFNBQVMsZUFBZSxXQUFXO0FBQzNiLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHVCQUF1QjtBQU5nTyxJQUFNLDJDQUEyQztBQVNqVCxJQUFPLHNCQUFRLGFBQWEsTUFBTTtBQUNoQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUDtBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQVU7QUFBQTtBQUFBLFVBQ1Y7QUFBQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBU0Y7QUFBQSxRQUNBLEtBQUs7QUFBQSxRQUNMLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLFFBQ2pDLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULFVBQVU7QUFBQSxVQUNWLGtCQUFrQjtBQUFBLFFBQ3BCO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXO0FBQUEsVUFDVCxvQkFBb0I7QUFBQSxVQUNwQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
