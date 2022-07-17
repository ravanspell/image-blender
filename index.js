import { writeFile } from 'fs/promises'
import 'dotenv/config'
import axios from 'axios'
import {join} from 'path'
import minimist from 'minimist'
import {MergeImages} from './Blend/index.js'

const argv = minimist(process.argv.slice(2))

// default command line args
let {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
} = argv;

(async () => {
    try {
        const requests = [
            `${process.env.BASE_URL}${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`,
            `${process.env.BASE_URL}${who}?width=${width}&height=${height}&color=${color}&s=${size}`
        ]
        // map thought requests.
        const imageResponses = requests.map((imageRequest) =>{
            // define response as buffer
            return axios.get(imageRequest, {responseType: 'arraybuffer'})
        })
        //await until all Promises resolve
        const [image1, image2 ] = await Promise.all(imageResponses)
        // Merge two images
        const mergedImage = await MergeImages(image1.data,image2.data)
        // Save merged image
        const fileOut = join(process.cwd(), `/cat-card.jpg`);
        await writeFile(fileOut, mergedImage, 'binary')
        console.log('====================================');
        console.log('Image has been saved!');
        console.log('====================================');
    } catch (e) {
        console.log("e", e)
    }
})()

