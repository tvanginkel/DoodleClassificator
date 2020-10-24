let pianos;
let knifes;
let cars;

//console.log("Hello")

function preload() 
{
    pianos = loadBytes('data/pianos1000.bin');
    knifes = loadBytes('data/knifes1000.bin');
    cars = loadBytes('data/cars1000.bin');
}

function setup()
{
    createCanvas(280,280);
    background(100);

    let total = 100;
    for (let n = 0; n < total; n++)
    {
        let img = createImage(28,28);
        img.loadPixels();
        let offset = n * 784;
        for (let i = 0; i < 784; i++)
        {
            let val = knifes.bytes[i + offset];
            img.pixels[i * 4 + 0] = val;
            img.pixels[i * 4 + 1] = val;
            img.pixels[i * 4 + 2] = val;
            img.pixels[i * 4 + 3] = 255;  
        }

        img.updatePixels();
        let x = (n % 10) * 28;
        let y = floor(n / 10) * 28;

        image(img,x,y);
    }
}