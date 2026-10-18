"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";

const zones = [
  {
    name: "Training floor",
    short: "LIFT / TRAIN",
    image: "space",
    detail:
      "An open training floor for coached strength, independent practice, and room to move at your own pace.",
    note: "RACKS · PLATFORMS · OPEN FLOOR",
    rect: [28, 32, 316, 176],
    point: [314, 184],
  },
  {
    name: "Coaching corner",
    short: "MEET / PLAN",
    image: "coaching",
    detail:
      "A quieter corner for your first conversation, questions between sets, and a moment with your training log.",
    note: "CHECK-IN · COACHING · TRAINING LOG",
    rect: [364, 32, 188, 110],
    point: [527, 121],
  },
  {
    name: "Equipment wall",
    short: "LOAD / PROGRESS",
    image: "equipment",
    detail:
      "The tools for the work: free weights, kettlebells, and plates arranged beside the training floor.",
    note: "DUMBBELLS · KETTLEBELLS · PLATES",
    rect: [364, 162, 188, 126],
    point: [527, 266],
  },
  {
    name: "Changing & reset",
    short: "ARRIVE / RESET",
    image: "changing",
    detail:
      "A place to leave your bag, change, and reset before heading back into the rest of your day.",
    note: "LOCKERS · CHANGING · BREATHING ROOM",
    rect: [28, 228, 316, 60],
    point: [314, 254],
  },
] as const;

export function ClubFloorPlan() {
  const [selected, setSelected] = useState(0);
  const board = useRef<HTMLDivElement>(null);
  const pending = useRef(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const gridId = useId();
  const panelId = useId();
  const zone = zones[selected];
  const reset = () => {
    cancelAnimationFrame(pending.current);
    pending.current = 0;
    board.current?.style.removeProperty("--plan-rx");
    board.current?.style.removeProperty("--plan-ry");
  };
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("form:motion", reset);
    reduced.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("form:motion", reset);
      reduced.removeEventListener("change", reset);
    };
  }, []);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motionPreference === "reduce"
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(pending.current);
    pending.current = requestAnimationFrame(() => {
      pending.current = 0;
      board.current?.style.setProperty("--plan-rx", `${-y * 4}deg`);
      board.current?.style.setProperty("--plan-ry", `${x * 4}deg`);
    });
  };
  return (
    <section className="club-plan" aria-labelledby={`${panelId}-title`}>
      <div className="club-plan-heading">
        <span className="mono">THE CLUB / ANATOMY OF A PRACTICE</span>
        <h3 id={`${panelId}-title`}>Find your bearings.</h3>
        <p>
          Four spaces. One familiar place. Hover or select a zone to look
          around.
        </p>
      </div>
      <div
        className="club-plan-board"
        ref={board}
        onPointerMove={move}
        onPointerLeave={reset}
      >
        <div className="club-plan-meta mono">
          <span>PLAN 01 / CONCEPT STUDY</span>
          <span>N ↑</span>
        </div>
        <div className="club-plan-drawing">
          <svg viewBox="0 0 580 332" aria-hidden="true" focusable="false">
            <defs>
              <pattern
                id={gridId}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0H0V20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth=".4"
                  opacity=".2"
                />
              </pattern>
            </defs>
            <rect
              x="12"
              y="12"
              width="556"
              height="290"
              fill={`url(#${gridId})`}
            />
            <path
              data-plan-outline=""
              className="club-plan-outline"
              pathLength="1"
              d="M568 250V12H12V302H568V278"
            />
            {zones.map((item, i) => (
              <rect
                key={item.name}
                className={`club-plan-room ${selected === i ? "is-selected" : ""}`}
                x={item.rect[0]}
                y={item.rect[1]}
                width={item.rect[2]}
                height={item.rect[3]}
              />
            ))}
            <g className="club-plan-fixtures">
              {[48, 116, 184, 252].map((x) => (
                <g key={x}>
                  <rect x={x} y="48" width="44" height="30" />
                  <path d={`M${x + 5} 42v42m${x + 34} -42v42m-37 -21h40`} />
                </g>
              ))}
              <path d="M48 185H320M48 179v12m272-12v12M390 54h134v19H390zM390 184h134v16H390zM390 206h134v16H390z" />
              {[44, 80, 116, 152, 188, 224, 260, 296].map((x) => (
                <rect key={x} x={x} y="267" width="24" height="13" />
              ))}
              <path d="M568 278h-28v-28M568 250a28 28 0 0 0-28 28" />
            </g>
            <path
              key={selected}
              className="club-plan-route"
              pathLength="1"
              d={`M575 264H354V${zone.point[1]}H${zone.point[0]}`}
            />
            <circle
              className="club-plan-destination"
              cx={zone.point[0]}
              cy={zone.point[1]}
              r="5"
            />
            <text x="442" y="323" className="club-plan-entry">
              COURTYARD / ENTRY ↖
            </text>
          </svg>
          <div
            className="club-plan-zones"
            role="group"
            aria-label="Explore the gym floor plan"
          >
            {zones.map((item, i) => (
              <button
                key={item.name}
                type="button"
                ref={(node) => {
                  buttons.current[i] = node;
                }}
                className="club-plan-zone"
                style={{
                  left: `${(item.rect[0] / 580) * 100}%`,
                  top: `${(item.rect[1] / 332) * 100}%`,
                  width: `${(item.rect[2] / 580) * 100}%`,
                  height: `${(item.rect[3] / 332) * 100}%`,
                }}
                aria-label={`Explore zone 0${i + 1}: ${item.name}`}
                aria-pressed={selected === i}
                aria-controls={panelId}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setSelected(i);
                }}
                onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => {
                  if (
                    ![
                      "ArrowRight",
                      "ArrowLeft",
                      "ArrowDown",
                      "ArrowUp",
                      "Home",
                      "End",
                    ].includes(event.key)
                  )
                    return;
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? zones.length - 1
                        : (i +
                            (["ArrowRight", "ArrowDown"].includes(event.key)
                              ? 1
                              : -1) +
                            zones.length) %
                          zones.length;
                  buttons.current[next]?.focus();
                }}
              >
                <span className="club-plan-zone-num mono">0{i + 1}</span>
                <span>{item.short}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="club-plan-meta mono">
          <span>SELECT A ZONE ↗</span>
          <span>SCHEMATIC / NOT TO SCALE</span>
        </div>
      </div>
      <div
        id={panelId}
        className="club-plan-inspector"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="club-plan-photo">
          {zones.map((item, i) => (
            <Image
              key={item.image}
              src={`/images/${item.image}.webp`}
              alt={
                i === selected
                  ? `Generated concept of the ${item.name.toLowerCase()}.`
                  : ""
              }
              aria-hidden={i !== selected}
              fill
              sizes="(max-width:760px) 90vw, 45vw"
              className={i === selected ? "is-selected" : ""}
            />
          ))}
          <span className="mono">
            ZONE 0{selected + 1} / {zone.name.toUpperCase()}
          </span>
        </div>
        <div className="club-plan-copy">
          <span className="mono">{zone.note}</span>
          <h4>{zone.name}</h4>
          <p>{zone.detail}</p>
        </div>
      </div>
      <p className="club-plan-disclaimer mono">
        ILLUSTRATIVE LAYOUT & GENERATED IMAGERY / NOT AN ARCHITECTURAL OR ACCESS
        PLAN
      </p>
    </section>
  );
}
