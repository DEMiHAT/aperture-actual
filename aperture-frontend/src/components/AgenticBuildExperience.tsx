import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Pause, Play, RotateCcw, X } from "lucide-react";

type AgenticBuildExperienceProps = {
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  autoStart?: boolean;
};

const agents = [
  { name: "Atlas", role: "Navigation", color: "#b7ff4a", x: [12, 42, 76, 54], y: [9, 9, 10, 18] },
  { name: "Lyra", role: "Narrative", color: "#a78bfa", x: [32, 58, 43, 68], y: [26, 31, 39, 35] },
  { name: "Nova", role: "Interface", color: "#ff654d", x: [22, 72, 58, 36], y: [59, 67, 79, 70] },
  { name: "Sentry", role: "Quality", color: "#43d7ff", x: [82, 74, 87, 64], y: [21, 48, 70, 84] },
] as const;

const events = [
  { at: 2, agent: "Atlas", text: "Reading page structure" },
  { at: 12, agent: "Atlas", text: "Navigation mounted" },
  { at: 25, agent: "Lyra", text: "Headline composed" },
  { at: 39, agent: "Lyra", text: "Company narrative connected" },
  { at: 53, agent: "Nova", text: "Actions and links wired" },
  { at: 68, agent: "Nova", text: "Product workspace assembled" },
  { at: 82, agent: "Sentry", text: "Responsive checks passed" },
  { at: 94, agent: "Sentry", text: "Accessibility verified" },
] as const;

const findAgent = (name: string) => agents.find((agent) => agent.name === name)!;

