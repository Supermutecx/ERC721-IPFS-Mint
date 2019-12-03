const fs = require('fs');
const util = require('util');
const pin = require('./pinata');
const mintNFT = require('./mint-nft');
require("dotenv").config()

const ASSET_DIR = process.env.ASSET_DIR

async function processDirectory(count) {    
    const readdir = util.promisify(fs.readdir);
    try {
        const src = "./images";

        //we gather the files from a local directory in this example, but a valid readStream is all that's needed for each file in the directory.
        const files = await readdir(src);
        let fileCount = 0;
        for (const file of files) {
            if(fileCount >= count) {
                break;
            }
            fileCount ++;
            console.log(`%s: Processing %s`, new Date().toLocaleTimeString(), file)
            let imageHash = await pin.blob(`${src}/${file}`);

            if (true) {
                console.log(`Uploading %s into IPFS : %s`, file, imageHash);
                imageURL = `https://gateway.pinata.cloud/ipfs/${imageHash}`
                metadata = {
                    "attributes": [],
                    "description": "",
                    "image": imageURL,
                    "name": file
                  };
                
                let name = file.split('.')[0];
                metaHash = await pin.json(`${name}_meta`, metadata);
                if (metaHash) {
                    console.log(`Uploading metadata %s into IPFS: %s`,  `${name}_meta`, metaHash);
                    let metaURL = `https://gateway.pinata.cloud/ipfs/${metaHash}`;
                    await mintNFT(metaURL);
                    console.log(`%s: Minted %s`, new Date().toLocaleTimeString(), metaHash);
                }
            }
        }
    } catch(e) {
        console.log(e);
    }
};
var myArgs = process.argv.slice(2);
processDirectory(myArgs[0]);