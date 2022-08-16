import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Rei Utsuho. All Rights Reserved.
      <br/>
      Inspired by <a href='https://www.craftz.dog/' rel="noreferrer" target='_blank'>Takuya Matsuyama&apos;s website</a>.
      <br/>
      Voxel Model created by phil_xg@sketchfab.
    </Box>
  )
}

export default Footer
