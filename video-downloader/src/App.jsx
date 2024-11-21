import React from "react"
import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("")

  const handleInput = (e) => {
    e.preventDefault()

    setURL(e.target.value)
  }
  
  const downloadVideo = async (e) => {
    e.preventDefault()

    const options = {
      method: 'GET',
      url: 'https://youtube-data8.p.rapidapi.com/video/streaming-data/',
      params: {id: URL},
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'youtube-data8.p.rapidapi.com',
        'content-type': 'application/json'
      }
    };

    try {
      const rspn = await axios.request(options)
      console.log(rspn?.data?.formats[Number(0)]?.url)
      window.location.href = rspn?.data?.formats[Number(0)]?.url
    } catch (error) {
      console.log(error)
    }
  }



  console.log(URL)

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-red-500 via-red-700 to-red-950">
      <div  className="flex items-center justify-center gap-x-2">
        {/* Youtube logo, text */}
        <FaYoutube size={60} className="text-white"/>
        <p className="text-4xl font-bold text-white">
          VIDEO
        </p>
        <p className="text-4xl font-bold radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops) from-red-600 to-red-950">
          DOWNLOADER
        </p>
      </div>

      <div className="flex items-center justify-center gap-x-2">
        <input type="url" className="h-10 w-96 border-none outline-none px-5 rounded-full shadow-lg" onChange={handleInput}/>
        <button className="h-10  bg-red-800 text-lg font-bold text-black hover:bg-red-950 hover:text-white px-2 rounded-full hover:text-sm  border-none outline-none" onClick={downloadVideo}>Download</button>
      </div>
    </div>
  )
}

export default App