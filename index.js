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

// const base64url = convertToBase64Canvas('https://maps.googleapis.com/maps/api/staticmap?center=38.416245,-121.466911&zoom=21&size=598x600&markers=icon:https://tinyurl.com/2dt7tb63|38.4162296,-121.4669364&markers=icon:https://tinyurl.com/2dt7tb63|38.4161809,-121.4670027&markers=icon:https://tinyurl.com/2pjtpus6|38.4162362,-121.46688350000001&markers=icon:https://tinyurl.com/2pjtpus6|38.4161715,-121.4669685&markers=icon:https://tinyurl.com/2pjtpus6|38.416277199999996,-121.4669182&maptype=satellite&key=AIzaSyCWYJz8prBHnYy9kXP9junbqQIARXx3pGk')

const base64url = convertToBase64FileSystem('https://maps.googleapis.com/maps/api/staticmap?center=38.416245,-121.466911&zoom=21&size=598x600&markers=icon:https://tinyurl.com/2dt7tb63|38.4162296,-121.4669364&markers=icon:https://tinyurl.com/2dt7tb63|38.4161809,-121.4670027&markers=icon:https://tinyurl.com/2pjtpus6|38.4162362,-121.46688350000001&markers=icon:https://tinyurl.com/2pjtpus6|38.4161715,-121.4669685&markers=icon:https://tinyurl.com/2pjtpus6|38.416277199999996,-121.4669182&maptype=satellite&key=AIzaSyCWYJz8prBHnYy9kXP9junbqQIARXx3pGk');
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
