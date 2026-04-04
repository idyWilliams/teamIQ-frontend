// components/wave-progress.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, TrendingDown, Minus, Users, AlertTriangle, Star, ChevronRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SkillData {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'Soft Skills' | 'DevOps';
  proficiency: number;      // team average 0–100
  membersStrong: number;    // how many team members rated ≥70
  totalMembers: number;
  trend: 'up' | 'down' | 'stable'; // compared to last month
  trendDelta: number;        // e.g. +5 or -3
}

// ─── Default skills catalogue (replace with API data when available) ─────────

const DEFAULT_SKILLS: SkillData[] = [
  { name: 'React',         category: 'Frontend',    proficiency: 78, membersStrong: 6, totalMembers: 10, trend: 'up',     trendDelta: 8  },
  { name: 'TypeScript',    category: 'Frontend',    proficiency: 65, membersStrong: 5, totalMembers: 10, trend: 'up',     trendDelta: 5  },
  { name: 'CSS / Tailwind',category: 'Frontend',    proficiency: 72, membersStrong: 6, totalMembers: 10, trend: 'stable', trendDelta: 0  },
  { name: 'Node.js',       category: 'Backend',     proficiency: 70, membersStrong: 5, totalMembers: 10, trend: 'up',     trendDelta: 4  },
  { name: 'Python',        category: 'Backend',     proficiency: 80, membersStrong: 7, totalMembers: 10, trend: 'up',     trendDelta: 6  },
  { name: 'Golang',        category: 'Backend',     proficiency: 50, membersStrong: 3, totalMembers: 10, trend: 'down',   trendDelta: -3 },
  { name: 'PostgreSQL',    category: 'Backend',     proficiency: 62, membersStrong: 4, totalMembers: 10, trend: 'stable', trendDelta: 0  },
  { name: 'Docker',        category: 'DevOps',      proficiency: 55, membersStrong: 3, totalMembers: 10, trend: 'up',     trendDelta: 7  },
  { name: 'CI/CD',         category: 'DevOps',      proficiency: 45, membersStrong: 2, totalMembers: 10, trend: 'down',   trendDelta: -5 },
  { name: 'Figma',         category: 'Design',      proficiency: 60, membersStrong: 4, totalMembers: 10, trend: 'up',     trendDelta: 3  },
  { name: 'UX Research',   category: 'Design',      proficiency: 48, membersStrong: 2, totalMembers: 10, trend: 'stable', trendDelta: 0  },
  { name: 'Communication', category: 'Soft Skills', proficiency: 82, membersStrong: 8, totalMembers: 10, trend: 'up',     trendDelta: 2  },
  { name: 'Leadership',    category: 'Soft Skills', proficiency: 58, membersStrong: 3, totalMembers: 10, trend: 'stable', trendDelta: 0  },
  { name: 'Problem Solving',category: 'Soft Skills',proficiency: 74, membersStrong: 6, totalMembers: 10, trend: 'up',     trendDelta: 4  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function getProficiencyLevel(p: number): { label: string; color: string; bg: string } {
  if (p >= 75) return { label: 'Strong',       color: 'text-emerald-700', bg: 'bg-emerald-50'  };
  if (p >= 55) return { label: 'Developing',   color: 'text-amber-700',   bg: 'bg-amber-50'    };
  return              { label: 'Gap',          color: 'text-red-700',     bg: 'bg-red-50'      };
}

function getBarColor(p: number): string {
  if (p >= 75) return 'bg-emerald-500';
  if (p >= 55) return 'bg-amber-400';
  return 'bg-red-400';
}

const CATEGORIES = ['All', 'Frontend', 'Backend', 'DevOps', 'Design', 'Soft Skills'] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Animated bar ────────────────────────────────────────────────────────────

function ProficiencyBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 150 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(value)}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ─── Trend indicator ─────────────────────────────────────────────────────────

function TrendBadge({ trend, delta }: { trend: SkillData['trend']; delta: number }) {
  if (trend === 'up')
    return (
      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
        <TrendingUp className="size-3" />+{delta}%
      </span>
    );
  if (trend === 'down')
    return (
      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-red-500">
        <TrendingDown className="size-3" />{delta}%
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-gray-400">
      <Minus className="size-3" />0%
    </span>
  );
}

// ─── Main card props ──────────────────────────────────────────────────────────

interface WaveProgressCardProps {
  skills?: SkillData[];
  title?: string;
  showButton?: boolean;
  zeroMargin?: boolean;
  /** @deprecated use `skills` prop instead */
  progressData?: unknown;
}

// ─── WaveProgressCard (now TeamSkillsOverview) ───────────────────────────────

export function WaveProgressCard({
  skills,
  title,
  showButton = true,
  zeroMargin = false,
}: WaveProgressCardProps) {
  const data = skills?.length ? skills : DEFAULT_SKILLS;

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return data.filter(s => {
      const matchCat = activeCategory === 'All' || s.category === activeCategory;
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [data, activeCategory, search]);

  const displayed = showAll ? filtered : filtered.slice(0, 4);

  // Summary stats
  const avg = Math.round(data.reduce((a, s) => a + s.proficiency, 0) / data.length);
  const gaps = data.filter(s => s.proficiency < 55).length;
  const topSkill = [...data].sort((a, b) => b.proficiency - a.proficiency)[0];
  const growingSkills = data.filter(s => s.trend === 'up').length;

  return (
    <div className={`${zeroMargin ? '' : 'm-0'}`}>
      <Card className="shadow-none border border-gray-100 rounded-xl">
        {/* ── Header ── */}
        <CardHeader className="px-3 pt-0 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                {title || 'Team Skills Overview'}
              </CardTitle>
              <p className="text-xs text-gray-500 mt-0.5">
                Proficiency levels across all tracked skills
              </p>
            </div>
            {showButton && (
              <button className="flex items-center gap-1 text-xs font-medium text-[#086ACE] hover:text-blue-700 transition-colors group cursor-pointer">
                <span>View Details</span>
                <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 space-y-5">
          {/* ── Summary insight strip ── */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-[#EBF4FF] px-4 py-3 flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#086ACE]">Avg Proficiency</span>
              <span className="text-2xl font-bold text-gray-900">{avg}%</span>
              <span className="text-[11px] text-gray-500">across {data.length} skills</span>
            </div>
            <div className="rounded-xl bg-emerald-50 px-4 py-3 flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">Top Skill</span>
              <span className="text-base font-bold text-gray-900 truncate">{topSkill?.name}</span>
              <span className="text-[11px] text-gray-500">{topSkill?.proficiency}% avg</span>
            </div>
            <div className="rounded-xl bg-amber-50 px-4 py-3 flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700">Skill Gaps</span>
              <span className="text-2xl font-bold text-gray-900">{gaps}</span>
              <span className="text-[11px] text-gray-500">skills below 55%</span>
            </div>
            <div className="rounded-xl bg-purple-50 px-4 py-3 flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-purple-700">Improving</span>
              <span className="text-2xl font-bold text-gray-900">{growingSkills}</span>
              <span className="text-[11px] text-gray-500">skills trending up</span>
            </div>
          </div>

          {/* ── Filters row ── */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#086ACE] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Search skills..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowAll(false); }}
                className="pl-8 h-8 text-xs w-48 border-gray-200"
              />
            </div>
          </div>

          {/* ── Skills list ── */}
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">
              No skills match your filter.
            </div>
          ) : (
            <div className="space-y-2">
              {displayed.map((skill, i) => {
                const level = getProficiencyLevel(skill.proficiency);
                return (
                  <div
                    key={skill.name}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    {/* Left: name + bar */}
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800 truncate">{skill.name}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${level.color} ${level.bg}`}>
                          {level.label}
                        </span>
                        {skill.proficiency < 55 && (
                          <AlertTriangle className="size-3 text-amber-500 shrink-0" />
                        )}
                        {skill.proficiency >= 80 && (
                          <Star className="size-3 text-emerald-500 shrink-0" />
                        )}
                      </div>
                      <ProficiencyBar value={skill.proficiency} delay={i * 40} />
                    </div>

                    {/* Right: meta */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-gray-900">{skill.proficiency}%</span>
                        <TrendBadge trend={skill.trend} delta={skill.trendDelta} />
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Users className="size-3" />
                        <span>{skill.membersStrong}/{skill.totalMembers} strong</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Show more / less */}
              {filtered.length > 4 && (
                <button
                  onClick={() => setShowAll(prev => !prev)}
                  className="w-full mt-1 py-2 rounded-xl border border-dashed border-gray-200 text-xs font-medium text-gray-400 hover:border-[#086ACE] hover:text-[#086ACE] transition-colors"
                >
                  {showAll ? 'Show less' : `Show ${filtered.length - 4} more skills`}
                </button>
              )}
            </div>
          )}

          {/* ── Skill gap callout ── */}
          {gaps > 0 && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-800">
                  {gaps} skill gap{gaps > 1 ? 's' : ''} detected
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Consider planning training or hiring to strengthen critical skills below 55%.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Legacy WaveProgress export (kept for backward-compat) ───────────────────

interface WaveProgressProps {
  percentage: number;
  label: string;
  subtitle: string;
  backgroundColor?: string;
  waveColor?: string;
}

export function WaveProgress({ percentage, subtitle }: WaveProgressProps) {
  const level = getProficiencyLevel(percentage);
  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <div className="relative w-full max-w-[130px] rounded-xl border border-gray-100 bg-gray-50 p-3">
        <p className="text-xs font-semibold text-gray-700 truncate text-center mb-2">{subtitle}</p>
        <div className="flex items-end justify-center gap-1 mb-1">
          <span className="text-xl font-bold text-gray-900">{percentage}</span>
          <span className="text-xs text-gray-500 mb-0.5">%</span>
        </div>
        <ProficiencyBar value={percentage} />
        <span className={`mt-1.5 block text-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${level.color} ${level.bg}`}>
          {level.label}
        </span>
      </div>
    </div>
  );
}