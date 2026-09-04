/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Latest AnalyseTool release tag, injected by the deploy workflow. */
  readonly VITE_ANALYSETOOL_VERSION?: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}
