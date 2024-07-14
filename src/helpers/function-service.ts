const getBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = reject
    })
}

const base64toBlob = (base64Data: string) => {
    var byteString = window.atob(base64Data);
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var int8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: "application/octet-stream" });
};

const isBase64 = (string: string) => {
    // Base64 validation regex
    const base64Regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;

    // Check if the string is a valid Base64 encoded string
    return base64Regex.test(string);
}

const validateInputRequired = (form: any) => {
    console.log("form--> ", form)
    for (let key in form) {
        // console.log("validateInputRequired--> ",form[] )
        if (form[key] == "" ) {
            // console.log("---> ", form[key])
            return false
        }
    }

    return true
}

export { getBase64, validateInputRequired, base64toBlob, isBase64 }