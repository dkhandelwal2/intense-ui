import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIdleScreensaver } from "@/components/layout/bento/widgets/use-idle-screensaver";
import { DEFAULT_IDLE_TIMEOUT_MS } from "@/config/screensaver";

describe("useIdleScreensaver", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should have default idle timeout of 5 minutes (300,000 ms)", () => {
    expect(DEFAULT_IDLE_TIMEOUT_MS).toBe(5 * 60 * 1000);
  });

  it("should trigger onIdle callback after timeout when user is idle", () => {
    const onIdle = vi.fn();
    renderHook(() =>
      useIdleScreensaver({
        enabled: true,
        timeoutMs: 10000,
        onIdle,
        isScreensaverOpen: false,
      })
    );

    expect(onIdle).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(9999);
    });
    expect(onIdle).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onIdle).toHaveBeenCalledTimes(1);
  });

  it("should reset timer when user performs activity", () => {
    const onIdle = vi.fn();
    renderHook(() =>
      useIdleScreensaver({
        enabled: true,
        timeoutMs: 10000,
        onIdle,
        isScreensaverOpen: false,
      })
    );

    // Advance 6 seconds
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(onIdle).not.toHaveBeenCalled();

    // Trigger activity (e.g. mousemove)
    act(() => {
      window.dispatchEvent(new Event("mousemove"));
    });

    // Advance another 6 seconds (total 12 seconds from start, but 6 seconds since activity)
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(onIdle).not.toHaveBeenCalled();

    // Advance remaining 4 seconds
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(onIdle).toHaveBeenCalledTimes(1);
  });

  it("should not trigger onIdle if disabled", () => {
    const onIdle = vi.fn();
    renderHook(() =>
      useIdleScreensaver({
        enabled: false,
        timeoutMs: 5000,
        onIdle,
        isScreensaverOpen: false,
      })
    );

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(onIdle).not.toHaveBeenCalled();
  });

  it("should not trigger onIdle if screensaver is already open", () => {
    const onIdle = vi.fn();
    renderHook(() =>
      useIdleScreensaver({
        enabled: true,
        timeoutMs: 5000,
        onIdle,
        isScreensaverOpen: true,
      })
    );

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(onIdle).not.toHaveBeenCalled();
  });

  it("should clean up timers and listeners on unmount", () => {
    const onIdle = vi.fn();
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() =>
      useIdleScreensaver({
        enabled: true,
        timeoutMs: 5000,
        onIdle,
        isScreensaverOpen: false,
      })
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(onIdle).not.toHaveBeenCalled();

    removeEventListenerSpy.mockRestore();
  });
});
