import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL

const shortenUrl = async (originalUrl)=>{
    let res = await axios.post(`${baseURL}/url/shorten`,{
        originalUrl
    })
    return res.data
}

const getStats = async (shortCode)=>{
    let res = await axios.get(`${baseURL}/url/${shortCode}/stats`)
    return res.data.data
}

export {shortenUrl,getStats}