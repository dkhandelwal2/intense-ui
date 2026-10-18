import { ErrorView } from "@/components/errors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The requested component or documentation page could not be found.",
};

export default function Error404Page() {
  return <ErrorView code={404} />;
}
