import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User, ThumbsUp, ThumbsDown, AlertTriangle, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { ethers } from 'ethers';
import contractofissue from "../contracts/Issue.sol/Issue.json"
const IssueDetailsPage = () => {
    const { id } = useParams()
    const [userVote, setUserVote] = useState(null);
    const [agreeCount, setAgreeCount] = useState(15);
    const [disagreeCount, setDisagreeCount] = useState(8);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loder,setloder]=useState(false)
    const [it,setit]=useState()
    const [idisc,setidisc]=useState()
    const [imgdata,setimgdata]=useState()
    const [iown,setiown]=useState()
    useEffect(() => {
        const alldetiles = async () => {
            setloder(true)
            const infuraProvider = new ethers.JsonRpcProvider(
                import.meta.env.VITE_INFURA_URL
            )
            const issuecontarct = new ethers.Contract(
                id,
                contractofissue.abi,
                infuraProvider
            )
            const title = await issuecontarct.I_title();
            const disciribe = await issuecontarct.I_disc();
            const I_img = await issuecontarct.I_img();
            const Owner = await issuecontarct.Owner();
            console.log(title, disciribe, I_img, Owner)
            setimgdata(I_img)
            setit(title)
            setiown(Owner)
            const res = await fetch(`https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${disciribe}`)
            const resdata = await res.json()
            console.log(resdata)
            setidisc(resdata.story)
            setloder(false)
        }
        alldetiles()
    }, [])
    // Sample issue data
    const issue = {
        id: "QmXeMufubVTZ9yih1Rqc2TDovJMi6ZjWrooeFenjz6wstT",
        title: "hiiiii",
        description: "This is a detailed description of the issue that was reported by the user. It contains comprehensive information about the problem, steps to reproduce, expected behavior, and actual behavior observed. The issue affects the core functionality of the blockchain system and needs immediate attention from the development team.",
        author: "0xe9..117d",
        avatar: "/api/placeholder/40/40",
        createdAt: "8/5/2025, 12:00:48 AM",
        status: "Open",
        category: "Bug Report",
        priority: "High",
        image: "https://amber-wonderful-kite-814.mypinata.cloud/ipfs/QmXUtjkUXFeD1uupEqurHTojW7HzVEisSb3uVGf5oAET5K"
    };

    // Sample voting addresses
    const agreeAddresses = [
        "0xe9f2a1b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7",
        "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9",
        "0xf3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5",
        "0xd4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6",
        "0xb5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7"
    ];

    const disagreeAddresses = [
        "0xc6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8",
        "0xe8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0",
        "0xa0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2"
    ];

    const handleVote = (voteType) => {
        if (userVote === voteType) {
            // Remove vote if clicking same button
            setUserVote(null);
            if (voteType === 'agree') {
                setAgreeCount(prev => prev - 1);
            } else {
                setDisagreeCount(prev => prev - 1);
            }
        } else {
            // Change vote or add new vote
            if (userVote === 'agree') {
                setAgreeCount(prev => prev - 1);
                setDisagreeCount(prev => prev + 1);
            } else if (userVote === 'disagree') {
                setDisagreeCount(prev => prev - 1);
                setAgreeCount(prev => prev + 1);
            } else {
                // New vote
                if (voteType === 'agree') {
                    setAgreeCount(prev => prev + 1);
                } else {
                    setDisagreeCount(prev => prev + 1);
                }
            }
            setUserVote(voteType);
        }
    };

    const formatAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900">
            {/* Header */}
            <div>


                <div className="bg-blue-800/30 backdrop-blur-sm border-b border-blue-700/50">
                    <div className="max-w-6xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link to="/allissue"><button className="p-2 rounded-lg bg-blue-700/50 hover:bg-blue-600/50 transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-white" />
                                </button></Link>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">B</span>
                                    </div>
                                    <span className="text-white font-semibold text-xl">BlockChain Pro</span>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-medium transition-colors">
                                New Issue
                            </button>
                        </div>
                    </div>
                </div>

          { loder?<div className='w-full h-[70vh] flex justify-center items-center '><div className='bigloder'></div></div> :     <div className="max-w-6xl mx-auto px-6 py-8">
                    {/* Issue Header */}
                    <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <AlertTriangle className="w-6 h-6 text-cyan-400" />
                                <h1 className="text-2xl font-bold text-white">{it}</h1>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium">
                                    {issue.priority}
                                </span>
                                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                                    {issue.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 text-gray-300 text-sm mb-4">
                            <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{iown}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{issue.createdAt}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                                <span>{issue.category}</span>
                            </div>
                        </div>

                        <div className="text-gray-300 text-sm font-mono bg-blue-900/30 p-3 rounded-lg">
                            ID: {id}
                        </div>
                    </div>

                    {/* Issue Description */}
                    <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                        <p className="text-gray-300 leading-relaxed">
                            {idisc}
                        </p>
                    </div>

                    {/* Image Section */}
                 
                        <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6 mb-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <ImageIcon className="w-5 h-5 mr-2" />
                                Attached Image
                            </h2>

                            {/* Single Image Display */}
                            <div className="relative">
                                <div
                                    className="relative group cursor-pointer overflow-hidden rounded-lg bg-blue-900/30 border border-blue-700/30"
                                    onClick={() => setSelectedImage(issue.image)}
                                >
                                    <img
                                        src={`https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${imgdata}`}
                                        alt="Issue screenshot"
                                        className="w-full h-auto max-h-96 object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Image Modal */}
                        </div>
          

                    {/* Voting Section */}
                    <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Community Voting</h2>
                        <div className="flex items-center space-x-4 mb-6">
                            <button
                                onClick={() => handleVote('agree')}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${userVote === 'agree'
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                    }`}
                            >
                                <ThumbsUp className="w-5 h-5" />
                                <span>Agree ({agreeCount})</span>
                            </button>
                            <button
                                onClick={() => handleVote('disagree')}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${userVote === 'disagree'
                                    ? 'bg-red-500 text-white shadow-lg'
                                    : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                                    }`}
                            >
                                <ThumbsDown className="w-5 h-5" />
                                <span>Disagree ({disagreeCount})</span>
                            </button>
                        </div>

                        {/* Voting Progress Bar */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                                <span>Agreement: {Math.round((agreeCount / (agreeCount + disagreeCount)) * 100)}%</span>
                                <span>Total Votes: {agreeCount + disagreeCount}</span>
                            </div>
                            <div className="w-full bg-blue-900/50 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(agreeCount / (agreeCount + disagreeCount)) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Voting Addresses */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Agree Addresses */}
                        <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6">
                            <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
                                <ThumbsUp className="w-5 h-5 mr-2" />
                                Addresses that Agree ({agreeCount})
                            </h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {agreeAddresses.map((address, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                                    >
                                        <span className="text-green-300 font-mono text-sm">
                                            {formatAddress(address)}
                                        </span>
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    </div>
                                ))}
                                {agreeCount > 5 && (
                                    <div className="text-center py-2">
                                        <span className="text-gray-400 text-sm">
                                            +{agreeCount - 5} more addresses
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Disagree Addresses */}
                        <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6">
                            <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center">
                                <ThumbsDown className="w-5 h-5 mr-2" />
                                Addresses that Disagree ({disagreeCount})
                            </h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {disagreeAddresses.map((address, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                                    >
                                        <span className="text-red-300 font-mono text-sm">
                                            {formatAddress(address)}
                                        </span>
                                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                    </div>
                                ))}
                                {disagreeCount > 3 && (
                                    <div className="text-center py-2">
                                        <span className="text-gray-400 text-sm">
                                            +{disagreeCount - 3} more addresses
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default IssueDetailsPage;