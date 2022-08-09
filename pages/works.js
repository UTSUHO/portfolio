import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbDustJacket from'../public/images/works/Fengyi-Chen-Dust-Jacket.png'
import thumbApiDisruptor from'../public/images/works/Api-Disruptor.png'
import thumbTHM1 from'../public/images/works/TH-M1.png'
import thumbIkaruga from '../public/images/works/TH-ikaruga.jpeg'
import thumbHumankind from '../public/images/contents/humankind.jpg'
import thumbVegvisir from '../public/images/contents/vegvisir.jpg'
import thumbQueen from '../public/images/contents/airElement.png'


const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>

      <Section>
            <WorkGridItem id="Mead-of-Poetry" title="诗之蜜酒" thumbnail={thumbVegvisir}>
              	一款中策桌游，预计2023年完成制作。
            </WorkGridItem>
        </Section>

        <Section>
            <WorkGridItem id="Queen-Strategy" title="代号σ" thumbnail={thumbQueen}>
              	一款中等体量的SLG独立游戏，锐意制作中，预计2025年发售。
            </WorkGridItem>
        </Section>

        <Section>
            <WorkGridItem id="api-disruptor" title="API-Disruptor" thumbnail={thumbApiDisruptor}>
                A quick tool for batch processing of RESTful api test. Support JSON/JS obj/Keypair value parsing.
            </WorkGridItem>
        </Section>
        
        <Section>
            <WorkGridItem id="TH-M1-comedy" title="Touhou-M1-comedy-series(东方M1漫才系列)" thumbnail={thumbTHM1}>
              A Japanese duo comedy series. Work together with partner to translate it to Chinese version.<b>&#40;Official Verified&#41;</b>	
            </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.2}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Design
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
      <Section delay={0.3}>
          <WorkGridItem id="humankind" title="Humankind™ 测评与分析" thumbnail={thumbHumankind}>
            体验无尽系列开发商新作Humankind™后的测评与分析报告，论文格式注意。
          </WorkGridItem>
        </Section>
        <Section delay={0.3}>
          <WorkGridItem id="dustJacket" title="&#34;1984&#34; Dust Jacket Design" thumbnail={thumbDustJacket}>
            A dust jacket design for "1984", New Media Design course final project
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.4}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Old works
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.5}>
        <WorkGridItem id="madarazakura" title="Touhou Madarazakura Translation" thumbnail={thumbIkaruga}>
            东方斑樱是一款致敬斑鸠&#34;ikaruga&#34;的同人纵版STG游戏。笔者曾与同好协同工作，破解并汉化了此佳作。
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
