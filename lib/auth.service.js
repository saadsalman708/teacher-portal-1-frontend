import api from "./api";

const loginAPI = async ( email , password ) => {
    const res = await api.post("/auth/login" , {email , password});
    return res.data;
};

export default loginAPI;