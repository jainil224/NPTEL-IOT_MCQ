NPTEL Online Certification Courses
Introduction to Internet of Things (IoT)
Assignment – Week 2: MCQs, Correct Answers, and Easy Theory Notes
Type of Questions: MCQ/MSQ
Number of Questions: 15
Total Marks: 15 × 1 = 15
Note: The questions and options below are preserved from the provided Week 2 PDF. Correct answers and simple explanations are added for study and revision. The explanations follow the supplied assignment's solutions.

QUESTION 1
In MQTT, which field of a published message is used by the broker as routing information?

a. Topic
b. Client identifier
c. Payload length
d. Session timer  

Correct Answer: a. Topic

Easy Theory / Explanation:
MQTT is a lightweight messaging protocol often used in IoT. A topic is a label or path attached to a message. The MQTT broker checks the topic to decide which clients subscribed to that topic should receive the message.

Why this option is correct:
Option (a) is correct because the topic tells the broker how to route the published message.
QUESTION 2
Which of the following statements about MQTT topic wildcards are correct?

a. The plus sign (+) matches an arbitrary value at exactly one hierarchy level.
b. The hash sign (#) can be used to subscribe to all underlying hierarchy levels.
c. The subscription house/# matches only the exact topic house.
d. The subscription house/+/temperature can match house/kitchen/temperature.

Correct Answer: a, b, and d

Easy Theory / Explanation:
MQTT topics can have levels separated by /, such as house/kitchen/temperature. Wildcards let a client subscribe to multiple related topics.
- + matches one topic level.
- # matches multiple topic levels below the specified path.
- house/+/temperature can match house/kitchen/temperature.
- house/# can match topics under house; it is not limited to the exact topic house.
Why these options are correct:
Options (a), (b), and (d) correctly describe MQTT wildcards. Option (c) is incorrect because house/# can match underlying topic levels too.
QUESTION 3
Which of the following are main stages of Secure MQTT (SMQTT)?

a. Setup
b. Publish
c. Decryption
d. Route discovery  

Correct Answer: a, b, and c

Easy Theory / Explanation:
Secure MQTT (SMQTT) adds security-related steps to MQTT communication. The assignment describes its four main stages as setup, encryption, publish, and decryption. Route discovery is not listed as one of these stages.

Why these options are correct:
Options (a), (b), and (c) are stages listed among the choices. Option (d) is not an SMQTT stage in the provided assignment.
QUESTION 4
At the transport layer, CoAP (Constrained Application Protocol) operates over which protocol?

a. TCP
b. UDP
c. SCTP
d. FTP  

Correct Answer: b. UDP

Easy Theory / Explanation:
CoAP is a lightweight protocol designed for IoT devices with limited memory, processing power, or energy. It operates over UDP, which has less communication overhead than TCP.

Why this option is correct:
Option (b) is correct because CoAP uses UDP at the transport layer, as stated in the assignment.
QUESTION 5
State True or False.

In CoAP, a piggyback response is carried with the acknowledgment, whereas in the separate mode, the server response is sent in a message separate from the acknowledgment.

a. True
b. False  

Correct Answer: a. True

Easy Theory / Explanation:
CoAP can return responses in two ways:
- Piggyback response: The server puts its response inside the acknowledgment message.
- Separate response: The acknowledgment is sent first, and the server sends the actual response later in a separate message.
Why this option is correct:
Option (a), True, correctly describes both response modes.
QUESTION 6
Which of the following CoAP request-method mappings are correct?

a. GET - retrieve data
b. PUT - create data
c. PUSH - update data
d. DELETE - delete data  

Correct Answer: a, b, c, and d

Easy Theory / Explanation:
The assignment presents these CoAP request-method mappings as follows: GET retrieves data, PUT creates data, PUSH updates data, and DELETE removes data. These methods describe the action requested from a resource.

Why these options are correct:
According to the provided assignment's answer and explanation, all four options (a), (b), (c), and (d) are correct.
QUESTION 7
Which AMQP frame type is used to control the message-flow rate?

a. Transfer
b. Detach
c. Disposition
d. Flow  

Correct Answer: d. Flow

Easy Theory / Explanation:
AMQP (Advanced Message Queuing Protocol) is a messaging protocol. It uses different frame types for different tasks:
- Transfer: carries a message.
- Detach: ends a link.
- Disposition: communicates a change in transfer state.
- Flow: controls the rate of message flow between AMQP peers.
Why this option is correct:
Option (d), Flow, is correct because this frame controls message-flow rate.
QUESTION 8
Which of the following statements about AMQP components are correct?

a. An exchange receives messages and routes them to queues.
b. A queue stores messages for business processes or consumers.
c. A binding specifies message-distribution rules between an exchange and queues.
d. A consumer must route every producer message before it reaches an exchange.

Correct Answer: a, b, and c

Easy Theory / Explanation:
The assignment describes three main AMQP components:
- Exchange: receives messages and routes them.
- Queue: stores messages until consumers or business processes use them.
- Binding: defines the rules that connect an exchange to queues and determine message distribution.
A consumer does not route every message before it reaches the exchange.

Why these options are correct:
Options (a), (b), and (c) describe the AMQP components correctly. Option (d) is incorrect.
QUESTION 9
Which of the following IEEE 802.15.4 variant-application pairs are correct?

a. IEEE 802.15.4c - China
b. IEEE 802.15.4e - Industrial applications
c. IEEE 802.15.4f - Active RFID
d. IEEE 802.15.4g - Smart utility networks  

Correct Answer: a, b, c, and d

Easy Theory / Explanation:
IEEE 802.15.4 is a standard used for low-rate wireless personal area networks, which can be useful in IoT. The assignment associates these variants with the following areas:
- 802.15.4c: China
- 802.15.4e: Industrial applications
- 802.15.4f: Active RFID
- 802.15.4g: Smart utility networks
The assignment also notes that 802.15.4d is associated with Japan.

Why these options are correct:
All four pairs (a), (b), (c), and (d) match the associations given in the assignment.
QUESTION 10
In a non-beacon-enabled IEEE 802.15.4 network, data frames are transmitted using:

a. Slotted CSMA/CA
b. Unslotted CSMA/CA
c. Token passing
d. Pure TDMA only  

Correct Answer: b. Unslotted CSMA/CA

Easy Theory / Explanation:
CSMA/CA stands for Carrier Sense Multiple Access with Collision Avoidance. A device checks whether the channel is busy before transmitting, helping reduce the chance of collisions.
- Non-beacon-enabled network: uses unslotted CSMA/CA.
- Beacon-enabled network: uses slotted CSMA/CA with a superframe structure managed by the PAN coordinator.
Why this option is correct:
Option (b) is correct because non-beacon-enabled IEEE 802.15.4 networks use unslotted CSMA/CA, according to the assignment.
QUESTION 11
Which statement correctly describes the relationship between IEEE 802.15.4 and ZigBee?

a. IEEE 802.15.4 provides layers 1 and 2, while ZigBee extends the functionality to layer 3 and above.
b. ZigBee provides only the physical layer, while IEEE 802.15.4 provides all higher layers.
c. Both standards operate only at the application layer.
d. ZigBee and IEEE 802.15.4 are identical standards with no functional distinction.

Correct Answer: a. IEEE 802.15.4 provides layers 1 and 2, while ZigBee extends the functionality to layer 3 and above.

Easy Theory / Explanation:
The assignment explains that IEEE 802.15.4 mainly specifies the physical layer (Layer 1) and MAC layer (part of Layer 2). ZigBee builds on these lower layers and adds higher-level functions, such as routing, forwarding, security features, and mesh networking support.

Why this option is correct:
Option (a) correctly explains how ZigBee extends the functionality provided by IEEE 802.15.4.
QUESTION 12
Which of the following statements characterizes a ZigBee end device?

a. It communicates with its parent node.
b. It cannot relay data for other devices.
c. It is a reduced-functionality device.
d. It forms the network root and acts as the trust center.

Correct Answer: a, b, and c

Easy Theory / Explanation:
A ZigBee end device communicates through its parent node, such as a router or coordinator. It does not relay messages for other devices and is considered a reduced-functionality device. The coordinator forms the network root and may act as the trust center.

Why these options are correct:
Options (a), (b), and (c) describe a ZigBee end device. Option (d) describes a coordinator's role, not an end device's role.
QUESTION 13
Which option correctly describes addressing in 6LoWPAN?

a. A 16-bit address is globally unique, while a 64-bit address is PAN-specific.
b. A 16-bit short address is PAN-specific and assigned by the PAN coordinator, while a 64-bit extended address is globally unique.
c. Both 16-bit and 64-bit addresses are globally unique and assigned by an Internet router.
d. Both address types are used only for multicast communication.

Correct Answer: b. A 16-bit short address is PAN-specific and assigned by the PAN coordinator, while a 64-bit extended address is globally unique.

Easy Theory / Explanation:
6LoWPAN enables IPv6 communication over low-power wireless personal area networks. The assignment describes two address types:
- 16-bit short address: used within a particular PAN (Personal Area Network) and assigned by the PAN coordinator.
- 64-bit extended address: globally unique.
Why this option is correct:
Option (b) correctly distinguishes the PAN-specific short address from the globally unique extended address.
QUESTION 14
State True or False.

In LOADng routing, an intermediate router may respond to a Route Request (RREQ) whenever it already has an active route to the requested destination.

a. True
b. False  

Correct Answer: b. False

Easy Theory / Explanation:
LOADng is a routing protocol discussed in the assignment. When a Route Request (RREQ) is sent, only the destination is permitted to respond. Intermediate routers are not allowed to respond to the request, even if they already have a route to that destination.

Why this option is correct:
Option (b), False, is correct because intermediate routers are prohibited from responding to an RREQ in the described LOADng behaviour.
QUESTION 15
How does a passive RFID tag obtain the power required to transmit information?

a. It uses its own internal battery.
b. It is powered inductively by an RFID reader.
c. It receives power through a wired AIDC connection.
d. It does not require any source of power.  

Correct Answer: b. It is powered inductively by an RFID reader.

Easy Theory / Explanation:
RFID stands for Radio-Frequency Identification. A passive RFID tag does not have its own battery. It receives energy from the RFID reader through electromagnetic coupling (inductive powering) and uses that energy to transmit its information.

An active RFID tag, in contrast, has its own power supply.

Why this option is correct:
Option (b) is correct because the reader provides the energy needed by a passive tag.