import json
import os

from PIL import Image
from unidecode import unidecode


def save_thumbnails(filepath, category):
    path_no_ext = os.path.splitext(filepath)[0]
    path = unidecode(path_no_ext).replace("/images/", "/thumbs/").replace(" ", "_")
    os.makedirs(os.path.dirname(path), exist_ok=True)

    max_size = 1500
    image = Image.open(filepath)
    original_image_size = max(*image.size)

    for ratio, number in ((0.1, 1), (0.4, 2), (0.7, 3), (1, 4)):
        image = Image.open(filepath)
        factor = max_size / original_image_size * ratio
        new_size = (round(image.width * factor), round(image.height * factor))
        image = image.resize(new_size, Image.ANTIALIAS)
        image.convert("RGB").save(f"{path}@{number}x.jpg", "jpeg")

    return image.size, path


if __name__ == "__main__":

    filelist = []

    for root, dirs, files in os.walk("./public/images/"):
        if files:
            category = root.split("/")[-1]
            print(f"Processing {category}...")
            for filename in files:
                if filename.startswith("."):
                    continue

                filepath = root + "/" + filename
                (width, height), src = save_thumbnails(filepath, category)

                filelist.append(
                    dict(
                        src=f"./thumbs/{src.split('/thumbs/')[1]}",
                        width=width,
                        height=height,
                        category=category,
                        filter=category,
                        name=os.path.splitext(filename)[0],
                    )
                )

    with open("./src/images.json", "w") as f:
        json.dump(filelist, f, indent=4)
