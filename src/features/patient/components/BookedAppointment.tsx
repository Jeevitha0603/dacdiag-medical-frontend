import React from "react";
import PatientSidebar from "./PatientSidebar";
import { useNavigate } from "react-router-dom";

const BookedAppointment = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Booked Appointment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow p-5">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <img
                  src="/female2.jpg"
                  alt="Doctor"
                  className="w-40 h-40 rounded-xl object-cover bg-gray-200"
                />

                <div>
                  <h2 className="text-2xl font-semibold">Dr. Jeevi</h2>

                  <span className="inline-block mt-2 px-3 py-1 border border-green-500 text-green-600 rounded-full text-sm">
                    Cardiology
                  </span>

                  <p className="mt-3 text-gray-600">MBBS, M.D. Cardiology</p>

                  <p className="mt-1 text-gray-600">
                    License Number : ML566659898
                  </p>

                  <p className="mt-3 text-indigo-600 font-semibold text-lg">
                    ₹1199{" "}
                    <span className="text-gray-500 text-sm">
                      per consultation
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <p>
                <span className="font-medium">Mobile:</span> +91 843829862
              </p>
              <p>
                <span className="font-medium">Mail:</span> gvsivagiri@gmail.com
              </p>
              <p>
                <span className="font-medium">Experience:</span> 10+ years
              </p>
              <p>
                <span className="font-medium">Languages:</span> Tamil, English
              </p>
            </div>

            <button
              onClick={() => navigate("/patient/video-call")}
              className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Call
            </button>

            {/* Bio */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Bio</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <p className="font-medium">Bachelor of Science in Biology</p>
                  <p>University of California, UCLA (2006 - 2010)</p>
                </li>
                <li>
                  <p className="font-medium">Doctor of Medicine (MD)</p>
                  <p>Harvard Medical School (2010 - 2014)</p>
                </li>
                <li>
                  <p className="font-medium">Cardiology Fellowship</p>
                  <p>Cleveland Clinic (2017 - 2020)</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Doctor */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold mb-2">About the Doctor</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dr. Jeevi is an Internal Medicine specialist with
                an MBBS from Government Medical College, Trivandrum and an MD in
                General Medicine from Government Medical College, Patiala.
              </p>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold mb-2">Specializations</h3>
              <p className="text-sm text-gray-600">
                Cardiology, Dermatology, Pediatrics
              </p>
            </div>

            {/* Awards */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold mb-4">Awards</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-24 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500"
                  >
                    Award {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold mb-4">Reviews</h3>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">⭐ 5 – Good</span>
                    <span className="text-gray-400">5 days ago</span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Happy lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                  </p>
                  <p className="mt-1 font-medium text-sm">
                    Karthik Vijayakumar Reddy
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">⭐ 4 – Good</span>
                    <span className="text-gray-400">5 days ago</span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="mt-1 font-medium text-sm">Ravi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedAppointment;
