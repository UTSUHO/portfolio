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
    <Layout title="Mead of Poetry">
      <Container>
        <Title>
          诗之蜜酒 <Badge>2022-Present</Badge>
        </Title>
        <P>
          一个中策桌游，取材灵感来自于神话与史诗。玩家将扮演吟游诗人，编织传说与故事，以赢得巨人(苏图恩)的蜜酒。
        </P>
  
        <P>
          具体包含的机制
        </P>
        <UnorderedList my={4}>
          <ListItem>手牌控制</ListItem>
          <ListItem>牌组构建</ListItem>
          <ListItem>工人摆放</ListItem>
          <ListItem>组合收集</ListItem>
        </UnorderedList>
  
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Type</Meta>
            <span>game design</span>
          </ListItem>
          <ListItem>
            <Meta>Tags</Meta>
            <span>Design, Boardgame, Mythology</span>
          </ListItem>
        </List>
  
        {/* <SimpleGrid columns={2} gap={2}> */}
          {/* <WorkImage src="/images/works/TH-M1.png" alt="TH-M1-comedy" /> */}
        {/* </SimpleGrid> */}
      </Container>
    </Layout>
  )
  
  export default Work
  export { getServerSideProps } from '../../components/chakra'
  