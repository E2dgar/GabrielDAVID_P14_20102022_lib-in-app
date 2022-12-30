const get = (url: string) => {
    return async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json;
    };
};

export { get };
