// English-only filenames whose Slovak companion has a different name (not _sk suffixed).
// When adding a new EN+SK pair under initial_info/ or jednotlive_usecases/, append the EN
// path here so the roadmap, search, and bookmarks all hide the duplicate.
const ENGLISH_ONLY_FILES = new Set([
  '/initial_info/akademicka_integrita/academic_integrity',
  '/initial_info/ai_overenie_odpovedi/ai_verification_of_answers',
  '/initial_info/context_engineering/context_engineering',
  '/initial_info/gdpr/gdpr',
  '/initial_info/prompt_engineering/prompt_engineering',
  '/initial_info/vyber_nastrojov/evaluating_ai_tools',
  '/jednotlive_usecases/administrativa/komunikacia_s_rodicmi/parent_communication',
  '/jednotlive_usecases/administrativa/pisanie_emailu/writing_email',
  '/jednotlive_usecases/administrativa/podpora_ivp/iep_support',
  '/jednotlive_usecases/aktivity_na_hodinu/cvicne_ulohy/practice_questions',
  '/jednotlive_usecases/aktivity_na_hodinu/flashcardy/flashcards',
  '/jednotlive_usecases/aktivity_na_hodinu/gamifikacia/gamification',
  '/jednotlive_usecases/aktivity_na_hodinu/laboratorne_prace/lab_work',
  '/jednotlive_usecases/aktivity_na_hodinu/pracovne_listy/worksheets',
  '/jednotlive_usecases/aktivity_na_hodinu/projektove_vyucovanie/project_based_learning',
  '/jednotlive_usecases/pisomky/opravovanie_pisomiek/exam_grading',
  '/jednotlive_usecases/pisomky/spatna_vazba/student_feedback',
  '/jednotlive_usecases/pisomky/tvorba_pisomky/creating_exams',
  '/jednotlive_usecases/pisomky/ustna_skuska/oral_exam',
  '/jednotlive_usecases/sumarizacia_uciva/sumarizacia_poznamok/summarizing_notes',
  '/jednotlive_usecases/sumarizacia_uciva/sumarizacia_poznamok/summary_notes',
  '/jednotlive_usecases/sumarizacia_uciva/sumarizacny_podcast/summary_podcast',
  '/jednotlive_usecases/sumarizacia_uciva/vytvorenie_cheatsheetu/creating_cheatsheet',
  '/jednotlive_usecases/tvorba_materialov/generovanie_obrazkov/generating_images',
  '/jednotlive_usecases/tvorba_materialov/preklad_uciva/translating_curriculum',
  '/jednotlive_usecases/tvorba_materialov/prezentacie/creating_presentations'
])

export const isSlovak = (item: any, all: any[]): boolean => {
  if (item.path.endsWith('/links')) return false
  if (item.path.endsWith('_sk')) return true
  if (all.some(other => other.path === `${item.path}_sk`)) return false
  if (ENGLISH_ONLY_FILES.has(item.path)) return false
  return true
}

export const useSlovakContent = () => {
  return useAsyncData('slovak-content', async () => {
    const all = await queryCollection('content').all()
    return all.filter(item => isSlovak(item, all))
  })
}
