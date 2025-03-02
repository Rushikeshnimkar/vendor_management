"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function CreateVendor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vendor_name: "",
    bank_account_no: "",
    bank_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    country: "",
    zip_code: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "vendor_name",
      "bank_account_no",
      "bank_name",
      "address_line_1",
      "city",
      "country",
      "zip_code",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // Check if supabase is available
      if (!supabase) {
        throw new Error("Supabase client is not initialized");
      }

      const { error } = await supabase
        .from("vendors")
        .insert([formData])
        .select();

      if (error) throw error;

      router.push("/pages/homepage");
      router.refresh();
    } catch (error) {
      console.error("Error creating vendor:", error);
      alert("Failed to create vendor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Vendor
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Vendor Name */}
              <div>
                <label
                  htmlFor="vendor_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vendor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vendor_name"
                  name="vendor_name"
                  value={formData.vendor_name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.vendor_name ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                />
                {errors.vendor_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vendor_name}
                  </p>
                )}
              </div>

              {/* Bank Account No. */}
              <div>
                <label
                  htmlFor="bank_account_no"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Account No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="bank_account_no"
                  name="bank_account_no"
                  value={formData.bank_account_no}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.bank_account_no
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                />
                {errors.bank_account_no && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bank_account_no}
                  </p>
                )}
              </div>

              {/* Bank Name */}
              <div>
                <label
                  htmlFor="bank_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="bank_name"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.bank_name ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                />
                {errors.bank_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bank_name}
                  </p>
                )}
              </div>

              {/* Address Line 1 */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address_line_1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address_line_1"
                  name="address_line_1"
                  value={formData.address_line_1}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.address_line_1 ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                />
                {errors.address_line_1 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address_line_1}
                  </p>
                )}
              </div>

              {/* Address Line 2 */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address_line_2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 2{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="address_line_2"
                  name="address_line_2"
                  value={formData.address_line_2}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                )}
              </div>

              {/* Zip Code */}
              <div>
                <label
                  htmlFor="zip_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.zip_code ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                />
                {errors.zip_code && (
                  <p className="mt-1 text-sm text-red-600">{errors.zip_code}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Vendor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
