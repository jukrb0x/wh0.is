/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true
  // TODO: 
  //  - headers, security options
  //  - redirects from soem old sources
  //
};

const withNextra = require('nextra')({
    theme: 'nextra-theme-blog',
    themeConfig: './theme.config.jsx'
});

module.exports = /* nextConfig */ withNextra(nextConfig);
