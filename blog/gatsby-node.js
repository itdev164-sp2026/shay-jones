/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
const path = require('path');

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      // Loop through each blog post
      result.data.allContentfulBlogPost.edges.forEach(edge => {
        createPage({
          path: edge.node.slug, // add `/blog/` prefix
          component: path.resolve("./src/templates/blog-post.js"),
          context: {
            slug: edge.node.slug
          },
        })
      })

      resolve()
    })
  })
}