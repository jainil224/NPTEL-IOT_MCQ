NPTEL Online Certification Courses
Introduction to Internet of Things (IoT)
Assignment – Week 7: MCQs, Correct Answers, and Easy Theory Notes
Type of Questions: MCQ/MSQ
Number of Questions: 15
Total Marks: 15 × 1 = 15
Note: The original questions and options below are preserved from the provided Week 7 PDF. Correct answers and simple theory explanations are added for study and revision. Explanations follow the supplied assignment.

QUESTION 1
In the remote data logging system, which socket type is used to send sensor data from the client to the server?

a. SOCK_STREAM
b. SOCK_DGRAM
c. SOCK_RAW
d. SOCK_SEQPACKET  

Correct Answer: b. SOCK_DGRAM

Easy Theory / Explanation:
A socket lets one program communicate with another over a network. SOCK_DGRAM is used for datagram communication, typically with UDP. In the lecture's remote data logging example, the client uses a UDP socket to send sensor readings to the server.

Why this option is correct:
Option (b), SOCK_DGRAM, is the socket type specified in the assignment for sending the sensor data.
QUESTION 2
Which Adafruit function is used in the client code to read humidity and temperature values from the DHT sensor?

a. Adafruit_DHT.read_retry()
b. Adafruit_DHT.get_data()
c. Adafruit_DHT.sense()
d. Adafruit_DHT.capture()  

Correct Answer: a. Adafruit_DHT.read_retry()

Easy Theory / Explanation:
A DHT sensor measures humidity and temperature. In the example described in the assignment, the function Adafruit_DHT.read_retry(sensor, 17) is called to read those values from the sensor.

Why this option is correct:
Option (a), Adafruit_DHT.read_retry(), is the function named in the lecture's client code.
QUESTION 3
Where does the server in the remote data logging example save the data received from the client as mentioned in the lecture?

a. In a MySQL database
b. In a text file named Datalog.txt
c. On a cloud dashboard
d. In an Excel spreadsheet  

Correct Answer: b. In a text file named Datalog.txt

Easy Theory / Explanation:
In the example, the server receives sensor data from the client and saves it in a text file called Datalog.txt. The file is opened in append mode so that new readings can be added to the end of the file.

Why this option is correct:
Option (b) matches the file and storage method described in the PDF.
QUESTION 4
Which Python string function is used to split the comma-separated sensor data into separate values on the server?

a. split()
b. divide()
c. partition()
d. separate()  

Correct Answer: a. split()

Easy Theory / Explanation:
The split() function separates a string into smaller strings using a separator. For example:
data = "55,24"
values = data.split(",")
This produces two separate values: "55" and "24".

Why this option is correct:
Option (a), split(), splits the received data wherever the comma appears.
QUESTION 5
State whether the following statement is True or False.

Statement: Matplotlib Python library is used to plot the temperature and humidity data received at the server in the lecture.

a. False
b. True  

Correct Answer: b. True

Easy Theory / Explanation:
Matplotlib is a Python library used to create graphs and plots. In the lecture's example, it is used to display the temperature and humidity data received by the server. Functions such as plot(), xlabel(), ylabel(), and title() help create and label the graph.

Why this option is correct:
Option (b), True, is correct because Matplotlib is used to plot the sensor data in the described example.
QUESTION 6
Which matplotlib function turns on interactive mode so that the plot updates in real time as new data arrives?

a. ion()
b. grid()
c. subplot()
d. figure()  

Correct Answer: a. ion()

Easy Theory / Explanation:
Matplotlib's ion() function turns on interactive mode. This can allow a plot to be updated while a program continues running, which is useful when new sensor readings arrive repeatedly.

Why this option is correct:
Option (a), ion(), enables interactive plotting mode.
QUESTION 7
In a traditional (non-SDN) network, where does the routing protocol logic (e.g., OSPF) mainly execute?

a. In a centralized controller
b. At the individual switches
c. On the end-user device
d. In the cloud  

Correct Answer: b. At the individual switches

Easy Theory / Explanation:
In a traditional network, routing decisions are made in a distributed way by the network devices running routing protocols. The assignment identifies the individual switches as the location where routing protocol logic such as OSPF executes. In contrast, SDN separates control logic from the forwarding devices and uses a controller.

Why this option is correct:
Option (b) is the answer given in the provided assignment.
QUESTION 8
In which year was the OpenFlow project — from which the idea of software-defined networking originated — presented at ACM SIGCOMM?

