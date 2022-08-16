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
    <Layout title="Touhou M-1 comedy Series">
      <Container>
        <Title>
          东方M-1漫才大奖赛系列 <Badge>2014-Present</Badge>
        </Title>
        <P>
          参与了东方M-1漫才大奖赛系列的网络汉化项目，目前项目组已对接日本官方正式合作。具体在组内负责时间轴和校对的工作。
        </P>
  
        <P>
          具体参与的回数。
        </P>
        <UnorderedList my={4}>
          <ListItem>第八回</ListItem>
          <ListItem>第十回</ListItem>
          <ListItem>第十三回</ListItem>
          <ListItem>第十四回</ListItem>
          <ListItem>第十五回</ListItem>
          <ListItem>第十六回</ListItem>
          <ListItem>红白企划</ListItem>
        </UnorderedList>
  
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Type</Meta>
            <span>collaboration project</span>
          </ListItem>
          <ListItem>
            <Meta>Tags</Meta>
            <span>Touhou, Translation</span>
          </ListItem>
          <ListItem>
            <Meta>Source</Meta>
            <Link href="https://www.bilibili.com/video/BV1pp411o7hq?p=8&vd_source=85c917bfe501406c5c2d24e2cfcc3d29">
              第八届东方M-1漫才大奖赛<ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
  
        {/* <SimpleGrid columns={2} gap={2}> */}
          <WorkImage src="/images/works/TH-M1.png" alt="TH-M1-comedy" />
        {/* </SimpleGrid> */}
      </Container>
    </Layout>
  )
  
  export default Work
  export { getServerSideProps } from '../../components/chakra'
  