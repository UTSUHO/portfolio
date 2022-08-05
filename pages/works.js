import { Container, Heading, SimpleGrid, Divider} from'@chakra-ui/react'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import thumbDustJacket from'../public/images/works/Fengyi-Chen-Dust-Jacket.png'
import Layout from '../components/Layouts/article'

const Works=()=>{
    return (
        <Layout>
        <Container>
            <Heading as="h3" fontSize={20} mb={4}>
                Works
            </Heading>
            <SimpleGrid columns={[1,1,2]} gap={6}>
                <Section>
                    <WorkGridItem id="dustJacket" title="1984 Dust Jacket Design" thumbnail={thumbDustJacket}>
                        A dust jacket design for "1984", New Media Design course final project.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
        </Container>
        </Layout>
    )
}

export default Works