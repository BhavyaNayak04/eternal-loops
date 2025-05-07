import Image from "next/image";
export default function InstagramFeed() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-rose-800">
          Follow Our Crochet Journey
        </h2>
        <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
          Get inspired by our latest creations and behind-the-scenes moments on
          Instagram
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
  );
}
