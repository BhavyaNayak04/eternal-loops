import Footer from "@/components/home/Footer";
import Link from "next/link";
import { featuredProducts } from "@/types/index";
import { testimonials } from "@/types/index";
import NewsLetter from "@/components/home/NewsLetter";
import Testimonials from "@/components/home/Testimonials";
import InstagramFeed from "@/components/home/InstagramFeed";
import AboutCrochet from "@/components/home/AboutCrochet";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-amber-50">
      <main className="relative flex-grow h-screen w-full">
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.webp')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg animate-fadeIn">
              Welcome to Eternal Loops
            </h1>
            <p className="mt-4 text-xl md:text-2xl leading-relaxed drop-shadow-md">
              Handcrafted crochet treasures made with love, one stitch at a
              time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 transition-colors rounded-full font-medium text-lg"
              >
                Shop Collection
              </Link>
              <a
                href="/custom"
                className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-rose-700 transition-all rounded-full font-medium text-lg"
              >
                Custom Orders
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Featured Categories */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-rose-800">
            Our Craft Categories
          </h2>
          <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
            Each piece is carefully crafted with premium materials and decades
            of crochet expertise
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-amber-50 shadow-md rounded-lg border border-amber-100 hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-rose-800">
                Beautiful Patterns
              </h3>
              <p className="text-gray-700 text-center">
                Explore a variety of crochet patterns that inspire creativity
                and bring joy to your projects. From simple to intricate
                designs, find your next favorite project.
              </p>
              <div className="mt-4 text-center">
                <a
                  href="/patterns"
                  className="text-rose-600 hover:text-rose-800 font-medium"
                >
                  Browse Patterns →
                </a>
              </div>
            </div>

            <div className="p-6 bg-amber-50 shadow-md rounded-lg border border-amber-100 hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-rose-800">
                Handmade Creations
              </h3>
              <p className="text-gray-700 text-center">
                Discover unique, handmade crochet items crafted with love and
                care. Each piece tells a story and brings warmth to your home or
                wardrobe.
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/shop"
                  className="text-rose-600 hover:text-rose-800 font-medium"
                >
                  Shop Handmade →
                </Link>
              </div>
            </div>

            <div className="p-6 bg-amber-50 shadow-md rounded-lg border border-amber-100 hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-rose-800">
                Custom Orders
              </h3>
              <p className="text-gray-700 text-center">
                Have a specific design in mind? We offer custom crochet orders
                tailored to your preferences. Let us create something special
                just for you!
              </p>
              <div className="mt-4 text-center">
                <a
                  href="/custom"
                  className="text-rose-600 hover:text-rose-800 font-medium"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts featuredProducts={featuredProducts} />
      <AboutCrochet />
      <Testimonials testimonials={testimonials} />
      <NewsLetter />
      <InstagramFeed />
      <Footer />
    </div>
  );
}
