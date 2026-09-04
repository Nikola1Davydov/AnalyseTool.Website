<script setup lang="ts">
import { computed } from 'vue'
import iconUrl from '@/assets/analysetool-icon.png'

/**
 * An illustration of the Revit window with the AnalyseTool ribbon tab.
 * Driven by the page clock: over a 22-beat cycle, extension panels
 * appear on the ribbon, an agent talks to the MCP server, writes a new
 * command, runs it, and three families land on the plan.
 */
const props = defineProps<{ tick: number }>()

const CYCLE = 22
const phase = computed(() => props.tick % CYCLE)

interface BigButton {
  label: string
  glyph: string
  icon: string | null
  filled: boolean
  on: boolean
  hot: boolean
}
interface SmallButton {
  label: string
  glyph: string
  filled: boolean
  on: boolean
  hot: boolean
}
interface Panel {
  label: string
  active: boolean
  on: boolean
  big: BigButton[]
  cols: SmallButton[][]
}

const INVOKED = 'Линии → семейство'

function ribbonPanels(t: number): Panel[] {
  const invoked = t >= 17 && t < 21 ? INVOKED : null
  const big = (label: string, glyph: string, at: number, icon: string | null = null, filled = false): BigButton => ({
    label,
    glyph,
    icon,
    filled,
    on: t >= at,
    hot: label === invoked,
  })
  const small = (label: string, glyph: string, at: number, filled = false): SmallButton => ({
    label,
    glyph: filled ? '' : glyph,
    filled,
    on: t >= at,
    hot: label === invoked,
  })
  return [
    { label: 'Parameter', active: false, on: true, big: [big('AnalyseTool', '', 0, iconUrl)], cols: [] },
    {
      label: 'Manage',
      active: false,
      on: true,
      big: [],
      cols: [
        [small('Scripts', '{}', 0), small('Settings', '⚙', 0), small('Report a bug', '⚑', 0)],
        [small('Reload', '↻', 0), small('Extensions', '⊛', 0), small('New', '＋', 0)],
      ],
    },
    {
      label: 'Extensions',
      active: t >= 5 && t < 13,
      on: t >= 3,
      big: [big('Rename Sheets', '▤', 4)],
      cols: [[small('FloorPlanGenerator', '', 5, true), small('Types from SQLite', '', 7, true), small(INVOKED, '', 9, true)]],
    },
    { label: 'Site', active: false, on: t >= 11, big: [big('Umgebung123', 'U', 12, null, true)], cols: [] },
  ]
}

const panels = computed(() => ribbonPanels(phase.value))

interface LogLine {
  at: number
  tag: 'agent' | 'server'
  text: string
}
const MCP_LOG: readonly LogLine[] = [
  { at: 13, tag: 'agent', text: 'list commands on the AnalyseTool tab' },
  { at: 14, tag: 'server', text: '11 commands, 4 of them yours' },
  { at: 15, tag: 'agent', text: 'no command converts lines to families — write one' },
  { at: 16, tag: 'server', text: 'compiled the new command, reloaded the tab' },
  { at: 17, tag: 'agent', text: 'run it on Level 0' },
  { at: 19, tag: 'server', text: 'done — 3 families placed' },
]
const log = computed(() => MCP_LOG.map((l) => ({ ...l, on: phase.value >= l.at })))
const connected = computed(() => phase.value >= 13)
const placed = computed(() => phase.value >= 17)
const viewLabel = computed(() => (placed.value ? 'Level 0 — 3 families placed by the agent' : 'Level 0 — plan view'))

const browserTree = [
  { level: 1, label: 'Floor Plans' },
  { level: 2, label: 'Level -1' },
  { level: 2, label: 'Level 0', active: true },
  { level: 2, label: 'Level 1' },
  { level: 2, label: 'Level 2' },
  { level: 1, label: '3D Views' },
  { level: 1, label: 'Schedules' },
  { level: 1, label: 'Sheets (all)' },
  { level: 1, label: 'Families' },
] as const
</script>

