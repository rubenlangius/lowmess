import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Box, Flex, Text } from 'rebass'
import css from '@styled-system/css'
import ArrowLink from './ArrowLink'
import { List, ListItem } from './Typography'
import { themeHover } from '../utils/styles'

const SocialLink = ({ children, ...props }) => (
  <Text as="a" fontSize={[0, 1]} css={themeHover} {...props}>
    {children}
  </Text>
)

SocialLink.propTypes = {
  children: PropTypes.string.isRequired,
}

const BlogPost = styled(Box)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: block;
  }
`

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const post = data.allMarkdownRemark.edges[0].node

  return (
    <Flex
      as="footer"
      alignItems="center"
      justifyContent={['center', 'center', 'space-between']}
      mt="auto"
      mb={[3, 3, 4]}
      css={css({ fontFamily: 'monospace' })}
    >
      <BlogPost>
        <Text as="span" mr={2}>
          From the blog:
        </Text>

        <ArrowLink fontWeight={7} dest={post.fields.slug}>
          {post.frontmatter.title}
        </ArrowLink>
      </BlogPost>

      <List>
        <ListItem css="display: inline-block" mr={3}>
          <SocialLink href="https://twitter.com/lowmess">Twitter</SocialLink>
        </ListItem>

        <ListItem css="display: inline-block" mr={3}>
          <SocialLink href="https://github.com/lowmess">GitHub</SocialLink>
        </ListItem>

        <ListItem css="display: inline-block">
          <SocialLink href="https://resume.lowmess.com">
            R&eacute;sum&eacute;
          </SocialLink>
        </ListItem>
      </List>
    </Flex>
  )
}

export default Footer
