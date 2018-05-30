const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*" // Required for CORS support to work,
};

const responseJson = (statusCode, obj) => {
    return {
        statusCode: statusCode,
        headers: headers,
        body: JSON.stringify(obj)
    }
}

export default responseJson;

