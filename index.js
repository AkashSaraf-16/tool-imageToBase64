function convertToBase64Canvas(url) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'Anonymous';
    image.addEventListener('load', (e) => {
        const root = document.getElementById('root');
        root?.appendChild(image);
        ctx?.drawImage(image, 0, 0, 100, 100 * image.height / image.width);
        const jpegUrl = canvas.toDataURL('image/jpeg');
        console.log(jpegUrl);
        return jpegUrl;
    });
}

async function convertToBase64FileSystem(url) {
    const staticMapUrl = await fetch(url);
    const imgBlob = await staticMapUrl.blob();
    const imgPromise = new Promise((resolve) => {
        const blobReader = new FileReader();
        blobReader.readAsDataURL(imgBlob);
        blobReader.onloadend = () => resolve(blobReader.result);
    });
    return imgPromise;
}

// const base64url = convertToBase64Canvas(url);

const base64url = convertToBase64FileSystem(url);
base64url.then(val => base64ToImage(val));

function base64ToImage(url) {
    var image = new Image();
    image.src = url;
    image.crossOrigin = 'Anonymous';
    const canvas = document.createElement("canvas");
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    console.log(canvas.height, canvas.width);
    const ctx = canvas.getContext("2d");
    image.addEventListener('load', (e) => {
        const root = document.getElementById('root');
        root?.appendChild(image);
        ctx?.drawImage(image, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        console.log(pngUrl);
        return pngUrl;
    });
}
