import type { GithubContributionDay } from "./types";
import { MONTH_LABELS } from "./constants";

export function buildContributionMatrix(
  contributions: GithubContributionDay[],
  isFullYear: boolean,
  effectiveYear: number,
  weeksCount: number,
  showMonthLabels = true
): {
  weeks: GithubContributionDay[][];
  monthPositions: { label: string; weekIndex: number }[];
  totalContributions: number;
} {
  if (!isFullYear && contributions.length > 0 && contributions.length <= 7) {
    const sum = contributions.reduce((acc, d) => acc + (d.count || 0), 0);
    const m = contributions[0]?.date ? parseInt(contributions[0].date.slice(5, 7), 10) - 1 : -1;
    return {
      weeks: [contributions],
      monthPositions: showMonthLabels && m >= 0 ? [{ label: MONTH_LABELS[m], weekIndex: 0 }] : [],
      totalContributions: sum,
    };
  }

  const dayMap = new Map<string, GithubContributionDay>();
  for (const d of contributions) if (d.date) dayMap.set(d.date, d);

  const now = new Date(), currentYear = now.getFullYear(), isPastYear = effectiveYear < currentYear;
  const safeWeeks = typeof weeksCount === "number" && !Number.isNaN(weeksCount) ? Math.max(1, Math.min(52, weeksCount)) : 52;
  const shouldRenderFullYear = isFullYear || (isPastYear && safeWeeks >= 52);
  const todayStr = `${currentYear}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  let startSun: Date, endSat: Date, numWeeks: number;

  if (shouldRenderFullYear) {
    const jan1 = new Date(effectiveYear, 0, 1), dec31 = new Date(effectiveYear, 11, 31);
    startSun = new Date(effectiveYear, 0, 1 - jan1.getDay());
    endSat = new Date(effectiveYear, 11, 31 + (6 - dec31.getDay()));
    numWeeks = Math.ceil((endSat.getTime() - startSun.getTime()) / (86400000 * 7));
  } else if (isPastYear) {
    const dec31 = new Date(effectiveYear, 11, 31);
    endSat = new Date(effectiveYear, 11, 31 + (6 - dec31.getDay()));
    numWeeks = safeWeeks;
    startSun = new Date(endSat.getFullYear(), endSat.getMonth(), endSat.getDate() - (numWeeks * 7 - 1));
  } else {
    endSat = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
    startSun = new Date(endSat.getFullYear(), endSat.getMonth(), endSat.getDate() - (safeWeeks * 7 - 1));
    numWeeks = safeWeeks;
  }

  const resultWeeks: GithubContributionDay[][] = [];
  const months: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1; let lastMonthWeek = -99;
  let sum = 0;

  for (let w = 0; w < numWeeks; w++) {
    const weekDays: GithubContributionDay[] = [];
    for (let r = 0; r < 7; r++) {
      const d = new Date(startSun.getFullYear(), startSun.getMonth(), startSun.getDate() + (w * 7 + r));
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dt = String(d.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${dt}`;

      const existing = dayMap.get(dateStr);
      const isOutOfYear = shouldRenderFullYear && y !== effectiveYear;
      const isFuture = shouldRenderFullYear ? isOutOfYear : dateStr > todayStr;
      const count = existing ? existing.count : 0;
      const level = existing ? existing.level : 0;

      if (!isFuture && !isOutOfYear) sum += count;
      weekDays.push({ date: dateStr, count, level, isFuture: isFuture || isOutOfYear || undefined });
    }

    resultWeeks.push(weekDays);

    if (showMonthLabels) {
      const validDay = weekDays.find((d) => (shouldRenderFullYear ? d.date.startsWith(String(effectiveYear)) : true)) || weekDays[0];
      if (validDay?.date) {
        const m = parseInt(validDay.date.slice(5, 7), 10) - 1;
        if (m >= 0 && m < 12 && m !== lastMonth && (w - lastMonthWeek >= 2)) {
          months.push({ label: MONTH_LABELS[m], weekIndex: w });
          lastMonth = m; lastMonthWeek = w;
        }
      }
    }
  }

  return { weeks: resultWeeks, monthPositions: months, totalContributions: sum };
}
