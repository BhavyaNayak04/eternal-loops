import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProducts({
  featuredProducts,
}: {
  featuredProducts: Product[];
}) {
  return (
    <section className="py-16 px-8 bg-rose-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-rose-800">
          Featured Creations
        </h2>
        <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
          Our most loved handmade crochet pieces, crafted with attention to
          every stitch
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <span className="text-rose-600 font-bold">
                    {product.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <button className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
