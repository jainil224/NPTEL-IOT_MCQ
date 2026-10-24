NPTEL Online Certification Courses
Introduction to Internet of Things (IoT)
Assignment – Week 6: MCQs, Correct Answers, and Easy Theory Notes
Type of Questions: MCQ/MSQ
Number of Questions: 15
Total Marks: 15 × 1 = 15
Note: The original questions and options below are preserved from the provided Week 6 PDF. Correct answers and simple theory explanations are added for study and revision. The explanations follow the supplied assignment.

QUESTION 1
What are the five basic data types available in Python, as introduced in the lecture?

a. Numbers, Strings, List, Tuple, Dictionary
b. Integer, Float, Boolean, Char, Byte
c. Array, Struct, Class, Object, Set
d. Numbers, Strings, Queue, Stack, Graph  

Correct Answer: a. Numbers, Strings, List, Tuple, Dictionary

Easy Theory / Explanation:
The lecture introduces five Python data types: Numbers, Strings, Lists, Tuples, and Dictionaries.
- Numbers: store numeric values.
- Strings: store text.
- Lists: store ordered collections that can be changed.
- Tuples: store ordered collections that usually cannot be changed after creation.
- Dictionaries: store data as key-value pairs.
Why this option is correct:
Option (a) lists the five data types named in the assignment.
QUESTION 2
Which keyword is used to define a function in Python?

a. func
b. def
c. define
d. function  

Correct Answer: b. def

Easy Theory / Explanation:
A function is a reusable block of code that performs a task. In Python, use the keyword def followed by the function name and parentheses.

Example:
def greet():
    print("Hello")
Why this option is correct:
Option (b), def, is the Python keyword used to define a function.
QUESTION 3
In Python's exception handling, which keyword is used to handle an exception raised inside the try block?

a. catch
b. except
c. handle
d. rescue  

Correct Answer: b. except

Easy Theory / Explanation:
An exception is an error that occurs while a program is running. Python uses try and except to handle exceptions. The code that may cause an error goes inside try, and the code for handling the error goes inside except.

Example:
try:
    number = int("abc")
except ValueError:
    print("Please enter a valid number")
Why this option is correct:
Option (b), except, is the keyword used to catch and handle an exception.
QUESTION 4
Which mode of Python's open() function is used to add data to the end of an existing file without erasing its existing content?

a. r (read mode)
b. w (write mode)
c. a (append mode)
d. r+ (read and write mode)  

Correct Answer: c. a (append mode)

Easy Theory / Explanation:
Python file modes tell the program how to work with a file:
- r reads a file.
- w writes to a file and can overwrite existing content.
- a adds new content to the end of an existing file.
- r+ allows reading and writing.
Why this option is correct:
Option (c), a (append mode), adds data at the end without removing the existing content.
QUESTION 5
Which Python library, installable via pip, is used for image read/write operations as covered in the lecture?

a. NumPy
b. PIL / Pillow
c. OpenCV
d. Matplotlib  

Correct Answer: b. PIL / Pillow

Easy Theory / Explanation:
PIL stands for Python Imaging Library. Pillow is its modern, maintained fork and provides tools for opening, reading, modifying, and saving image files. The assignment identifies PIL/Pillow as the library covered in the lecture.

Why this option is correct:
Option (b), PIL / Pillow, is the answer provided in the PDF.
QUESTION 6
Which socket_type value is used while creating a TCP/IP socket in Python's socket module?

a. SOCK_DGRAM
b. SOCK_STREAM
c. SOCK_RAW
d. SOCK_SEQPACKET  

Correct Answer: b. SOCK_STREAM

Easy Theory / Explanation:
A socket allows programs to communicate over a network. In Python's socket module, SOCK_STREAM is used for a stream socket, typically used with TCP. TCP provides connection-oriented communication.

Example:
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
Why this option is correct:
Option (b), SOCK_STREAM, is the socket type listed for TCP/IP communication in the assignment.
QUESTION 7
How many GPIO pins does the Raspberry Pi 3 Model B have, as shown in the specifications table?

a. 26
b. 32
c. 40
d. 44  

Correct Answer: c. 40

Easy Theory / Explanation:
GPIO stands for General-Purpose Input/Output. These pins allow a Raspberry Pi to connect to and control electronic components such as LEDs, sensors, and relays, or receive signals from them. The specifications table in the assignment lists 40 GPIO pins for the Raspberry Pi 3 Model B.

