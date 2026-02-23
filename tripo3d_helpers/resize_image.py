# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "Pillow",
# ]
# ///
from PIL import Image

def resize():
    img = Image.open('src_images/watering-can-with-tulips.jpg')
    print(f'Original size: {img.size}')
    img.thumbnail((2048, 2048), Image.Resampling.LANCZOS)
    img.save('src_images/watering-can-with-tulips_small.jpg', quality=85)
    print('Resized and saved as watering-can-with-tulips_small.jpg')

if __name__ == '__main__':
    resize()
