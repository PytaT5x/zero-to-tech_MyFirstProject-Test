import { defineConfig } from 'vite'
import { resolve } from 'node:path'

import react from "@vitejs/plugin-react";


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // key: 输出文件名，value: 源文件路径
        main: resolve(__dirname, 'index.html'),
        mypage: resolve(__dirname, 'pages/mypage.html')
      }
    }
  },
  plugins: [react()],
})





