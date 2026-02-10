import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <ul className={styles.list}>
      {
        data.allContentfulBlogPost.edges.map(edge => (
        <li key={edge.node.id}>
          <Link to={edge.node.slug}>{edge.node.title}</Link>
          <div>
            <GatsbyImage 
            image={edge.node.heroImage.gatsbyImageData} 
            />
          </div>
          <div>{edge.node.body.childMarkdownRemark.excerpt}
          </div>
        </li>
      ))

      }


    </ul>
  </Layout>
)

export const query = graphql`

{
  allContentfulBlogPost{
    edges{
      node{
        id
        title
        slug
        body {
          childMarkdownRemark{
            excerpt
          }
        }
        heroImage{
          gatsbyImageData(
                 layout: CONSTRAINED
            placeholder: BLURRED
            width: 300
          )
          }
        }
      }
    }
  }
`

export default IndexPage