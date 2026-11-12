import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ColorGrid, ColorPalette } from "../../src/components/color-grid";

describe("ColorGrid & ColorPalette Component", () => {
  it("renders color swatches and responds to selection", () => {
    const handleChange = vi.fn();
    const testColors = ["#ff0000", "#00ff00", "#0000ff"];
    render(<ColorGrid colors={testColors} onChange={handleChange} />);

    const buttons = screen.getAllByRole("button");
    // testColors buttons
    expect(buttons.length).toBeGreaterThanOrEqual(3);
    fireEvent.click(buttons[0]);
    expect(handleChange).toHaveBeenCalledWith("#ff0000");
  });

  it("highlights selected color swatch", () => {
    const testColors = ["#ff0000", "#00ff00"];
    render(<ColorGrid colors={testColors} value="#00ff00" />);
    const activeBtn = screen.getByRole("button", { name: /select color #00ff00/i });
    expect(activeBtn.className).toContain("ring-2");
  });

  it("handles custom color picker input change", () => {
    const handleChange = vi.fn();
    render(<ColorGrid onChange={handleChange} showCustomPicker />);
    const colorInput = screen.getByLabelText(/pick custom color/i);
    expect(colorInput).toBeInTheDocument();
    fireEvent.change(colorInput, { target: { value: "#123456" } });
    expect(handleChange).toHaveBeenCalledWith("#123456");
  });

  it("displays reset button when value differs from default and onClear is passed", () => {
    const handleClear = vi.fn();
    render(
      <ColorGrid
        value="#ff0000"
        defaultValue="#000000"
        onClear={handleClear}
      />
    );
    const resetBtn = screen.getByRole("button", { name: /reset color/i });
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it("ColorPalette alias renders properly", () => {
    render(<ColorPalette colors={["#aabbcc"]} />);
    expect(screen.getByRole("button", { name: /select color #aabbcc/i })).toBeInTheDocument();
  });
});
