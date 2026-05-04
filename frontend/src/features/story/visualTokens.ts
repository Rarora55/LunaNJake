export const TEMPORARY_VISUAL_MODE = true

export const STORY_VISUAL_TOKENS: Record<string, string> = {
  'step-1': '#dcedc8',
  'step-2': '#c8e6c9',
  'step-3': '#b2dfdb',
  'step-4': '#b3e5fc',
  'step-5': '#d1c4e9',
  'step-6': '#ffcdd2',
  'step-7': '#ffe0b2',
  'step-8': '#f0f4c3',
  'step-9': '#ffecb3',
  'step-10': '#d7ccc8',
}

export function getVisualToken(token: string): string {
  return STORY_VISUAL_TOKENS[token] ?? '#ffffff'
}

