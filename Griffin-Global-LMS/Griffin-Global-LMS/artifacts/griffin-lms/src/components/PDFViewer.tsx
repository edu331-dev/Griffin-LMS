import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { pickBestVoice, makeUtterance, withVoice, cleanSlideText } from "../utils/voiceover";
import type { VoiceCategory } from "../utils/voiceover";

pdfjsLib.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;

interface Props {
  url: string;
  category?: VoiceCategory;
}

export default function PDFViewer({ url, category = "culture" }: Props) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voiceoverPlaying, setVoiceoverPlaying] = useState(false);
  const [pageTexts, setPageTexts] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderingRef = useRef(false);
  const speakingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setPageTexts([]);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setVoiceoverPlaying(false);

    pdfjsLib.getDocument(url).promise
      .then(async (doc) => {
        if (cancelled) return;
        setPdf(doc);
        setNumPages(doc.numPages);
        setLoading(false);

        // Pre-extract text from all pages
        const texts: string[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          try {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            const raw = content.items
              .map((item) => ("str" in item ? item.str : ""))
              .join(" ");
            texts.push(cleanSlideText(raw));
          } catch {
            texts.push("");
          }
          if (cancelled) return;
        }
        setPageTexts(texts);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load the PDF. You can download it instead.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [url]);

  // Stop speech when category changes
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setVoiceoverPlaying(false);
    };
  }, [category]);

  const renderPage = useCallback(async (pageNum: number, doc: PDFDocumentProxy, sc: number) => {
    if (!canvasRef.current || renderingRef.current) return;
    renderingRef.current = true;
    try {
      const page = await doc.getPage(pageNum);
      const viewport = page.getViewport({ scale: sc });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvas, viewport }).promise;
    } catch (e: unknown) {
      const err = e as { name?: string };
      if (err?.name !== "RenderingCancelledException") {
        console.error("PDF render error:", e);
      }
    } finally {
      renderingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (pdf) renderPage(currentPage, pdf, scale);
  }, [pdf, currentPage, scale, renderPage]);

  // Speak current slide text and auto-advance when done
  function speakCurrentSlide(pageNum: number, autoAdvance: boolean) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    speakingRef.current = false;

    const text = pageTexts[pageNum - 1];
    if (!text) {
      // No text — skip straight to next if auto-advancing
      if (autoAdvance && pageNum < numPages) {
        setTimeout(() => {
          setCurrentPage(pageNum + 1);
          speakCurrentSlide(pageNum + 1, true);
        }, 400);
      } else {
        setVoiceoverPlaying(false);
      }
      return;
    }

    speakingRef.current = true;
    withVoice(category, (voice) => {
      const utter = makeUtterance(text, category, voice);
      utter.onstart = () => { speakingRef.current = true; };
      utter.onend = () => {
        speakingRef.current = false;
        if (autoAdvance && pageNum < numPages) {
          setTimeout(() => {
            setCurrentPage(prev => {
              const next = prev + 1;
              speakCurrentSlide(next, true);
              return next;
            });
          }, 600);
        } else {
          setVoiceoverPlaying(false);
        }
      };
      utter.onerror = (e) => {
        const se = e as SpeechSynthesisErrorEvent;
        if (se.error !== "interrupted" && se.error !== "canceled") {
          speakingRef.current = false;
          setVoiceoverPlaying(false);
        }
      };
      window.speechSynthesis.speak(utter);
    });
  }

  function toggleVoiceover() {
    if (!window.speechSynthesis) return;
    if (voiceoverPlaying) {
      window.speechSynthesis.cancel();
      setVoiceoverPlaying(false);
    } else {
      setVoiceoverPlaying(true);
      speakCurrentSlide(currentPage, true);
    }
  }

  // When user manually changes page while voiceover is on, restart speech for new page
  const goTo = (n: number) => {
    const next = Math.max(1, Math.min(n, numPages));
    setCurrentPage(next);
    if (voiceoverPlaying) {
      speakCurrentSlide(next, true);
    }
  };

  const hasText = pageTexts.some(t => t.length > 0);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl" style={{ height: 480 }}>
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-griffin-500 mb-3"></i>
          <p className="text-sm text-gray-500">Loading slides…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/10 border-2 border-dashed border-red-200 dark:border-red-800 rounded-xl py-12 px-6 text-center">
        <i className="fas fa-file-pdf text-4xl text-red-400 mb-3"></i>
        <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">{error}</p>
        <a
          href={url}
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-griffin-600 hover:bg-griffin-700 text-white text-sm rounded-lg font-medium transition-colors"
        >
          <i className="fas fa-download"></i> Download PDF
        </a>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 mb-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 gap-2 flex-wrap">
        {/* Page navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous slide"
          >
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium min-w-[90px] text-center">
            {currentPage} / {numPages}
          </span>
          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage >= numPages}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Next slide"
          >
            <i className="fas fa-chevron-right text-xs"></i>
          </button>
        </div>

        {/* Voiceover + zoom + download */}
        <div className="flex items-center gap-1.5">
          {hasText && (
            <button
              onClick={toggleVoiceover}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                voiceoverPlaying
                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                  : "bg-griffin-100 dark:bg-griffin-900/20 text-griffin-700 dark:text-griffin-400 hover:bg-griffin-200"
              }`}
              title={voiceoverPlaying ? "Stop voiceover" : "Play voiceover — reads each slide aloud"}
            >
              <i className={`fas ${voiceoverPlaying ? "fa-stop" : "fa-volume-up"} text-[10px]`}></i>
              <span className="hidden sm:inline">{voiceoverPlaying ? "Stop" : "Voiceover"}</span>
            </button>
          )}
          <button onClick={() => setScale(s => Math.max(0.5, +(s - 0.2).toFixed(1)))}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Zoom out">
            <i className="fas fa-search-minus text-xs"></i>
          </button>
          <span className="text-xs text-gray-500 w-10 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(3.0, +(s + 0.2).toFixed(1)))}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Zoom in">
            <i className="fas fa-search-plus text-xs"></i>
          </button>
          <a href={url} download
            className="ml-1 p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Download PDF">
            <i className="fas fa-download text-xs"></i>
          </a>
        </div>
      </div>

      {/* Voiceover status bar */}
      {voiceoverPlaying && (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-griffin-50 dark:bg-griffin-900/20 border-b border-griffin-200 dark:border-griffin-800">
          <span className="flex gap-0.5 items-end h-3">
            {[1, 2, 3, 4].map(i => (
              <span key={i} className="w-0.5 bg-griffin-500 rounded-full animate-bounce"
                style={{ height: `${6 + i * 2}px`, animationDelay: `${i * 80}ms` }} />
            ))}
          </span>
          <p className="text-xs text-griffin-700 dark:text-griffin-400 font-medium">
            Reading slide {currentPage} — advances automatically
          </p>
        </div>
      )}

      {/* Canvas */}
      <div
        className={`overflow-auto flex justify-center transition-all ${voiceoverPlaying ? "bg-griffin-950/5 dark:bg-griffin-900/10" : "bg-gray-300 dark:bg-gray-950"}`}
        style={{ maxHeight: 580, minHeight: 360 }}
      >
        <canvas
          ref={canvasRef}
          className={`my-4 shadow-lg transition-all ${voiceoverPlaying ? "ring-2 ring-griffin-400/60" : ""}`}
          style={{ display: "block", maxWidth: "100%" }}
        />
      </div>

      {/* Page dots */}
      {numPages > 1 && numPages <= 24 && (
        <div className="flex justify-center gap-1 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-wrap px-3">
          {Array.from({ length: numPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => goTo(n)}
              className={`w-2 h-2 rounded-full transition-colors ${n === currentPage ? "bg-griffin-600" : "bg-gray-300 dark:bg-gray-600 hover:bg-griffin-400"}`}
              title={`Slide ${n}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
