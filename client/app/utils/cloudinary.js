const baseUrl = 'https://res.cloudinary.com/dj82hrksp/image/upload/';

export const buildImageUrl = (imageUrl, height, width, density) => {
    let url = baseUrl;

    url += 'c_fill,g_auto,';
    url += 'h_' + height + ',w_' + width;

    if (density) {
        url += ',dpr_' + density + '.0/';
    } else {
        url += '/';
    }

    return url + imageUrl;
};
