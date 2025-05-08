"use client";
import { useState } from "react";
import { Calendar, Heart, Send } from "lucide-react";
import { order } from "@/api/custom/order";
import { useAuth } from "@/context/AuthContext";
export default function CustomOrderForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userId: "",
    referenceImage: "",
    name: "",
    description: "",
    deadline: "",
    inspirationLink: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: {
    target: { name: string; value: unknown };
  }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    formData.userId = user?.userId;
    const response = await order(formData);
    if (response.success) {
      setIsSubmitted(true);
    } else {
      setError(response.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 text-pink-500">
            <Heart className="mx-auto h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Thank You!</h2>
          <p className="text-gray-700 mb-6">
            Your custom order request has been received. We will review your
            requirements and get back to you soon about your special crochet
            creation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-700">
            Custom Crochet Creations
          </h1>
          <p className="mt-3 text-lg text-pink-600">
            Bring your unique crochet ideas to life with our custom order
            service
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Personal Details */}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring focus:ring-pink-200 focus:border-pink-500 outline-none transition"
                placeholder="Enter name of the project"
              />
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring focus:ring-pink-200 focus:border-pink-500 outline-none transition"
                placeholder="Describe your project in detail (size, colors, style, etc.)"
              />
            </div>

            {/* Reference Image */}
            <div>
              <label
                htmlFor="reference image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reference Image
              </label>
              <input
                type="url"
                id="referenceImage"
                name="referenceImage"
                value={formData.referenceImage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring focus:ring-pink-200 focus:border-pink-500 outline-none transition"
                placeholder="URL to an image of your desired crochet item"
              />
            </div>

            {/* Inspiration Link */}
            <div>
              <label
                htmlFor="inspirationLink"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Inspiration Link (Optional)
              </label>
              <input
                type="url"
                id="inspirationLink"
                name="inspirationLink"
                value={formData.inspirationLink}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring focus:ring-pink-200 focus:border-pink-500 outline-none transition"
                placeholder="URL to a design you like"
              />
            </div>

            {/* Deadline */}
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expected Deadline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-2 border border-pink-200 rounded-lg focus:ring focus:ring-pink-200 focus:border-pink-500 outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Submit Custom Order Request</span>
              </button>
              {error && <p className="mt-3 text-red-500 text-md flex justify-center items-center">{error}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>© {new Date().getFullYear()} Eternal Loops</p>
        </div>
      </div>
    </div>
  );
}
