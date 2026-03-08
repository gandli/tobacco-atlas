import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "@/data";
import { Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

const COLS = 8;
const CELL_W = 180;
const CELL_H = 260;
const GAP = 24;

const Gallery = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  // Center the grid on mount
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const gridW = COLS * (CELL_W + GAP);
      setOffset({
        x: (rect.width - gridW) / 2,
        y: 60,
      });
    }
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((s) => Math.min(3, Math.max(0.3, s + delta)));
    } else {
      setOffset((o) => ({
        x: o.x - e.deltaX,
        y: o.y - e.deltaY,
      }));
    }
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("[data-product]")) return;
      setDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [offset]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      setOffset({
        x: dragStart.current.ox + (e.clientX - dragStart.current.x),
        y: dragStart.current.oy + (e.clientY - dragStart.current.y),
      });
    },
    [dragging]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const zoom = (delta: number) => {
    setScale((s) => Math.min(3, Math.max(0.3, s + delta)));
  };

  // Touch pinch zoom
  const lastTouchDist = useRef<number | null>(null);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (lastTouchDist.current !== null) {
        const delta = (dist - lastTouchDist.current) * 0.005;
        setScale((s) => Math.min(3, Math.max(0.3, s + delta)));
      }
      lastTouchDist.current = dist;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    lastTouchDist.current = null;
  }, []);

  const rows = [];
  for (let i = 0; i < products.length; i += COLS) {
    rows.push(products.slice(i, i + COLS));
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div
        ref={containerRef}
        className="fixed inset-0 pt-[var(--nav-height)] pb-14 md:pb-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      >
        {/* Help text */}
        <div className="absolute top-[calc(var(--nav-height)+8px)] left-1/2 -translate-x-1/2 z-10 text-xs text-muted-foreground pointer-events-none">
          <span className="hidden md:inline">WASD pan · Q/E zoom · Click to open</span>
          <span className="md:hidden">Drag · Pinch to zoom · Tap to open</span>
        </div>

        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {rows.map((row, ri) => (
            <div key={ri} className="flex" style={{ gap: GAP }}>
              {row.map((product) => (
                <div
                  key={product.id}
                  data-product
                  onClick={() => navigate(`/sku/${product.id}`)}
                  className="flex flex-col items-center gap-2 cursor-pointer group hover:opacity-80 transition-opacity"
                  style={{ width: CELL_W, height: CELL_H, padding: 12, flexShrink: 0 }}
                >
                  <div className="flex-1 flex items-center justify-center w-full">
                    <img
                      src={product.image}
                      alt={`${product.brand}（${product.name}）`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground text-center leading-tight whitespace-nowrap">
                    {product.brand}（{product.name}）
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="fixed bottom-20 md:bottom-6 left-4 z-50 flex items-center gap-1 bg-background/90 backdrop-blur-sm border border-border rounded-full px-1 py-1 shadow-sm">
        <button
          onClick={() => zoom(-0.15)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => zoom(0.15)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
        >
          <Plus className="w-4 h-4" />
        </button>
        <span className="text-xs text-muted-foreground px-2 min-w-[40px] text-center">
          {Math.round(scale * 100)}%
        </span>
      </div>

      <MobileNav />
    </div>
  );
};

export default Gallery;
