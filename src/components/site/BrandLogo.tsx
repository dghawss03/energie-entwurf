import blackLogoUrl from "@/assets/energie-entwurf-logo-dark.svg";
import whiteLogoUrl from "@/assets/energie-entwurf-logo-light.svg";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "black" | "white";
};

export function BrandLogo({ className, priority = false, variant = "black" }: BrandLogoProps) {
  return (
    <img
      src={variant === "white" ? whiteLogoUrl : blackLogoUrl}
      alt="Entwurf Energie"
      width={540}
      height={138}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("block h-auto object-contain", className)}
    />
  );
}
