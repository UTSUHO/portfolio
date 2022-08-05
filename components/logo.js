import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
    font-weight: bold;
    font-size: 20px;
    display: inline-flex;
    align-items: center;
    height: 30px;
    line-height: 20px;
    padding: 10px;

    &:hover img{
        animation: rotation 5s infinite linear;
    }
    @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(-359deg);
        }
      }
`
const Logo = ()=>{
    const footPrintImg = `/images/footprint${useColorModeValue('','-dark')}.png`
    return (
        <Link href="/">
            <a>
                <LogoBox>
                    <Image src={footPrintImg} width={20} height={20} alt="logo"/>
                <Text
                    color={useColorModeValue('gray.800','whiteAlpha.900')}
                    fontFamily = 'M PLUS Rounded 1c'
                    fontWeight = "bold"
                    ml={3}>
                        Rei Utsuho
                    </Text>
                </LogoBox>
            </a>
        </Link>
    )
}

export default Logo