import { ChapterItem, RecommendedChapter, UserBehavior } from '../types/bookstore';

/**
 * Deterministic, real-time behavioral recommendation engine tailored for
 * the 10-part soft-copy blueprint. Adapts immediately based on inspected
 * chapters, filtered tracks, search queries, and purchase status.
 */
export function getPersonalizedChapterRecommendations(
  chapters: ChapterItem[],
  behavior: UserBehavior,
  limit = 3
): RecommendedChapter[] {
  const viewedSet = new Set(behavior.viewedChapterIds);
  const viewedChapters = behavior.viewedChapterIds
    .map((id) => chapters.find((c) => c.id === id))
    .filter((c): c is ChapterItem => Boolean(c));

  const tagAffinity = new Map<string, number>();
  const trackAffinity = new Map<string, number>();

  viewedChapters.forEach((ch, idx) => {
    const recencyWeight = Math.max(1, 3.2 - idx * 0.5);
    trackAffinity.set(ch.track, (trackAffinity.get(ch.track) || 0) + recencyWeight);
    ch.tags.forEach((t) => {
      tagAffinity.set(t, (tagAffinity.get(t) || 0) + recencyWeight * 0.75);
    });
  });

  Object.entries(behavior.trackClicks).forEach(([track, count]) => {
    trackAffinity.set(track, (trackAffinity.get(track) || 0) + count * 1.5);
  });

  const normalizedQueries = behavior.searchQueries
    .slice(0, 6)
    .map((q) => q.toLowerCase().trim())
    .filter(Boolean);

  const scored: RecommendedChapter[] = chapters.map((chapter, index) => {
    // Baseline editorial priority (Days 1-7 foundation + high-impact parts)
    let score = 10 - index * 0.4;
    let reason =
      chapter.phase === 'Days 1–7'
        ? 'Essential Week 1 foundation inside the soft copy'
        : `High-impact execution module (${chapter.phase})`;

    // If user purchased the soft copy, prioritize immediate Day 1 & next unread execution chapters
    if (behavior.hasPurchasedSoftCopy) {
      if (!viewedSet.has(chapter.id) && chapter.phase === 'Days 1–7') {
        score += 7;
        reason = 'Your next step after unlocking the soft copy (Week 1)';
      } else if (!viewedSet.has(chapter.id)) {
        score += 4;
        reason = 'Unread blueprint module ready in your downloaded PDF';
      }
    }

    // Track affinity from clicks and chapter previews
    const trScore = trackAffinity.get(chapter.track) || 0;
    if (trScore > 0) {
      score += trScore * 2.2;
      reason = `Matches your interest in ${chapter.track}`;
    }

    // Tag overlap with viewed chapters
    let tagScore = 0;
    let matchedTag = '';
    chapter.tags.forEach((tag) => {
      const weight = tagAffinity.get(tag) || 0;
      if (weight > 0) {
        tagScore += weight;
        if (!matchedTag) matchedTag = tag;
      }
    });
    if (tagScore > 0) {
      score += tagScore * 1.25;
      if (trScore === 0 && matchedTag) {
        reason = `Related to topics you explored (${matchedTag})`;
      }
    }

    // Search intent match
    const matchedQuery = normalizedQueries.find(
      (q) =>
        chapter.title.toLowerCase().includes(q) ||
        chapter.hindiTitle.toLowerCase().includes(q) ||
        chapter.summary.toLowerCase().includes(q) ||
        chapter.tags.some((t) => t.toLowerCase().includes(q)) ||
        chapter.keyTools.some((k) => k.toLowerCase().includes(q))
    );
    if (matchedQuery) {
      score += 9;
      reason = `Directly answers your search "${matchedQuery}"`;
    }

    // Preferred roadmap phase alignment
    if (behavior.preferredPhase && chapter.phase === behavior.preferredPhase) {
      score += 3;
    }

    // Slight variety adjustment so already-inspected first item yields to logical next part
    if (behavior.viewedChapterIds[0] === chapter.id) {
      score -= 3.5;
    }

    // Cold-start defaults: highlight Part 1 (Mindset), Part 5 (Skills), Part 9 (Digital Shield)
    if (
      behavior.viewedChapterIds.length === 0 &&
      normalizedQueries.length === 0 &&
      Object.keys(behavior.trackClicks).length === 0
    ) {
      if (chapter.id === 'part-01') {
        score += 8;
        reason = 'Recommended starting chapter · Mindset & Foundation';
      } else if (chapter.id === 'part-05') {
        score += 6.5;
        reason = 'Most popular module · High-income skills & outreach scripts';
      } else if (chapter.id === 'part-09') {
        score += 6;
        reason = 'Must-read safeguard · Cyber-fraud shield & 1930 recovery';
      }
    }

    return { chapter, score, reason };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
