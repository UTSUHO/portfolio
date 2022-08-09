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
    <Layout title="Madarazakura">
      <Container>
        <Title>
            Madarazakura <Badge>2015</Badge>
        </Title>
        <P>
            出国上大学前与同好一起破解并汉化了东方斑樱，留档于此。感谢Dr.zzm32的帮助以及项目相关猫王汉化组成员的付出。
        </P>
        <P>
            东方斑樱是一款致敬ikaruga（斑鸠）的纵版STG同人游戏,继承了斑鸠独有的切换色弹幕免疫系统。如有兴趣请去DLsite支持原作者。同人社团主站页面已经失效，以下为页面存档。
        </P>
        <Link href="https://web.archive.org/web/20211017114320/http://yuyusansan.wpblog.jp/game/madarazakura/">
        东方斑樱主站<ExternalLinkIcon mx="2px" />
        </Link>

        <UnorderedList my={4}>
          <ListItem>仅供学习交流之用，如有侵权请告知，我会立即删除。</ListItem>
          <ListItem>度盘: 1mg3jspi  </ListItem>
        </UnorderedList>
  
        <List ml={4} my={4}>
          <ListItem>
            <Meta>App types</Meta>
            <span>Game</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Ollydbg, Visual Studio</span>
          </ListItem>
          <ListItem>
            <Meta>Source</Meta>
            <Link href="https://bbs.nyasama.com/forum.php?mod=viewthread&tid=47359&mobile=1">
              猫王殿论坛存档（需要权限/快照可行） <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Source</Meta>
            <Link href="../madarazakura.rar">
              本站源 <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>        
        <WorkImage src="/images/works/TH-ikaruga.jpeg" alt="madarazakura" />

      </Container>
    </Layout>
  )
  
  export default Work
  export { getServerSideProps } from '../../components/chakra'
  