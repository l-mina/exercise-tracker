import axios from "axios"
import { create } from "zustand"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

export const refreshAccessToken = create((set,get) => ({
    loading: false,
    error: null,

    
    
}))

