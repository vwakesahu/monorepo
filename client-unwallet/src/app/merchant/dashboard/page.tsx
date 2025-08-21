"use client";
import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  Code,
  Globe,
  CreditCard,
  Home,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";

const MerchantDashboard = () => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "revenue">(
    "dashboard"
  );
  const [merchantData, setMerchantData] = useState({
    username: "your-store-name",
    email: "merchant@example.com",
    apiKey: "sk_test_1234567890abcdef",
    isLive: false,
  });
  const [userUsername, setUserUsername] = useState<string | null>(null);
  const [isLoadingUsername, setIsLoadingUsername] = useState(true);

  const { exportWallet } = usePrivy();

  // Mock revenue data - in a real app, this would come from your backend
  const [revenueData] = useState([
    {
      address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      token: "USDT",
      chain: "Morph Holesky",
      amount: "150.00",
      txhash:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    {
      address: "0x8ba1f109551bD432803012645Hac136c772c3c2",
      token: "USDT",
      chain: "Morph Holesky",
      amount: "75.50",
      txhash:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
    {
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      token: "USDT",
      chain: "Morph Holesky",
      amount: "299.99",
      txhash:
        "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    },
  ]);

  const { authenticated, ready, user, logout } = usePrivy();
  const { address } = useAccount();

  // Function to get username from EOA address
  const getUsername = async () => {
    if (!address) return;
    console.log("eoa", address);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/resolve-username-by-eoa`,
        {
          eoaaddress: address,
        }
      );

      if (data.data.username) {
        setUserUsername(data.data.username);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      logout();
    } finally {
      setIsLoadingUsername(false);
    }
  };

  // In a real app, you'd fetch this from your authentication system
  useEffect(() => {
    // Simulate fetching merchant data
    const storedMerchant = localStorage.getItem("merchantData");
    if (storedMerchant) {
      setMerchantData(JSON.parse(storedMerchant));
    }
  }, []);

  // Fetch username when address is available
  useEffect(() => {
    if (authenticated && address) {
      getUsername();
    } else if (!authenticated) {
      setIsLoadingUsername(false);
    }
  }, [authenticated, address]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(type);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  const basicIntegrationCode = `<!-- Add this div where you want the payment widget -->
<div id="crypto-payment" 
     data-noname-payment 
     data-merchant="${userUsername || merchantData.username}"
     data-amount="99.99"
     data-product="Your Product Name"
     data-description="Product description"></div>

<!-- Include the NoName payment widget script -->
<script src="https://cdn.noname.com/widget/v1/merchant-widget.js"></script>

<!-- Listen for successful payments -->
<script>
document.addEventListener('noname-payment-success', (event) => {
    const { amount, token, stealthData } = event.detail;
    console.log('Payment received:', amount, token.symbol);
    
    // Your success logic here
    alert('Payment successful! Order confirmed.');
    window.location.href = '/order-success';
});
</script>`;

  const customIntegrationCode = `<div id="custom-payment-widget"></div>

<script src="https://cdn.noname.com/widget/v1/merchant-widget.js"></script>
<script>
// Custom widget with your branding
const widget = new NoNamePaymentWidget({
    merchantUsername: '${userUsername || merchantData.username}',
    defaultAmount: '149.99',
    productName: 'Your Product',
    
    // Customize to match your brand
    theme: {
        primaryColor: '#your-brand-color',
        borderRadius: '8px',
        fontFamily: 'your-font'
    }
});

widget.renderIn('custom-payment-widget');

// Handle payment success
document.addEventListener('noname-payment-success', (event) => {
    // Send to your backend
    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: event.detail.amount,
            currency: event.detail.token.symbol,
            paymentAddress: event.detail.stealthData.address
        })
    });
});
</script>`;

  const testPaymentUrl = userUsername
    ? `${window.location.origin}/${userUsername}/qrcode`
    : `${window.location.origin}/your-store-name/qrcode`;

  // Show loading state while fetching username
  if (isLoadingUsername && authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">
            Loading your merchant dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Unwallet</h1>
                {!authenticated && (
                  <p className="text-sm text-red-600 mt-2">
                    Please log in to access your merchant dashboard
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div
                  className={`w-2 h-2 rounded-full ${
                    merchantData.isLive ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
                {merchantData.isLive ? "Live Mode" : "Test Mode"}
              </div>
              {isLoadingUsername ? (
                <p className="font-mono text-sm text-gray-500">Loading...</p>
              ) : userUsername ? (
                <p className="font-mono text-sm text-gray-700">
                  @{userUsername}
                </p>
              ) : (
                <p className="font-mono text-sm text-gray-500">
                  Not authenticated
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === "dashboard" ? "default" : "outline"}
                size={"lg"}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={activeTab === "revenue" ? "default" : "outline"}
                size={"lg"}
                onClick={() => setActiveTab("revenue")}
              >
                Revenue
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {/* Payment URL */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Your Payment URL
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <code className="text-sm text-gray-700 break-all">
                      {testPaymentUrl}
                    </code>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(testPaymentUrl, "url")}
                      className="flex items-center gap-1"
                    >
                      {isCopied === "url" ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {isCopied === "url" ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(testPaymentUrl, "_blank")}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Test
                    </Button>
                  </div>
                </div>

                {/* Your Wallet Address */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Your Wallet Address
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <code className="text-sm text-gray-700 break-all">
                      {address ?? "No wallet connected"}
                    </code>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      address && copyToClipboard(address, "wallet")
                    }
                    disabled={!address}
                    className="flex items-center gap-1"
                  >
                    {isCopied === "wallet" ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {isCopied === "wallet" ? "Copied!" : "Copy"}
                  </Button>
                </div>

                {/* Export Wallet */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Export Wallet
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Export your wallet data for backup or migration purposes
                  </p>
                  <Button
                    onClick={exportWallet}
                    disabled={!authenticated}
                    className="w-full"
                    variant="outline"
                  >
                    Export my wallet
                  </Button>
                </div>

                {/* API Key */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">API Key</h3>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3 truncate text-sm font-mono text-muted-foreground">
                    {merchantData.apiKey}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(merchantData.apiKey, "apikey")
                    }
                    className="flex items-center gap-1"
                  >
                    {isCopied === "apikey" ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {isCopied === "apikey" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Integration Code */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Integration */}
              <div
                id="basic-integration"
                className="bg-white rounded-lg shadow-sm border"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Quick Start Integration
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Copy and paste this code into your website
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        copyToClipboard(basicIntegrationCode, "basic")
                      }
                      className="flex items-center gap-2"
                    >
                      {isCopied === "basic" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {isCopied === "basic" ? "Copied!" : "Copy Code"}
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{basicIntegrationCode}</code>
                    </pre>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      ✨ What this does:
                    </h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>
                        • Creates a &quot;Pay with Crypto&quot; button on your
                        website
                      </li>
                      <li>
                        • Automatically generates unique payment addresses
                      </li>
                      <li>• Shows QR codes for easy mobile payments</li>
                      <li>• Handles payment confirmations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Custom Integration */}
              <div
                id="custom-integration"
                className="bg-white rounded-lg shadow-sm border"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Custom Integration
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Advanced customization with your branding
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(customIntegrationCode, "custom")
                      }
                      className="flex items-center gap-2"
                    >
                      {isCopied === "custom" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {isCopied === "custom" ? "Copied!" : "Copy Code"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Test Instructions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🧪 Test Your Integration
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Add the code to your website
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Copy the integration code above and paste it into your
                        HTML
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Test with the direct URL
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Visit{" "}
                        <code className="bg-gray-100 px-1 rounded">
                          /{userUsername || merchantData.username}/qrcode
                        </code>{" "}
                        to test payment generation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Make a test payment
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Use testnet tokens to verify the payment flow works
                        correctly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Go live!</h4>
                      <p className="text-gray-600 text-sm">
                        Once testing is complete, you&apos;re ready to accept
                        real payments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Revenue History
              </h2>
              <p className="text-gray-600 mt-1">
                Track all your crypto payments
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Token
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {revenueData.map((payment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {truncateAddress(payment.address)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {payment.token}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.chain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        <div className="flex items-center gap-2">
                          <span>{truncateHash(payment.txhash)}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              copyToClipboard(payment.txhash, `tx-${index}`)
                            }
                            className="h-6 w-6 p-0"
                          >
                            {isCopied === `tx-${index}` ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {revenueData.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500">No revenue data available yet.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start accepting payments to see your revenue here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;
