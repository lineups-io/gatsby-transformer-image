const { createRemoteFileNode } = require('gatsby-source-filesystem')

const encode = url => url.replace(/ /g, '%20')

exports.onCreateNode = ({ node, store, cache, createNodeId, actions }) => {
  if (node.internal.type === 'LandingPageImage' && node.url) {
    const { createNode } = actions

    const url = encode(node.url)
    return createRemoteFileNode({
      url,
      store,
      cache,
      createNode,
      createNodeId,
    }).then(fileNode => {
      if (fileNode) {
        node.localFile___NODE = fileNode.id
        console.log('[gatsby-transformer-image]', 'VERBOSE', 'Remote File Node created', fileNode.id)
      }
      else
        console.error('[gatsby-transformer-image]', 'ERROR', 'Remote File Node NOT created', url)
    }).catch(e => {
      console.error('[gatsby-transformer-image]', 'Error', e.message)
    })
  }
}
