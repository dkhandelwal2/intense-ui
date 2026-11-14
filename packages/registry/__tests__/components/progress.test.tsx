import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  Progress,
  ProgressCircular,
  ProgressSemicircle,
  ProgressBuffer,
  ProgressShimmer,
  ProgressCapsule,
} from "../../src/components/progress";

describe("Progress Components", () => {
  it("renders linear Progress with correct role, attributes and value", () => {
    render(<Progress value={45} max={100} showValue />);

    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "45");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText("45%")).toBeInTheDocument();
  });

  it("renders linear Progress in indeterminate mode", () => {
    render(<Progress indeterminate />);

    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("renders ProgressCircular with 360° ring and center readout", () => {
    render(<ProgressCircular value={78} label="Storage" unit="%" />);

    const circular = screen.getByRole("progressbar", { name: /storage/i });
    expect(circular).toBeInTheDocument();
    expect(circular).toHaveAttribute("aria-valuenow", "78");
    expect(screen.getByText("78")).toBeInTheDocument();
    expect(screen.getByText("Storage")).toBeInTheDocument();
  });

  it("renders ProgressSemicircle with 180° gauge and baseline bounds", () => {
    render(<ProgressSemicircle value={64} label="Throttle" max={100} />);

    const gauge = screen.getByRole("progressbar", { name: /throttle/i });
    expect(gauge).toBeInTheDocument();
    expect(gauge).toHaveAttribute("aria-valuenow", "64");
    expect(screen.getByText("64")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders ProgressBuffer with loaded secondary buffer layer and status text", () => {
    render(
      <ProgressBuffer
        value={35}
        loaded={85}
        isLoading={true}
        statusText="Streaming Audio..."
      />
    );

    const buffer = screen.getByRole("progressbar");
    expect(buffer).toBeInTheDocument();
    expect(buffer).toHaveAttribute("aria-valuenow", "35");
    expect(screen.getByText("Streaming Audio...")).toBeInTheDocument();
    expect(screen.getByText("35%")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("renders ProgressShimmer with animated shimmer track", () => {
    render(<ProgressShimmer value={50} />);

    const shimmer = screen.getByRole("progressbar");
    expect(shimmer).toBeInTheDocument();
    expect(shimmer).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByText("Shimmer Progress")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders ProgressCapsule with percentage text displayed inside the capsule track", () => {
    render(<ProgressCapsule value={72} label="Upload Progress" />);

    const capsule = screen.getByRole("progressbar", { name: /upload progress/i });
    expect(capsule).toBeInTheDocument();
    expect(capsule).toHaveAttribute("aria-valuenow", "72");
    expect(screen.getAllByText("72%").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Upload Progress").length).toBeGreaterThanOrEqual(1);
  });
});
