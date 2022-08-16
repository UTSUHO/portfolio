import { 
  Container, 
  Heading, 
  SimpleGrid, 
  UnorderedList, 
  Badge,
  List,
  ListItem} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import P from '../components/paragraph'


import thumbHumankind from '../public/images/contents/humankind.jpg'

const Games = () => (
  <Layout title="Games">
    <Container>
    <Section delay={0.1}>
    <Heading as="h3" variant="section-title">
     单机游戏清单(叙事性方向) - Game Checklist
    </Heading>
    <UnorderedList my={4}>
          <ListItem>十三机兵防卫圈 13 Sentinel: Aegis rim <Badge>2022 √</Badge></ListItem>
          <ListItem>三角战略 Triangle Strategy <Badge>2022 √</Badge></ListItem>
          <ListItem>装甲恶鬼村正 Full Metal Daemon: Muramasa <Badge>2021 √</Badge></ListItem>
          <ListItem>混沌之子 CHAOS;CHILD <Badge>2020 √</Badge></ListItem>
          <ListItem>混沌之脑 CHAOS;HEAD <Badge>2020 √</Badge></ListItem>
          <ListItem>Ever17<Badge>2020 √</Badge></ListItem>
          <ListItem>极限脱出999 999:Nine Hours, Nine Persons, Nine Doors<Badge>2020 √</Badge></ListItem>
          <ListItem>Katana Zero<Badge>2019 √</Badge></ListItem>
        </UnorderedList>
    </Section>

      <Section delay={0.1}>
      <Heading as="h3" variant="section-title">
      游戏相关的随笔 - Game Related Essay
      </Heading>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            title="Humankind™ 测评与分析报告"
            thumbnail={thumbHumankind}
            href="../Humankind.pdf"
          />
          {/* <GridItem
            title="RPG Games"
            thumbnail={thumbHowToUseInkdrop}
            href="https://www.youtube.com/watch?v=-qBavwqc_mY"
          />
          <GridItem
            title="FTG Games"
            thumbnail={thumbFishWorkflow}
            href="https://www.youtube.com/watch?v=KKxhf50FIPI"
          />
          <GridItem
            title="Board Games"
            thumbnail={thumbMyDeskSetup}
            href="https://www.youtube.com/watch?v=1OFDMwDlnOE"
          /> */}
        </SimpleGrid>
      </Section>

      <Section delay={0.3}>
        {/* <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            title="How I’ve Attracted The First 500 Paid Users For My SaaS That Costs $5/mo"
            thumbnail={thumb500PaidUsers}
            href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820"
          />
          <GridItem
            title="I stopped setting a financial goal for my SaaS"
            thumbnail={thumbFinancialGoal}
            href="https://blog.inkdrop.app/i-stopped-setting-a-financial-goal-for-my-saas-a92c3db65506"
          />
        </SimpleGrid>
      </Section>

      <Section delay={0.5}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            title="How to Price Yourself as a Freelance Developer"
            thumbnail={thumbHowToPriceYourself}
            href="https://blog.inkdrop.app/how-to-price-yourself-as-a-freelance-developer-3453dfd59d91"
          />
          <GridItem
            title="I made my React Native app 50x faster"
            thumbnail={thumb50xFaster}
            href="https://www.youtube.com/watch?v=vj723NlrIQc"
          />
        </SimpleGrid> */}
      </Section>
    </Container>
  </Layout>
)

export default Games
export { getServerSideProps } from '../components/chakra'
