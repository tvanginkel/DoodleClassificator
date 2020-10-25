const len = 784;
const total_data = 1000;

let pianos_data;
let knifes_data;
let cars_data;

let pianos = {};
let knifes = {};
let cars = {};

function preload() 
{
    pianos_data = loadBytes('data/pianos1000.bin');
    knifes_data = loadBytes('data/knifes1000.bin');
    cars_data = loadBytes('data/cars1000.bin');
}

function setup()
{
    createCanvas(280,280);
    background(100);

    pianos.training = [];
    pianos.testing = [];
    let threshold = floor( 0.8 * total_data);

    for (let i = 0; i < total_data; i++)
    {
        let offset = i * len;
        if (i < threshold)
        {   
            pianos.training[i] = pianos_data.bytes.subarray(offset, offset + len);
        }
        else
        {
            pianos.testing[i - threshold] = pianos_data.bytes.subarray(offset, offset + len);
        }
    }
/*    let total = 100;
    for (let n = 0; n < total; n++)
    {
        let img = createImage(28,28);
        img.loadPixels();
        let offset = n * 784;

        for (let i = 0; i < 784; i++)
        {
            let val =  255 - cars_data.bytes[i + offset];
            img.pixels[i * 4 + 0] = val;
            img.pixels[i * 4 + 1] = val;
            img.pixels[i * 4 + 2] = val;
            img.pixels[i * 4 + 3] = 255;  
        }

        img.updatePixels();
        let x = (n % 10) * 28;
        let y = floor(n / 10) * 28;

        image(img,x,y);
    }*/
}