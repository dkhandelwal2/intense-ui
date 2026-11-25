export interface SignaturePadExample {
  id: string;
  label: string;
  emoji: string;
  description: string;
  code: string;
}

export const SIGNATURE_PAD_EXAMPLES: SignaturePadExample[] = [
  {
    id: "default",
    label: "Morphing Capsule",
    emoji: "✍️",
    description: "Compact pill button that morphs into a full dashed signature pad on click.",
    code: `"use client";

import { SignaturePad, type SignatureResult } from "@/components/ui/signature-pad";

export default function SignaturePadDemo() {
  const handleSign = (result: SignatureResult) => {
    console.log("Captured signature:", result.dataUrl);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <SignaturePad onSign={handleSign} />
    </div>
  );
}`,
  },
  {
    id: "expanded",
    label: "Expanded Pad",
    emoji: "📝",
    description: "Interactive canvas initialized directly in expanded mode ready for immediate signing.",
    code: `"use client";

import { SignaturePad } from "@/components/ui/signature-pad";

export default function SignaturePadExpanded() {
  return (
    <div className="flex items-center justify-center p-8">
      <SignaturePad initialExpanded={true} />
    </div>
  );
}`,
  },
];
