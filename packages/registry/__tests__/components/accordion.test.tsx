import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../src/components/accordion";

describe("Accordion Component", () => {
  it("renders closed by default with content hidden", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByRole("button", { name: /section 1/i })).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("expands content on trigger click", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole("button", { name: /section 1/i });
    fireEvent.click(trigger);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("collapses content when clicked again in collapsible mode", async () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    const trigger = screen.getByRole("button", { name: /section 1/i });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });
});
