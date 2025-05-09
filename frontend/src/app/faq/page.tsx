"use client";

import React, { useState } from "react";
import Footer from "@/components/home/Footer";
import { faqCategories } from "@/utils/types";
export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (itemIndex: number) => {
    if (openItems.includes(itemIndex)) {
      setOpenItems(openItems.filter((i) => i !== itemIndex));
    } else {
      setOpenItems([...openItems, itemIndex]);
    }
  };

  const getCurrentCategoryItems = () => {
    const category = faqCategories.find((cat) => cat.id === activeCategory);
    return category ? category.items : [];
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 mt-16">
      {/* Page Header */}
      <div className="bg-rose-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-rose-800">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our products, ordering
              process, and more
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-1">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left py-3 px-4 transition-colors duration-200 ${
                      activeCategory === category.id
                        ? "bg-rose-600 text-white"
                        : "hover:bg-rose-50 text-gray-700"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Need More Help Box */}
            <div className="mt-8 bg-rose-50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Need More Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Can not find the answer you are looking for? Please reach out to
                our friendly customer support team.
              </p>
              <a
                href="/contactus"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {faqCategories.find((cat) => cat.id === activeCategory)?.name}
                </h2>

                <div className="space-y-4">
                  {getCurrentCategoryItems().map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-inset"
                      >
                        <span className="text-lg font-medium text-gray-900">
                          {item.question}
                        </span>
                        <svg
                          className={`h-5 w-5 text-rose-600 transform ${
                            openItems.includes(index) ? "rotate-180" : ""
                          } transition-transform duration-200`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {openItems.includes(index) && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
