/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    // outras configurações
  
    module: {
      rules: [
        // outras regras de loader
  
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
  };
  
