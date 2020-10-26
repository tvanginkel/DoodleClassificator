//CONSTANTS
const len = 784;
const total_data = 1000;

//Label variables
const PIANO = 0;
const KNIFE = 1;
const CAR = 2;

//Stores all the data
let pianos_data;
let knifes_data;
let cars_data;

//Creates objects for each type of doodle
let pianos = {};
let knifes = {};
let cars = {};

//Loads the .bin in the data variables
function preload() 
{
    pianos_data = loadBytes('data/pianos1000.bin');
    knifes_data = loadBytes('data/knifes1000.bin');
    cars_data = loadBytes('data/cars1000.bin');
} 

//Prepares data to be usable
function prepareData (category, data, label)
{
    //Creates array
    category.training = [];
    category.testing = [];

    //Set training and testing sets size
    let threshold = floor( 0.8 * total_data);

    //Itertes through every pixel
    for (let i = 0; i < total_data; i++)
    {
        //Every 784 pixels is an image
        let offset = i * len;
        
        if (i < threshold) //Training set
        {   
            category.training[i] = data.bytes.subarray(offset, offset + len);
            category.training[i].label = label; //Labels each image
        }
        else //Test set
        {
            category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
            category.testing[i - threshold].label = label; //Labels each image
        }
    }
}
function setup()
{
    createCanvas(280,280);
    background(100);

    //Preparing the data
    prepareData(pianos, pianos_data, PIANO);
    prepareData(knifes, knifes_data, KNIFE);
    prepareData(cars,cars_data, CAR);
    
    //Creating the neural network
    let nn = new NeuralNetwork(784, 64, 3);
    
    //Randomize the data
    let training = [];
    training = training.concat(pianos.training);
    training = training.concat(knifes.training);
    training = training.concat(cars.training);
    shuffle(training, true);

    for (let i = 0; i < training.length; i++)
    {
        let inputs = [];
        let data = training[i];
        //One hot enconding
        for (let j = 0; j < data.length; j++)
        {
            inputs[j] = data[j] / 255.0; 
        }
        //Create dummy variables for the output
        let output = [0, 0, 0,];
        output[training[i].label] = 1;
        //Train nn
        nn.train(inputs, output);
    }

    console.log("Trained for one epoch");
}

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