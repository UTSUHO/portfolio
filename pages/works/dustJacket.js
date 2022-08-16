import {
    Box,
    Container,
    Badge,
    Link,
    List,
    ListItem,
    SimpleGrid,
    UnorderedList,
    Image
  } from '@chakra-ui/react'
  import Layout from '../../components/layouts/article'
  import { ExternalLinkIcon } from '@chakra-ui/icons'
  import { Title, WorkImage, Meta } from '../../components/work'
  import P from '../../components/paragraph'
  
  const Work = () => (
    <Layout title="Dust Jacket Design">
      <Container>
        <Title>
          新媒体设计 final project <Badge>2019-Present</Badge>
        </Title>
        <P>
          为乔治奥威尔的名作，《1984》所设计的书籍封皮
        </P>
  

  
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Type</Meta>
            <span>design project</span>
          </ListItem>
          <ListItem>
            <Meta>Tags</Meta>
            <span>Design, Solo</span>
          </ListItem>
          <ListItem>
            <Meta>Source</Meta>
            <Link href="https://www.pinterest.com/pin/503488433333876277/">
              Pinterest<ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
  
        {/* <SimpleGrid columns={2} gap={2}> */}
          <WorkImage src="/images/works/Fengyi-Chen-Dust-Jacket.png" alt="dust-jacket" />
        {/* </SimpleGrid> */}
      </Container>
    </Layout>
  )
  
  export default Work
  export { getServerSideProps } from '../../components/chakra'
  