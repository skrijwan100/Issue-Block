import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ethers } from 'ethers';
import { Shield, AlertTriangle, Plus, Eye, MessageSquare, Image, User, Calendar } from 'lucide-react';
import issuecontract from "../contracts/Issue.sol/IssueFactory.json"
export default function Issuepage() {
    // Sample issues data
    const { ethereum } = window;
    const [disc, setdisc] = useState('')
    useEffect(() => {
        const fecthallissue = async () => {
            setloder(true)
            const infuraProvider = new ethers.JsonRpcProvider(
                import.meta.env.VITE_INFURA_URL
            )
            const issuecontratcget = new ethers.Contract(
                import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
                issuecontract.abi,
                infuraProvider
            )
            const depocontract = await issuecontratcget.filters.saveIssue()
            const event = await issuecontratcget.queryFilter(depocontract)
            console.log(event)
            setissues(event)
            setloder(false)

        }
        fecthallissue();

    }, [])

    const fecthstory = async (story) => {
        
        const res = await fetch(`https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${story}`)
        const resdata = await res.json()
        console.log(resdata)
        // return resdata;

    }
    const [issues, setissues] = useState([])
    const [loder, setloder] = useState(false)

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
                        <span className="text-white text-xl font-bold">BlockChain Pro</span>
                    </div>
                    <Link to="/"><button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer">
                        <Plus className="w-5 h-5" />
                        <span>New Issue</span>
                    </button></Link>
                </nav>
            </header>

            {/* Main content */}
            <main className="relative z-10 px-6 pb-12">
                <div className="max-w-6xl mx-auto">

                    {/* Page header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <AlertTriangle className="w-12 h-12 text-cyan-400 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Issues Dashboard</h1>
                        </div>
                        <p className="text-xl text-gray-300">
                            Track and manage all reported issues and feature requests
                        </p>
                    </div>

                    {/* Controls - Removed for now */}

                    {/* Issues list */}
                    {loder ? <div className='w-full h-[70vh] flex justify-center items-center '><div className='bigloder'></div></div> : <div className="space-y-6">
                        {issues.map((data, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex gap-6">
                                    {/* Issue Image */}
                                    <div className="flex-shrink-0">
                                        {data.args.img ? (
                                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                                <img
                                                    src={`https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${data.args.img}`}
                                                    alt="Issue screenshot"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                <Image className="w-8 h-8 text-gray-500" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Issue Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-white hover:text-cyan-400 transition-colors mb-2">
                                                    {data.args.title}
                                                </h3>
                                                <p className="text-gray-300 mb-3">
                                                    {data.args.disc}
                                                </p>

                                            </div>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-400 space-x-6">
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                <span>{data.args.owner.slice(0, 4)}...{data.args.owner.slice(-4)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{new Date(parseInt(data.args.time) * 1000).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>
            </main>
        </div>
    );
}