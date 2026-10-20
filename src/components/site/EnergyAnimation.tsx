import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";
import wasmUrl from "@lottiefiles/dotlottie-web/dotlottie-player.wasm?url";

// Load the player only when the animation enters the viewport. No external runtime/CDN.
setWasmUrl(wasmUrl);
export default function EnergyAnimation({ src }: { src: string }) {
  return <DotLottieReact src={src} loop autoplay className="h-full w-full" />;
}
