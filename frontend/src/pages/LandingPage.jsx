import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import heroBanner from "../assets/hero-banner.png";
import workflowBanner from "../assets/workflow-banner.png";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">

            {/* Navbar */}

            <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

                <img
                    src={logo}
                    alt="Amazon Second Life"
                    className="h-12"
                />

                <div className="flex items-center gap-6">

                    <button className="text-gray-700 hover:text-[#FF9900]">
                        Marketplace
                    </button>

                    <button className="text-gray-700 hover:text-[#FF9900]">
                        Sustainability
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-[#FF9900] text-white px-5 py-2 rounded-lg"
                    >
                        Sign In
                    </button>

                </div>

            </nav>

            {/* Hero Section */}

            <section className="relative">

                <img
                    src={heroBanner}
                    alt="Hero"
                    className="w-full"
                />



            </section>

            {/* How It Works */}

            <section>

                <img
                    src={workflowBanner}
                    alt="How It Works"
                    className="w-full"
                />

            </section>

            {/* Impact Section */}

            <section className="bg-[#F2F3F3] py-16">

                <h2 className="text-4xl font-bold text-center mb-12 text-[#131A22]">
                    Sustainability Impact
                </h2>

                <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">

                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">

                        <h3 className="text-5xl font-bold text-green-600">
                            15K+
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Products Recovered
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">

                        <h3 className="text-5xl font-bold text-green-600">
                            8.2T
                        </h3>

                        <p className="mt-3 text-gray-600">
                            CO₂ Saved
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">

                        <h3 className="text-5xl font-bold text-green-600">
                            ₹42L
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Value Recovered
                        </p>

                    </div>

                </div>

            </section>

            {/* Footer */}

            <footer className="bg-[#131A22] text-white py-6 text-center">

                <p>
                    © 2026 Amazon Second Life Commerce
                </p>

            </footer>

        </div>
    );
}