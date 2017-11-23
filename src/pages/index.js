import React from 'react'
import styled, { withComponent } from 'react-emotion'
import { space } from 'styled-system'
import { Box, Text } from '../components/Layout'
import { Title, Subtitle, Paragraph, Rule } from '../components/Typography'
import Icon from '../components/Icon'

const SectionTitle = Text.withComponent('h3')
const ProjectTitle = Text.withComponent('h4')

const ArrowLink = ({ dest, text }) => (
  <a href={dest}>
    <Text display="inline-flex" fontSize={[0, 1]} fontFamily="monospace" color="black" hover={{ color: 'orange' }}>
      {text} <Icon glyph="arrow" />
    </Text>
  </a>
)

const indexPage = ({ data }) => {
  const projects = data.allProjectsJson.edges
  return (
    <article>
      <header>
        <Title fontSize={[4, 5]} fontWeight="7" lineHeight="title" mt={0} mb={3}>
          Hi! I&rsquo;m Alec&nbsp;Lomas.
        </Title>
        <Subtitle fontSize={[3, 4]} fontWeight="5" lineHeight="title" my={3}>
          I&rsquo;m a frontend developer &amp; designer in Tempe,&nbsp;AZ.
        </Subtitle>
        <Paragraph fontSize={[2, 3]} lineHeight="copy" mt={3} mb={4}>
          My goal is to combine the principles of classic graphic design with the flexible and forward-thinking tenets
          of the internet. I care deeply about legibility, performance, and the open web. And&nbsp;burritos.
        </Paragraph>
        <Rule mt={4} mb={5} />
      </header>
      <main>
        <SectionTitle fontSize={[3, 4]} fontWeight="7" lineHeight="title" mt={5} mb={4}>
          Latest Projects
        </SectionTitle>
        {projects.map(({ node }, index) => {
          const WebsiteComponent = node.website ? <ArrowLink href={node.website} text="Website" /> : ''
          const RepoComponent = node.repo ? <ArrowLink href={node.repo} text="Repository" /> : ''
          return (
            <Box key={node.title} {...(index + 1 === projects.length ? {} : { mb: [4, 5] })}>
              <a href={node.website ? node.website : node.repo}>
                <ProjectTitle
                  display="inline-block"
                  fontSize={[2, 3]}
                  fontWeight={7}
                  lineHeight="title"
                  my={0}
                  color="black"
                  hover={{ color: 'orange' }}
                >
                  {node.title}
                </ProjectTitle>
              </a>
              <Paragraph fontSize={[1, 2]} lineHeight="copy" my={3}>
                {node.description}
              </Paragraph>
              <Box mr={4} mb={[2, 0]} display="inline-block">
                {WebsiteComponent}
              </Box>
              <Box display="inline-block">{RepoComponent}</Box>
            </Box>
          )
        })}
      </main>
    </article>
  )
}

export default indexPage

export const pageQuery = graphql`
  query IndexQuery {
    allProjectsJson(limit: 3) {
      edges {
        node {
          title
          description
          website
          repo
        }
      }
    }
  }
`
