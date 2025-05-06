import Footer from "@/components/home/Footer";
import Image from "next/image";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Cozy Blanket",
      price: "$89.99",
      image: "/blanket.webp",
      description:
        "Hand-crocheted with premium merino wool for ultimate comfort.",
    },
    {
      id: 2,
      name: "Baby Booties",
      price: "$24.99",
      image: "/booties.webp",
      description: "Adorable soft booties perfect for newborns and infants.",
    },
    {
      id: 3,
      name: "Amigurumi Bunny",
      price: "$32.99",
      image: "/bunny.webp",
      description: "Charming handmade stuffed bunny, perfect as a gift.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah L.",
      text: "The blanket I ordered is absolutely stunning. The attention to detail is remarkable!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael T.",
      text: "I bought a crochet toy for my daughter and she hasn't put it down since. Beautiful craftsmanship!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma R.",
      text: "The custom scarf exceeded my expectations. So warm and the colors are gorgeous!",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-amber-50">
      {/* Hero Section with enhanced visuals */}
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
              <a
                href="/shop"
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 transition-colors rounded-full font-medium text-lg"
              >
                Shop Collection
              </a>
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
                <a
                  href="/creations"
                  className="text-rose-600 hover:text-rose-800 font-medium"
                >
                  Shop Handmade →
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-rose-800">
                Learn & Grow
              </h3>
              <p className="text-gray-700 text-center">
                Join our community to learn new techniques and share your
                crochet journey. From beginners to experienced crafters,
                everyone is welcome.
              </p>
              <div className="mt-4 text-center">
                <a
                  href="/workshops"
                  className="text-rose-600 hover:text-rose-800 font-medium"
                >
                  Join Workshops →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
                key={product.id}
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
            <a
              href="/shop"
              className="inline-block px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Why Crochet Section - Enhanced with better layout */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-rose-800">
            Why Crochet?
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <Image
                src="/logo.webp"
                alt="Crochet Benefits"
                width={500}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Crochet is more than just a hobby—it&apos;s a mindful practice
                that brings joy, relaxation, and a sense of accomplishment. Each
                stitch is an expression of creativity and care.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <span className="font-medium text-gray-900">
                      Stress Relief:
                    </span>{" "}
                    The rhythmic nature of crochet provides a calming effect,
                    reducing anxiety and promoting mindfulness.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <span className="font-medium text-gray-900">
                      Creative Expression:
                    </span>{" "}
                    Through colors, textures, and patterns, crochet allows for
                    endless creative possibilities.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <span className="font-medium text-gray-900">
                      Sustainable Craft:
                    </span>{" "}
                    Creating handmade items is environmentally friendly and
                    promotes conscious consumption.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <span className="font-medium text-gray-900">
                      Community Connection:
                    </span>{" "}
                    Crochet brings people together, creating bonds through
                    shared creativity.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="/blog/crochet-benefits"
                  className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
                >
                  Read More About Crochet Benefits
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-rose-800">
            What Our Customers Say
          </h2>
          <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
            Real stories from crochet enthusiasts who have experienced the magic
            of our handmade items
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="text-gray-500 font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-8 bg-rose-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-rose-800">
            Join Our Crochet Community
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to our newsletter for exclusive patterns, special offers,
            and crochet inspiration
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            By subscribing, you agree to receive email marketing. You can
            unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-rose-800">
            Follow Our Crochet Journey
          </h2>
          <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
            Get inspired by our latest creations and behind-the-scenes moments
            on Instagram
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square relative overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
              >
                <Image
                  src={`/insta-${i + 1}.webp`}
                  alt="Instagram Feed"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://instagram.com/loopsandpaints"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
            >
              @loopsandpaints
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
}
