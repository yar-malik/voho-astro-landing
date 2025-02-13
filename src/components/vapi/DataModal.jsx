"use client";
import React, { useState, useRef, useEffect } from "react";

const DataModal = ({ closeModal }) => {
  const modalRef = useRef(null);

  // ----------------------------
  // 1) State for form and errors
  // ----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "english",
    createdAt: new Date().toISOString(),
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // If the submission fails at the server stage, show a global error
  const [submitError, setSubmitError] = useState("");

  // --------------------------------------------------
  // 2) Handle field changes and clear field-level error
  // --------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear that field's error
  };

  // ----------------------------
  // 3) Validate each field
  // ----------------------------
  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ----------------------------
  // 4) Submission handler
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(""); // clear any old server error

    // Validate inputs first
    const isFormValid = validateForm();
    if (!isFormValid) {
      // If invalid, stop here - do not submit or redirect
      console.log("Form is invalid, not submitting");
      return;
    }

    // If valid, submit to Make.com webhook
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/hf3u8zpt01bo18idesghmpaz0kul2gu7",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        sessionStorage.setItem("submittedFormData", JSON.stringify(formData));

        window.location.href = "/demo";

      } else {
        console.error("Submission failed with status:", response.status);
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("An error occurred. Please try again.");
    }
  };

  // --------------------------------------------------------------
  // 5) Close the modal if user clicks outside the modal content box
  // --------------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#12121221] bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-black">
          Receive a Live Call from Our AI Agent
        </h2>
        <p className="text-gray-600 text-sm text-center mt-2">
          Fill in your details below to receive a demo call.
        </p>

        {/* Global server error */}
        {submitError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mt-4">
            {submitError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone (With Country Code)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Language Field (if desired)
          <div>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="english">🇬🇧 English</option>
              <option value="german">🇩🇪 German</option>
            </select>
          </div>
          */}

          <button
            type="submit"
            className="w-full h-12 cursor-pointer bg-[#283CFF] text-white rounded-lg hover:bg-[#0012B3] transition"
          >
            Try a Live Phone Demo
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataModal;
