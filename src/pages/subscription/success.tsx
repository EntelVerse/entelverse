import { useRouter } from "next/router";
import { Check } from "lucide-react";

export default function SubscriptionSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-green-100 p-6 rounded-md shadow-lg">
        <Check className="text-green-500 w-12 h-12 mx-auto" />
        <h1 className="text-3xl font-bold mt-4">Subscription Successful</h1>
        <p className="text-gray-700 mt-2">Your subscription has been activated.</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
