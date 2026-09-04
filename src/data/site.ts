/** Site-wide constants: external links, feature flags, media slots. */
export const site = {
  revitVersions: 'Revit 2025, 2026, 2027',
  /** Renders the Revit host illustration block. */
  showScreenshot: true,
  /** Renders the "dotnet add package" row in the open-source section. */
  showDevelopers: true,
  sdkCommand: 'dotnet add package AnalyseTool.Sdk',
} as const

export const links = {
  github: 'https://github.com/Nikola1Davydov/AnalyzeTool',
  releases: 'https://github.com/Nikola1Davydov/AnalyzeTool/releases',
  latestRelease: 'https://github.com/Nikola1Davydov/AnalyzeTool/releases/latest',
  wiki: 'https://github.com/Nikola1Davydov/AnalyzeTool/wiki',
  issues: 'https://github.com/Nikola1Davydov/AnalyzeTool/issues',
  youtube: 'https://www.youtube.com/@AnalyseTool-Revit',
  familyManager: 'https://github.com/Nikola1Davydov/AnalyseTool.FamilyManager',
  ollama: 'https://ollama.com/download',
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
    href: links.familyManager,
  },
]
