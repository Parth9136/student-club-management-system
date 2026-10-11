import requests
from io import BytesIO
from docx import Document
from docx.shared import Inches

# Create a new Word document
doc = Document()

# URL of the image
image_url = "http://res.cloudinary.com/dnga4gkbe/image/upload/v1738325286/vnp3zbq70xkmvladqfjc.jpg"

# Download the image
response = requests.get(image_url)

# Check if the request was successful
if response.status_code == 200:
    image_stream = BytesIO(response.content)  # Convert to a file-like object
    doc.add_picture(image_stream, width=Inches(3))  # Adjust width as needed
    print("Image added successfully!")
else:
    print("Failed to download image")

# Save the document
doc.save("output.docx")
