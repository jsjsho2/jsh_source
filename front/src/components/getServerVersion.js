import axios from "axios";

const getServerVersion = async () => {

    try {
        const res = await axios.get('/api/getServerVersion.do')
            .then(res => {
                return res.data
            });

        {console.log('버전리턴')}
        return res;
    } catch (err) {
        return 'Version Check Error';
    }
}

export default getServerVersion;