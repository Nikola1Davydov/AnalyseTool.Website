import { onMounted, ref, type Ref } from 'vue'
import { site } from '@/data/site'

const API = 'https://api.github.com/repos/Nikola1Davydov/AnalyzeTool'

/** Tags and releases are plain "1.5.1"; tolerate a leading "v" anyway. */
export function normalizeVersion(tag: string): string {
  return tag.trim().replace(/^v/i, '')
}

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
  if (!res.ok) throw new Error(`${url}: ${res.status}`)
  return res.json()
}

/** Latest release tag, falling back to the newest tag when there is no release. */
export async function fetchLatestVersion(): Promise<string> {
  try {
    const release = (await getJson(`${API}/releases/latest`)) as { tag_name?: unknown }
    if (typeof release.tag_name === 'string' && release.tag_name) return normalizeVersion(release.tag_name)
  } catch {
    // no releases, rate-limited, or offline: try the tags
  }
  const tags = (await getJson(`${API}/tags?per_page=1`)) as Array<{ name?: unknown }>
  const first = tags[0]?.name
  if (typeof first !== 'string' || !first) throw new Error('no tags')
  return normalizeVersion(first)
}

/**
 * The version shown on the page: the build-time value from the release
 * feed (see the deploy workflow), refreshed from the GitHub API once the
 * page is open so a new release shows up before the next deploy.
 */
export function useLatestVersion(): Ref<string> {
  const version = ref(site.version)
  onMounted(async () => {
    try {
      version.value = await fetchLatestVersion()
    } catch {
      // keep the build-time version
    }
  })
  return version
}