a. 2006
b. 2008
c. 2009
d. 2011  

Correct Answer: b. 2008

Easy Theory / Explanation:
OpenFlow is a protocol associated with Software-Defined Networking (SDN). The assignment states that the OpenFlow project was presented at ACM SIGCOMM in 2008. The lecture also notes that the OpenFlow Version 1.0.0 specification was published the following year.

Why this option is correct:
Option (b), 2008, matches the year stated in the source PDF.
QUESTION 9
What message does a switch send to the SDN controller when it receives a packet for which no matching flow-rule exists?

a. PACKET-IN message
b. FLOW-REQUEST message
c. RULE-MISS alert
d. CONTROL-SYNC message  

Correct Answer: a. PACKET-IN message

Easy Theory / Explanation:
A flow rule tells an SDN switch how to handle matching packets. If a packet arrives and no rule matches it, the switch can send a PACKET-IN message to the controller. The controller then decides how the packet should be handled and may install a suitable rule.

Why this option is correct:
Option (a), PACKET-IN message, is the message described in the assignment.
QUESTION 10
Which SDN API is used for communication between the control layer and the infrastructure layer?

a. Northbound API
b. Southbound API
c. East-Westbound API
d. North-Southbound API  

Correct Answer: b. Southbound API

Easy Theory / Explanation:
SDN separates network functions into layers:
- Application layer: contains applications that use network services.
- Control layer: contains the SDN controller, which makes control decisions.
- Infrastructure layer: contains switches and other forwarding devices.
The Southbound API allows the control layer to communicate with the infrastructure layer. The assignment gives OpenFlow as an example. The Northbound API connects applications with the controller.

Why this option is correct:
Option (b), Southbound API, is used between the control and infrastructure layers.
QUESTION 11
According to the lecture, approximately how many requests per second can a typical SDN controller handle through a single thread?

a. 50
b. 100
c. 200
d. 500  

Correct Answer: c. 200

Easy Theory / Explanation:
According to the lecture, a typical SDN controller can handle approximately 200 requests per second through a single thread. This is the approximate figure used in the assignment, not a fixed performance limit for every controller.

Why this option is correct:
Option (c), 200, matches the value stated in the PDF.
QUESTION 12
Which control mechanism is described where the entire network's control decisions are taken by a single controller?

a. Distributed control
b. Centralized control
c. Hierarchical control
d. Federated control  

Correct Answer: b. Centralized control

Easy Theory / Explanation:
In centralized control, one central controller makes the network's control decisions. In distributed control, different network parts can make their own control decisions through separate controllers or devices.

Why this option is correct:
Option (b), Centralized control, matches the definition in the question.
QUESTION 13
Which of the following is listed as a benefit of integrating SDN with IoT?

a. Increased hardware cost
b. Visibility of network resources
c. Reduced sensor accuracy
d. Elimination of all controllers  

Correct Answer: b. Visibility of network resources

Easy Theory / Explanation:
Software-Defined Networking can help manage an IoT network by making its resources easier to observe and control. The assignment lists benefits such as intelligent routing, improved collection and analysis of information, visibility of network resources, and traffic-pattern analysis.

Why this option is correct:
Option (b), Visibility of network resources, is listed as a benefit in the source PDF.
QUESTION 14
According to the lecture, what is a key resource-constraint challenge in wireless sensor networks that motivates software-defined WSN?

a. Excess bandwidth
b. Limited memory for control programs
c. Too many controllers
d. Unlimited computation power  

Correct Answer: b. Limited memory for control programs

Easy Theory / Explanation:
Wireless sensor network (WSN) devices often have limited memory, processing power, and energy. This makes it difficult to install many control programs or perform heavy computations directly on sensor nodes. Software-defined WSN approaches aim to address some of these management challenges.

Why this option is correct:
Option (b) is correct because limited memory for control programs is specifically identified in the assignment.
QUESTION 15
In the SDN-WISE protocol stack for sensor nodes, what does "INPP" stand for?

a. Integrated Node Path Protocol
b. Internal Node Power Processing
c. In Network Packet Processing
d. IoT Network Priority Protocol  

Correct Answer: c. In Network Packet Processing

Easy Theory / Explanation:
SDN-WISE is a software-defined networking approach for wireless sensor networks. In the protocol stack described in the lecture, the forwarding layer above IEEE 802.15.4 uses flow rules, and INPP stands for In Network Packet Processing.

Why this option is correct:
Option (c) gives the expansion of INPP listed in the source PDF.