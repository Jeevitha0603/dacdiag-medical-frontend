import { useState } from "react";
import { Link } from "react-router-dom";
import UserManagement from "./UserManagement";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"company" | "users">("company");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [businessData, setBusinessData] = useState({
    businessName: "Dacdiag",
    businessType: "Medicare",
    ownerName: "Jeevitha",
    companyPhone: "+91 9876543210",
    alternateNumber: "+91 9876543210",
    companyEmail: "dacdiag@gmail.com",
    websiteUrl: "www.dacdiag.com",
    address: "Near Reliance Mall, 5 roads, Salem, Tamil Nadu, 636304",
  });

  const [editForm, setEditForm] = useState(businessData);

  const [taxData, setTaxData] = useState({
    gstNumber: "",
    panNumber: "",
  });

  const [bankData, setBankData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
  });

  const handleEditClick = () => {
    setEditForm(businessData);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setBusinessData(editForm);
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setEditForm(businessData);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("company")}
          className={`pb-3 px-2 font-semibold transition duration-200 ${
            activeTab === "company"
              ? "text-gray-800 border-b-2 border-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Company
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-3 px-2 font-semibold transition duration-200 ${
            activeTab === "users"
              ? "text-gray-800 border-b-2 border-gray-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Users
        </button>
      </div>

      {/* Company Tab Content */}
      {activeTab === "company" && (
        <div className="space-y-6">
          {/* Top Section - Logo and Business Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Logo */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-4 border-gray-300 flex items-center justify-center bg-gray-50">
                <img
                  src="/dacdiag-logo.png"
                  alt="DACDIAG Logo"
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            {/* Business Details */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Business Details
                </h2>
                <button
                  onClick={handleEditClick}
                  className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Business Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.businessName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Business Type
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.businessType}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Owner/Proprietor Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.ownerName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Company Phone Number
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.companyPhone}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Alternate Number
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.alternateNumber}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Company E-Mail
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.companyEmail}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Website URL
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.websiteUrl}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Address
                  </label>
                  <p className="text-gray-800 font-medium">
                    {businessData.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Tax and Bank Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business & Tax Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Business & Tax Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    GST Number
                  </label>
                  <p className="text-gray-800 font-medium">
                    {taxData.gstNumber || "-"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    PAN Number
                  </label>
                  <p className="text-gray-800 font-medium">
                    {taxData.panNumber || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Bank Details
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Bank Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {bankData.bankName || "-"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Account Holder Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {bankData.accountHolderName || "-"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Account Number
                  </label>
                  <p className="text-gray-800 font-medium">
                    {bankData.accountNumber || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab Content */}
      {activeTab === "users" && <UserManagement />}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit Business Details
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={editForm.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Type
                  </label>
                  <input
                    type="text"
                    value={editForm.businessType}
                    onChange={(e) =>
                      handleInputChange("businessType", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Owner/Proprietor Name
                  </label>
                  <input
                    type="text"
                    value={editForm.ownerName}
                    onChange={(e) =>
                      handleInputChange("ownerName", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.companyPhone}
                    onChange={(e) =>
                      handleInputChange("companyPhone", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternate Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.alternateNumber}
                    onChange={(e) =>
                      handleInputChange("alternateNumber", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company E-Mail
                  </label>
                  <input
                    type="email"
                    value={editForm.companyEmail}
                    onChange={(e) =>
                      handleInputChange("companyEmail", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={editForm.websiteUrl}
                    onChange={(e) =>
                      handleInputChange("websiteUrl", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={editForm.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200 font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
