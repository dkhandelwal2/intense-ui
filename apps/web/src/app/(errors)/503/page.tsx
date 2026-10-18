import { ErrorView } from "@/components/errors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "503 - Service Unavailable",
  description: "The service is temporarily undergoing scheduled calibration and maintenance.",
};

export default function Error503Page() {
  return <ErrorView code={503} />;
}
