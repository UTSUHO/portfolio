import NextLink from 'next/link'
import { 
    Container, 
    Box, 
    Heading, 
    Image, 
    Link, 
    useColorModeValue,
    Button
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BioSection, BioYear} from '../components/bio'
import Layout from '../components/Layouts/article'

const Page = () =>{
    return (
    <Layout>
    <Container>
    <Box borderRadius='lg'bg={useColorModeValue('whiteAlpha.500','whiteAlpha.200')} p={3} mb={6} align="center">
    Wellcome to my field of binah, altar of the self introduction.
    </Box>
    <Box display={{md:'flex'}}>
        <Box flexGrow={1}>
            <Heading as="h2" variant = "page-title">
                Rei Utsuho
            </Heading>
                <p>Digital IronSmith ( Designer / Developer / Gamer )</p>
        </Box>
        <Box
        flexShrink={0} 
        mt={{base: 4 , md: 0}} 
        ml={{md: 6 }} 
        align="center">
            <Image borderColor="whiteAlpha.800" 
            borderWidth={2} 
            borderStyle="solid" 
            maxWidth="100px" 
            display="inline-block" 
            borderRadius="full" 
            src="/images/logo.jpg" 
            alt="Profile Image"/>
        </Box>
    </Box>
    <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About Me
        </Heading>
        <Paragraph>ReiUtsuho is a indie game designer & full-stack developer with a passion for designing  & building digital tools or games he wants. Love video & board game designing and got some snack on handling real life problem by forging digital tools. When he is offline, books, board games, and classical music is his best friend. Currently, he is running an indie game project {''} 
        <NextLink href="/works/Queen">
            <Link>Queen</Link>
            </NextLink> and it would be released year 2025 ETR.
            </Paragraph>
            <Box align="center" my={4}>
            <NextLink href="/works">
                <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My Portfolio
                </Button>
            </NextLink>
        </Box>
    </Section>
    <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
            <BioYear>1997</BioYear>
            Born in Nanjing（南京）, China
        </BioSection>
        <BioSection>
            <BioYear>2021</BioYear>
            Completed the Bachelor&apos;s program in the golisano college of computing and information sciences at Rochester Institute of Technology（罗切斯特理工 网页与移动开发）
        </BioSection>
        <BioSection>
            <BioYear>2022 to present</BioYear>
            Working on the indie game project
        </BioSection>
    </Section>
    <Section DELAY={0.3}>
        <Heading as="h3" variant="section-title">
            Things I love
        </Heading>
        <Paragraph>
            Video Game, Board Game, Music, Mythology,&nbsp; 
            <NextLink href="https://bangumi.tv/user/nightofknight">
            <Link>Bangumi</Link></NextLink>
            , etc..
        </Paragraph>
    </Section>
</Container>
</Layout>
    )
}

export default Page