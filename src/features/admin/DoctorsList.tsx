import { useState } from "react";

interface Doctor {
  id: number;
  name: string;
  avatar: string;
  category: string;
  type: string;
  fees: number;
  gender: "Male" | "Female";
  contact: string;
  location: string;
  regDate: string;
  status: "Active" | "Inactive";
}

export default function DoctorsList() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Jamal",
      avatar: "/male1.jpg",
      category: "Consultant",
      type: "Doctor",
      fees: 4666,
      gender: "Male",
      contact: "7012012011",
      location: "Salem",
      regDate: "05/04/2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Aisha",
      avatar: "/female1.jpg",
      category: "Surgeon",
      type: "Clinic",
      fees: 4666,
      gender: "Female",
      contact: "7012012022",
      location: "5 Roads",
      regDate: "09/06/2025",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Rajesh",
      avatar: "/male1.jpg",
      category: "General Practitioner",
      type: "Practicing Doctor",
      fees: 4666,
      gender: "Male",
      contact: "7012012033",
      location: "Asthampatty",
      regDate: "17/05/2025",
      status: "Active",
    },
    {
      id: 4,
      name: "Lakshmi",
      avatar: "/female2.jpg",
      category: "Visiting Doctor",
      type: "Clinic",
      fees: 4666,
      gender: "Female",
      contact: "7012012044",
      location: "Karuppur",
      regDate: "13/05/2025",
      status: "Active",
    },
  ];

  const filteredDoctors = doctors.filter((d) => {
    return (
      d.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "All" || d.type === typeFilter) &&
      (locationFilter === "All" || d.location === locationFilter) &&
      (categoryFilter === "All" || d.category === categoryFilter)
    );
  });

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-1xl font-bold text-gray-800 mb-6">Doctors List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option>All Types</option>
          <option>Doctor</option>
          <option>Clinic</option>
          <option>Practicing Doctor</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option>All Location</option>
          <option>Salem</option>
          <option>5 Roads</option>
          <option>Asthampatty</option>
          <option>Karuppur</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option>All Category</option>
          <option>Consultant</option>
          <option>Surgeon</option>
          <option>General Practitioner</option>
          <option>Visiting Doctor</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {[
                  "#",
                  "Name",
                  "Category",
                  "Type",
                  "Fees",
                  "Gender",
                  "Contact",
                  "Location",
                  "Reg Date",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredDoctors.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{doc.name}</span>
                  </td>

                  <td className="px-6 py-4">{doc.category}</td>
                  <td className="px-6 py-4">{doc.type}</td>
                  <td className="px-6 py-4">₹ {doc.fees.toLocaleString()}</td>
                  <td className="px-6 py-4">{doc.gender}</td>
                  <td className="px-6 py-4">{doc.contact}</td>
                  <td className="px-6 py-4">{doc.location}</td>
                  <td className="px-6 py-4">{doc.regDate}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        doc.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          doc.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      ></span>
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
