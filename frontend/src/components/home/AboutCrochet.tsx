import Image from "next/image";
export default function AboutCrochet() {
  return (
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
                  Crochet brings people together, creating bonds through shared
                  creativity.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://hemptique.com/pages/10-benefits-of-crocheting?srsltid=AfmBOoqaQdA8syJmtT_3vNbdNrCJJ3vyxflyZp5JhD5r5RD76nk2WPyE"
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
  );
}
