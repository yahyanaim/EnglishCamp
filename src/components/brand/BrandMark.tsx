import Image from "next/image";

export function BrandMark({ size = 36 }: { size?: number }) {
  return <span className="camp-brand-mark" style={{ width: size, height: size }}><Image src="/media/brand/englishcamp-mascot-256.png" width={size} height={size} alt="EnglishCamp reading fox" priority unoptimized /></span>;
}
