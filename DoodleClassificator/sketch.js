const len = 784;
const total_data = 1000;

const PIANO = 0;
const KNIFE = 1;
const CAR = 2;

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

function prepareData (category, data, label)
{
    category.training = [];
    category.testing = [];
    let threshold = floor( 0.8 * total_data);

    for (let i = 0; i < total_data; i++)
    {
        let offset = i * len;
        if (i < threshold)
        {   
            category.training[i] = data.bytes.subarray(offset, offset + len);
            category.training[i].label = label;
        }
        else
        {
            category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
            category.testing[i - threshold].label = label;
        }
    }
}
function setup()
{
    createCanvas(280,280);
    background(100);
    prepareData(pianos, pianos_data, PIANO);
    prepareData(knifes, knifes_data, KNIFE);
    prepareData(cars,cars_data, CAR);

    
/*    
    DRAWING OF THE DATA

    let total = 100;
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