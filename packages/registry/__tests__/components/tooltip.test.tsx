import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Tooltip } from "../../src/components/tooltip";

describe("Tooltip Component", () => {
  it("shows tooltip content on mouse enter and hides on mouse leave", async () => {
    render(
      <Tooltip content="Tooltip Helper Text">
        <button>Hover Me</button>
      </Tooltip>
    );

    expect(screen.queryByText("Tooltip Helper Text")).not.toBeInTheDocument();

    const trigger = screen.getByText("Hover Me").parentElement!;
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText("Tooltip Helper Text")).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
      expect(screen.queryByText("Tooltip Helper Text")).not.toBeInTheDocument();
    });
  });
});
