export const checkImage = (data) => {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = function () {
            resolve(true);
        };
        img.onerror = function () {
            resolve(false);
        };
        img.src = url;
    });
}

export const processData = (data) => {
    return new Promise(async (resolve, reject) => {
        const mappedData = {};
        try {
            for (const item of data) {
                for (const category of item.categories) {
                    const isValidImage = await checkImage(item.thumbnail[0].url);
                    if (isValidImage) {
                        mappedData[category] = mappedData[category] || [];
                        mappedData[category].push(item);
                    }
                }
            }
            resolve(mappedData);
        } catch (error) {
            reject(error);
        }
    });
}