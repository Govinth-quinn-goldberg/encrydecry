import "./UI.css"
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
            <h1 className="Titles">Data Encryption</h1>
            
            <h2 className="mheading">
                Encrypt and securely share your files
            </h2>
            
            <div className="Formm">
                <hr />
                <h3 className="Encfile">Encrypt File</h3>

                <label htmlFor="myfile">Select File:</label>

                <input type="file" id="myfile"/><br /><br />

                <label htmlFor="skey">Secret Key : </label>

                <input type="password" id="skey"/><br /><br />

                <button type="button" onClick={encryptFile}>Encrypt & Download</button>
                <hr />

                <h3>Decrypt File</h3>
                <label htmlFor="encryptedFile">Select Encrypted File:</label>

                <input type="file" id="encryptedFile" accept=".json"/><br /><br />

                <button type="button" onClick={decryptFile}>Decrypt & Download</button>
            </div>
            
        </>
    );
}