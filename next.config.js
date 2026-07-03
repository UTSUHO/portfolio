import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
}

export default withMDX(nextConfig)
