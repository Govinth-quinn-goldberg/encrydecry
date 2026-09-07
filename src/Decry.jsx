// export async function handlClick() {

//     const input = document.getElementById("encryptedFile");
//     const encryptedFile = input.files[0];

//     const secretKey = document.getElementById("skey").value;

//     if (!encryptedFile) {
//         console.log("Select an encrypted file");
//         return;
//     }

//     if (!secretKey) {
//         console.log("Enter the secret key");
//         return;
//     }

//     // Read the JSON file
//     const text = await encryptedFile.text();

//     const encryptedData = JSON.parse(text);

//     // Base64 -> Uint8Array
//     function base64ToUint8Array(base64) {

//         const binary = atob(base64);

//         const bytes = new Uint8Array(binary.length);

//         for (let i = 0; i < binary.length; i++) {
//             bytes[i] = binary.charCodeAt(i);
//         }

//         return bytes;
//     }

//     const nonce = base64ToUint8Array(encryptedData.iv);
//     const cipherImg = base64ToUint8Array(encryptedData.data);

//     // Convert password into same 256-bit key
//     const encoded = new TextEncoder();
//     const keyData = encoded.encode(secretKey);

//     const hash = await crypto.subtle.digest(
//         "SHA-256",
//         keyData
//     );

//     const cipherKey = await crypto.subtle.importKey(
//         "raw",
//         hash,
//         {
//             name: "AES-GCM"
//         },
//         false,
//         ["decrypt"]
//     );

//     try {

//         // Decrypt
//         const decrypt = await crypto.subtle.decrypt(
//             {
//                 name: "AES-GCM",
//                 iv: nonce
//             },
//             cipherKey,
//             cipherImg
//         );

//         console.log("Decryption successful!");

//         // Recreate original image
//         const blob = new Blob([decrypt], {
//             type: encryptedData.type
//         });

//         const imageURL = URL.createObjectURL(blob);

//         document.getElementById("output").src = imageURL;

//     } catch (error) {

//         console.log("Decryption failed!");
//         console.log("Wrong secret key or corrupted file.");

//     }
// }
export async function handlClick() {

    const input = document.getElementById("encryptedFile");

    const encryptedFile = input.files[0];

    const secretKey = document.getElementById("skey").value;

    if (!encryptedFile) {
        console.log("Select an encrypted file");
        return;
    }

    if (!secretKey) {
        console.log("Enter the secret key");
        return;
    }

    // Read encrypted JSON file
    const text = await encryptedFile.text();

    const encryptedData = JSON.parse(text);

    // Base64 -> Uint8Array
    function base64ToUint8Array(base64) {

        const binary = atob(base64);

        const bytes = new Uint8Array(
            binary.length
        );

        for (let i = 0; i < binary.length; i++) {

            bytes[i] = binary.charCodeAt(i);

        }

        return bytes;
    }

    // Get IV
    const nonce = base64ToUint8Array(
        encryptedData.iv
    );

    // Get encrypted file
    const cipherFile = base64ToUint8Array(
        encryptedData.data
    );

    // Convert secret key into same AES-256 key
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
        ["decrypt"]
    );

    try {

        // Decrypt
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: nonce
            },
            cipherKey,
            cipherFile
        );

        console.log("Decryption successful!");

        // Recreate original file
        const blob = new Blob(
            [decrypted],
            {
                type: encryptedData.type
            }
        );

        // Download original file
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = encryptedData.name;

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        console.log(
            "Original file downloaded:",
            encryptedData.name
        );

    } catch (error) {

        console.log(
            "Decryption failed!"
        );

        console.log(
            "Wrong secret key or corrupted file."
        );

    }
}