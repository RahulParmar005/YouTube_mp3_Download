import React, { useState } from 'react';

function App() {
    const [URL, setURL] = useState("")
    const [fileName, setFileName] = useState("")

    const handleUrl = (e) => {
        const value = e.target.value;
        setURL(value);
    }

    const handleName = (e) => {
        const value = e.target.value;
        setFileName(value);
    }

    const handleDownload = async () => {
        if (!URL) {
            alert("Please enter a URL");
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
        window.location.href = `${backendUrl}/download?url=${URL}&name=${fileName || "audio"}`
    }

    return (
        <div className='main bg-blue-100 h-screen flex flex-col items-center'>
            <h1 className='heading text-4xl bg-blue-500 border-2 mt-4 rounded-3xl p-4'>Download trending viral mp3 audio from any Insta video</h1>
            <div className='input-container flex flex-col items-center justify-center gap-8 mt-20 w-[70vw]'>
                <input
                    className='h-14 border-2 border-blue-500 hover:border-blue-700 hover:shadow-blue-800 focus:outline-none focus:border-blue-700 transition duration-300 w-[85vw] text-center text-lg rounded-3xl'
                    type='text'
                    placeholder='Enter your video url'
                    value={URL}
                    onChange={handleUrl}
                />
                <input
                    className='h-14 border-2 border-blue-500 hover:border-blue-700 focus:outline-none focus:border-blue-700 transition duration-300 w-[55vw] text-center text-lg rounded-3xl'
                    type='text'
                    placeholder='Create file name'
                    value={fileName}
                    onChange={handleName}
                />
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-3xl text-lg'
                    onClick={handleDownload}
                >
                    Download Mp3
                </button>
            </div>
        </div>
    )
}


export default App;