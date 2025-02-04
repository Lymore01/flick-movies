/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images**',
      },
      {
        protocol: 'https',
        hostname: 'mir-s3-cdn-cf.behance.net',
        port: '',
        pathname: '/project_modules/1400/**',
      },{
        protocol: 'https',
        hostname: 'ttwo.dk',
        port: '',
        pathname: '/wp-content/uploads/2017/08/person-placeholder.jpg',
      }
    ],
  },
};

export default nextConfig;
// https://ttwo.dk/wp-content/uploads/2017/08/person-placeholder.jpg

