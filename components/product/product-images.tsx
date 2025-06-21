"use client";

import { Badge } from "@/components/ui/badge";
import StyledImage from "@/components/ui/styled-image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TProduct } from "@/types";
import { useState } from "react";

const ProductImages = ({ product }: { product: TProduct }) => {
  const { images, discountPrice, regularPrice } = product;

  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg border">
        <StyledImage
          src={selectedImage}
          alt={product.name}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {discountPrice && (
          <Badge className="absolute top-[5%] left-[5%]">
            -{Math.round(((regularPrice - discountPrice) * 100) / regularPrice)}
            %
          </Badge>
        )}
      </div>
      <ToggleGroup
        type="single"
        variant="outline"
        className="w-full gap-4 !shadow-none"
        value={selectedImage}
        onValueChange={setSelectedImage}
      >
        {images.map((image) => (
          <ToggleGroupItem
            key={image}
            value={image}
            className="!bg-background data-[state=on]:border-primary aspect-square size-full rounded-lg !border"
          >
            <StyledImage
              src={image}
              alt={product.name}
              wrapperClassName="size-full"
              sizes="33vw"
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ProductImages;
