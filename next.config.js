/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: { 
        includePaths: [`${__dirname}styles`] 
    }
}

module.exports = nextConfig
