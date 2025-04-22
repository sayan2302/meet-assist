import axios from './axiosInstance';


export const createMeeting = async (payload) => {
    try {
        return await axios.post('/dashboard/create-meeting', payload)
    } catch (error) {
        return error.response.data.message;
    }
};
