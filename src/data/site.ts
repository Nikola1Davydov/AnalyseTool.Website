/** Site-wide constants: version, external links, feature flags, media slots. */
export const site = {
  version: '1.5.0',
  revitVersions: 'Revit 2025, 2026, 2027',
  /** Renders the Revit host illustration block. */
  showScreenshot: true,
  /** Renders the "dotnet add package" row in the open-source section. */
  showDevelopers: true,
  /** URL of a screen recording of an agent driving Revit over MCP. Empty = placeholder. */
  mcpVideo: '',
  mcpVideoSlot: 'videos/mcp-agent-revit.mp4',
  sdkCommand: 'dotnet add package AnalyseTool.Sdk',
} as const

export const links = {
  github: 'https://github.com/Nikola1Davydov/AnalyzeTool',
  releases: 'https://github.com/Nikola1Davydov/AnalyzeTool/releases',
  latestRelease: 'https://github.com/Nikola1Davydov/AnalyzeTool/releases/latest',
  wiki: 'https://github.com/Nikola1Davydov/AnalyzeTool/wiki',
  issues: 'https://github.com/Nikola1Davydov/AnalyzeTool/issues',
  youtube: 'https://www.youtube.com/@AnalyseTool',
  ollama: 'https://ollama.com/download',
  webview2: 'https://developer.microsoft.com/microsoft-edge/webview2/',
} as const

export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export const navLinks: readonly NavLink[] = [
  { label: 'How it works', href: '#how' },
  { label: 'MCP', href: '#mcp' },
  { label: 'Models', href: '#models' },
  { label: 'Parameters', href: '#parameters' },
  { label: 'Open source', href: '#open' },
  { label: 'Install', href: '#install' },
  { label: 'GitHub', href: links.github, external: true },
  { label: 'YouTube', href: links.youtube, external: true },
]

export interface Extension {
  name: string
  note: string
  href: string
}

export const officialExtensions: readonly Extension[] = [
  {
    name: 'Family Manager',
    note: 'Browse, place and audit families — our own extension, on the same rails as yours.',
    href: links.wiki,
  },
  {
    name: 'Extension catalog',
    note: 'Install from a GitHub repository in one click, or publish your own with a git tag.',
    href: links.wiki,
  },
]
