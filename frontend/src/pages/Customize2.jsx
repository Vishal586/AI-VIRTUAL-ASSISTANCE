import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";

const Customize2 = () => {
    const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)
    const [assistanceName, setAssistanceName] = useState(userData?.AssistantName || "")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleUpdateAssistant = async () => {
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("assistantName", assistanceName)
            if (backendImage) {
                formData.append("assistantImage", backendImage)
            } else {
                formData.append("imageUrl", selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
            setLoading(false)
            console.log(result.data)
            setUserData(result.data)

            navigate("/")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative'>
            <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={() => navigate("/customize")} />
            <h1 className='text-white mb-[40px] text-[30px] text-center '>Enter Your <span className='text-blue-200'>Assistant Name</span> </h1>
            <input type="text" placeholder='eg. shifra' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setAssistanceName(e.target.value)} value={assistanceName} />
            {assistanceName && <button className='min-w-[300px] h-[60px] mt-[30px] text-black font-semibold cursor-pointer  bg-white rounded-full text-[19px] ' disabled={loading} onClick={() => {
                handleUpdateAssistant()
            }
            } >{!loading ? "Create Your Assistant" : "Loading..."}</button>}
        </div>
    )
}

export default Customize2
