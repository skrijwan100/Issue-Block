import React, { useState, useEffect } from 'react';
import { CheckCircle, Home, Copy, ExternalLink, Shield } from 'lucide-react';

export default function SuccessPage({Tnxhash,issueId}) {
  const [copied, setCopied] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Sample transaction hash
  const transactionHash = Tnxhash;
  const toAddress = issueId;

  useEffect(() => {
    // Animate content appearance
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatHash = (hash) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }}></div>
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6">
        <div className={`w-full max-w-3xl mx-auto transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Success Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl">
            
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 w-24 h-24 border-4 border-green-400/30 rounded-full animate-ping"></div>
                <div className="absolute inset-2 w-20 h-20 border-2 border-green-400/20 rounded-full animate-ping delay-150"></div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Submited
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> Successfully!</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your Issue has been successfully deployed and is now live on the network.
              </p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-6 mb-10">
              
              {/* To Address */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-2 flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                      Campaign Address:
                    </h3>
                    <p className="text-white font-mono text-lg">{formatHash(toAddress)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(toAddress)}
                      className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-all duration-200 group"
                      title="Copy address"
                    >
                      <Copy className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                    </button>
                    <a target='_blank' href={`https://sepolia.etherscan.io/address/${toAddress}`}><button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 group">
                      <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </button></a>
                  </div>
                </div>
              </div>

              {/* Transaction Hash */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-blue-400 font-semibold mb-2 flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      Transaction Hash:
                    </h3>
                    <p className="text-white font-mono text-lg">{formatHash(transactionHash)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(transactionHash)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 group"
                      title="Copy transaction hash"
                    >
                      <Copy className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </button>
                   <a target='_blank' href={`https://sepolia.etherscan.io/tx/${transactionHash}`}> <button className="p-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg transition-all duration-200 group">
                      <ExternalLink className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                    </button></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center space-x-3">
                  <Home className="w-6 h-6" />
                  <span>Go To Home Page</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
               <a target='_blank' href={`https://sepolia.etherscan.io/tx/${transactionHash}`}><button className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/30">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-6 h-6" />
                  <span>View on Explorer</span>
                </div>
              </button></a>
            </div>

            {/* Copy feedback */}
            {copied && (
              <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
                ✓ Copied to clipboard!
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Your campaign is now live and ready to receive contributions. Share the campaign address with your community!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}