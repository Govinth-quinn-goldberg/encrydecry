// async function handleClick() {
//     const input = document.getElementById("myfile");
//     const userFile = input.files[0];

//     const secretKey = document.getElementById("skey").value;

//     if (!userFile) {
//         console.log("No image selected");
//         return;
//     }

//     if (!secretKey) {
//         console.log("Enter a secret key");
//         return;
//     }

//     // Read image as bytes
//     const buffer = await userFile.arrayBuffer();
//     const imageData = new Uint8Array(buffer);

//     // Convert user's password into a fixed 256-bit key
//     const encoded = new TextEncoder();
//     const keyData = encoded.encode(secretKey);

//     const hash = await crypto.subtle.digest("SHA-256", keyData);

//     const cipherKey = await crypto.subtle.importKey(
//         "raw",
//         hash,
//         {
//             name: "AES-GCM"
//         },
//         false,
//         ["encrypt"]
//     );

//     // AES-GCM needs a 12-byte IV/nonce
//     const nonce = crypto.getRandomValues(new Uint8Array(12));

//     // Encrypt image
//     const cipherImg = await crypto.subtle.encrypt(
//         {
//             name: "AES-GCM",
//             iv: nonce
//         },
//         cipherKey,
//         imageData
//     );

//     // Convert bytes to Base64 so they can be stored in JSON
//     function arrayBufferToBase64(buffer) {
//         const bytes = new Uint8Array(buffer);
//         let binary = "";

//         for (let i = 0; i < bytes.length; i++) {
//             binary += String.fromCharCode(bytes[i]);
//         }

//         return btoa(binary);
//     }

//     const encryptedFile = {
//         algorithm: "AES-GCM",
//         iv: arrayBufferToBase64(nonce),
//         data: arrayBufferToBase64(cipherImg),
//         type: userFile.type,
//         name: userFile.name
//     };

//     // Convert object into JSON
//     const json = JSON.stringify(encryptedFile);

//     // Create downloadable file
//     const blob = new Blob([json], {
//         type: "application/json"
//     });

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "encrypted-image.json";

//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);

//     URL.revokeObjectURL(url);

//     console.log("Encryption successful!");
//     console.log("Encrypted file downloaded.");
// }

// export default handleClick;
async function handleClick() {

    const input = document.getElementById("myfile");
    const userFile = input.files[0];

    const secretKey = document.getElementById("skey").value;

    if (!userFile) {
        console.log("No file selected");
        return;
    }

    if (!secretKey) {
        console.log("Enter a secret key");
        return;
    }

    console.log("File:", userFile.name);
    console.log("Type:", userFile.type);
    console.log("Size:", userFile.size);

    // Read ANY file as bytes
    const buffer = await userFile.arrayBuffer();
    const fileData = new Uint8Array(buffer);

    // Convert secret key into 256-bit AES key
    const encoded = new TextEncoder();
    const keyData = encoded.encode(secretKey);

    const hash = await crypto.subtle.digest(
        "SHA-256",
        keyData
    );

    const cipherKey = await crypto.subtle.importKey(
        "raw",
        hash,
        {
            name: "AES-GCM"
        },
        false,
        ["encrypt"]
    );

    // Generate random 12-byte IV
    const nonce = crypto.getRandomValues(
        new Uint8Array(12)
    );

    // Encrypt the file
    const cipherFile = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: nonce
        },
        cipherKey,
        fileData
    );

    // Uint8Array / ArrayBuffer -> Base64
    function arrayBufferToBase64(buffer) {

        const bytes = new Uint8Array(buffer);

        let binary = "";

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    // Store everything needed for decryption
    const encryptedFile = {

        algorithm: "AES-GCM",

        iv: arrayBufferToBase64(nonce),

        data: arrayBufferToBase64(cipherFile),

        // Original file information
        name: userFile.name,

        type: userFile.type

    };

    // Convert to JSON
    const json = JSON.stringify(encryptedFile);

    // Create downloadable encrypted file
    const blob = new Blob(
        [json],
        {
            type: "application/json"
        }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = userFile.name + ".encrypted.json";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    console.log("Encryption successful!");
    console.log("Encrypted file downloaded.");
}

export default handleClick;