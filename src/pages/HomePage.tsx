import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="w-full font-sans text-gray-800">
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/dacdiag-logo.png" alt="DACDIAG" className="h-8" />
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>

          <button
            onClick={() => navigate("/login")}
            className="mt-8 bg-black text-white px-6 py-3 rounded-full font-semibold"
          >
            Register
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        className="relative h-[520px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-4xl mx-auto text-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Empowering Digital Healthcare — <br />
            Anytime. Anywhere.
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-200">
            Your one-stop medical companion for consultations, medicine
            ordering, lab testing, skin & hair care — powered by AI.
          </p>

          <button className="mt-8 bg-black text-primary px-6 py-3 rounded-full font-semibold">
            Book Appointment
          </button>
        </div>
      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="/doctor-patient.jpg"
          alt="Doctor"
          className="rounded-2xl shadow-lg"
        />

        <div>
          <span className="text-xs bg-indigo-100 text-primary px-3 py-1 rounded-full">
            Trusted Healthcare Excellence
          </span>

          <h2 className="text-3xl font-bold mt-4">
            Revitalize Your Health & Enrich Your Life Every Day
          </h2>

          <p className="mt-4 text-gray-600">
            Experience personalized healthcare for mental and physical wellness.
            Compassionate, holistic care tailored just for you.
          </p>

          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-full">
            Book Appointment →
          </button>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Unlock Your Inner Health with Our Services
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Comprehensive care designed to support your physical and mental
            well-being
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              "Consultations",
              "Order Medicine",
              "Lab Tests",
              "Medical Tourism",
              "Hospital & Clinic Setup",
              "Hair Care",
              "Skin Care",
              "Software Solutions",
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <img
                  src={`/service-${index + 1}.jpg`}
                  alt={service}
                  className="rounded-xl h-40 w-full object-cover"
                />
                <h3 className="mt-4 font-semibold">{service}</h3>
                <button className="mt-3 text-primary text-sm font-medium">
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERTS ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Our Experts in Modern Medicine</h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Dedicated specialists delivering compassionate, expert healthcare.
        </p>

        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {[
            "Psychiatrist",
            "Ophthalmologist",
            "Anesthesiology",
            "Pediatrics",
          ].map((role, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-200 to-gray-400 rounded-2xl p-6 text-left text-white"
            >
              <img
                src={`/doctor-${index + 1}.jpg`}
                alt={role}
                className="rounded-xl mb-4"
              />
              <h4 className="font-semibold">Dr. Name</h4>
              <p className="text-sm">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>

            {[
              "What services does Trilao offer?",
              "How does the process work?",
              "Is my data secure?",
            ].map((q, i) => (
              <div key={i} className="mt-4 bg-white p-4 rounded-xl shadow">
                {q}
              </div>
            ))}

            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-full">
              View All →
            </button>
          </div>

          <img src="/faq.jpg" alt="FAQ" className="rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* ================= BOOK APPOINTMENT ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-xs bg-indigo-100 text-primary px-3 py-1 rounded-full">
            Easy Booking
          </span>

          <h2 className="text-3xl font-bold mt-4">Book an Appointment Today</h2>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✔ Quick and easy appointment scheduling</li>
            <li>✔ Confirmations within 24 hours</li>
            <li>✔ Online or in-person consultations</li>
          </ul>
        </div>

        <form className="bg-gray-50 p-8 rounded-2xl shadow space-y-4">
          <input className="w-full p-3 rounded-lg" placeholder="Full Name" />
          <input
            className="w-full p-3 rounded-lg"
            placeholder="Email Address"
          />
          <select className="w-full p-3 rounded-lg">
            <option>Select Service</option>
          </select>
          <input type="date" className="w-full p-3 rounded-lg" />
          <button className="w-full bg-primary text-white py-3 rounded-full">
            Submit Appointment Request
          </button>
        </form>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold">DACDIAG</h3>
            <p className="text-sm mt-3">
              Your trusted digital healthcare partner.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Our Services</li>
              <li>Contact</li>
              <li>Dashboard</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>FAQs</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Contact Info</h4>
            <p className="text-sm mt-3">support@dacdiag.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
