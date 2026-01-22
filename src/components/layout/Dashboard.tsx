export default function Dashboard() {
  const statsCards = [
    { title: "Patients", count: 50, thisMonth: 20, color: "blue", increase: true },
    { title: "Doctors", count: 50, thisMonth: 15, color: "white", increase: false },
    { title: "Nurses", count: 50, thisMonth: 15, color: "white", increase: true },
    { title: "Labs", count: 50, thisMonth: 30, color: "white", increase: true },
    { title: "Hospitals", count: 50, thisMonth: 15, color: "white", increase: false },
    { title: "Vendors", count: 50, thisMonth: 15, color: "white", increase: false },
    { title: "Practicing Doctor", count: 50, thisMonth: 15, color: "white", increase: true },
    { title: "Clinic", count: 50, thisMonth: 15, color: "white", increase: true },
  ];

  const payments = [
    { name: "Karthi", id: "12345698", amount: 5000, time: "23 min ago" },
    { name: "Jeeva", id: "12345698", amount: 5000, time: "23 min ago" },
    { name: "Arjun", id: "12345698", amount: 5000, time: "23 min ago" },
    { name: "Mani", id: "12345698", amount: 5000, time: "23 min ago" },
  ];

  // const medicalTourismData = [
  //   { id: 1, patientName: "John Doe", country: "USA", treatment: "Cardiology", preferredCity: "Chennai", travelDate: "2024-02-15", budget: "$10,000" },
  //   { id: 2, patientName: "Sarah Smith", country: "UK", treatment: "Orthopedic", preferredCity: "Mumbai", travelDate: "2024-03-20", budget: "$8,000" },
  //   { id: 3, patientName: "Ahmed Ali", country: "UAE", treatment: "Neurology", preferredCity: "Bangalore", travelDate: "2024-02-28", budget: "$12,000" },
  // ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Stats Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`${
                  card.color === "blue"
                    ? "bg-gradient-to-br from-indigo-600 to-blue-700 text-white"
                    : "bg-white text-gray-800"
                } rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-sm font-medium ${card.color === "blue" ? "text-blue-100" : "text-gray-600"}`}>
                    {card.title}
                  </h3>
                </div>
                <p className={`text-4xl font-bold mb-4 ${card.color === "blue" ? "text-white" : "text-gray-900"}`}>
                  {card.count}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      card.increase
                        ? card.color === "blue"
                          ? "bg-blue-500 text-white"
                          : "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    } text-xs px-2 py-1 rounded-full font-medium`}
                  >
                    {card.thisMonth}
                  </span>
                  <span className={`text-xs ${card.color === "blue" ? "text-blue-100" : "text-gray-500"}`}>
                    This month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Medical Tourism Table */}
          {/* <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Medical Tourism</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">#</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Country</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Treatment</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Preferred City</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Travel Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalTourismData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition duration-200">
                      <td className="py-4 px-4 text-sm text-gray-700">{item.id}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{item.patientName}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{item.country}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{item.treatment}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{item.preferredCity}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{item.travelDate}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{item.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>

        {/* Right Section - Balance & Payments */}
        <div className="space-y-6">
          {/* Total Balance Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-gray-500 mb-2">Total Balance</p>
            <div className="flex items-baseline gap-2 mb-1">
              <h2 className="text-3xl font-bold text-gray-800">₹10,00,000</h2>
              <span className="text-sm text-green-500 font-medium">+5% than last month</span>
            </div>
          </div>

          {/* Payments Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Payments</h3>
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
                Today: ₹50,000
              </div>
            </div>

            <div className="space-y-4">
              {payments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{payment.name}</p>
                      <p className="text-xs text-gray-500">{payment.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{payment.amount}</p>
                    <p className="text-xs text-gray-500">{payment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}