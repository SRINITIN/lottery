const axios = require("axios");


module.exports = {
    getLotteryData: () => axios({
        method:"GET",
        url : 'api',
    }) 
}