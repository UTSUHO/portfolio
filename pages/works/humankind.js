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
  <Layout title="Humankind review  & analysis">
    <Container>
      <Title>
        Humankind 评测与分析 <Badge>2021</Badge>
      </Title>
      <P>
        笔者在无尽系列4X游戏开发商新游戏humankind发售一周内体验并撰写的测评报告。
      </P>

      <UnorderedList my={4}>
        <ListItem>论文格式</ListItem>
        <ListItem>字数：9586</ListItem>
      </UnorderedList>
      <P>
        针对本游戏进行了系统性的拆解和竞品分析比对，包含以下项目：
      </P>
      <UnorderedList my={4}>
        <ListItem>术语定义</ListItem>
        <ListItem>游戏品类</ListItem>
        <ListItem>目标玩家</ListItem>
        <ListItem>竞品比较与系统分析拆解</ListItem>
        <ListItem>游戏体验与讨论</ListItem>
        <ListItem>优点与亮点</ListItem>
        <ListItem>缺点与问题</ListItem>
        <ListItem>流行性调查</ListItem>
        <ListItem>问题解决方案的探讨</ListItem>
      </UnorderedList>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Type</Meta>
          <span>game design critical thinking essay</span>
        </ListItem>
        <ListItem>
          <Meta>Tags</Meta>
          <span>4X, SLG, LowPoly</span>
        </ListItem>
        <ListItem>
          <Meta>Source</Meta>
          <Link href="../Humankind.pdf">
            Essay Here&#40;Chinese Only&#41;<ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </List>

      {/* <SimpleGrid columns={2} gap={2}> */}
        <WorkImage src="/images/contents/humankind.jpg" alt="Humankind" />
      {/* </SimpleGrid> */}
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
