"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import clsx from "clsx";
import {
  PhotoIcon,
  ArrowDownTrayIcon,
  BoltIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

type AlignmentOption = "left" | "center" | "right";

const FONT_OPTIONS = [
  { label: "Impact Display", value: "var(--font-bebas), Impact, sans-serif" },
  { label: "Bold Sans", value: "var(--font-inter), 'Segoe UI', sans-serif" },
  { label: "Serif Dramatic", value: "var(--font-playfair), serif" },
  { label: "Techno", value: "var(--font-anton), sans-serif" }
];

const GRADIENTS = [
  {
    name: "Red Focus",
    from: "#FF3D00",
    to: "#1A0000"
  },
  {
    name: "Tactical Green",
    from: "#00F5A0",
    to: "#00361C"
  },
  {
    name: "Mystic Purple",
    from: "#B721FF",
    to: "#2A0C6F"
  },
  {
    name: "Sunburst",
    from: "#FF9A3D",
    to: "#701717"
  }
];

const INSIGHTS = [
  "Gunakan teks utama maksimal 4 kata agar terbaca di layar kecil.",
  "Kontras tinggi antara teks dan latar meningkatkan CTR hingga 30%.",
  "Foto close-up dengan ekspresi kuat terbukti lebih menarik perhatian.",
  "Tambahkan badge atau angka besar untuk memicu rasa penasaran.",
  "Pastikan elemen kunci berada di kiri/kanan (rule of thirds), bukan di tengah."
];

const BADGE_PRESETS = [
  { label: "Pop Red", bg: "#FF1744", text: "#FFFFFF" },
  { label: "Lime Flash", bg: "#C6FF00", text: "#0F0F0F" },
  { label: "Sky Pop", bg: "#00E5FF", text: "#0F0F0F" }
];

function useDataUrl() {
  const [url, setUrl] = useState<string | null>(null);

  const load = useCallback((value: File | null) => {
    if (!value) {
      setUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setUrl(reader.result as string);
    reader.readAsDataURL(value);
  }, []);

  return { url, load };
}

function alignmentClasses(alignment: AlignmentOption) {
  switch (alignment) {
    case "left":
      return { items: "items-start text-left", box: "self-start" };
    case "center":
      return { items: "items-center text-center", box: "self-center" };
    case "right":
      return { items: "items-end text-right", box: "self-end" };
    default:
      return { items: "items-start text-left", box: "self-start" };
  }
}

export default function Page() {
  const [title, setTitle] = useState("Bikin Thumbnail YouTube Meledak");
  const [subtitle, setSubtitle] = useState("Strategi Visual & Storytelling");
  const [badgeText, setBadgeText] = useState("7 Rahasia");
  const [titleColor, setTitleColor] = useState("#FFFFFF");
  const [subtitleColor, setSubtitleColor] = useState("#E5E5E5");
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].value);
  const [fontWeight, setFontWeight] = useState(700);
  const [alignment, setAlignment] = useState<AlignmentOption>("left");
  const [titleSize, setTitleSize] = useState(96);
  const [subtitleSize, setSubtitleSize] = useState(52);
  const [badgeBg, setBadgeBg] = useState(BADGE_PRESETS[0].bg);
  const [badgeColor, setBadgeColor] = useState(BADGE_PRESETS[0].text);
  const [shadowIntensity, setShadowIntensity] = useState(0.6);
  const [overlayOpacity, setOverlayOpacity] = useState(0.35);
  const [overlayColor, setOverlayColor] = useState("#000000");
  const [gradient, setGradient] = useState(GRADIENTS[0]);
  const [useGradient, setUseGradient] = useState(true);
  const [showRule, setShowRule] = useState(true);
  const [showSafeArea, setShowSafeArea] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const { url: uploadedImage, load: loadImage } = useDataUrl();

  const dropShadow = useMemo(
    () => `0 0 ${24 * shadowIntensity}px rgba(0,0,0,${0.65 * shadowIntensity})`,
    [shadowIntensity]
  );

  const backgroundStyle = useMemo(() => {
    if (uploadedImage) {
      return {
        backgroundImage: `linear-gradient(rgba(${hexToRgb(
          overlayColor
        )}, ${overlayOpacity}), rgba(${hexToRgb(
          overlayColor
        )}, ${overlayOpacity})), url(${uploadedImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      };
    }
    if (useGradient) {
      return {
        backgroundImage: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
      };
    }
    return {
      background: "#1A1A1A"
    };
  }, [uploadedImage, useGradient, gradient, overlayColor, overlayOpacity]);

  const downloadThumbnail = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: 1280,
        height: 720,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left"
        }
      });
      const downloadLink = document.createElement("a");
      downloadLink.download = "youtube-thumbnail.png";
      downloadLink.href = dataUrl;
      downloadLink.click();
    } catch (error) {
      console.error("Gagal mengekspor thumbnail:", error);
      alert("Gagal mengekspor thumbnail. Coba lagi atau ganti browser.");
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 lg:flex-row">
        <section className="w-full lg:w-2/5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <header className="mb-8 flex items-start gap-3">
              <div className="rounded-full bg-youtube-red/10 p-3 text-youtube-red">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-display text-4xl uppercase tracking-wide text-white">
                  Thumbnail Studio
                </h1>
                <p className="mt-2 text-sm text-white/70">
                  Optimalkan CTR dengan komposisi visual ala kreator papan atas.
                  Atur tipografi, warna, overlay, hingga badge CTA dan ekspor ke PNG 1280×720.
                </p>
              </div>
            </header>

            <ControlGroup title="Teks Utama" icon={<BoltIcon className="h-5 w-5" />}>
              <label className="block text-sm font-medium text-white/80">
                Headline
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white focus:border-youtube-red focus:outline-none"
                  value={title}
                  maxLength={60}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>

              <label className="mt-4 block text-sm font-medium text-white/80">
                Sub-headline
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white focus:border-youtube-red focus:outline-none"
                  value={subtitle}
                  maxLength={80}
                  onChange={(event) => setSubtitle(event.target.value)}
                />
              </label>

              <div className="mt-4 flex flex-col gap-4 md:flex-row">
                <Field label="Font" className="flex-1">
                  <select
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-youtube-red focus:outline-none"
                    value={fontFamily}
                    onChange={(event) => setFontFamily(event.target.value)}
                  >
                    {FONT_OPTIONS.map((font) => (
                      <option value={font.value} key={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Ketebalan" className="md:w-28">
                  <input
                    type="number"
                    min={400}
                    max={900}
                    step={100}
                    value={fontWeight}
                    onChange={(event) => setFontWeight(Number(event.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-center text-white focus:border-youtube-red focus:outline-none"
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Ukuran Headline">
                  <Slider
                    value={titleSize}
                    onChange={setTitleSize}
                    min={48}
                    max={140}
                    step={1}
                  />
                </Field>
                <Field label="Ukuran Sub-headline">
                  <Slider
                    value={subtitleSize}
                    onChange={setSubtitleSize}
                    min={32}
                    max={96}
                    step={1}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Warna Headline">
                  <ColorInput value={titleColor} onChange={setTitleColor} />
                </Field>
                <Field label="Warna Sub-headline">
                  <ColorInput value={subtitleColor} onChange={setSubtitleColor} />
                </Field>
              </div>

              <Field label="Drop Shadow" className="mt-4">
                <Slider
                  value={shadowIntensity}
                  onChange={setShadowIntensity}
                  min={0}
                  max={1}
                  step={0.05}
                />
              </Field>

              <Field label="Perataan" className="mt-4">
                <div className="flex gap-2">
                  {(["left", "center", "right"] as AlignmentOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => setAlignment(option)}
                      className={clsx(
                        "flex-1 rounded-xl border px-3 py-2 text-sm capitalize transition",
                        alignment === option
                          ? "border-youtube-red bg-youtube-red/20 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Field>
            </ControlGroup>

            <ControlGroup
              title="Latar Visual"
              icon={<PhotoIcon className="h-5 w-5" />}
              className="mt-6"
            >
              <div className="flex flex-col gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-white/80">Unggah Gambar</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      loadImage(event.target.files?.[0] ?? null);
                      if (event.target.files?.[0]) {
                        setUseGradient(false);
                      }
                    }}
                    className="mt-2 w-full cursor-pointer rounded-xl border border-dashed border-white/20 bg-black/30 px-4 py-3 text-sm text-white/60 file:hidden"
                  />
                </label>

                {uploadedImage && (
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/30"
                        style={{ backgroundImage: `url(${uploadedImage})`, backgroundSize: "cover" }}
                      />
                      <span className="text-xs text-white/70">Gambar aktif digunakan</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        loadImage(null);
                        setUseGradient(true);
                      }}
                      className="text-xs font-semibold uppercase text-red-300 transition hover:text-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Gunakan gradient rekomendasi</span>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={useGradient}
                      onChange={(event) => setUseGradient(event.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-black/30"
                    />
                    <span>Aktif</span>
                  </label>
                </div>

                {useGradient && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GRADIENTS.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setGradient(item)}
                        className={clsx(
                          "rounded-xl border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-youtube-red/70",
                          gradient.name === item.name
                            ? "border-youtube-red"
                            : "border-white/10 hover:border-white/30"
                        )}
                      >
                        <span
                          className="block h-14 w-full rounded-lg"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${item.from}, ${item.to})`
                          }}
                        />
                        <span className="mt-2 block text-xs font-medium text-white/70">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Warna Overlay">
                    <ColorInput value={overlayColor} onChange={setOverlayColor} />
                  </Field>
                  <Field label="Opasitas Overlay">
                    <Slider
                      value={overlayOpacity}
                      onChange={setOverlayOpacity}
                      min={0}
                      max={0.8}
                      step={0.05}
                    />
                  </Field>
                </div>
              </div>
            </ControlGroup>

            <ControlGroup
              title="Badge & Fokus"
              icon={<AdjustmentsHorizontalIcon className="h-5 w-5" />}
              className="mt-6"
            >
              <Field label="Teks Badge">
                <input
                  value={badgeText}
                  onChange={(event) => setBadgeText(event.target.value)}
                  maxLength={24}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white focus:border-youtube-red focus:outline-none"
                />
              </Field>

              <div className="mt-4 flex flex-col gap-3">
                <span className="text-sm font-medium text-white/80">Preset Badge</span>
                <div className="flex gap-2">
                  {BADGE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setBadgeBg(preset.bg);
                        setBadgeColor(preset.text);
                      }}
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 hover:border-white/40"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Warna Badge">
                  <ColorInput value={badgeBg} onChange={setBadgeBg} />
                </Field>
                <Field label="Teks Badge">
                  <ColorInput value={badgeColor} onChange={setBadgeColor} />
                </Field>
              </div>

              <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/70">
                <p className="flex items-center gap-2 font-medium text-white/80">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                  Checklist Visual High CTR
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Ekspresi wajah dramatis & close crop.</li>
                  <li>Kontras tinggi antara subjek dan latar.</li>
                  <li>Gunakan badge & angka sebagai anchor visual.</li>
                </ul>
              </div>
            </ControlGroup>

            <ControlGroup title="Guidelines" className="mt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Rule of Thirds Grid</span>
                <Switch checked={showRule} onChange={setShowRule} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-white/70">Safe Area YouTube</span>
                <Switch checked={showSafeArea} onChange={setShowSafeArea} />
              </div>
            </ControlGroup>

            <button
              onClick={downloadThumbnail}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-youtube-red px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-youtube-red/30 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-youtube-red"
            >
              <ArrowDownTrayIcon className="h-6 w-6" />
              Unduh PNG 1280×720
            </button>
          </div>
        </section>

        <section className="flex w-full flex-col gap-6 lg:w-3/5">
          <div className="relative rounded-3xl border border-white/10 bg-black/30 p-4">
            <div
              ref={canvasRef}
              className={clsx(
                "relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20",
                "shadow-[0_0_40px_rgba(0,0,0,0.35)]"
              )}
              style={backgroundStyle}
            >
              {showRule && <RuleOfThirdsOverlay />}
              {showSafeArea && <SafeAreaOverlay />}
              <div className="absolute inset-6 flex flex-col justify-between">
                <div className="flex justify-between">
                  <Badge text={badgeText} bg={badgeBg} color={badgeColor} />
                  <div className="rounded-full bg-youtube-red/90 px-4 py-1 text-sm font-semibold uppercase tracking-wide shadow-lg shadow-black/30">
                    CTR Focus
                  </div>
                </div>
                <div
                  className={clsx(
                    "flex flex-col gap-4",
                    alignmentClasses(alignment).items,
                    "transition-all duration-200"
                  )}
                >
                  <h2
                    className="max-w-3xl uppercase tracking-wide"
                    style={{
                      fontFamily,
                      fontWeight,
                      color: titleColor,
                      fontSize: `${titleSize / 10}rem`,
                      textShadow: dropShadow,
                      lineHeight: 0.85
                    }}
                  >
                    {title || "Masukkan Headline"}
                  </h2>
                  <p
                    className={clsx(
                      "max-w-2xl",
                      alignment === "center" ? "mx-auto" : "mx-0"
                    )}
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 600,
                      color: subtitleColor,
                      fontSize: `${subtitleSize / 16}rem`,
                      textShadow: dropShadow,
                      lineHeight: 1
                    }}
                  >
                    {subtitle || "Tambahkan sub-headline singkat & kuat"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-sm text-white/70 shadow-[0_15px_45px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="mb-4 flex items-center gap-3 text-white">
              <BoltIcon className="h-5 w-5 text-youtube-red" />
              <h2 className="font-semibold uppercase tracking-wide">
                Insight Thumbnail Efektif
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {INSIGHTS.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-xs leading-relaxed text-white/80"
                >
                  <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-youtube-red/20 text-youtube-red">
                    <SparklesIcon className="h-4 w-4" />
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function Badge({ text, bg, color }: { text: string; bg: string; color: string }) {
  return (
    <div
      className="rounded-2xl px-4 py-2 text-sm font-semibold uppercase tracking-wide shadow-lg shadow-black/40"
      style={{
        background: bg,
        color
      }}
    >
      {text || "Badge CTA"}
    </div>
  );
}

function RuleOfThirdsOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {[1, 2].map((index) => (
        <div
          key={`vertical-${index}`}
          className="pointer-events-none absolute inset-y-0 w-px bg-white/15"
          style={{ left: `${(index / 3) * 100}%` }}
        />
      ))}
      {[1, 2].map((index) => (
        <div
          key={`horizontal-${index}`}
          className="pointer-events-none absolute inset-x-0 h-px bg-white/15"
          style={{ top: `${(index / 3) * 100}%` }}
        />
      ))}
    </div>
  );
}

function SafeAreaOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-[80%] w-[80%] rounded-3xl border-2 border-dashed border-white/20" />
    </div>
  );
}

function Slider({
  value,
  onChange,
  min,
  max,
  step
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
      className="h-2 w-full cursor-pointer appearance-none overflow-hidden rounded-full bg-white/10 accent-youtube-red"
    />
  );
}

function ColorInput({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-10 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-youtube-red focus:outline-none"
      />
    </div>
  );
}

function Field({
  label,
  children,
  className
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={clsx("block text-sm font-medium text-white/80", className)}>
      <span>{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ControlGroup({
  title,
  icon,
  children,
  className
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-3xl border border-white/10 bg-black/30 p-6", className)}>
      <div className="mb-5 flex items-center gap-3 text-white">
        {icon && <span className="rounded-full bg-white/10 p-2 text-youtube-red">{icon}</span>}
        <h2 className="text-base font-semibold uppercase tracking-wide">{title}</h2>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative inline-flex h-7 w-14 items-center rounded-full border border-white/10 transition",
        checked ? "bg-youtube-red/80" : "bg-white/10"
      )}
    >
      <span
        className={clsx(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
          checked ? "translate-x-7" : "translate-x-1"
        )}
      />
    </button>
  );
}

function hexToRgb(hex: string) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
