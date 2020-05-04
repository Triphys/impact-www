/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  // IMPACT
  if (doc.type === 'startpage') {
    return '/'
  }

  if (doc.type === 'content') {
    return `/content/${doc.uid}`
  }

  if (doc.type === 'schema') {
    return `/schema/${doc.uid}`
  }

  if (doc.type === 'contact') {
    return `/${doc.uid}`
  }

  return '/not-found'
}
