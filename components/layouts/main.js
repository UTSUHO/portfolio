import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelModelLoader from '../voxel-model-loader'

const LazyVoxelModel = dynamic(() => import('../voxel-model'), {
  ssr: false,
  loading: () => <VoxelModelLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ReiUtsuho's Portofolio" />
        <meta name="author" content="Rei Utsuho" />
        <meta property="og:site_name" content="Rei Utsuho" />
        <meta name="og:title" content="Rei Utsuho" />
        <meta property="og:type" content="website" />
        <title>Rei Utsuho - Portfolio</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <LazyVoxelModel />

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
