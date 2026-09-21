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
    const buffer = await userFile.arrayBuffer();    //fixed set of binary
    const fileData = new Uint8Array(buffer);        //let us handle single element

    const encoded = new TextEncoder();          //inbuilt
    const keyData = encoded.encode(secretKey);  //.encode converts serect key into bytes

    // const hash = await crypto.subtle.digest(
    //     "SHA-256",
    //     keyData
    // );

    const cipherKey = await crypto.subtle.importKey(
        "raw",  //format
        //hash,   //key
        keyData,
        {
            name: "AES-GCM"     //algo
        },
        false,   //exportable
        ["encrypt"] //key used for?
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
    function arrayBufferToBase64(buffer) {  //buffer to JSON format 

        const bytes = new Uint8Array(buffer);   //need to hanlde individual bytes so type array

        let binary = "";

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);    //binary to ascii
    }

    // Store everything needed for decryption
    const encryptedFile = {

        algorithm: "AES-GCM",

        iv: arrayBufferToBase64(nonce),

        data: arrayBufferToBase64(cipherFile),

        name: userFile.name,

        type: userFile.type

    };

    const json = JSON.stringify(encryptedFile);

    // Create downloadable encrypted file
    const blob = new Blob(  //container inside browser
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