
import requests
from io import BytesIO
import os
import mysql.connector
from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.enum.table import WD_ALIGN_VERTICAL
from collections import defaultdict
import sys

# Path to the logo
LOGO_PATH = "LOGO.png"

# MySQL database connection details
DB_HOST = "localhost"
DB_USER = "root"
DB_PASS = "anusha"
DB_NAME = "project"

# Helper function to read and update serial number
def get_serial_number():
    serial_file = "serial_number.txt"

    # Always reset serial to 1
    with open(serial_file, "w") as f:
        f.write("1")
    
    return 1

def create_front_page(doc, user_data):
    doc.add_paragraph("\n")

    title = doc.add_paragraph()
    title.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    run = title.add_run("R V College of Engineering, Bengaluru – 560059\n")
    run.bold = True
    run.font.size = Pt(14)

    subtitle = doc.add_paragraph("(Autonomous Institution Affiliated to VTU, Belgaum)\n")
    subtitle.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER

    year = doc.add_paragraph("2023 - 2024\n")
    year.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER

    try:
        doc.add_picture(LOGO_PATH, width=Inches(2))
        last_paragraph = doc.paragraphs[-1]
        last_paragraph.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    except:
        print("Error: Logo not found!")

    doc.add_paragraph("\n")

    heading = doc.add_paragraph()
    heading.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    heading_run = heading.add_run("ACTIVITY POINTS LIST")
    heading_run.bold = True
    heading_run.font.size = Pt(12)

    doc.add_paragraph("\n\n")

    details_section = doc.add_paragraph("SUBMITTED BY:\n")
    details_section.bold = True
    doc.add_paragraph(f"NAME: {user_data['NAME']}")
    doc.add_paragraph(f"USN: {user_data['USN']}")
    doc.add_paragraph(f"BRANCH: {user_data['BRANCH']}")
    doc.add_page_break()

def add_small_logo(doc):
    try:
        paragraph = doc.add_paragraph()
        run = paragraph.add_run()
        run.add_picture(LOGO_PATH, width=Inches(0.7))
        paragraph.alignment = WD_PARAGRAPH_ALIGNMENT.LEFT
        doc.add_paragraph("\n")
    except:
        print("Error: Logo not found!")

def create_or_update_report(data, user_data):
    file_name = f"Report_Activity.docx"
    
    if not os.path.exists(file_name):
        doc = Document()
        create_front_page(doc, user_data)
    else:
        doc = Document(file_name)
    
    if doc.tables or len(doc.paragraphs) > 0:
        doc.add_page_break()
    
    add_small_logo(doc)
    sl_no = get_serial_number()
    
    table = doc.add_table(rows=7, cols=2)
    table.style = 'Table Grid'
    
    labels = [
        "Sl. No.", "Date & Duration", "Activity Name", "Description of the Activity",
        "Photos", "Outcome", "Points Earned"
    ]
    
    for i, label in enumerate(labels):
        table.cell(i, 0).text = label
        table.cell(i, 0).vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    
    table.cell(0, 1).text = str(sl_no)
    table.cell(1, 1).text = str(data["date_duration"])
    table.cell(2, 1).text = data["activity_name"]
    table.cell(3, 1).text = data["description"]
    
    cell = table.cell(4, 1)
    if data["photos"]:
        for photo_path in data["photos"]:
            try:
                response = requests.get(photo_path)
                if response.status_code == 200:
                    image_stream = BytesIO(response.content)
                    paragraph = cell.add_paragraph()
                    paragraph.paragraph_format.space_after = Pt(10)
                    run = paragraph.add_run()
                    run.add_picture(image_stream, width=Inches(2.5))
            except Exception as e:
                print(f"Error adding photo '{photo_path}': {e}")
                cell.add_paragraph("No image for this event")
    else:
        cell.text = "No image for this event"

    # if event_data["photos"]:
    #     cell = table.cell(4, 1)
    #     for photo_path in event_data["photos"]:
    #         try:
    #             paragraph = cell.add_paragraph()
    #             paragraph_format = paragraph.paragraph_format
    #             paragraph_format.space_after = Pt(10)  # Add space between photos

    #             run = paragraph.add_run()
    #             run.add_picture(photo_path, width=Inches(2.5))  # Larger photo size

    #         except Exception as e:
    #             print(f"Error adding photo '{photo_path}': {e}")

    









    table.cell(5, 1).text = str(data["outcome"])
    table.cell(6, 1).text = str(data["points_earned"])
    
    doc.save(file_name)
    print(f"Report updated successfully: {file_name}")
    # return file_name

def fetch_data_for_user(user_usn):
    try:
        connection = mysql.connector.connect(host=DB_HOST, user=DB_USER, password=DB_PASS, database=DB_NAME)
        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT 
            AU.FName AS FirstName, 
            AU.MName AS MiddleName, 
            AU.LName AS LastName, 
            AU.User_id AS USN, 
            AU.Branch,
            CE.Title AS ActivityName,
            CE.Summary AS Description,
            CE.Points AS Points,
            CE.Event_StartDate AS Date,
            COALESCE(EI.ImageURL, '') AS PhotoURL
        FROM AppUser AU
        JOIN RegistersFor RF ON AU.User_id = RF.User_id
        JOIN Club_Event CE ON RF.Event_id = CE.Event_id
        LEFT JOIN Event_Images EI ON EI.Event_id = CE.Event_id  -- Move this after Club_Event join
        WHERE AU.User_id = %s AND RF.attendance = 'yes'
        ORDER BY Date;
        """
        cursor.execute(query, (user_usn,))
        data = cursor.fetchall()
        return data
    except mysql.connector.Error as err:
        print(f"Database Error: {err}")
        return []
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if len(sys.argv) > 1:
    user_usn = sys.argv[1]  # The second argument passed from Node.js (after the script name)
    print(f"Received user ID: {user_usn}")  # This will print and send the result back to Node.js
else:
    print("No user ID provided.")
print("hello")


event_photos = defaultdict(list)

# Process each record



data = fetch_data_for_user(user_usn)


count = 0
max_iterations = 3  # Set the limit to 3 iterations

for record in data:
    if record["PhotoURL"]:  # Only add valid image paths
        event_photos[record["ActivityName"]].append(record["PhotoURL"])
    
    count += 1
    if count >= max_iterations:
        break 

name_parts = [data[0].get('FirstName', ''), data[0].get('MiddleName', ''), data[0].get('LastName', '')]
filtered_name = " ".join(part for part in name_parts if part) 
if data:
    user_info = {
        
        "NAME": filtered_name,
        "USN": data[0]['USN'],
        "BRANCH": data[0]['Branch']
    }
    processed_events = set()
    

# Process only unique events
for record in data:
    event_name = record["ActivityName"]
    
    if event_name not in processed_events:  # Ensures each event is processed once
        report_data = {
            "date_duration": record["Date"].strftime("%Y-%m-%d"),  # Assuming Date is already a string; if not, use `.strftime("%Y-%m-%d")`
            "activity_name": event_name,
            "description": record["Description"],
            "photos": event_photos.get(event_name, []),  # Assign all photos for the event
            "outcome": "Outcome of the activity",
            "points_earned": record["Points"]
        }
        
        create_or_update_report(report_data, user_info)  # Function to handle report creation/update
        
        processed_events.add(event_name)


