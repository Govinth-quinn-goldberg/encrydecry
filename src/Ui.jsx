// import handleClick from "./Encry";
// import { handlClick } from "./Decry";

// export default function UI() {

//     async function encryptimg(event) {
//         event.preventDefault();

//         await handleClick();
//     }

//     async function decryptimg(event) {
//         event.preventDefault();

//         await handlClick();
//     }

//     return (
//         <>
//             <h1>Image Encryption</h1>

//             <h2>
//                 Encrypt your image and share the encrypted file
//             </h2>

//             <form>

//                 <h3>Encrypt Image</h3>

//                 <label htmlFor="myfile">
//                     Select image:
//                 </label>

//                 <input
//                     type="file"
//                     id="myfile"
//                     accept="image/*"
//                 />

//                 <br />
//                 <br />

//                 <label htmlFor="skey">
//                     Secret Key:
//                 </label>

//                 <input
//                     type="password"
//                     id="skey"
//                 />

//                 <br />
//                 <br />

//                 <button
//                     type="button"
//                     onClick={encryptimg}
//                 >
//                     Encrypt & Download
//                 </button>


//                 <hr />


//                 <h3>Decrypt Image</h3>

//                 <label htmlFor="encryptedFile">
//                     Select encrypted file:
//                 </label>

//                 <input
//                     type="file"
//                     id="encryptedFile"
//                     accept=".json"
//                 />

//                 <br />
//                 <br />

//                 <button
//                     type="button"
//                     onClick={decryptimg}
//                 >
//                     Decrypt
//                 </button>

//                 <br />
//                 <br />

//                 <img
//                     id="output"
//                     alt="Decrypted result"
//                     style={{ maxWidth: "500px" }}
//                 />

//             </form>
//         </>
//     );
// }
import handleClick from "./Encry";
import { handlClick } from "./Decry";

export default function UI() {

    async function encryptFile(event) {

        event.preventDefault();

        await handleClick();

    }

    async function decryptFile(event) {

        event.preventDefault();

        await handlClick();

    }

    return (
        <>
            <h1>File Encryption</h1>

            <h2>
                Encrypt and securely share your files
            </h2>

            <hr />

            <h3>Encrypt File</h3>

            <label htmlFor="myfile">
                Select File:
            </label>

            <input
                type="file"
                id="myfile"
            />

            <br />
            <br />

            <label htmlFor="skey">
                Secret Key:
            </label>

            <input
                type="password"
                id="skey"
            />

            <br />
            <br />

            <button
                type="button"
                onClick={encryptFile}
            >
                Encrypt & Download
            </button>

            <hr />

            <h3>Decrypt File</h3>

            <label htmlFor="encryptedFile">
                Select Encrypted File:
            </label>

            <input
                type="file"
                id="encryptedFile"
                accept=".json"
            />

            <br />
            <br />

            <button
                type="button"
                onClick={decryptFile}
            >
                Decrypt & Download
            </button>
        </>
    );
}