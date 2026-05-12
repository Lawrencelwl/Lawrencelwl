import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === '1'

function githubPagesBasePath() {
  const full = process.env.GITHUB_REPOSITORY
  if (!full?.includes('/')) return undefined
  const [owner, name] = full.split('/')
  if (!owner || !name) return undefined
  if (name.toLowerCase() === `${owner.toLowerCase()}.github.io`) return undefined
  return `/${name}`
}

const basePath = isStaticExport ? githubPagesBasePath() : undefined

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  ...(isStaticExport
    ? {
        output: 'export',
        ...(basePath ? { basePath } : {}),
      }
    : { output: 'standalone' }),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
