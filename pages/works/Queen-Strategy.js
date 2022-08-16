import {
    Box,
    Container,
    Badge,
    Link,
    List,
    ListItem,
    SimpleGrid,
    UnorderedList,
    Heading,
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
          代号σ <Badge>2022-Present</Badge>
        </Title>
        <P>
          一款日式SLG战棋游戏，单机，预定2025年发售。锐意制作中!
        </P>
        <br/>
        <Heading as="h3" fontSize={20} mb={4}>
            目前可以公开的情报：
        </Heading>
        <P>
          游戏开发进度：Initial Phase -&gt; Plan Phase
        </P>
        <P>
            开发组成员：10人（11人，一人请长假）
        </P>
        <UnorderedList my={4}>
          <ListItem>游戏性管线：战斗系统细化</ListItem>
          <ListItem>叙事性管线：背景设定细化</ListItem>
          <ListItem>开发管线：开发脚手架搭建</ListItem>
          <ListItem>设计管线：概念设计</ListItem>
        </UnorderedList>
  
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Type</Meta>
            <span>game design</span>
          </ListItem>
          <ListItem>
            <Meta>Tags</Meta>
            <span>Design, SLG, Mythology</span>
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
  