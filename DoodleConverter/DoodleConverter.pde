byte[] data = loadBytes("piano.npy");

int total = 1000;
size(400,400);

byte[] outdata = new byte[total * 784];
int outindex = 0;
for (int n = 0; n < total; n++)
{
  int start = 80 + n * 784;
  
  PImage img = createImage(28, 28, RGB);
  img.loadPixels();
  
  for (int i = 0; i < 784; i++)
  {
    int index = i + start;
    byte val = data[index];
    outdata[outindex] = val;
    outindex++;
    img.pixels[i] = color(255 - val & 0xff);
  }
  img.updatePixels();
  int x = (n % 20) * 28;
  int y = (n / 20) * 28;
  image(img, x, y);
}

saveBytes("pianos1000.bin", outdata);
