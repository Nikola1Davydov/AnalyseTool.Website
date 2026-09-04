/** The example requests shown in the "Ask in plain language" section. */
export interface Run {
  title: string
  model: string
  prompt: string
  intro: string
  steps: readonly string[]
  done: string
  /** URL of a screen recording. Empty = show the placeholder with `videoSlot`. */
  video: string
  videoSlot: string
}

/** Non-empty by type, so `runs[0]` is always a valid fallback. */
export const runs: readonly [Run, ...Run[]] = [
  {
    title: 'Doors missing a fire rating',
    model: 'openai · your key',
    prompt: 'Find every door missing a fire rating',
    intro: 'Reading the Doors category, instance and type parameters, separating filled values from empty ones.',
    steps: [
      'Collect Doors — 432 instances, 18 types',
      'Resolve Fire Rating per instance, Instance before Type',
      'Split filled / empty and chart the result',
    ],
    done: '37 doors have no fire rating — select or isolate them from the chart.',
    video: '',
    videoSlot: 'videos/doors-fire-rating.mp4',
  },
  {
    title: 'Room numbers against our naming rule',
    model: 'openrouter · your key',
    prompt: 'Check room numbers against our naming rule: level, dash, three digits',
    intro: 'Running the Parameter Value Check over Rooms, testing each Number against the pattern you described.',
    steps: [
      'Collect Rooms — 67 instances on 4 levels',
      'Test Number against L#-### and report deviations',
      'Group the failures by level',
    ],
    done: '9 rooms deviate — 6 missing the level prefix, 3 with two digits.',
    video: '',
    videoSlot: 'videos/rooms-naming-rule.mp4',
  },
  {
    title: 'Fill Contractor on Level 7 air terminals',
    model: 'mistral · your key',
    prompt: 'Fill the Contractor parameter on all air terminals on Level 7 with Acme',
    intro: 'Preparing a bulk edit on the Canvas. Nothing is written until you confirm the proposed change.',
    steps: [
      'Collect Air Terminals on Level 7 — 460 instances',
      'Skip the 82 instances that already carry a value',
      'Propose Contractor = Acme for the remaining 378',
    ],
    done: '378 values ready to write — review, then apply in one transaction.',
    video: '',
    videoSlot: 'videos/air-terminals-contractor.mp4',
  },
  {
    title: 'What to clean up first',
    model: 'ollama · local, no key',
    prompt: 'Which parameters in this model are worth cleaning up first?',
    intro: 'Ranking parameters by how much of the model they touch against how often they are left empty.',
    steps: [
      'Read filled/empty analytics across all categories',
      'Weight each parameter by instance count and emptiness',
      'Report the ten with the widest reach',
    ],
    done: 'Fire Rating, Mark and Contractor lead — 4,100 empty values together.',
    video: '',
    videoSlot: 'videos/rank-cleanup.mp4',
  },
]
