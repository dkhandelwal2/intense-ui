import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { StepCarousel, StepCarouselButton } from "../../src/components/step-carousel";

describe("StepCarousel Components", () => {
  it("renders step carousel with correct number of steps and aria-current", () => {
    render(<StepCarousel totalSteps={4} currentStep={1} />);

    const group = screen.getByRole("group", { name: /step carousel/i });
    expect(group).toBeInTheDocument();

    const activeStep = screen.getByLabelText(/jump to step 2 of 4/i);
    expect(activeStep).toHaveAttribute("aria-current", "step");

    const inactiveStep = screen.getByLabelText(/jump to step 1 of 4/i);
    expect(inactiveStep).not.toHaveAttribute("aria-current");
  });

  it("calls onStepChange when clicking an inactive step", () => {
    const handleStepChange = vi.fn();
    render(<StepCarousel totalSteps={3} defaultStep={0} onStepChange={handleStepChange} />);

    const step3 = screen.getByLabelText(/jump to step 3 of 3/i);
    fireEvent.click(step3);
    expect(handleStepChange).toHaveBeenCalledWith(2);
  });

  it("toggles play/pause when clicking autoplay button", () => {
    const handlePlayToggle = vi.fn();
    render(
      <StepCarousel
        totalSteps={3}
        showPlayButton
        defaultPlaying={false}
        onPlayToggle={handlePlayToggle}
      />
    );

    const playBtn = screen.getByRole("button", { name: /start autoplay/i });
    expect(playBtn).toBeInTheDocument();

    fireEvent.click(playBtn);
    expect(handlePlayToggle).toHaveBeenCalledWith(true);
  });

  it("renders custom carousel items when provided", () => {
    const items = [
      <div key="1">Slide 1 Content</div>,
      <div key="2">Slide 2 Content</div>,
    ];
    render(<StepCarousel items={items} currentStep={0} />);
    expect(screen.getByText("Slide 1 Content")).toBeInTheDocument();
  });

  it("StepCarouselButton toggles and updates aria-label correctly", () => {
    const handleToggle = vi.fn();
    const { rerender } = render(
      <StepCarouselButton isPlaying={false} onToggle={handleToggle} />
    );

    const btn = screen.getByRole("button", { name: /start autoplay/i });
    fireEvent.click(btn);
    expect(handleToggle).toHaveBeenCalledTimes(1);

    rerender(<StepCarouselButton isPlaying={true} onToggle={handleToggle} />);
    expect(screen.getByRole("button", { name: /pause autoplay/i })).toBeInTheDocument();
  });
});
