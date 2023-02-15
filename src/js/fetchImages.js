import axios from "axios";
// const axios = require('axios').default;

export default async function fetchImages(name, page) {
    const url = 'https://pixabay.com/api/';
    const key = '33617461-7c32c6af14cfde54b4496ca9a';
    const filters = `?key=${key}&q=${name}&image_type=photo$orientation=horizontal$safesearch=true&page=${page}&per_page=40`;

    return await axios.get(`${url}${filters}`).then(response => response.data);
}