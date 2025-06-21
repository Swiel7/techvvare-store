import { cn } from "@/lib/utils";
import { Image, IKImageProps } from "@imagekit/next";

const StyledImage = ({
  wrapperClassName,
  className,
  alt,
  fill = true,
  ...props
}: IKImageProps & { wrapperClassName?: string }) => {
  return (
    <div
      data-slot="image-container"
      className={cn("grid aspect-square place-items-center", wrapperClassName)}
    >
      <div className="relative size-[80%]">
        <Image
          urlEndpoint={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}`}
          className={cn("object-contain", className)}
          fill={fill}
          alt={alt}
          {...props}
        />
      </div>
    </div>
  );
};

export default StyledImage;
