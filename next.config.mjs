/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;