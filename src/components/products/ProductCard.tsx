/* eslint-disable @next/next/no-img-element */
"use client";

import { IProduct } from "@/src/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-72 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6">
        {/* Name and Category Badge */}
        <div className="flex items-start justify-between mb-4">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
          <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-2">
            {typeof product.category === "object"
              ? product.category.name
              : "Category"}
          </span>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between mb-6">
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(product.rating || 5)
                    ? "fill-yellow-400"
                    : "fill-gray-300"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-gray-900">
            ${product.discountPrice || product.price}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="dark"
          size="lg"
          disabled={product.stock === 0}
          onClick={(e) => {
            e.preventDefault();
            console.log("Add to cart:", product._id);
          }}
          className="w-full"
        >
          <ShoppingCart className="w-5 h-5" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;