import { useRouter } from "next/router";
import { AlertCircle } from "lucide-react";

export default function SubscriptionCancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-red-100 p-6 rounded-md shadow-lg">
        <AlertCircle className="text-red-500 w-12 h-12 mx-auto" />
        <h1 className="text-3xl font-bold mt-4">Subscription Canceled</h1>
        <p className="text-gray-700 mt-2">Your subscription has been canceled successfully.</p>
        <button
          onClick={() => router.push("/subscription")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Subscription Plans
        </button>
      </div>
    </div>
  );
}