"use client";
import React, { useState, useRef, useEffect } from "react";

const DataModal = ({ closeModal }) => {
  const modalRef = useRef(null); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "english",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    alert("Demo request submitted!");
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Close modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const redirectTo = (url) => {
    window.location.href = url;
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#12121221] bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-black">
          Receive a Live Call from Our AI Agent
        </h2>
        <p className="text-gray-600 text-sm text-center mt-2">
          Fill in your details below to receive a demo call.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone (With Country Code)"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="english">🇬🇧 English</option>
            <option value="german">🇩🇪 German</option>
          </select>

          <button
            onClick={() => redirectTo('/demo')}
            type="submit"
            className="w-full h-12 bg-[#283CFF] text-white rounded-lg hover:bg-[#283CFF] transition"
          >
            Try a Live Phone Demo
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataModal;
