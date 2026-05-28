export type Tier = 'foundation' | 'usecases' | 'tools' | 'impactEffort'
export type Locale = 'sk' | 'en'

export interface ContentMeta {
  tier: Tier
  category: string | null
  leaf: string
  filename: string
  locale: Locale
}

export function parseContentPath(path: string): ContentMeta | null {
  const norm = path.replace(/\\/g, '/').replace(/^\/+/, '')
  const parts = norm.split('/').filter(Boolean)

  const root = parts[0]
  const filename = parts[parts.length - 1]
  const basename = filename.replace(/\.md$/, '')

  if (root === 'initial_info') {
    if (parts.length === 2) {
      return { tier: 'foundation', category: null, leaf: basename, filename, locale: detectLocale(basename, null) }
    }
    if (parts.length >= 3) {
      const category = parts[1]
      return { tier: 'foundation', category, leaf: category, filename, locale: detectLocale(basename, category) }
    }
    return null
  }

  if (root === 'jednotlive_usecases' && parts.length >= 4) {
    const category = parts[1]
    const leaf = parts[2]
    return { tier: 'usecases', category, leaf, filename, locale: detectLocale(basename, leaf) }
  }

  if (root === 'jednotlive_tools' && parts.length >= 4) {
    const category = parts[1]
    const leaf = parts[2]
    return { tier: 'tools', category, leaf, filename, locale: detectToolLocale(basename) }
  }

  if (root === 'impact_effort_map' && parts.length === 2) {
    return { tier: 'impactEffort', category: null, leaf: basename, filename, locale: detectImpactEffortLocale(basename) }
  }

  return null
}

function detectToolLocale(basename: string): Locale {
  return basename.endsWith('_sk') ? 'sk' : 'en'
}

function detectImpactEffortLocale(basename: string): Locale {
  if (basename.endsWith('_en')) return 'en'
  return 'sk'
}

function detectLocale(basename: string, folder: string | null): Locale {
  if (PAIR_TABLE_EN_BASENAMES.has(basename)) return 'en'
  if (folder && basename === folder) return 'sk'
  return 'sk'
}

const PAIR_TABLE_EN_BASENAMES = new Set<string>([
  'ai_verification_of_answers',
  'academic_integrity',
  'context_engineering',
  'gdpr',
  'prompt_engineering',
  'evaluating_ai_tools',
  'parent_communication',
  'writing_email',
  'iep_support',
  'practice_questions',
  'flashcards',
  'gamification',
  'lab_work',
  'worksheets',
  'project_based_learning',
  'exam_grading',
  'student_feedback',
  'creating_exams',
  'oral_exam',
  'summarizing_notes',
  'summary_notes',
  'summary_podcast',
  'creating_cheatsheet',
  'generating_images',
  'translating_curriculum',
  'creating_presentations',
])
