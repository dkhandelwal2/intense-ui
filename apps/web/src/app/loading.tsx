import { AnimatedLogoLoader } from "@/components/layout/animated-logo-loader";

export default function RootLoading() {
  return (
    <div className="min-h-[calc(100vh-14rem)] w-full flex items-center justify-center p-8">
      <AnimatedLogoLoader size="lg" message="Loading..." />
    </div>
  );
}