Why this option is correct:
Option (c), 40, is the number given in the source PDF.
QUESTION 8
Which of the following is an officially supported operating system for Raspberry Pi mentioned in the lecture?

a. Raspbian
b. Windows XP
c. macOS
d. Solaris  

Correct Answer: a. Raspbian

Easy Theory / Explanation:
An operating system manages a computer's hardware and software. The assignment names Raspbian as an officially supported Raspberry Pi operating system and also mentions NOOBS in its explanation.

Why this option is correct:
Option (a), Raspbian, is the operating system listed in the question's source answer.
QUESTION 9
Raspberry Pi is best described as a:

a. Printer
b. Smartphone
c. Wi-Fi router
d. Single-board computer  

Correct Answer: d. Single-board computer

Easy Theory / Explanation:
A single-board computer is a complete small computer built on one circuit board. Raspberry Pi can run an operating system and programs, connect to peripherals, and interact with sensors and other electronic components.

Why this option is correct:
Option (d), Single-board computer, matches the description provided in the assignment.
QUESTION 10
Which command is used to install the GPIO library on Raspberry Pi before programming the blinking LED example?

a. sudo apt-get install python-rpi.gpio
b. pip install gpio
c. sudo apt-get install led-lib
d. npm install rpi-gpio  

Correct Answer: a. sudo apt-get install python-rpi.gpio

Easy Theory / Explanation:
The assignment gives the command below to install the GPIO library used in its Raspberry Pi programming example:
sudo apt-get install python-rpi.gpio
The GPIO library allows Python programs to interact with the Raspberry Pi's GPIO pins.

Why this option is correct:
Option (a) is the exact command shown in the provided PDF.
QUESTION 11
Where is the CSI camera connector slot located on the Raspberry Pi board?

a. Between the USB ports
b. Between the Ethernet port and the HDMI port
c. Next to the power supply pin
d. On the underside of the board  

Correct Answer: b. Between the Ethernet port and the HDMI port

Easy Theory / Explanation:
CSI stands for Camera Serial Interface. The Raspberry Pi has a dedicated CSI connector for attaching a compatible camera module. According to the assignment, the connector is located between the Ethernet port and the HDMI port.

Why this option is correct:
Option (b) matches the connector location described in the PDF.
QUESTION 12
Which terminal command captures a still image using the Raspberry Pi camera?

a. raspistill -o image.jpg
b. raspicam capture
c. pi-camera snap
d. capture.py --img  

Correct Answer: a. raspistill -o image.jpg

Easy Theory / Explanation:
The assignment uses this terminal command to capture an image and save it as image.jpg:
raspistill -o image.jpg
The -o argument specifies the output filename.

Why this option is correct:
Option (a) is the exact command provided in the source PDF.
QUESTION 13
What does DHT stand for in the DHT sensor used with Raspberry Pi in the auto-cooling system?

a. Digital Heat Transfer
b. Digital Humidity and Temperature
c. Direct Hardware Trigger
d. Dual Humidity Thermostat  

Correct Answer: b. Digital Humidity and Temperature

Easy Theory / Explanation:
The assignment expands DHT as Digital Humidity and Temperature. A DHT sensor measures the temperature and humidity of the surrounding air. In the described auto-cooling system, the temperature reading can be used to decide when to switch on a fan.

Why this option is correct:
Option (b) gives the expansion listed in the assignment.
QUESTION 14
How many output terminals does the relay used in the temperature-dependent auto-cooling system have, as shown in the lecture?

a. 2
b. 3
c. 4
d. 5  

Correct Answer: b. 3

Easy Theory / Explanation:
A relay is an electrically controlled switch. The assignment identifies three relay terminals:
- NO (Normally Open): the contact is open when the relay is not activated.
- Common: the shared terminal.
- NC (Normally Closed): the contact is connected to Common when the relay is not activated.
Why this option is correct:
Option (b), 3, matches the three terminals listed in the PDF.
QUESTION 15
State whether the following statement is True or False.

Statement: In the temperature-dependent auto-cooling system, the fan operates when the surrounding temperature rises above the threshold value specified in the code.

a. True
b. False  

Correct Answer: a. True

Easy Theory / Explanation:
In a temperature-dependent cooling system, a sensor measures the surrounding temperature. The program compares the reading with a predefined threshold. According to the assignment, when the temperature rises above that threshold, the fan is switched on.

Why this option is correct:
Option (a), True, matches the behaviour described in the source PDF.