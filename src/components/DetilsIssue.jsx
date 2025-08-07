import React, { useEffect, useState } from 'react';
import {Vote , ArrowLeft, Calendar, User, ThumbsUp, ThumbsDown, AlertTriangle, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { ethers } from 'ethers';
import { BrowserProvider } from 'ethers';
import contractofissue from "../contracts/Issue.sol/Issue.json"
const IssueDetailsPage = () => {
    const { id } = useParams()
    const { ethereum } = window;
    const [loder, setloder] = useState(false)
    const [it, setit] = useState()
    const [idisc, setidisc] = useState()
    const [imgdata, setimgdata] = useState()
    const [iown, setiown] = useState()
    const [Address, setAddress] = useState()
    const [Bal, setBal] = useState()
    const [Tnxload, setTnxload] = useState(false)
    const [dTnxload, setdTnxload] = useState(false)
    const [votedata, setvotedata] = useState([])
    const [reload, setreload] = useState(false)
    useEffect(() => {
        const alldetiles = async () => {
            setloder(true)
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
            const allvote = await issuecontarct.filters.Showvote()
            const voteevent = await issuecontarct.queryFilter(allvote)
            console.log(voteevent)
            setvotedata(voteevent)
            // console.log(title, disciribe, I_img, Owner)
            setimgdata(I_img)
            setit(title)
            setiown(`${Owner.slice(0, 4)}...${Owner.slice(-4)}`)
            const res = await fetch(`https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${disciribe}`)
            const resdata = await res.json()
            console.log(resdata)
            setidisc(resdata.story)
            setloder(false)
        }
        alldetiles()
        setreload(false)
    }, [reload])

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

    const formatAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };
    const handleaggrevote = async (e) => {
        e.preventDefault();
        setTnxload(true)
        const WalletProvider = new BrowserProvider(ethereum)
        const signer = await WalletProvider.getSigner();
        const uservote = new ethers.Contract(
            id,
            contractofissue.abi,
            signer
        )
        const uservoteTnx = await uservote.VoteforIssue(1)
        await uservoteTnx.wait();
        console.log(uservoteTnx)
        setTnxload(false)
        setreload(true)
    }
    const handledisaggrevote = async (e) => {
        e.preventDefault();
        setdTnxload(true)
        const WalletProvider = new BrowserProvider(ethereum)
        const signer = await WalletProvider.getSigner();
        const uservote = new ethers.Contract(
            id,
            contractofissue.abi,
            signer
        )
        const uservoteTnx = await uservote.VoteforIssue(0)
        await uservoteTnx.wait();
        console.log(uservoteTnx)
        setdTnxload(false)
        setreload(true)
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900">
            {/* Header */}
            <div>


                {loder ? "" : <div className="bg-blue-800/30 backdrop-blur-sm border-b border-blue-700/50">
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
                                    <span className="text-white font-semibold text-xl">IssueBlock</span>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                                onClick={() => navigator.clipboard.writeText(Address)}
                                title="Click to copy address"
                            >
                                <div style={{ height: "15px", width: "15px", backgroundColor: "#00ff41", borderRadius: "50%" }}>

                                </div>

                                {/* Address & Balance */}
                                <div className="flex flex-col">
                                    <span className="text-sm font-mono truncate max-w-[150px]">{Address}</span>
                                    <span className="text-xs opacity-80">{Bal} SpETH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

                {loder ? <div className='w-full h-[70vh] flex justify-center items-center '><div className='bigloder'></div></div> : <div className="max-w-6xl mx-auto px-6 py-8">
                    {/* Issue Header */}
                    <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <AlertTriangle className="w-6 h-6 text-cyan-400" />
                                <h1 className="text-2xl font-bold text-white">{it}</h1>
                            </div>
                            {/* <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium">
                                    {issue.priority}
                                </span>
                                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                                    {issue.status}
                                </span>
                            </div> */}
                        </div>

                        <div className="flex items-center space-x-6 text-gray-300 text-sm mb-4">
                            <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{iown}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{Date.now()}</span>
                            </div>
                        </div>

                        <div className="text-gray-300 text-sm font-mono bg-blue-900/30 p-3 rounded-lg">
                            ID:{id}
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
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <button
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all  bg-green-500 text-white shadow-lg cursor-pointer hover:bg-green-700`}
                                onClick={handleaggrevote}
                            >  {Tnxload ? <div className='w-full flex justify-center items-center '><div className='loder'></div></div> : <div className='flex '>
                                <ThumbsUp className="w-5 h-5" />
                                <span>Agree</span>
                            </div>}
                            </button>
                            <button
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all  bg-red-500 text-white shadow-lg cursor-pointer hover:bg-red-700`}
                                onClick={handledisaggrevote}
                            >{dTnxload ? <div className='w-full flex justify-center items-center '><div className='loder'></div></div>
                                : <div className='flex items-center justify-center'>
                                    <ThumbsDown className="w-5 h-5" />
                                    <span>Disagree</span>
                                </div>}
                            </button>
                        </div>

                        {/* Voting Progress Bar */}
                        <div className="mb-4">
                            <div className="flex justify-center text-sm text-gray-300 mb-2">
                                <span>Total Votes:{votedata.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Voting Addresses */}
                    <div className="flex items-center justify-center gap-6">
                        {/* Agree Addresses */}
                        <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6">
                            <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center w-[50vw]">
                                <Vote  className="w-5 h-5 mr-2" />
                                Addresses that Agree and Disagree
                            </h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {votedata.map((data, index) => (
                                    
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between ${data.args.Votevalue == 1 ? `bg-green-500/10 border border-green-500/20 ` : `bg-red-500/10 border border-red-500/20 `}rounded-lg p-3 `}
                                    >
                                        
                                       
                                        <span className={`${data.args.Votevalue == 1 ? `text-green-300 ` : `text-red-300 `} font-mono text-sm`}>
                                            {`${data.args.Voter.slice(0, 6)}...${data.args.Voter.slice(-4)}`}
                                        </span>
                                        <span>{new Date(parseInt(data.args.time) * 1000).toLocaleString()}</span>
                                        <div className={`${data.args.Votevalue == 1 ? `bg-green-500 ` : ` bg-red-500 `} rounded-4xl p-2 text-white font-bold`}>{data.args.Votevalue == 1 ? 'Agree' : 'Disagree'}</div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default IssueDetailsPage;