import type { FC } from 'react'

export interface Skill {
  name: string
  years: number
  level: number
  icon?: string
}

interface SkillsTagsProps {
  skills: Skill[]
  category: string
}

/**
 * スキルをタグ形式で表示するコンポーネント
 */
export const SkillsTags: FC<SkillsTagsProps> = ({ skills, category }) => {
  const getLevelClass = (level: number) => {
    if (level >= 4) return 'skill-tag skill-tag-high'
    if (level >= 3) return 'skill-tag skill-tag-medium'
    return 'skill-tag skill-tag-low'
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{category}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`${getLevelClass(skill.level)}`}
            title={`経験年数: ${skill.years}年, レベル: ${'★'.repeat(skill.level)}${'☆'.repeat(5 - skill.level)}`}
          >
            <span className="mr-2">{skill.name}</span>
            <span className="text-xs opacity-75">
              ({skill.years}年)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


