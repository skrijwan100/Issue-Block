import React, { useState } from 'react';
import { Link } from 'react-router';
import { CloudUpload, AlertTriangle, FileText, Upload, Send, BadgeAlert } from 'lucide-react';
import { handleSuccess, handleError } from '../components/Alertmessage';
import contract from "../contracts/Issue.sol/IssueFactory.json"
import { BrowserProvider, ethers } from 'ethers';
import SuccessPage from './DoneIssuePage';
export default function Issuesubmitpage() {
    const [formData, setFormData] = useState({
        title: '',
        story: '',
    });
    const { ethereum } = window;
    const [img, setimg] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [loder, setLoder] = useState(false)
    const [ipfsimge, setipfsimg] = useState('')
    const [ipfsstory, setipfsstory] = useState('')
    const [newpageLoad, setnewpageLoad] = useState(false)
    const [Tnxhash, setTnxhash] = useState('')
    const [issueId, setIssueId] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        setimg(e.target.files[0]);
        console.log(img)
    };

    const handlesUpload = async (e) => {
        e.preventDefault();
        setLoder(true)
        const imgdata = new FormData();
        imgdata.append("file", img)
        const requesturl = `https://api.pinata.cloud/pinning/pinFileToIPFS`
        try {


            const uploadrequest = await fetch(requesturl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                },
                body: imgdata
            })

            const upload = await uploadrequest.json()
            console.log(upload)
            setipfsimg(upload.IpfsHash)
        } catch (error) {
            handleError("Some error happeend ,Try again!")
            setLoder(false)
            console.log(error)
        }

        const requesturlJ = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
        const body = {
            pinataContent: { story: formData.story }
        };
        try {
            const uploadrequest = await fetch(requesturlJ, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const upload = await uploadrequest.json()
            console.log(upload)
            setipfsstory(upload.IpfsHash)
            if (upload) {
                handleSuccess("Upload sucessfully")
                setIsSubmitting(true)
                setLoder(false)
            }
        } catch (error) {
            handleError("Some error happeend ,Try again!")
            setLoder(false)
            console.log(error)
        }


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoder(true)
        if (!formData.title || !formData.story) return handleError('Fill all the input Box');
        setLoder(true)
        const WalletProvider = new BrowserProvider(ethereum);
        const singer = await WalletProvider.getSigner();
        const submitissuetnx = new ethers.Contract(
            import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
            contract.abi,
            singer
        )
        const issuedata = await submitissuetnx.CreateIssue(
            formData.title,
            ipfsstory,
            ipfsimge
        )
        await issuedata.wait();
        console.log(issuedata)
        setIssueId(issuedata.to)
        setTnxhash(issuedata.hash)
        setnewpageLoad(true)
        setFormData({ title: '', story: '' })
        setimg()
        handleSuccess('Issue is Submited')
        setLoder(false)
    };

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

            {/* Main content */}
            {newpageLoad ?
                <>

                    <SuccessPage Tnxhash={Tnxhash} issueId={issueId} />

                </>



                : <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6">
                    <div className="w-full max-w-2xl mx-auto">
                        {/* Page header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <AlertTriangle className="w-12 h-12 text-cyan-400 mr-3" />
                                <h1 className="text-4xl md:text-5xl font-bold text-white">Submit Issue</h1>
                            </div>
                            <p className="text-xl text-gray-300">
                                Report bugs, request features, or share feedback to help us improve
                            </p>
                        </div>

                        {/* Form container */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <div className="space-y-6">
                                {/* Issue Title */}
                                <div>
                                    <label htmlFor="title" className="flex items-center text-white font-semibold mb-3">
                                        <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                                        Issue Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Brief description of the issue..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                        required
                                    />
                                </div>

                                {/* Issue Story */}
                                <div>
                                    <label htmlFor="story" className="flex items-center text-white font-semibold mb-3">
                                        <FileText className="w-5 h-5 mr-2 text-blue-400" />
                                        Issue Story
                                    </label>
                                    <textarea
                                        id="story"
                                        name="story"
                                        value={formData.story}
                                        onChange={handleInputChange}
                                        placeholder="Provide detailed information about the issue, steps to reproduce, expected behavior, etc..."
                                        rows="6"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                                        required
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="flex items-center text-white font-semibold mb-3">
                                        <Upload className="w-5 h-5 mr-2 text-indigo-400" />
                                        Issue Image
                                    </label>
                                    <div
                                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive
                                            ? 'border-indigo-400 bg-indigo-400/10'
                                            : 'border-white/30 hover:border-indigo-400/50'
                                            }`}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />

                                        {img ? (
                                            <div className="space-y-2">
                                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                                    {/* <Upload className="w-8 h-8 text-green-400" /> */}
                                                    <img src={URL.createObjectURL(img)} alt="Preview"
                                                        className="w-full h-full object-cover" />

                                                </div>
                                                {/* <p className="text-green-400 font-semibold">{formData.image.name}</p> */}
                                                <p className="text-gray-400 text-sm">Click to change image</p>
                                            </div>
                                        ) : (

                                            <div className="space-y-2">
                                                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto">
                                                    <Upload className="w-8 h-8 text-indigo-400" />
                                                </div>
                                                <p className="text-white font-semibold">Click to upload</p>
                                                <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    {isSubmitting ?
                                        <>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={!isSubmitting || !formData.title || !formData.story}
                                                className="w-full group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                                            >
                                                {loder ? <div className='w-full h-full flex justify-center items-center '><div className='loder '></div></div> : <div className="flex items-center justify-center space-x-3">

                                                    <Send className="w-6 h-6" />
                                                    <span>Submit</span>

                                                </div>}
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            </button>
                                        </>
                                        : <button
                                            onClick={handlesUpload}
                                            disabled={!img || !formData.story}
                                            className="w-full group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                                        >
                                            {loder ? <div className='w-full h-full flex justify-center items-center '><div className='loder '></div></div> : <div className="flex items-center justify-center space-x-3">

                                                <CloudUpload className="w-6 h-6" />
                                                <span>Upload imge in IPFS</span>
                                            </div>}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        </button>}
                                </div>
                            </div>
                        </div>

                    </div>
                </main>}
            {/* <div className='flex items-center justify-center' style={{marginTop:"50px"}}>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/10 flex items-center justify-cente">
                    <Link to="/allissue"><button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                        <div className="flex items-center space-x-3 ">
                            <BadgeAlert className="w-6 h-6" />
                            <span className='cursor-pointer'>Show All the Issue</span>
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button></Link>
                </div>
            </div> */}
        </div>
    );
}