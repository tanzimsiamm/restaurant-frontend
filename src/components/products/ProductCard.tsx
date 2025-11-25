"use client";

import { IProduct } from "@/src/types";
import { formatPrice, calculateDiscount } from "@/src/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Image from "next/image";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = calculateDiscount(product.price, product.discountPrice);

  return (
    <Card hover>
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          {/* Product Image */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              width={300}
              height={300}
              unoptimized={false}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discount > 0 && (
                <Badge variant="danger" className="font-semibold">
                  {discount}% OFF
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="warning" className="font-semibold">
                  Featured
                </Badge>
              )}
            </div>

            {/* Out of Stock Overlay */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {typeof product.category === "object"
            ? product.category.name
            : "Category"}
        </p>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
            {product.reviewCount && (
              <span className="text-sm text-gray-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full"
          disabled={product.stock === 0}
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to cart functionality
            console.log("Add to cart:", product._id);
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