<template>
  <section class="host-section">
    <p class="kicker host-kicker">Inside the host — the AnalyseTool tab, and an agent using it</p>

    <div class="host" role="img" aria-label="Illustration of the Revit window: the AnalyseTool ribbon tab gaining extensions while an agent drives it over MCP">
      <div class="titlebar">
        <span class="tb-left">
          <span class="tb-logo"></span>
          <span class="tb-menu"><span>File</span><span>Edit</span><span>Undo</span></span>
        </span>
        <span class="tb-title">Office-Tower.rvt — Level 0</span>
        <span class="tb-ctl"><span>—</span><span>▢</span><span class="tb-close">✕</span></span>
      </div>

      <div class="tabs">
        <span class="tab">Architecture</span>
        <span class="tab">Structure</span>
        <span class="tab">Insert</span>
        <span class="tab">Manage</span>
        <span class="tab tab-active">AnalyseTool</span>
      </div>

      <div class="ribbon">
        <div v-for="pn in panels" :key="pn.label" class="panel" :class="{ off: !pn.on }">
          <div class="panel-body">
            <span v-for="b in pn.big" :key="b.label" class="big" :class="{ off: !b.on, hot: b.hot }">
              <span v-if="b.icon" class="big-icon" :style="{ backgroundImage: `url(${b.icon})` }"></span>
              <span v-else class="big-glyph" :class="{ filled: b.filled }">{{ b.glyph }}</span>
              <span>{{ b.label }}</span>
            </span>
            <span v-for="(col, ci) in pn.cols" :key="ci" class="col">
              <span v-for="s in col" :key="s.label" class="small" :class="{ off: !s.on, hot: s.hot }">
                <span class="chip" :class="{ filled: s.filled }">{{ s.glyph }}</span>
                <span>{{ s.label }}</span>
              </span>
            </span>
          </div>
          <span class="panel-label" :class="{ active: pn.active }">{{ pn.label }}</span>
        </div>
      </div>

      <div class="work">
        <div class="browser">
          <p class="pb-head">Project Browser</p>
          <p class="pb-root">Views (all)</p>
          <p
            v-for="node in browserTree"
            :key="node.label"
            class="pb-node"
            :class="[`pb-l${node.level}`, { 'pb-active': 'active' in node && node.active }]"
          >{{ node.label }}</p>
        </div>

        <div class="view">
          <span class="grid"></span>
          <span class="wall-outer"></span>
          <span class="wall-inner"></span>
          <span class="door" :class="{ placed }" style="left: 18%; top: 25%"></span>
          <span class="door" :class="{ placed }" style="left: 34%; top: 25%"></span>
          <span class="door" :class="{ placed }" style="left: 48%; top: 64%"></span>
          <span class="view-label">{{ viewLabel }}</span>
        </div>

        <div class="mcp">
          <p class="mcp-head">
            <span>MCP server</span>
            <span :class="connected ? 'mcp-on' : 'mcp-idle'">{{ connected ? 'connected' : 'idle' }}</span>
          </p>
          <p v-for="l in log" :key="l.at" class="mcp-line" :class="{ off: !l.on }">
            <span class="mcp-tag" :class="l.tag">{{ l.tag }}</span>
            <span class="mcp-text">{{ l.text }}</span>
          </p>
        </div>
      </div>

      <div class="status">
        <span>Click to select, TAB for alternates</span>
        <span>1 : 50</span>
      </div>
    </div>

    <p class="caption">An illustration of the plugin surface, not a screenshot. Commands you add appear on the tab and become callable over MCP.</p>
  </section>
</template>

<style scoped>
.host-section { padding: 0 0 56px; }
.host-kicker { margin-bottom: 10px; }
.caption { margin: 8px 0 0; font-size: 12px; color: var(--color-neutral-500); }

/* — the Revit window — */
.host {
  border: 1px solid #a6a6a6;
  background: #f0f0f0;
  color: #1a1a1a;
  font-family: 'Segoe UI', ui-sans-serif, system-ui, sans-serif;
  font-size: 12px;
  line-height: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}
.host p { margin: 0; }

.titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 0 6px 10px;
  background: #ffffff;
  border-bottom: 1px solid #d6d6d6;
}
.tb-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
.tb-logo { width: 16px; height: 16px; background: #3f3f3f; }
.tb-menu { display: flex; gap: 6px; color: #5a5a5a; font-size: 11.5px; }
.tb-title {
  font-size: 11.5px;
  color: #3a3a3a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tb-ctl { display: flex; align-items: stretch; flex: 0 0 auto; }
.tb-ctl > span { width: 34px; padding: 4px 0; text-align: center; color: #5a5a5a; }
.tb-ctl > .tb-close { width: 38px; color: #ffffff; background: #c42b1c; }

.tabs {
  display: flex;
  flex-wrap: wrap;
  padding: 0 6px;
  background: #ffffff;
  border-bottom: 1px solid #d6d6d6;
  font-size: 12px;
}
.tab { padding: 7px 12px; color: #444; }
.tab-active {
  color: #0b6a8a;
  background: #f0f0f0;
  border: 1px solid #d6d6d6;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: -1px;
  font-weight: 600;
}

/* — ribbon — */
.ribbon {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  background: #f0f0f0;
  border-bottom: 1px solid #c8c8c8;
}
.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 6px 2px;
  border-right: 1px solid #d6d6d6;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.panel.off { opacity: 0; transform: translateY(8px); }
.panel-body { display: flex; align-items: flex-start; gap: 4px; min-height: 74px; }
.panel-label {
  font-size: 10.5px;
  color: #5a5a5a;
  text-align: center;
  border-top: 1px solid #dcdcdc;
  padding-top: 2px;
  margin-top: 2px;
}
.panel-label.active { color: #0b6a8a; }

.big {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 74px;
  padding: 4px 3px;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #1a1a1a;
  border: 1px solid transparent;
  background: transparent;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease;
}
.big.off { opacity: 0; transform: translateY(6px); }
.big-icon {
  display: block;
  width: 32px;
  height: 32px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.big-glyph {
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  color: #2f7ded;
  background: transparent;
  border-radius: 0;
}
.big-glyph.filled { color: #ffffff; background: #2f7ded; border-radius: 4px; }

.col { display: flex; flex-direction: column; gap: 1px; padding-top: 2px; }
.small {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 6px 2px 3px;
  font-size: 11.5px;
  line-height: 17px;
  white-space: nowrap;
  color: #1a1a1a;
  border: 1px solid transparent;
  background: transparent;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease;
}
.small.off { opacity: 0; transform: translateY(4px); }
.chip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 12px;
  color: #2f7ded;
  background: transparent;
  border-radius: 0;
}
.chip.filled { color: #ffffff; background: #2f7ded; border-radius: 3px; }
.big.hot,
.small.hot { background: #dceef5; border-color: #0b6a8a; }

/* — workspace — */
.work {
  display: grid;
  grid-template-columns: 170px 1fr 240px;
  min-height: 230px;
  background: #f0f0f0;
}
.browser { border-right: 1px solid #d6d6d6; padding: 8px; background: #ffffff; }
.pb-head { margin: 0 0 6px; font-size: 11px; color: #5a5a5a; }
.pb-root { font-size: 11.5px; color: #1a1a1a; }
.pb-node { font-size: 11.5px; color: #444; }
.pb-l1 { margin: 2px 0 0 12px; }
.pb-l2 { margin: 2px 0 0 24px; }
.pb-active { color: #0b6a8a; background: #dceef5; display: inline-block; padding: 0 4px; }

.view {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border-right: 1px solid #d6d6d6;
}
.view > span { position: absolute; }
.grid {
  inset: 0;
  background-image:
    linear-gradient(to right, #ececec 1px, transparent 1px),
    linear-gradient(to bottom, #ececec 1px, transparent 1px);
  background-size: 26px 26px;
}
.wall-outer { left: 16%; top: 20%; width: 58%; height: 54%; border: 1px solid #8a8a8a; }
.wall-inner { left: 16%; top: 20%; width: 26%; height: 54%; border-right: 1px solid #8a8a8a; }
.door { width: 6%; height: 4px; background: #8a8a8a; transition: background 0.4s ease; }
.door.placed { background: #c2185b; }
.view-label { left: 8px; bottom: 6px; font-size: 11px; color: #5a5a5a; }

.mcp { padding: 8px; background: #ffffff; }
.mcp-head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 8px;
  font-size: 11px;
  color: #5a5a5a;
}
.mcp-on { color: #0b6a8a; }
.mcp-idle { color: #8a8a8a; }
.mcp-line {
  display: flex;
  gap: 6px;
  margin: 0 0 4px;
  font-size: 11.5px;
  line-height: 16px;
  opacity: 1;
  transition: opacity 0.35s ease;
}
.mcp-line.off { opacity: 0; }
.mcp-tag { min-width: 6.5ch; }
.mcp-tag.agent { color: #c2185b; }
.mcp-tag.server { color: #0b6a8a; }
.mcp-text { color: #1a1a1a; }

.status {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 4px 10px;
  background: #f0f0f0;
  border-top: 1px solid #d6d6d6;
  font-size: 11px;
  color: #5a5a5a;
}

/* Narrow screens: the three-pane workspace stacks and the browser
   pane steps aside so the plan and the MCP log stay readable. */
@media (max-width: 640px) {
  .work { grid-template-columns: 1fr; }
  .browser { display: none; }
  .view { min-height: 150px; border-right: 0; border-bottom: 1px solid #d6d6d6; }
}
</style>
