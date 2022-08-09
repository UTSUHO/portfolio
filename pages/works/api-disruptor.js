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
  <Layout title="Api-Disruptor">
    <Container>
      <Title>
        Api-Disruptor <Badge>2020</Badge>
      </Title>
      <P>
        A quick tool for batch processing of RESTful api test. Support JSON/JS obj/Keypair value parsing.
      </P>
      <P>
        So, you can test any JSON/ JSobj / Key pair value from your clipboard directly, without transfering your data from one type to another type.
      </P>
      <WorkImage src="/images/works/Api-Disruptor.png" alt="api-disruptor" />

      <UnorderedList my={4}>
        <ListItem>JSON/JSobj/key paired value parsing, just copy it!</ListItem>
        <ListItem>RESTful API testing</ListItem>
      </UnorderedList>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>App types</Meta>
          <span>Tool</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Vue3, Axios, AntD</span>
        </ListItem>
        <ListItem>
          <Meta>Source</Meta>
          <Link href="https://github.com/UTSUHO/api-disruptor">
            github.com/UTSUHO/api-disruptor <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </List>

      {/* <SimpleGrid columns={2} gap={2}> */}
        <WorkImage src="/images/works/Api-Disruptor1.png" alt="api-disruptor" />
      {/* </SimpleGrid> */}
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
