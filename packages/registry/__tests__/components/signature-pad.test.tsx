import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SignaturePad, SignaturePadButton } from "../../src/components/signature-pad";
import { DEFAULT_STROKE_COLOR, SIGNATURE_INK_COLORS } from "../../src/components/signature-pad/constants";
import { resolveInkColor } from "../../src/components/signature-pad/signature-pad-helpers";

describe("SignaturePad Component", () => {
  it("renders collapsed capsule button by default", () => {
    render(<SignaturePad buttonLabel="Start Signing" />);
    expect(screen.getByRole("button", { name: /start signing/i })).toBeInTheDocument();
  });

  it("morphs to expanded card when collapsed button is clicked", () => {
    const handleExpandChange = vi.fn();
    render(<SignaturePad onExpandChange={handleExpandChange} title="Sign Document" />);
    const button = screen.getByRole("button", { name: /start signing/i });
    fireEvent.click(button);

    expect(handleExpandChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("Sign Document")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /finish signing/i })).toBeInTheDocument();
  });

  it("renders directly in expanded mode when initialExpanded is true", () => {
    render(<SignaturePad initialExpanded={true} title="Verify Sign" />);
    expect(screen.getByText("Verify Sign")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /finish signing/i })).toBeInTheDocument();
  });

  it("triggers onClose and closes expanded card when close badge is clicked", () => {
    const handleClose = vi.fn();
    render(<SignaturePad initialExpanded={true} onClose={handleClose} />);
    const closeBtn = screen.getByRole("button", { name: /close signature pad/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it("triggers onSign when finish signing is clicked", () => {
    const handleSign = vi.fn();
    render(<SignaturePad initialExpanded={true} onSign={handleSign} />);
    const finishBtn = screen.getByRole("button", { name: /finish signing/i });
    fireEvent.click(finishBtn);
    expect(handleSign).toHaveBeenCalledWith(
      expect.objectContaining({
        dataUrl: expect.any(String),
        svg: expect.any(String),
        strokes: expect.any(Array),
      })
    );
  });

  it("renders edit pencil icon when signed and opens signature pad again", () => {
    const handleEdit = vi.fn();
    render(
      <SignaturePadButton
        isSigned={true}
        signedLabel="Signed"
        onClick={vi.fn()}
        onEdit={handleEdit}
      />
    );
    expect(screen.getByText("Signed")).toBeInTheDocument();
    const editIcon = screen.getByTitle("Edit signature");
    expect(editIcon).toBeInTheDocument();
    fireEvent.click(editIcon);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it("defaults ink pigment to theme primary", () => {
    expect(DEFAULT_STROKE_COLOR).toBe("var(--theme-primary)");
    expect(SIGNATURE_INK_COLORS[0]).toBe("var(--theme-primary)");
    render(<SignaturePad initialExpanded={true} />);
    expect(screen.queryByRole("button", { name: /toggle ink color palette/i })).not.toBeInTheDocument();
  });

  it("resolves CSS variable colors for canvas drawing", () => {
    document.documentElement.style.setProperty("--theme-primary", "#ff0084");
    expect(resolveInkColor("var(--theme-primary)", document.documentElement)).toBe("#ff0084");
    expect(resolveInkColor("#2563eb")).toBe("#2563eb");
  });

  it("disables interaction when disabled prop is true", () => {
    const handleExpandChange = vi.fn();
    render(<SignaturePad disabled onExpandChange={handleExpandChange} />);
    const button = screen.getByRole("button", { name: /start signing/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleExpandChange).not.toHaveBeenCalled();
  });
});
