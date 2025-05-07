'use client'
import { useState } from "react";
import { Calendar, Heart, Gift, Clock, Upload, Send } from "lucide-react";
import Image from "next/image";
export default function CustomOrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    deadline: "",
    inspirationLink: ""
  });
  
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, referenceImage: file }));
      setPreviewUrl("/api/placeholder/400/320");
    }
  };
  
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
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
            Your custom order request has been received. We will review your requirements and get back to you soon about your special crochet creation!
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-700">Custom Crochet Creations</h1>
          <p className="mt-3 text-lg text-pink-600">
            Bring your unique crochet ideas to life with our custom order service
          </p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Form */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring focus:ring-pink-200 focus:border-pink-500 outline-none transition"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring focus:ring-pink-200 focus:border-pink-500 outline-none transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Inspiration/Reference Image</label>
              <div className="border-2 border-dashed border-pink-200 rounded-lg p-4 text-center">
                {previewUrl ? (
                  <div className="relative">
                    <Image 
                      src={previewUrl} 
                      alt="Reference" 
                      className="max-h-64 mx-auto rounded" 
                      height={300}
                      width={1000}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setPreviewUrl("");
                        setFormData(prev => ({ ...prev, referenceImage: null }));
                      }}
                      className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1 hover:bg-pink-600 transition"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-pink-300 mb-2" />
                    <p className="text-gray-500">Upload an inspiration image</p>
                    <input
                      type="file"
                      id="referenceImage"
                      name="referenceImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('referenceImage').click()}
                      className="mt-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition text-sm"
                    >
                      Select Image
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Inspiration Link */}
            <div>
              <label htmlFor="inspirationLink" className="block text-sm font-medium text-gray-700 mb-1">Inspiration Link (Optional)</label>
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
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">Expected Deadline</label>
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
            </div>
          </div>
        </div>
        
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-pink-100 rounded-full mb-4">
              <Heart className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Handmade With Love</h3>
            <p className="text-gray-600">Each piece is carefully crafted with attention to every detail.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-pink-100 rounded-full mb-4">
              <Gift className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Uniquely Yours</h3>
            <p className="text-gray-600">Get a one-of-a-kind crochet creation designed specifically for you.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-pink-100 rounded-full mb-4">
              <Clock className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Timely Delivery</h3>
            <p className="text-gray-600">We work diligently to meet your desired timeline.</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>© {new Date().getFullYear()} Handmade Crochet Creations</p>
        </div>
      </div>
    </div>
  );
}