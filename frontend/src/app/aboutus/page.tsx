import Footer from "@/components/home/Footer";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50 mt-16">
      {/* Page Header */}
      <div className="bg-rose-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-rose-800">About Us</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Crafting with passion, connecting through crochet
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-rose max-w-none">
              <p className="text-lg text-gray-600 mb-4">
                Welcome to Eternal Loops, where every stitch tells a story and
                every item is crafted with love and attention to detail.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our journey began in 2024 when our founder, Pavitra, turned her
                lifelong passion for crochet into a small business. What started
                as creating gifts for friends and family quickly bloomed into a
                thriving community of crochet enthusiasts.
              </p>
              <p className="text-lg text-gray-600">
                Today, we works together to create beautiful, handcrafted items
                that bring warmth and joy to homes around the world. Each piece
                is thoughtfully designed and meticulously crafted, ensuring that
                you receive only the highest quality crochet products.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-rose-200 opacity-30 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <Image
                  src="/hero.webp"
                  alt="Crocheting hands"
                  width={400}
                  height={300}
                  className="rounded-lg mx-auto mb-6"
                  style={{ objectFit: "cover" }}
                />
                <h3 className="text-2xl font-semibold text-rose-800">
                  First Crochet By Eternal Loops
                </h3>
                <p className="mt-2 text-gray-600">Where it all began</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="h-20 w-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quality Craftsmanship
              </h3>
              <p className="text-gray-600">
                We take pride in our attention to detail and use only premium
                materials to ensure that every item is both beautiful and
                durable.
              </p>
            </div>

            {/* Sustainability */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="h-20 w-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We are committed to eco-friendly practices, using responsibly
                sourced yarns and minimizing waste in our production process.
              </p>
            </div>

            {/* Community */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="h-20 w-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community
              </h3>
              <p className="text-gray-600">
                We believe in the power of handcrafting to connect people and
                foster a sense of belonging within our crochet community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-rose-100">
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="h-20 w-20 text-rose-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-6.627 0-12 5.373-12 12h24c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Pavitra Nayak
            </h3>
            <p className="text-rose-600 mb-3">Founder & Lead Designer</p>
            <p className="text-gray-600 text-sm">
              With over 3 years of crochet experience, Pavitra brings creativity
              and vision to every design.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-rose-100">
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="h-20 w-20 text-rose-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-6.627 0-12 5.373-12 12h24c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Bhavya Nayak
            </h3>
            <p className="text-rose-600 mb-3">Website Developer</p>
            <p className="text-gray-600 text-sm">Techie</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
