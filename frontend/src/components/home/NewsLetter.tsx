export default function NewsLetter() {
  return (
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
  );
}
