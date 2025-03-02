"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import ConfirmationModal from "@/component/ConfirmationModal";

interface Vendor {
  id: string;
  vendor_name: string;
  bank_account_no: string;
  bank_name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  country: string;
  zip_code: string;
  created_at: string;
}

export default function ViewVendor() {
  const router = useRouter();
  const params = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function fetchVendor() {
      try {
        setLoading(true);
        setError(null);

        if (!params.id) {
          throw new Error("Vendor ID is required");
        }

        if (!supabase) {
          throw new Error("Supabase client is not initialized");
        }

        const { data, error } = await supabase
          .from("vendors")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Vendor not found");

        setVendor(data);
      } catch (err) {
        console.error("Error fetching vendor:", err);
        setError("Failed to load vendor details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchVendor();
  }, [params.id]);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (!supabase) {
        throw new Error("Supabase client is not initialized");
      }

      const { error } = await supabase
        .from("vendors")
        .delete()
        .eq("id", params.id);

      if (error) throw error;

      router.push("/pages/homepage");
    } catch (err) {
      console.error("Error deleting vendor:", err);
      setError("Failed to delete vendor. Please try again.");
    } finally {
      setLoading(false);
      closeDeleteModal();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error || "Vendor not found"}
          </div>
          <div className="flex justify-center">
            <Link
              href="/pages/homepage"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Vendors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Vendor Details</h1>
            <Link
              href="/pages/homepage"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to Vendors
            </Link>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Vendor Name
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {vendor.vendor_name}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Bank Account No.
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {vendor.bank_account_no}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Bank Name</h3>
                <p className="mt-1 text-lg text-gray-900">{vendor.bank_name}</p>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {vendor.address_line_1}
                </p>
                {vendor.address_line_2 && (
                  <p className="text-lg text-gray-900">
                    {vendor.address_line_2}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">City</h3>
                <p className="mt-1 text-lg text-gray-900">{vendor.city}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Country</h3>
                <p className="mt-1 text-lg text-gray-900">{vendor.country}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Zip Code</h3>
                <p className="mt-1 text-lg text-gray-900">{vendor.zip_code}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Created At
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {new Date(vendor.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
              <Link
                href={`/pages/vendors/${vendor.id}/edit`}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </Link>
              <button
                onClick={openDeleteModal}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Vendor"
        message={`Are you sure you want to delete ${vendor?.vendor_name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        isLoading={loading}
      />
    </div>
  );
}
