
// next.config.js

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cf.bstatic.com', // The hostname of the external image source
          port: '', // Optional: specify if you are using a specific port
          pathname: '/**', // Path matching for images
        },
      ],
    },
};
  