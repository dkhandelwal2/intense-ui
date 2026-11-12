import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Slider, RangeSlider, MultiSlider } from "../../src/components/slider";

describe("Slider Components", () => {
  it("renders single slider with correct value and responds to change", () => {
    const handleChange = vi.fn();
    render(<Slider value={40} min={0} max={100} onChange={handleChange} />);

    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue("40");

    fireEvent.change(slider, { target: { value: "65" } });
    expect(handleChange).toHaveBeenCalledWith(65);
  });

  it("renders numeric input when showInput is true and updates value", () => {
    const handleChange = vi.fn();
    render(<Slider value={50} showInput onChange={handleChange} />);

    const numInput = screen.getByRole("spinbutton");
    expect(numInput).toBeInTheDocument();
    expect(numInput).toHaveValue(50);

    fireEvent.change(numInput, { target: { value: "80" } });
    expect(handleChange).toHaveBeenCalledWith(80);
  });

  it("handles leftIcon and rightIcon min/max clicks", () => {
    const handleChange = vi.fn();
    render(
      <Slider
        value={50}
        min={10}
        max={90}
        leftIcon={<span data-testid="left-icon">MIN</span>}
        rightIcon={<span data-testid="right-icon">MAX</span>}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByTestId("left-icon"));
    expect(handleChange).toHaveBeenCalledWith(10);

    fireEvent.click(screen.getByTestId("right-icon"));
    expect(handleChange).toHaveBeenCalledWith(90);
  });

  it("renders RangeSlider with dual thumb sliders", () => {
    const handleChange = vi.fn();
    render(<RangeSlider value={[20, 80]} onChange={handleChange} />);

    const sliders = screen.getAllByRole("slider");
    expect(sliders.length).toBe(2);
    expect(sliders[0]).toHaveValue("20");
    expect(sliders[1]).toHaveValue("80");
  });

  it("disables the slider when disabled prop is set", () => {
    render(<Slider value={30} disabled onChange={vi.fn()} />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeDisabled();
  });
});
