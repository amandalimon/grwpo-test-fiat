import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET ?? 'production'

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-02-19',
      useCdn: true,
    })
  : null

export async function fetchDocument<Document>(id: string) {
  if (!sanityClient) return null

  try {
    return await sanityClient.fetch<Document | null>('*[_id == $id][0]', { id })
  } catch (error) {
    console.error(`Could not fetch "${id}" from Sanity`, error)
    return null
  }
}
