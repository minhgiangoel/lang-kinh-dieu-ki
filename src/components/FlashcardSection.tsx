import React, { useState } from 'react';
import { STUDY_FLASHCARDS } from '../data/learningContent';
import { RefreshCw, Check, ArrowRight, ArrowLeft, BookmarkCheck } from 'lucide-react';

export const FlashcardSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<number[]>([]);

  const card = STUDY_FLASHCARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % STUDY_FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + STUDY_FLASHCARDS.length) % STUDY_FLASHCARDS.length);
  };

  const toggleMastered = (idx: number) => {
    setMastered(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="bg-amber-50/50 rounded-2xl border border-amber-200/80 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-xl md:text-2xl font-serif-culture font-bold text-amber-950 flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-amber-700" />
            Thẻ Học Ghi Nhớ Nhanh (Flashcards)
          </h3>
          <p className="text-stone-600 text-xs md:text-sm mt-0.5">
            Nhấp vào thẻ để lật xem đáp án tóm tắt. Ôn tập nhanh các mốc cốt lõi.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-amber-200/60 text-amber-900 rounded-full w-fit">
          Đã thuộc: {mastered.length}/{STUDY_FLASHCARDS.length} thẻ
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Flashcard container */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative min-h-[220px] bg-white rounded-2xl border-2 border-amber-300 shadow-md p-8 flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg hover:border-amber-400 select-none group"
        >
          <div className="flex justify-between items-start">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
              {card.tag}
            </span>
            <span className="text-xs text-stone-400 flex items-center gap-1 group-hover:text-amber-700">
              <RefreshCw className="w-3 h-3" />
              Lật thẻ
            </span>
          </div>

          <div className="text-center my-6">
            {!isFlipped ? (
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2 font-medium">Câu hỏi / Khái niệm</p>
                <h4 className="text-2xl font-bold font-serif-culture text-stone-900">
                  {card.front}
                </h4>
              </div>
            ) : (
              <div className="animate-fade-in">
                <p className="text-xs uppercase tracking-widest text-amber-700 mb-2 font-medium">Nội dung ghi nhớ</p>
                <h4 className="text-xl md:text-2xl font-semibold text-amber-950 leading-relaxed">
                  {card.back}
                </h4>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-stone-400">
            Thẻ {currentIndex + 1} / {STUDY_FLASHCARDS.length}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-5 gap-3">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-medium transition shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Thẻ trước
          </button>

          <button
            onClick={() => toggleMastered(currentIndex)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              mastered.includes(currentIndex)
                ? 'bg-green-700 text-white shadow-green-200 shadow'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            {mastered.includes(currentIndex) ? 'Đã nhớ' : 'Đánh dấu đã nhớ'}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium transition shadow-sm"
          >
            Thẻ sau
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
