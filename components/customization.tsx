"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { formatToIDR, navigateToCheckout } from "@/lib/checkout";
import { useRouter } from "next/navigation";

export function Customization() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bmi, setBmi] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch("/api/user/profile");
          const data = await response.json();
          setUserData(data.user);

          // Calculate BMI if height and weight exist
          if (data.user.height && data.user.weight) {
            const heightInMeters = data.user.height / 100;
            const bmiValue =
              data.user.weight / (heightInMeters * heightInMeters);
            setBmi(parseFloat(bmiValue.toFixed(1)));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session?.user?.id]);

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const options = [
    {
      title: "Fabric",
      image: "/fabric.jpg",
      description: "Choose your preferred fabric",
    },
    {
      title: "Designs",
      image: "/design.jpg",
      description: "Select your favorite design",
    },
    {
      title: "Measurement",
      image: "/measurement.jpg",
      description: loading
        ? "Loading measurements..."
        : userData?.height && userData?.weight
        ? `Height: ${userData.height}cm
             Weight: ${userData.weight}kg
             BMI: ${bmi} (${getBmiCategory(bmi!)})`
        : "Please complete your profile for BMI calculation",
    },
  ];

  // Calculate price based on BMI category
  const calculatePrice = () => {
    if (!bmi) return 150000; // Base price if no BMI

    // Price adjustments based on BMI category
    if (bmi < 18.5) return 150000; // Underweight
    if (bmi < 25) return 175000; // Normal weight
    if (bmi < 30) return 200000; // Overweight
    return 225000; // Obese
  };

  const handleBuyNow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default behavior
    console.log("Buy Now clicked - Event triggered");

    if (!userData?.height || !userData?.weight) {
      console.log("Missing measurements");
      return;
    }

    const price = calculatePrice();
    console.log("Calculated price:", price);

    try {
      console.log("Attempting navigation...");
      await navigateToCheckout(router, {
        productName: "Custom Fitted Pants",
        price: price,
        quantity: 1,
        imageUrl: "/measurement.jpg",
      });
    } catch (error: unknown) {
      console.error(
        "Navigation error:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#8B1D24] mb-12">
          CUSTOMIZABILITY
        </h2>

        {/* Main content container */}
        <div className="space-y-8">
          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* First Two Cards */}
            {options.slice(0, 2).map((option) => (
              <div key={option.title} className="relative group cursor-pointer">
                <div className="relative aspect-square">
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors rounded-lg" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-white text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Measurement Card */}
            <div className="relative group cursor-pointer">
              <div className="relative aspect-square">
                <Image
                  src={options[2].image}
                  alt={options[2].title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors rounded-lg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {options[2].title}
                  </h3>
                  <p className="text-sm text-white text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                    {options[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full bg-white text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !userData?.height || !userData?.weight}
          >
            {loading
              ? "Loading..."
              : !userData?.height || !userData?.weight
              ? "Complete Profile to Order"
              : `Buy Now - ${formatToIDR(calculatePrice())}`}
          </button>
        </div>
      </div>
    </section>
  );
}
