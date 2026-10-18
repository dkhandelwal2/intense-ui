import { ErrorView } from "@/components/errors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "500 - Internal Server Error",
  description: "An unexpected error occurred in the execution core.",
};

export default function Error500Page() {
  return <ErrorView code={500} />;
}
