import axios from "axios";

const getSideMenuList = async () => {

    try {
        const res = await axios.get('/api/getSideMenuList.do')
            .then(res => {
                return res.data
            });

        return res;
    } catch (err) {
        return err;
    }
}

export default getSideMenuList;