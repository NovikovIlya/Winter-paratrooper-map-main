module.exports = {
  content: [
    "./src/**/*.php", "./src/**/*.js",  'node_modules/preline/dist/*.js',
  ],
  plugins: [
    // require('@tailwindcss/forms'),
      require('preline/plugin'),
  ],

}
