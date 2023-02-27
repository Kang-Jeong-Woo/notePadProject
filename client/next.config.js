/** @type {import('next').NextConfig} */

const 보안API키 = "1234567890"

const nextConfig = {
  reactStrictMode: true,
  compiler:{
    styledComponents: true,
  },
  async redirects(){
    return[
      {
        source:"/어떤URL",
        destination:"보낼URL",
        permanent:false
      }
    ]
  },
  async rewrites(){
    return[
      {
        source:"/어떤URL",
        destination:`/보낼uRL${보안API키}`
      }
    ]
  }
}

module.exports = nextConfig
