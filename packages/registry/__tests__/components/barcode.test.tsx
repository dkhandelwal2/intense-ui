import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Barcode } from "../../src/components/barcode";

describe("Barcode Component", () => {
  it("renders classic Code 128 linear barcode svg by default", () => {
    const { container } = render(<Barcode value="INTENSE-2026" format="code128" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(screen.getByText("INTENSE-2026")).toBeInTheDocument();
  });

  it("renders 2D QR Code matrix when format is qr", () => {
    const { container } = render(<Barcode value="https://intenseui.dev" format="qr" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("viewBox")).toBeDefined();
  });

  it("renders Boarding Pass variant with flight telemetry metadata", () => {
    render(
      <Barcode
        value="AC518-YYZ-LAX-04A"
        variant="boarding-pass"
        metadata={{
          from: "YYZ",
          to: "LAX",
          flight: "AC518",
          gate: "G12",
          seat: "04A",
          status: "ON TIME",
        }}
      />
    );
    expect(screen.getByText("YYZ")).toBeInTheDocument();
    expect(screen.getByText("LAX")).toBeInTheDocument();
    expect(screen.getByText("AC518")).toBeInTheDocument();
    expect(screen.getByText("G12")).toBeInTheDocument();
  });

  it("renders Shipping Label variant with cargo waybill tracking and status", () => {
    render(
      <Barcode
        value="1Z-999-999-99-9999"
        variant="shipping-label"
        metadata={{
          carrier: "GLOBAL AIR CARGO",
          subtitle: "FREIGHT WAYBILL // EXPEDITE",
          weight: "2.45 KG",
          status: "SORT CLEARED",
        }}
      />
    );
    expect(screen.getByText("GLOBAL AIR CARGO")).toBeInTheDocument();
    expect(screen.getByText("FREIGHT WAYBILL // EXPEDITE")).toBeInTheDocument();
    expect(screen.getByText("2.45 KG")).toBeInTheDocument();
    expect(screen.getByText("SORT CLEARED")).toBeInTheDocument();
  });

  it("renders Cyber Scan variant with sci-fi HUD and telemetry readouts", () => {
    render(
      <Barcode
        value="CYBER-NODE-0x8F"
        variant="cyber-scan"
        metadata={{
          title: "CYBER_ID // 0x8F9",
          frequency: "915.00 MHz",
          opticalLock: "TRUE",
          status: "SCANNING",
        }}
      />
    );
    expect(screen.getByText("CYBER_ID // 0x8F9")).toBeInTheDocument();
    expect(screen.getByText(/915.00 MHz/)).toBeInTheDocument();
    expect(screen.getByText(/TRUE/)).toBeInTheDocument();
  });
});
