import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export default function SanityImage({ 
  source, 
  alt = "Image", 
  className = "", 
  fill = false, 
  width, 
  height,
  priority = false 
}: { 
  source: any, 
  alt?: string, 
  className?: string, 
  fill?: boolean, 
  width?: number, 
  height?: number,
  priority?: boolean 
}) {
  const imageUrl = urlForImage(source)?.url();
  
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      fill={fill}
      width={fill ? undefined : width || 800}
      height={fill ? undefined : height || 600}
      priority={priority}
    />
  );
}
