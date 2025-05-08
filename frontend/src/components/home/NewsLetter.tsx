"use client";

import { registerEmail } from "@/api/newsLetter/registerEmail";
import { FormEvent, useState, useEffect } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (email) {
      try {
        const response = await registerEmail(email);
        setMessage(response.message);
      } catch (error) {
        console.error("Failed to subscribe:", error);
        setMessage("Failed to subscribe. Please try again later.");
      }
    } else {
      console.warn("Email input is empty");
      setMessage("Please enter a valid email address.");
    }
  };

  if (!mounted) {
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
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-grow px-4 py-3 rounded-md border border-gray-300 bg-white" />
            <div className="px-6 py-3 bg-rose-600 text-white rounded-md whitespace-nowrap" />
          </div>
          
          <p className="mt-4 text-sm text-gray-600">
            By subscribing, you agree to receive email marketing. You can
            unsubscribe at any time.
          </p>
        </div>
      </section>
    );
  }

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
        
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Subscribe Now
          </button>
        </form>
        
        {message ? (
          <p className="mt-4 text-gray-600">{message}</p>
        ) : (
          <p className="mt-4 text-sm text-gray-600">
            By subscribing, you agree to receive email marketing. You can
            unsubscribe at any time.
          </p>
        )}
      </div>
    </section>
  );
}