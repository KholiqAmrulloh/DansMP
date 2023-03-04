import defaultAxios from 'axios'
import * as apiEndPoints from 'constants/api-endpoints'

const axios = defaultAxios.create({
     baseURL: apiEndPoints.BASE_URL,
     timeout: 15000
});

export default axios;