export default function AgenticBuildExperience({ onComplete, onProgress, autoStart = true }: AgenticBuildExperienceProps) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(autoStart);
  const completedRef = useRef(false);

  useEffect(() => { onProgress?.(progress); }, [onProgress, progress]);

  useEffect(() => {
    if (!running || progress >= 100) return;
    const timer = window.setInterval(
      () => setProgress((value) => Math.min(100, value + (reduceMotion ? 5 : 1))),
      reduceMotion ? 25 : 92,
    );
    return () => window.clearInterval(timer);
  }, [progress, reduceMotion, running]);

  useEffect(() => {
    if (progress !== 100 || completedRef.current) return;
    const timer = window.setTimeout(() => {
      completedRef.current = true;
      onComplete?.();
    }, reduceMotion ? 120 : 900);
    return () => window.clearTimeout(timer);
  }, [onComplete, progress, reduceMotion]);

  const restart = useCallback(() => {
    completedRef.current = false;
    setProgress(0);
    setRunning(true);
  }, []);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setRunning(false);
    onProgress?.(100);
    onComplete?.();
  }, [onComplete, onProgress]);

  const activeEvents = events.filter((event) => progress >= event.at).slice(-3).reverse();

  return (
    <div className="abe-live-layer" aria-label="Aperture homepage being built by four agents">
      <style>{styles}</style>
      <div className="abe-live-status">
        <span className={`abe-live-dot ${running ? "" : "paused"}`} />
        <div><b>Agents building this page</b><span>{String(progress).padStart(2, "0")}% complete</span></div>
      </div>

      <div className="abe-live-controls">
        <button type="button" onClick={() => setRunning((value) => !value)} aria-label={running ? "Pause homepage build" : "Resume homepage build"}>
          {running ? <Pause size={13} /> : <Play size={13} />}<span>{running ? "Pause" : "Resume"}</span>
        </button>
        <button type="button" onClick={restart} aria-label="Restart homepage build"><RotateCcw size={13} /><span>Restart</span></button>
        <button type="button" onClick={finish} aria-label="Finish homepage build"><X size={14} /><span>Finish</span></button>
      </div>

      <aside className="abe-live-feed" aria-live="polite">
        <header><span>Live activity</span><b>{String(progress).padStart(2, "0")}%</b></header>
        <div className="abe-live-progress"><i style={{ width: `${progress}%` }} /></div>
        {activeEvents.map((event) => {
          const agent = findAgent(event.agent);
          return (
            <div className="abe-live-event" key={event.at}>
              <span style={{ background: agent.color }}>{agent.name[0]}</span>
              <p><b>{agent.name}</b>{event.text}</p><Check size={11} />
            </div>
          );
        })}
      </aside>

      {!reduceMotion && progress < 100 && agents.map((agent, index) => (
        <motion.div
          className="abe-page-cursor"
          key={agent.name}
          style={{ color: agent.color }}
          initial={{ left: `${agent.x[0]}%`, top: `${agent.y[0]}%`, opacity: 0 }}
          animate={{ left: agent.x.map((value) => `${value}%`), top: agent.y.map((value) => `${value}%`), opacity: [0, 1, 1, 1] }}
          transition={{ duration: 5.4 + index * 0.55, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 24"><path d="M2 1.8 17.1 13l-7.2 1.3-4.2 6.1L2 1.8Z" fill="currentColor" stroke="#fff" strokeWidth="1.2" /></svg>
          <span style={{ background: agent.color }}>{agent.name}</span>
        </motion.div>
      ))}

      <div className="abe-build-rail" aria-hidden="true"><motion.i animate={{ width: `${progress}%` }} /></div>
    </div>
  );
}

const styles = `
  .abe-live-layer{position:fixed;inset:0;z-index:1000;pointer-events:none;font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#171717}
  .abe-live-status{position:fixed;top:104px;left:22px;display:flex;align-items:center;gap:10px;padding:10px 13px 10px 11px;background:#111;color:#fff;border:1px solid #ffffff20;border-radius:5px;box-shadow:0 12px 35px #0002;backdrop-filter:blur(14px)}
  .abe-live-status>div{display:flex;flex-direction:column;gap:2px}.abe-live-status b{font-size:9px;letter-spacing:.08em;text-transform:uppercase}.abe-live-status span:not(.abe-live-dot){font-size:8px;color:#999}
  .abe-live-dot{width:7px;height:7px;border-radius:50%;background:#b7ff4a;box-shadow:0 0 12px #b7ff4a;animation:abe-live-pulse 1.3s infinite}.abe-live-dot.paused{background:#888;box-shadow:none;animation:none}
  .abe-live-controls{position:fixed;top:104px;right:22px;display:flex;gap:6px;pointer-events:auto}.abe-live-controls button{height:34px;padding:0 11px;border:1px solid #d8d8d8;border-radius:4px;background:#ffffffeb;color:#333;display:flex;align-items:center;gap:6px;font:9px/1 Inter,sans-serif;box-shadow:0 8px 25px #0000000d;cursor:pointer;backdrop-filter:blur(12px)}.abe-live-controls button:hover{border-color:#999;color:#000}
  .abe-live-feed{position:fixed;right:22px;top:50%;transform:translateY(-35%);width:205px;padding:15px;background:#111111ed;color:#eee;border:1px solid #ffffff1c;border-radius:6px;box-shadow:0 24px 70px #0003;backdrop-filter:blur(18px)}
  .abe-live-feed header{display:flex;justify-content:space-between;align-items:center;text-transform:uppercase;letter-spacing:.14em;font-size:7px;color:#888}.abe-live-feed header b{font-size:12px;color:#fff;letter-spacing:0}.abe-live-progress{height:1px;background:#ffffff20;margin:10px 0 16px;overflow:hidden}.abe-live-progress i{height:100%;display:block;background:#b7ff4a;transition:width .12s linear}
  .abe-live-event{display:grid;grid-template-columns:22px 1fr 11px;gap:8px;align-items:start;padding:8px 0;border-top:1px solid #ffffff0c}.abe-live-event>span{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;color:#111;font-size:8px;font-weight:800}.abe-live-event p{margin:0;font-size:8px;line-height:1.4;color:#999}.abe-live-event p b{display:block;color:#fff;font-size:8px;margin-bottom:2px}.abe-live-event svg{color:#b7ff4a;margin-top:4px}
  .abe-page-cursor{position:fixed;z-index:1002;display:flex;align-items:flex-start;filter:drop-shadow(0 2px 3px #0003)}.abe-page-cursor svg{width:19px;height:23px}.abe-page-cursor span{margin:13px 0 0 -2px;padding:3px 6px;border-radius:2px;color:#111;font-size:7px;font-weight:750;letter-spacing:.02em}
  .abe-build-rail{position:fixed;left:0;right:0;bottom:0;height:3px;background:#1111}.abe-build-rail i{display:block;height:100%;background:#181818;box-shadow:0 0 12px #0003}
  @keyframes abe-live-pulse{50%{opacity:.35;box-shadow:0 0 4px #b7ff4a}}
  @media(max-width:850px){.abe-live-feed{display:none}.abe-live-status{top:86px;left:12px}.abe-live-controls{top:86px;right:12px}.abe-live-controls button span{display:none}.abe-live-controls button{width:34px;padding:0;justify-content:center}}
  @media(max-width:520px){.abe-live-status{top:76px}.abe-live-status b{font-size:8px}.abe-page-cursor span{font-size:6px}.abe-live-controls{top:76px}}
  @media(prefers-reduced-motion:reduce){.abe-page-cursor{display:none}.abe-live-layer *{animation:none!important;transition:none!important}}
`;
