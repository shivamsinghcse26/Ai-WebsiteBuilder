import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const LiveSite = () => {
    const [html, setHtml] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    
    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/getbyslug/${slug}`, { withCredentials: true })        
                setHtml(res.data.latestCode)
                setError("")
            } catch (error) {
                console.error("Error fetching website:", error)
                const errorMessage = error.response?.data?.message || error.message || "Failed to load website"
                setError(errorMessage)
                setHtml("")
            } finally {
                setLoading(false)
            }
        }
        handleGetWebsite()
    }, [slug])

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading website...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <p className="text-red-400 mb-4">Error: {error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    if (!html) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <p>No website content available</p>
            </div>
        )
    }

    return (
        <iframe 
            title='Live site' 
            srcDoc={html} 
            className='w-screen h-screen border-none'
            sandbox='allow-scripts allow-forms'
        />
    )
}

export default LiveSite
