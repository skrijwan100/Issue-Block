import React, { useState } from 'react';
import { Wallet, Shield, Zap, Globe } from 'lucide-react';
import { ethers } from 'ethers';
import Issuesubmitpage from './Issuesubmitpage';
export default function BlockchainHomepage() {
    const [address, setAddress] = useState()
    const [bal, setBal] = useState()
    const [lode, setload] = useState(false)
    const [show, setShow] = useState()
    const [navbtn,setnavbtn]=useState(true)
    const { ethereum } = window;
    const handleconnect = async () => {
        setload(true)
        if (!ethereum) {
            return alert('Install Window');
        }
        const account = await ethereum.request({
            method: 'eth_requestAccounts',
        })
        const fulladdress = account[0]
        const showaddress = `${fulladdress.slice(0, 4)}...${fulladdress.slice(-4)}`
        setAddress(showaddress)
        const eth_bal = await ethereum.request({
            method: 'eth_getBalance',
            params: [
                account[0], 'latest'
            ]
        })
        const fullbal = ethers.formatEther(eth_bal)
        const showbal = fullbal.slice(0, 6)
        setBal(showbal)
        setload(false)
        setShow(true)
        setnavbtn(false)

    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}></div>

            {/* Header */}
            <header className="relative z-10 p-6">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-xl font-bold">IssueBlock</span>
                    </div>
                    {navbtn?"":<div
                        className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(address)}
                        title="Click to copy address"
                    >
                        <div style={{height:"15px",width:"15px",backgroundColor:"#00ff41",borderRadius:"50%"}}>

                        </div>

                        {/* Address & Balance */}
                        <div className="flex flex-col">
                            <span className="text-sm font-mono truncate max-w-[150px]">{address}</span>
                            <span className="text-xs opacity-80">{bal} SpETH</span>
                        </div>
                    </div>}

                </nav>
            </header>

            {/* Main content */}
            {show ? <Issuesubmitpage/> : <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Hero text */}
                    <h1 className="text-5xl md:text-7xl font-bold text-[#2e6dff] mb-6 leading-tight">
                        Issue In
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent"> Blockchain</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-50 mb-12 leading-relaxed">
                        Submit any Issue here
                    </p>

                    {/* Connect wallet section */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/10">
                        <button onClick={handleconnect} className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                            {lode ? <div className='w-full h-full flex justify-center items-center '><div className='loder '></div></div> : <div className="flex items-center space-x-3 ">
                                <Wallet className="w-6 h-6" />
                                <span className='cursor-pointer'>Connect MetaMask</span>
                            </div>}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Features grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                            <p className="text-gray-400">Ultra-fast transaction processing with minimal gas fees</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
                            <p className="text-gray-400">Military-grade security with audited smart contracts</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <Globe className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Decentralized</h3>
                            <p className="text-gray-400">Fully decentralized network with global accessibility</p>
                        </div>
                    </div>
                </div>
            </main>
            }
            {/* Footer */}
            <footer className="relative z-10 text-center py-8 text-gray-400">
                <p>&copy; 2025 BlockChain Pro. Building the future of decentralized finance.</p>
            </footer>
        </div>
    );
}
