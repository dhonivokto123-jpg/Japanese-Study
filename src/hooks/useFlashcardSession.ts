import { useState, useEffect, useMemo, useCallback } from 'react';
import { toBengaliNumber } from '../utils/vocabCategories';

export interface UseFlashcardSessionOptions {
  autoShuffleOnNewSession?: boolean;
}

export function useFlashcardSession<T extends { id: string }>(
  items: T[],
  options: UseFlashcardSessionOptions = {}
) {
  const [deck, setDeck] = useState<T[]>(() => [...items]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [maxViewedIndex, setMaxViewedIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [shuffleNotice, setShuffleNotice] = useState<string | null>(null);
  const [shuffleCount, setShuffleCount] = useState<number>(0);

  // A stable key based on the items' IDs to detect real filter or data changes
  const itemsKey = useMemo(() => items.map((it) => it.id).join(','), [items]);

  // Re-initialize session whenever the source items change (e.g. category or lesson filter change)
  useEffect(() => {
    setDeck([...items]);
    setCurrentIndex(0);
    setMaxViewedIndex(0);
    setIsCompleted(false);
    setShuffleNotice(null);
    setShuffleCount(0);
  }, [itemsKey]);

  const totalCards = deck.length;

  // Cards already shown: from index 0 to maxViewedIndex
  // When totalCards is 0, 0 cards shown.
  // Otherwise, minimum 1 card has been shown (the current starting card), up to maxViewedIndex + 1.
  const cardsAlreadyShown = useMemo(() => {
    if (totalCards === 0) return 0;
    return Math.min(maxViewedIndex + 1, totalCards);
  }, [totalCards, maxViewedIndex]);

  // Remaining unseen cards in the active shuffle pool
  const remainingCards = useMemo(() => {
    if (totalCards === 0) return 0;
    const poolStartIndex = currentIndex < maxViewedIndex ? maxViewedIndex + 1 : currentIndex;
    return Math.max(0, totalCards - poolStartIndex);
  }, [totalCards, currentIndex, maxViewedIndex]);

  const currentCard: T | undefined = deck[currentIndex] || undefined;
  const isFirstCard = currentIndex === 0;
  const isLastCard = totalCards > 0 && currentIndex === totalCards - 1;

  // Next handler: advances forward or completes session at the end
  const handleNext = useCallback(() => {
    if (totalCards === 0) return;

    if (currentIndex < totalCards - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setMaxViewedIndex((prev) => Math.max(prev, nextIdx));
    } else {
      // Reached the end of the session
      setIsCompleted(true);
    }
  }, [totalCards, currentIndex]);

  // Previous handler: steps backward through already seen cards without altering history
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Shuffle handler: ONLY randomizes remaining unseen cards!
  // Preserves all cards that have already been shown in history.
  // Immediately replaces the visible card with a newly randomized unseen card.
  const handleShuffleRemaining = useCallback(() => {
    if (totalCards <= 1) {
      setShuffleNotice('শাফল করার মতো পর্যাপ্ত কার্ড নেই।');
      setTimeout(() => setShuffleNotice(null), 3000);
      return;
    }

    // Determine the pool to shuffle:
    // If user has navigated back to review previous cards (currentIndex < maxViewedIndex):
    // Cards 0..maxViewedIndex have already been shown in this session.
    // The pool of remaining unseen cards begins at maxViewedIndex + 1.
    // If currentIndex >= maxViewedIndex:
    // The user is at the forefront of the session.
    // Cards 0..currentIndex - 1 are historical/viewed cards (passed).
    // The pool to shuffle starts from currentIndex to totalCards - 1 (the current card + remaining cards).
    const isReviewingHistory = currentIndex < maxViewedIndex;
    const poolStartIndex = isReviewingHistory ? maxViewedIndex + 1 : currentIndex;

    const historicalSlice = deck.slice(0, poolStartIndex);
    const poolSlice = deck.slice(poolStartIndex);

    if (poolSlice.length <= 1) {
      if (poolStartIndex >= totalCards - 1) {
        setShuffleNotice('🎉 আপনি সেশনের শেষ কার্ডে আছেন! পুনরায় শুরু করতে "🔄 নতুন সেশন" চাপুন।');
      } else {
        setShuffleNotice('বাকি কোনো অদেখা কার্ড নেই বা কেবল ১টি কার্ড বাকি আছে।');
      }
      setTimeout(() => setShuffleNotice(null), 3500);
      return;
    }

    // Fisher-Yates shuffle on poolSlice
    const shuffledPool = [...poolSlice];
    for (let i = shuffledPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
    }

    // Guarantee that the first card of the shuffled pool is different from the currently visible card
    const currentlyVisibleId = isReviewingHistory
      ? (poolSlice[0] ? poolSlice[0].id : null)
      : (deck[currentIndex] ? deck[currentIndex].id : null);

    if (currentlyVisibleId && shuffledPool.length > 1 && shuffledPool[0].id === currentlyVisibleId) {
      const swapIdx = 1 + Math.floor(Math.random() * (shuffledPool.length - 1));
      [shuffledPool[0], shuffledPool[swapIdx]] = [shuffledPool[swapIdx], shuffledPool[0]];
    }

    const newDeck = [...historicalSlice, ...shuffledPool];
    setDeck(newDeck);

    if (isReviewingHistory) {
      // Advance user to the first of the newly shuffled unseen cards
      setCurrentIndex(poolStartIndex);
      setMaxViewedIndex(poolStartIndex);
    }

    setShuffleCount((prev) => prev + 1);

    const shownCount = historicalSlice.length;
    const remainingCount = shuffledPool.length;
    setShuffleNotice(
      `✨ বাকি ${toBengaliNumber(remainingCount)}টি অদেখা কার্ড সফলভাবে শাফল করা হয়েছে। পূর্বে দেখা ${toBengaliNumber(shownCount)}টি কার্ড অক্ষত আছে।`
    );
    setTimeout(() => setShuffleNotice(null), 3500);
  }, [deck, currentIndex, maxViewedIndex, totalCards]);

  // Start a completely new session
  // Creates a brand new order (either randomized or fresh original order)
  const startNewSession = useCallback(
    (shuffle: boolean = true) => {
      let newDeck = [...items];
      if (shuffle && newDeck.length > 1) {
        // Full Fisher-Yates shuffle for a fresh session experience
        for (let i = newDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }
      }

      setDeck(newDeck);
      setCurrentIndex(0);
      setMaxViewedIndex(0);
      setIsCompleted(false);
      setShuffleCount((prev) => prev + 1);
      setShuffleNotice(
        shuffle
          ? '🔄 সম্পূর্ণ নতুন র‍্যান্ডম সেশন শুরু হয়েছে!'
          : '🔄 নতুন সেশন শুরু হয়েছে।'
      );
      setTimeout(() => setShuffleNotice(null), 3000);
    },
    [items]
  );

  const clearShuffleNotice = useCallback(() => {
    setShuffleNotice(null);
  }, []);

  return {
    deck,
    currentCard,
    currentIndex,
    maxViewedIndex,
    isCompleted,
    totalCards,
    cardsAlreadyShown,
    remainingCards,
    isFirstCard,
    isLastCard,
    handleNext,
    handlePrev,
    handleShuffleRemaining,
    startNewSession,
    setIsCompleted,
    shuffleNotice,
    clearShuffleNotice,
    shuffleCount,
  };
}
