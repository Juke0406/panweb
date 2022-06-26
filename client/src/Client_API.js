export const handleData = (URL, mode, data) => new Promise(async(resolve, reject) => {
    try {
        if (mode === "GET") {
            var config = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            };
        } else
        if (mode === "POST") {
            config = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(data)
            }
        }
        fetch(URL, config)
        .then(result => resolve(result))
    }
    catch(error) {
        reject(error)
    }
});