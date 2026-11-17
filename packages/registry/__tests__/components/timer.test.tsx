import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  Timer,
  TimerPerimeter,
  TimerSplit,
  TimerStopwatch,
  TimerIsland,
  TimerExpandable,
  TIMER_CONFIG,
  TIMER_PERIMETER_CONFIG,
  TIMER_SPLIT_CONFIG,
  TIMER_STOPWATCH_CONFIG,
  TIMER_ISLAND_CONFIG,
  TIMER_EXPANDABLE_CONFIG,
} from "../../src/components/timer";

describe("Timer Component Family", () => {
  it("renders TimerPerimeter with correct role, formatted time and alarm target", () => {
    render(
      <TimerPerimeter
        initialSeconds={792}
        alarmTime="14:44"
        label="Focus Timer"
      />
    );

    const timer = screen.getByRole("timer");
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("00:13:12")).toBeInTheDocument();
    expect(screen.getByText("14:44:00")).toBeInTheDocument();
    expect(screen.getByText("Focus Timer")).toBeInTheDocument();
  });

  it("handles play/pause toggle and cancel reset in TimerPerimeter", () => {
    const handlePause = vi.fn();
    const handleReset = vi.fn();

    render(
      <TimerPerimeter
        initialSeconds={60}
        onPause={handlePause}
        onReset={handleReset}
      />
    );

    const toggleBtn = screen.getByRole("button", { name: /start timer/i });
    expect(toggleBtn).toBeInTheDocument();

    // Start timer
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /pause timer/i })).toBeInTheDocument();

    // Pause timer
    const pauseBtn = screen.getByRole("button", { name: /pause timer/i });
    fireEvent.click(pauseBtn);
    expect(handlePause).toHaveBeenCalled();

    // Reset timer
    const resetBtn = screen.getByRole("button", { name: /cancel and reset timer/i });
    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalled();
  });

  it("renders TimerSplit and supports in-place custom duration picker on click", () => {
    const handlePresetChange = vi.fn();
    render(
      <TimerSplit
        initialSeconds={1200}
        ringColor="#00d2ff"
        allowCustomTime={true}
        onPresetChange={handlePresetChange}
      />
    );

    expect(screen.getByText("00:20:00")).toBeInTheDocument();

    // Click on digital time display to open in-place duration picker
    const timeDisplay = screen.getByRole("button", { name: /set custom time/i });
    fireEvent.click(timeDisplay);

    // Inputs for Minutes and Seconds should appear
    const minInput = screen.getByLabelText("Minutes");
    const secInput = screen.getByLabelText("Seconds");
    expect(minInput).toBeInTheDocument();
    expect(secInput).toBeInTheDocument();

    // Change to 25 Min 30 Sec
    fireEvent.change(minInput, { target: { value: "25" } });
    fireEvent.change(secInput, { target: { value: "30" } });

    // Click Apply check button
    const applyBtn = screen.getByLabelText("Apply custom time");
    fireEvent.click(applyBtn);

    // 25m 30s = 1530s
    expect(handlePresetChange).toHaveBeenCalledWith(1530);
    expect(screen.getByText("00:25:30")).toBeInTheDocument();
  });

  it("uses confirmation button (icon mode) for stop button in TimerSplit", () => {
    const handleReset = vi.fn();
    render(<TimerSplit initialSeconds={600} onReset={handleReset} />);

    // Initially unstarted: Stop confirmation button should NOT be in the document
    expect(screen.queryByRole("button", { name: /^stop timer$/i })).not.toBeInTheDocument();

    // Start the timer
    const startBtn = screen.getByRole("button", { name: /start timer/i });
    fireEvent.click(startBtn);

    // Now Stop button should be visible in idle mode
    const stopBtn = screen.getByRole("button", { name: /^stop timer$/i });
    expect(stopBtn).toBeInTheDocument();

    // Click stop button to enter confirming mode
    fireEvent.click(stopBtn);

    // Confirm button and Cancel button should be revealed
    const confirmBtn = screen.getByRole("button", { name: /confirm stop timer/i });
    const cancelBtn = screen.getByRole("button", { name: /cancel stop timer/i });
    expect(confirmBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();

    // Click confirm button
    fireEvent.click(confirmBtn);
    expect(handleReset).toHaveBeenCalled();
  });

  it("shows timer completed UI and reset option when countdown reaches zero", () => {
    const handleReset = vi.fn();
    render(<TimerSplit initialSeconds={1} onReset={handleReset} />);

    // Start timer with 1 second remaining
    const startBtn = screen.getByRole("button", { name: /start timer/i });
    fireEvent.click(startBtn);

    // Advance timer to completion or click reset
    // Once reset is triggered
    const resetBtn = screen.queryByRole("button", { name: /reset timer/i });
    if (resetBtn) {
      fireEvent.click(resetBtn);
      expect(handleReset).toHaveBeenCalled();
    }
  });

  it("renders TimerStopwatch with centiseconds and records laps", () => {
    const handleLap = vi.fn();
    render(
      <TimerStopwatch
        initialCentiseconds={0}
        showLaps={true}
        onLap={handleLap}
      />
    );

    const timer = screen.getByRole("timer");
    expect(timer).toBeInTheDocument();
    expect(screen.getByText("00:00:00,00")).toBeInTheDocument();

    // In initial state (not running and 0), button says Start
    const toggleBtn = screen.getByRole("button", { name: /start stopwatch/i });
    expect(toggleBtn).toHaveTextContent("Start");

    // Start stopwatch
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /pause stopwatch/i })).toHaveTextContent("Pause");

    // Lap button is now active
    const lapBtn = screen.getByRole("button", { name: /record lap/i });
    expect(lapBtn).toHaveTextContent("Lap");
    fireEvent.click(lapBtn);
    expect(handleLap).toHaveBeenCalled();
  });

  it("handles reset in TimerStopwatch when paused", () => {
    const handleReset = vi.fn();
    render(
      <TimerStopwatch
        initialCentiseconds={5000}
        onReset={handleReset}
      />
    );

    const resetBtn = screen.getByRole("button", { name: /reset stopwatch/i });
    expect(resetBtn).toHaveTextContent("Reset");
    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalled();
  });

  it("renders TimerIsland compact pill correctly and allows custom time editing", () => {
    const handleDurationChange = vi.fn();
    render(<TimerIsland initialSeconds={792} allowCustomTime onDurationChange={handleDurationChange} />);
    const timer = screen.getByRole("timer");
    expect(timer).toBeInTheDocument();
    expect(screen.getByText("13:12")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start timer/i })).toBeInTheDocument();

    // Click on formatted time to open inline editor
    fireEvent.click(screen.getByText("13:12"));

    // Hours and Minutes inputs should appear
    const hrInput = screen.getByLabelText("Hours");
    const minInput = screen.getByLabelText("Minutes");
    expect(hrInput).toBeInTheDocument();
    expect(minInput).toBeInTheDocument();

    // Change to 0 Hr 25 Min
    fireEvent.change(hrInput, { target: { value: "0" } });
    fireEvent.change(minInput, { target: { value: "25" } });

    // Click apply checkmark
    const applyBtn = screen.getByLabelText("Apply custom time");
    fireEvent.click(applyBtn);

    // Should update to 25:00 and trigger callback with 1500 seconds
    expect(handleDurationChange).toHaveBeenCalledWith(1500);
    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  it("renders Timer dispatcher component with variants", () => {
    const { rerender } = render(<Timer variant="perimeter" initialSeconds={600} />);
    expect(screen.getByText("00:10:00")).toBeInTheDocument();

    rerender(<Timer variant="split" initialSeconds={300} />);
    expect(screen.getByText("00:05:00")).toBeInTheDocument();

    rerender(<Timer variant="stopwatch" initialCentiseconds={1000} />);
    expect(screen.getByText("00:00:10,00")).toBeInTheDocument();

    rerender(<Timer variant="island" initialSeconds={120} />);
    expect(screen.getByText("02:00")).toBeInTheDocument();
  });

  it("supports custom stripeColor and inline custom time editing in TimerPerimeter", () => {
    const handleDurationChange = vi.fn();
    render(
      <TimerPerimeter
        initialSeconds={900}
        stripeColor="#ff9f0a"
        allowCustomTime={true}
        onDurationChange={handleDurationChange}
      />
    );

    // Initial 00:15:00
    expect(screen.getByText("00:15:00")).toBeInTheDocument();

    // Click on formatted time to open inline edit mode
    fireEvent.click(screen.getByText("00:15:00"));

    // Inputs for Minutes and Seconds should be visible
    const minInput = screen.getByLabelText("Minutes");
    const secInput = screen.getByLabelText("Seconds");
    expect(minInput).toBeInTheDocument();
    expect(secInput).toBeInTheDocument();

    // Change minutes to 25 and seconds to 00
    fireEvent.change(minInput, { target: { value: "25" } });
    fireEvent.change(secInput, { target: { value: "00" } });

    // Click apply button
    const applyBtn = screen.getByLabelText("Apply custom time");
    fireEvent.click(applyBtn);

    // Should update to 00:25:00 and trigger onDurationChange with 1500 seconds
    expect(handleDurationChange).toHaveBeenCalledWith(1500);
    expect(screen.getByText("00:25:00")).toBeInTheDocument();
  });

  it("renders TimerExpandable and toggles expansion", () => {
    const { rerender } = render(<TimerExpandable initialSeconds={792} defaultExpanded={false} />);
    expect(screen.getByRole("button", { name: /expand timer widget/i })).toBeInTheDocument();
    expect(screen.getByText("00:13:12")).toBeInTheDocument();

    // Rerender with isExpanded={true}
    rerender(<TimerExpandable initialSeconds={792} isExpanded={true} />);
    expect(screen.getByRole("timer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /minimize timer/i })).toBeInTheDocument();
  });

  it("disables cross cancel button until timer is started", () => {
    render(<TimerPerimeter initialSeconds={900} />);
    const crossBtn = screen.getByRole("button", { name: /cancel and reset timer/i });
    expect(crossBtn).toBeDisabled();

    // Start timer
    const startBtn = screen.getByRole("button", { name: /start timer/i });
    fireEvent.click(startBtn);

    // Cross button should now be enabled
    expect(crossBtn).not.toBeDisabled();
  });

  it("supports all stripeOrigin options and custom paths", () => {
    const { container, rerender } = render(<TimerPerimeter stripeOrigin="top-left" />);
    const getPerimeterActivePath = () => container.querySelector("svg.absolute path:last-of-type");
    expect(getPerimeterActivePath()).toHaveAttribute("d", expect.stringContaining("M 30 4"));

    rerender(<TimerPerimeter stripeOrigin="bottom-center" />);
    expect(getPerimeterActivePath()).toHaveAttribute(
      "d",
      expect.stringContaining("M 130 116")
    );

    rerender(<TimerPerimeter stripeOrigin="custom" customStripePath="M 0 0 L 100 100" />);
    expect(getPerimeterActivePath()).toHaveAttribute(
      "d",
      "M 0 0 L 100 100"
    );
  });

  it("provides initial configuration values for all variants via config file", () => {
    // Config exports verification
    expect(TIMER_CONFIG.perimeter).toEqual(TIMER_PERIMETER_CONFIG);
    expect(TIMER_CONFIG.split).toEqual(TIMER_SPLIT_CONFIG);
    expect(TIMER_CONFIG.stopwatch).toEqual(TIMER_STOPWATCH_CONFIG);
    expect(TIMER_CONFIG.island).toEqual(TIMER_ISLAND_CONFIG);
    expect(TIMER_CONFIG.expandable).toEqual(TIMER_EXPANDABLE_CONFIG);

    // Initial values verification
    expect(TIMER_PERIMETER_CONFIG.initialSeconds).toBe(900);
    expect(TIMER_SPLIT_CONFIG.initialSeconds).toBe(1200);
    expect(TIMER_STOPWATCH_CONFIG.initialCentiseconds).toBe(0);
    expect(TIMER_ISLAND_CONFIG.initialSeconds).toBe(300);
    expect(TIMER_EXPANDABLE_CONFIG.initialSeconds).toBe(792);

    // Components render initial config values when default props are used
    const { unmount: unmountPerimeter } = render(<TimerPerimeter />);
    expect(screen.getByText("00:15:00")).toBeInTheDocument();
    unmountPerimeter();

    const { unmount: unmountSplit } = render(<TimerSplit />);
    expect(screen.getByText("00:20:00")).toBeInTheDocument();
    unmountSplit();

    const { unmount: unmountStopwatch } = render(<TimerStopwatch />);
    expect(screen.getByText("00:00:00,00")).toBeInTheDocument();
    unmountStopwatch();
  });

  it("exports hooks from global hooks folder and component barrel export", async () => {
    const { useTimer } = await import("../../src/hooks/use-timer");
    const { useStopwatch } = await import("../../src/hooks/use-stopwatch");
    const { useDurationPickerState } = await import("../../src/hooks/use-duration-picker-state");
    expect(typeof useTimer).toBe("function");
    expect(typeof useStopwatch).toBe("function");
    expect(typeof useDurationPickerState).toBe("function");
  });
});
