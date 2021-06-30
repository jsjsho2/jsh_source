import axios from "axios";

const getPageInfo = async (menuCode) => {
    let params = new URLSearchParams();
    params.append('menuCode', menuCode);

    try {
        const res = await axios.post('/api/getPageInfo.do', params)
            .then(res => {
                return res.data
            });

        return res;
    } catch (err) {
        return err;
    }
}

export default getPageInfo;