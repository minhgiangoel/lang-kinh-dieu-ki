import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, ChevronRight, Sparkles, Printer, User } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningContent';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const isCurrentAnswered = selectedAnswers[currentIdx] !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswers[currentIdx] !== undefined) return; // Prevent re-answering
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsSubmitted(true);
      // Trigger celebratory confetti if passed (>= 75%)
      const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, ans]) => {
        return acc + (QUIZ_QUESTIONS[Number(qIdx)].correctIndex === ans ? 1 : 0);
      }, 0);
      if (score >= QUIZ_QUESTIONS.length * 0.75) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowCertificate(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, ans]) => {
    return acc + (QUIZ_QUESTIONS[Number(qIdx)].correctIndex === ans ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-xl overflow-hidden p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-amber-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Kiểm tra kiến thức học liệu số
          </div>
          <h2 className="text-2xl md:text-3xl font-serif-culture font-bold text-amber-950">
            Hỏi Đáp & Thử Tài Lăng Kính Diệu Kì
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Đánh giá mức độ am hiểu về lịch sử, kiến trúc và di sản Đình làng Sở Thượng.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-stone-500">Tiến độ:</span>
          <div className="px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-bold text-sm">
            {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length} câu
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        <div>
          {/* Question card */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-3">
              <span>Câu hỏi {currentIdx + 1} trên {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden mb-6">
              <div
                className="bg-gradient-to-r from-amber-600 to-red-600 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-stone-900 mb-6">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                const isCorrect = currentQ.correctIndex === idx;
                const hasAnswered = selectedAnswers[currentIdx] !== undefined;

                let btnStyle = 'border-stone-200 hover:border-amber-400 bg-stone-50/60 text-stone-800';
                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-green-500 bg-green-50 text-green-950 font-medium ring-2 ring-green-400/50';
                  } else if (isSelected) {
                    btnStyle = 'border-red-400 bg-red-50 text-red-950 ring-2 ring-red-400/50';
                  } else {
                    btnStyle = 'opacity-60 border-stone-200 bg-stone-50 text-stone-600';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-200/50 text-amber-950 font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm md:text-base leading-relaxed">{option}</span>
                    </div>

                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 ml-2" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {isCurrentAnswered && (
              <div className="mt-5 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-sm text-stone-800">
                <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Giải thích học liệu:
                </div>
                <p>{currentQ.explanation}</p>
              </div>
            )}
          </div>

            {/* Next / Submit Button */}
            <div className="flex justify-end pt-4 border-t border-amber-100">
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md ${
                  isCurrentAnswered
                    ? 'bg-gradient-to-r from-red-800 to-amber-800 hover:from-red-900 hover:to-amber-900 text-white shadow-amber-900/20'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Xem kết quả bài học' : 'Câu tiếp theo'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
        </div>
      ) : (
        /* Results & Certificate Screen */
        <div className="text-center py-6">
          <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-800 mb-4 ring-8 ring-amber-50">
            <Award className="w-12 h-12" />
          </div>

          <h3 className="text-2xl md:text-3xl font-serif-culture font-bold text-amber-950 mb-2">
            Kết Quả Bài Kiểm Tra
          </h3>
          <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
            Bạn đã hoàn thành bộ câu hỏi học liệu số Lăng Kính Diệu Kì về di tích Đình làng Sở Thượng.
          </p>

          <div className="inline-block p-6 rounded-2xl bg-amber-50/70 border border-amber-200 mb-8 min-w-[240px]">
            <div className="text-4xl md:text-5xl font-bold font-serif-culture text-red-900 mb-1">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <div className="text-sm font-semibold text-amber-800">
              Đạt {percentage}% tổng điểm
            </div>
            <div className="text-xs text-stone-500 mt-2">
              {percentage >= 75 ? '🎉 Xuất sắc! Bạn đã nắm rất vững kiến thức di sản.' : 'Tiếp tục rèn luyện để hiểu sâu hơn về lịch sử làng.'}
            </div>
          </div>

          {/* Issue Certificate Form */}
          {!showCertificate ? (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-stone-50 border border-amber-200 text-left mb-6 shadow-sm">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Nhập họ tên của bạn để nhận chứng nhận học tập:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowCertificate(true)}
                  disabled={!studentName.trim()}
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition"
                >
                  Cấp chứng nhận
                </button>
              </div>
            </div>
          ) : (
            /* Printable Digital Certificate */
            <div className="max-w-2xl mx-auto my-8 p-8 border-8 border-double border-amber-800/80 bg-gradient-to-br from-amber-50 via-white to-amber-100/50 rounded-xl shadow-2xl relative print:border-none print:shadow-none">
              <div className="absolute top-4 left-4 right-4 flex justify-between text-xs font-serif-culture text-amber-900/60 uppercase">
                <span>Di tích lịch sử - văn hóa</span>
                <span>Học liệu số 2026</span>
              </div>

              <div className="pt-6 pb-2 text-center">
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </span>
                <span className="text-xs text-stone-600 block mb-4">
                  Độc lập - Tự do - Hạnh phúc
                </span>
                <div className="w-24 h-0.5 bg-amber-700 mx-auto mb-6"></div>

                <h4 className="text-xl md:text-2xl font-serif-culture font-extrabold text-red-950 uppercase mb-2">
                  GIẤY CHỨNG NHẬN
                </h4>
                <p className="text-xs text-stone-600 uppercase tracking-widest mb-4">
                  Hoàn thành xuất sắc chuyên đề học liệu số
                </p>

                <p className="text-sm text-stone-600">Chứng nhận bạn:</p>
                <div className="text-2xl md:text-3xl font-serif-culture font-bold text-amber-900 my-2 underline decoration-amber-400 underline-offset-8">
                  {studentName || 'Học Viên'}
                </div>
                <p className="text-xs md:text-sm text-stone-700 max-w-lg mx-auto leading-relaxed mt-4">
                  Đã hoàn thành xuất sắc chương trình tìm hiểu & trắc nghiệm học liệu số:
                  <strong className="block text-red-950 mt-1">
                    "LĂNG KÍNH DIỆU KÌ - ĐÌNH LÀNG SỞ THƯỢNG"
                  </strong>
                  với kết quả đạt <strong>{percentage}% ({score}/{QUIZ_QUESTIONS.length} câu)</strong>.
                </p>

                <div className="flex justify-between items-end mt-8 pt-6 border-t border-amber-300 text-xs text-stone-600">
                  <div className="text-left">
                    <p className="font-semibold text-amber-950">Mã chứng nhận số:</p>
                    <p className="font-mono text-stone-500">LKDK-ST-{Date.now().toString().slice(-6)}</p>
                  </div>
                  <div className="text-right">
                    <p>Hà Nội, ngày {new Date().toLocaleDateString('vi-VN')}</p>
                    <p className="font-semibold text-amber-950 mt-1">BAN BIÊN TẬP HỌC LIỆU SỐ</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-3 print:hidden">
                <button
                  type="button"
                  onClick={handlePrintCertificate}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg text-xs font-semibold shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In / Lưu PDF chứng nhận</span>
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-sm transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài kiểm tra</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
