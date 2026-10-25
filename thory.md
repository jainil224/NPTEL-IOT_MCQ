# IOT

# WEEK 1 --- INTRODUCTION TO IoT

## 1. Introduction to the Internet of Things

### 1.1 What is IoT?

The **Internet of Things (IoT)** is an internetwork of physical objects( "things") equipped with embedded electronics, sensing or actuation capability, processing, and communication. These objects can collect information about their surroundings, exchange data, receive commands, and work as part of a larger information system. The conventional Internet mainly connected computers and user-operated devices. IoT extends connectivity to objects such as lights, fans, refrigerators, industrial machines, meters, vehicles, and agricultural equipment.

**Example:** A temperature sensor measures room temperature, a controller processes the reading, a network carries it to an application, and a command can switch on a fan or air conditioner.

### 1.2 Why is IoT useful?

- **Monitoring:** observe equipment or environmental conditionsremotely.
- **Automation:** trigger an action when a condition is met.
- **Coordination:** allow multiple devices to share information andwork together.
- **Operational insight:** analyse readings over time to identifytrends or abnormal behaviour.
- **Convenience:** monitor or control compatible equipment fromanother location.
- **Resource management:** support more informed use of energy, water,and equipment.

### 1.3 Embedded systems

An **embedded system** is a computing system integrated into a larger product to perform a defined function. It often has limited processing power, memory, and energy compared with a general-purpose computer. In IoT, embedded systems can: 

1. Read sensor values. 

2. Process measurements. 

3. Apply simple decision logic. 

4. Communicate data. 

Control actuators.

A sensor alone measures a physical condition; embedded logic can interpret the measurement and networking can make it available to other systems.

### 1.4 Examples of IoT

---

Area                         Example                                               Possible use

---

Smart home         Connected light or thermostat     Monitoring and t      automatic control

Agriculture            Soil/field sensor and   Support irrigation  decisions

Industry                Machine sensors         Equipment monitoringand maintenance

Buildings/cities      Lighting, meters,       Coordinated monitoring infrastructure sensors

Inventory               RFID tags and readers   Identify and track items

---

### 1.5 IoT is a convergence of technologies

IoT is not one single technology. A system may combine: 

- Embedded systems and microcontrollers 

- Sensors and actuators 

- Wired and wireless networking 

Cloud computing and backend services 

- Data storage and analytics 

- Machine learning or computer vision where useful 

- Electrical and mechanical engineering 

- Energy harvesting in suitable deployments

### 1.6 Communication technologies mentioned in Week 1

- **Wi-Fi:** wireless local connectivity.
- **Cellular:** communication through cellular networks.
- **Bluetooth / Bluetooth Low Energy (BLE):** short-range wireless communication; BLE is designed for low-energy use cases.
- **Ethernet:** wired networking.
- **IEEE 802.15.4:** low-rate wireless personal-area networkingfoundation.
- **ZigBee, DASH7, Insteon:** examples of other approaches mentionedin the course material.

No one technology is best for every IoT application. Selection depends

on range, bandwidth, energy, cost, environment, and connectivity

requirements.

### 1.7 Origin and scale

The course slides refer to the **International Telecommunication Union(ITU)** report *The Internet of Things* from **2005**. The teachingmaterial describes a future in which connected things could becomeextremely numerous and much traffic could flow between devices.

The slides also quote historical forecasts of **20 billion** or **20--50billion connected devices by 2018**. Treat these as historical forecastsfrom the course material, not as current statistics.

### 1.8 Important terms

- **IoT node:** a device or endpoint participating in an IoT network.
- **M2M:** Machine-to-machine communication; devices exchange information directly or through supporting systems.
- **RFID:** Radio-Frequency Identification; identifies tagged objects using radio communication.
- **Interoperability:** the ability of different systems to exchange and use information together.
- **Backend service:** software that receives, stores, processes, or analyses data.
- **Analytics:** processing data to find patterns or produce summaries/decision support.
- **Energy harvesting:** obtaining usable energy from an environmentalsource.

## 2. Addressing and connectivity

### 2.1 Address crunch

The **address crunch** is the challenge of supporting a very large number of connected devices with unambiguous, scalable addressing. IoT scale makes addressing difficult because: 

- There can be a huge number of endpoints. 

- Devices have different capabilities and standards. 

- Identifiers may be local to one network or meaningful across networks. 

- Devices may connect intermittently or sleep to save energy.

**IPv4** has a smaller address space than IPv6. **IPv6 uses 128-bitaddresses**, providing a much larger address space. Addressing designalso concerns scope and how local networks connect to wider networks.

### 2.2 Connectivity diversity

Different devices have different communication requirements. A sensor that sends a few bytes occasionally differs from a camera sending large amounts of data. A design must choose technologies suited to the device and application, then make the components work together.

Technology        General role in the course

---

Wi-Fi             Wireless local connectivity

Cellular          Connectivity through cellular coverage

Ethernet          Wired networking

BLE               Low-energy wireless communication

IEEE 802.15.4     Low-rate WPAN foundation

DASH7 / Insteon   Other connectivity examples in the slides

### 2.3 IoT LAN, WAN, node, gateway, and proxy

- **IoT LAN:** local network connecting nearby devices; may cover aroom, building, or local site.
- **IoT WAN:** connects network segments over a wider geographical ororganisational area and may connect them to the Internet.
- **IoT node:** endpoint such as a sensor, actuator, or controller.
- **IoT gateway:** connects a local IoT LAN to a wider network and forwards packets between networks. The Week 1 slides describe it as router-like and emphasise IP-layer forwarding.
- **IoT proxy:** performs active application-layer functions between IoT nodes and other entities.

Term      Main job                               Memory clue

---

LAN       Local communication                    Local

WAN       Wider-area interconnection             Wide

Node      Participating endpoint                 Device

Gateway   Connects networks / forwards packets   Network boundary

Proxy     Application-layer mediation            Application functions

**Exam trap:** A gateway and a proxy are not identical. In the course model, the gateway primarily connects networks and forwards packets; the proxy performs application-layer functions.

### 2.4 Address scope and local address reuse

An identifier can be unique inside one local network without being globally unique. Local addressing can help reuse identifiers in separate network scopes, while gateways help connect local networks to wider networks. The important question is always: **within what scope must this address be unique?**

### 2.5 Interoperability

Interoperability means that different components can exchange and correctly interpret information. It can fail even when the network connection itself works.

Examples: - One device labels a value `temp`, while another expects `temperature`. - One system reports a value in Celsius while another assumes Fahrenheit. - Devices use incompatible message formats or protocols.

**Semantic interoperability** concerns whether the meaning of exchanged information is understood consistently---not merely whether bits can be delivered

## 3. Sensing

### 3.1 Sensor, transducer, and actuator

- **Sensor:** detects or measures a physical property or state.
- **Transducer:** converts one form of energy or signal into another.
- **Actuator:** moves or controls a mechanism to create a physical effect.

A sensor may also be a type of transducer, but the terms emphasise different roles: measurement versus conversion.

### 3.2 Sensor characteristics

---

Characteristic          Meaning                                 Remember

---

Accuracy                Closeness of a                          Correctness

                        measurement to the

                 true/reference value

Precision               Agreement among                     Repeatability

                        repeated measurements

Resolution              Smallest detectable or             Smallest step

                        representable change

Sensitivity             Output change relative                Output/input response

                       to input change

Range                   Interval of values the                  Minimum to maximum

                       sensor can measure

Response time     How quickly the sensor              Speed

                      responds to a change

Drift                      Gradual change in                       Slow change

                      output over time under

                       similar conditions

---

**Important:** Higher resolution does not automatically mean higher

accuracy. A sensor can show very small increments while still being

biased away from the true value.

### 3.3 Sensor examples

- **PIR (Passive Infrared) sensor:** commonly detects motion by sensing changes in infrared energy, often from people moving throughits field of view.
- **Ultrasonic sensor:** estimates distance using sound pulses and thet ime taken for the echo to return.

For an ultrasonic sensor, if the sound travels to the object and back, the distance is approximately:

**Distance = (speed of sound × round-trip time) ÷ 2**

The division by two is needed because the measured time includes the outgoing and returning journey.

### 3.4 Measurement example

Suppose a sensor reports 24.8, 24.9, and 24.8 when the reference value is 30.0: - The readings are close to each other, so they show good **precision**. - They are far from the reference value, so they show poor **accuracy**.

### 3.5 Sensor revision checklist

Be able to define accuracy, precision, resolution, sensitivity, range, response time, calibration, and drift without mixing them up. Also know the purpose of PIR and ultrasonic sensors.

## 4. Actuation

### 4.1 What is actuation?

**Actuation** is the process of converting a control decision or signal into a physical action. An actuator moves or controls a mechanism. A system typically needs: 

1. A control signal or command. 

2. An actuator/driver. 

3. An energy source. 

4. A physical mechanism that performs the action.

A control signal tells the system what to do, but the energy source supplies the power needed to do it.

### 4.2 Actuator types listed in the course

- **Electrical:** uses electrical energy to create movement or action.
- **Mechanical:** uses mechanical mechanisms to produce the requiredeffect.
- **Hydraulic:** uses pressurised liquid.
- **Pneumatic:** uses compressed gas/air.
- **Thermal:** uses heat-related effects.
- **Magnetic:** uses magnetic forces.

The course material also mentions devices such as relays and solenoid valves as examples of actuation mechanisms.

### 4.3 Relay

A **relay** is an electrically controlled switch. A control signal energises a coil or switching mechanism, changing the state of contacts. It allows a low-power control circuit to switch another circuit.

### 4.4 Solenoid valve

A **solenoid valve** uses an electromagnetic solenoid to open or close a valve. In an irrigation example, the controller sends a command and the valve controls water flow.

### 4.5 Example: automatic irrigation

1. A field sensor measures a condition such as soil moisture.
2. A controller reads the measurement.
3. Control logic decides whether irrigation is needed.
4. A command drives the valve/actuator.
5. The valve opens or closes and changes water flow.
6. The system can report the reading and action to an application.

This illustrates the complete path from **measurement → data → decision→ command → physical action**.

## 5. IoT networking and end-to-end flow

### 5.1 Typical IoT information path

**Physical environment → sensor → embedded controller → local network →gateway → wider network/backend → application**

For actuation, the command path can travel back toward the device:

**Application/control logic → network → controller/driver → actuator →physical action**

Not every IoT deployment needs every block; the diagram is a conceptual model.

### 5.2 Components and their responsibilities

- **Sensor:** measures a condition.
- **Embedded processor/controller:** reads and processes measurements;applies local logic.
- **Communication link:** carries data and commands.
- **Gateway:** connects local and wider networks.
- **Backend:** may store, process, or analyse incoming information.
- **Application:** presents information and may allow users to issue commands.
- **Actuator:** creates a physical effect.

### 5.3 Troubleshooting by following the data path

If a dashboard does not update: 

1. Check whether the sensor is producing a sensible local reading. 

2. Check the device/controller and message preparation. 

3. Check the local communication link. 

4. Check the gateway and wider network. 

5. Check the backend/application. 

6. If the displayed value is wrong, check units, field names, and interpretation---not just connectivity.

A working sensor does not prove that the complete IoT system works; measurement, communication, interpretation, decision logic, and actuation are separate stages.

### 5.4 Week 1 high-priority comparisons

---

Pair                                             Difference

---

Sensor vs actuator                    Measures input/condition vs performs physical action

Sensor vs transducer                Measurement role vs energy/signal conversion

Accuracy vs precision               Closeness to true value vs repeatability

Resolution vs sensitivity           Smallest detectable change vs output change per input change

Gateway vs proxy                    Network forwarding vs application-layer mediation

LAN vs WAN                           Local network vs wider-area interconnection

Node vs gateway                     Endpoint/device vs component connecting networks

Connectivity vs interoperability    Ability to connect/exchange bits vs ability to interpret/use the 

                                              information correctly

---

# WEEK 2 --- IoT NETWORKING PROTOCOLS AND CONNECTIVITY

## 6. Protocol foundations and layers

A **protocol** is a set of rules that lets devices exchange information in a compatible way. IoT uses multiple protocols because devices have different power, processing, bandwidth, and reliability constraints.

---

Area                             Technologies in the course     Main purpose 

---

Application/service       MQTT, SMQTT, CoAP,      Exchange data, messages and notifications

                               XMPP, AMQP              

Physical/link                  IEEE 802.15.4, ZigBee   Local wireless connectivity  

IPv6 adaptation/routing 6LoWPAN, LOADng, RPL    Carry IPv6 over low-power links and route 

                                                                             through constrained networks

---

**Layering memory aid:** 

- IEEE 802.15.4 primarily defines **PHY and MAC** functions. 

- ZigBee adds **network and higher-layer functionality** above 802.15.4. 

- 6LoWPAN adapts IPv6 packets for low-power wireless links. 

- MQTT, CoAP, XMPP, and AMQP are application/service messaging protocols. 

- LOADng and RPL are routingprotocols.

## 7. MQTT --- Message Queue Telemetry Transport

### 7.1 Definition and purpose

**MQTT** is a lightweight **publish-subscribe** messaging protocol. It is designed for remote connections and environments with limited bandwidth or constrained devices.

IBM introduced MQTT in 1999 and OASIS standardised it in 2013.

### 7.2 Main components

- **Publisher:** produces and publishes a message.
- **Broker:** receives publications, matches topics against subscriptions, and distributes messages.
- **Subscriber:** subscribes to topics and receives matching messages.
- **Topic:** a named category/path used to classify messages.

### 7.3 How MQTT works

1. A client connects to the broker.
2. A subscriber registers interest in a topic.
3. A publisher sends a message to that topic.
4. The broker checks topic subscriptions.
5. The broker forwards the message to matching subscribers.
6. Clients can unsubscribe or disconnect.

**Flow:** Publisher → broker/topic matching → subscriber(s).

The publisher and subscriber do not need to know each other directly.

The broker decouples them.

### 7.4 Core MQTT methods

Method        Purpose

---

CONNECT       Connect a client to the server/broker

DISCONNECT    End the connection

SUBSCRIBE     Register interest in a topic

UNSUBSCRIBE   Cancel topic interest

PUBLISH       Send a message to a topic

### 7.5 Topic wildcard

The course guide identifies `+` as a **single-level wildcard** in a topic filter. For example, `house/+/temperature` can match a single topic level between `house/` and `/temperature`.

### 7.6 SMQTT

**SMQTT** is described in the supplied material as a secure MQTT extension. The guide associates it with adding security/encryption. Remember it as the security-related MQTT term in these notes.

### 7.7 MQTT strengths and exam clues

- Lightweight and suited to constrained/remote devices.
- Publish--subscribe model.
- Broker and topics are central.
- Publishers and subscribers are decoupled.
- Uses TCP/IP in the course framing.

**Exam clue:** "Topic + broker + publisher/subscriber" → MQTT.

## 8. CoAP --- Constrained Application Protocol

### 8.1 Definition and purpose

**CoAP** is the **Constrained Application Protocol**, designed for constrained devices and networks. It follows a lightweight, REST-like request--response model and is described in the course as operating over **UDP**.-+

### 8.2 REST-like methods

- **GET:** retrieve a resource.
- **POST:** submit data or request processing.
- **PUT:** create/update or replace a resource representation.
- **DELETE:** remove a resource.

These resemble familiar web methods but are used in a constrained-device

context.

### 8.3 Message and response distinctions

---

Term                                           Meaning

---

Confirmable (CON)                   Message expects an acknowledgement

Non-confirmable (NON)               No acknowledgement is required by the message mode

Piggyback response                  Response is combined with the acknowledgement

Separate response                   Response is sent separately from the acknowledgement

---

**Exam trap:** Confirmable/non-confirmable concerns acknowledgement

behaviour. Piggyback/separate concerns how the response is delivered.

They are not the same distinction.

### 8.4 CoAP exam clues

- Constrained devices.
- REST-like request--response.
- UDP.
- GET, POST, PUT, DELETE.
- Confirmable versus non-confirmable; piggyback versus separate.

**Exam clue:** "Lightweight REST-like protocol over UDP" → CoAP.

## 9. XMPP --- Extensible Messaging and Presence Protocol

### 9.1 Definition

**XMPP** is the **Extensible Messaging and Presence Protocol**. The course describes it as XML-based and associated with messaging, presence, service discovery, and other communication services.

### 9.2 Key features named in the guide

- **XML:** structured text format used for messages.
- **Presence:** information about availability/status.
- **Client--server:** common communication model.
- **Decentralised/federated communication:** services can communicate across servers.
- **Jingle:** multimedia session signalling in the course material.
- **Multi-user chat:** group communication.
- **PubSub:** publish--subscribe functionality.
- **Service discovery:** identify services/features available on asystem.

### 9.3 Limitation / exam point

Text-based XML can create more network overhead than a compact binary format. Base64 encoding, when used, can add further overhead.

**Exam clue:** "XML + presence + service discovery" → XMPP.

## 10. AMQP --- Advanced Message Queuing Protocol

### 10.1 Definition and purpose

**Advanced Message Queuing Protocol** (**AMQP**) is an open-standard, application-layer binary messaging protocol that provides reliable, guaranteed message delivery, flexible routing, and security over TCP

### 10.2 Main components

- **Producer:** creates and sends a message.
- **Exchange:** receives a message and routes it according to rules.
- **Binding:** rule connecting an exchange to a queue.
- **Queue:** stores messages until consumers receive them.
- **Consumer:** receives/processes messages.
- **Broker:** messaging intermediary that coordinates routing and delivery.

### 10.3 Message flow

1. A producer sends a message to an exchange.
2. The exchange evaluates routing rules.
3. Bindings determine which queues receive the message.
4. The message enters one or more queues.
5. Consumers retrieve/process messages.

### 10.4 Exchange types

Exchange type   Routing behaviour

---

Direct          Routes using an exact routing-key match

Fan-out         Sends to all queues bound to the exchange

Topic           Uses routing-key patterns

Headers         Uses message header attributes

### 10.5 Delivery guarantees

---

Guarantee               Meaning                 Main caution

---

At-most-once            Message is delivered    May be lost

zero or one time

At-least-once           Message is delivered    Duplicates may occur

one or more times

Exactly-once            Message is              Harder to achieve and

processed/delivered     implement

once according to the

guarantee

---

**Exam trap:** At-least-once does **not** mean "no duplicates." It

allows duplicate delivery.

### 10.6 AMQP frame types

The supplied guide lists **nine** frame types: 

1. Open 

2. Begin 

3.Attach 

4. Transfer 

5. Flow 

6. Disposition 

7. Detach 

8. End 

9. Close

**Exam clue:** "Binary messaging + exchange + binding + queue" → AMQP.

## 11. IEEE 802.15.4 --- Low-Rate WPAN

### 11.1 Purpose

**IEEE 802.15.4** provides physical-layer (**PHY**) and medium-access-control (**MAC**) foundations for low-rate Wireless Personal Area Networks (**WPANs**). It is intended for low-power, low-rate communication, often useful for monitoring and control.

### 11.2 Key terms

- **WPAN:** Wireless Personal Area Network.
- **PHY:** Physical layer; radio transmission/modulation functions.
- **MAC:** Medium Access Control; controls access to a sharedcommunication medium.
- **CSMA-CA:** Carrier Sense Multiple Access with Collision Avoidance.
- **DSSS:** Direct Sequence Spread Spectrum.
- **BPSK:** Binary Phase Shift Keying.
- **O-QPSK:** Offset Quadrature Phase Shift Keying.
- **ISM:** Industrial, Scientific and Medical radio bands.

The guide quotes a typical range of **10--75 m** and duty cycle **below 1%** in its course context. Treat range as a course revision value, nota guarantee for every deployment.

### 11.3 CSMA-CA

A device senses the channel before transmitting and uses a collision-avoidance procedure to reduce the chance of simultaneous transmissions colliding.

### 11.4 FFD and RFD

---

Device                  Full form                             Capability

---

FFD                     Full Function Device           Supports the full protocol and can communicate with                                                                           all device types

RFD                    Reduced Function Device       Device Simpler/lower-resource  communicates with                                                                               an FFD in the supplied guide

---

### 11.5 Frame types

- **Beacon:** supports synchronisation and association.
- **Data:** carries user information.
- **Acknowledgement:** confirms reception.
- **MAC command/control:** supports control operations such asassociation/disassociation.

### 11.6 Beacon-enabled versus non-beacon-enabled

---

Feature                 Beacon-enabled               Non-beacon-enabled

---

Beacon use              Periodic beacons             No beacon-managed

slotted superframe in

the described contrast

Access                  Slotted CSMA-CA              Unslotted CSMA-CA

Coordination            Coordinator manages          Contention-based access

superframe/synchronisation   without the

beacon-managed

superframe

---

**Exam clue:** "PHY/MAC + CSMA-CA + FFD/RFD" → IEEE 802.15.4.

## 12. ZigBee

### 12.1 Relationship to IEEE 802.15.4

ZigBee uses IEEE 802.15.4 for **layers 1 and 2 (PHY/MAC)** and adds

network and higher-layer functionality. Therefore, ZigBee and 802.15.4

are related but not identical.

### 12.2 ZigBee components

- **ZDO:** ZigBee Device Object; device management, security,policies, and provisioning.
- **APS:** Application Support Sublayer; supports services/interfaces between network and application-related layers.

### 12.3 Network roles

---

Role                                        Function

---

Coordinator (ZC)                    One per network in the course description; initiates/forms the                                                             network, acts as root, stores network information and may act as                                                       trust centre

Router (ZR)                            Relays messages and can be part of the mesh backbone

End Device (ZED)                  Communicates with its parent; does not relay other devices' data

---

### 12.4 Topologies

- **Star:** devices communicate through a central coordinator.
- **Cluster tree:** hierarchical parent/child arrangement.
- **Mesh:** nodes can communicate directly or relay through othernodes; alternate routes may be available.

### 12.5 Mesh reliability

A mesh can be self-configuring and self-healing when alternate routes are available. If one route or node fails, traffic may use another route. However, a mesh **does not guarantee delivery if all usable paths fail**.

### 12.6 Routing and applications

The lecture associates ZigBee routing with **AODV (Ad Hoc On-Demand Distance Vector)**: 

1. A route request is broadcast to neighbours. 

2.Neighbours relay the request onward. 

3. When the destination is found,route information is returned toward the requester. 

4. A route is selected based on the protocol's route-selection rules.

Applications listed in the guide include home/building automation, remote control, smart energy monitoring, healthcare/fitness monitoring, and LED lighting.

**Exam clue:** "Coordinator + router + end device + mesh" → ZigBee.

## 13. 6LoWPAN --- IPv6 over Low-Power WPAN

### 13.1 Dfinition and purpose

**6LoWPAN** means **IPv6 over Low-Power Wireless Personal AreaNetworks**. It adapts IPv6 communication for constrained low-powerwireless links such as IEEE 802.15.4.

IPv6 uses **128-bit addresses** and has headers that may be too large for small link-layer frames. 6LoWPAN adaptation helps constrained devices carry IPv6 packets over these links.

### 13.2 Main functions

- Header compression.
- Packet adaptation/reformatting.
- Fragmentation when a datagram is too large for one frame.
- Support for IPv6-based IoT communication over low-power links.

### 13.3 Address lengths in the course guide

---

Address                                     Length Meaning in the guide

---

IPv6                                              128 bits Network-layer addressing

Extended link address                  64 bits Globally unique extended address

Short link address                         16 bits PAN-specific address assigned by coordinator

---

### 13.4 Header types

1. **Dispatch header:** identifies the type of header that follows.
2. **Mesh addressing header:** carries originator/final address information and a "hops left" field; hop count decreases at eachhop.
3. **Fragmentation header:** supports splitting datagrams that do not fit into one constrained frame.

### 13.5 Fragmentation

If a datagram exceeds frame capacity, it is divided into fragments. The first fragment carries datagram-size and tag information; subsequent fragments include an offset so pieces can be placed correctly during reassembly.

**Exam clue:** "IPv6 over constrained WPAN + compression + fragmentation" → 6LoWPAN.

## 14. LOADng and RPL routing

### 14.1 LOADng

**LOADng** is presented as a lightweight on-demand routing protocol derived from AODV and adapted for IoT. Its three important messages are: - 

**- RREQ --- Route Request:** searches for a route to a destination. 

- **RREP --- Route Reply:** returns route information toward the originator. 

- **RERR --- Route Error:** reports a broken route.

The guide describes optimised flooding to reduce route-request overhead

and says that the destination responds to the route request in the

course's explanation.

### 14.2 RPL

**RPL** is a distance-vector IPv6 routing protocol for **Low-Power and Lossy Networks (LLNs)**.

Key points from the course guide: 

- Maintains network topology using low-rate beaconing. 

- Beaconing can increase when inconsistencies or failures are detected. 

- Combines proactive topology maintenance with reactive handling of inconsistencies. \

- Supports routing objectives and packet forwarding for constrained networks. 

 - Links may be asymmetric; parent reachability should be verified before a router is used as a parent.

### 14.3 LOADng versus RPL

---

Feature                 LOADng                  RPL

---

Core idea               On-demand route         LLN topology/routing

discovery               maintenance

Key terms               RREQ, RREP, RERR        Low-rate beaconing,

parent reachability

Course description      Derived from AODV       Distance-vector IPv6

routing for LLNs

Failure handling        RERR reports broken     Beaconing/consistency

route                   mechanisms respond to

inconsistencies

---

**Exam clue:** "RREQ/RREP/RERR" → LOADng. "Distance-vector IPv6 for

LLNs" → RPL.

## 15. RFID --- Radio-Frequency Identification

### 15.1 Definition

**RFID** stands for **Radio-Frequency Identification**. It uses digitally encoded data in tags, which are read by an RFID reader using radio communication. Unlike a barcode or QR code, RFID does not rely on optical scanning.

### 15.2 Tag components

- **Integrated circuit (IC):** stores identifying information andperforms electronic functions.
- **Antenna:** supports communication between the tag and the outsideworld.
- **Protective material:** covers/protects components.

### 15.3 Passive versus active RFID

---

!image.png

---

### 15.4 Working sequence

1. An item carries a tag containing a chip and antenna.
2. The reader uses its antenna/coil and associated electronics/software.
3. When the tag is within suitable range, the reader field enablescommunication.
4. The reader obtains the encoded data.
5. The system identifies the item or uses the ID to retrieve associateddatabase information.

### 15.5 AIDC and applications

**AIDC** means **Automatic Identification and Data Capture**: identifying objects, collecting data, and transferring it to computer systems with little or no human intervention.

RFID applications in the guide: 

- Inventory management and asset tracking. 

- Personnel tracking and attendance. - Access control for restricted areas. 

- ID badges and smart cards. 

**Exam clue:** "Tag + chip + antenna + radio-frequency reader" → RFID.

# HIGH-PRIORITY COMPARISON TABLES

## 16. Application protocols

---

Protocol                Communication model /   Important detail

defining clue

---

MQTT                    Publish--subscribe           Broker and topics; TCP/IP in course guide

CoAP                    Request--response          Lightweight REST-like protocol over UDP

XMPP                    XML-based messaging and Text overhead; service

presence                discovery

AMQP                    Binary messaging with   Bindings and delivery guarantees

                        exchanges and queues    

SMQTT                   Secure MQTT extension   Security/encryption-related in course material

---

## 17. Connectivity, adaptation, routing, identification

---

Technology              Main job                Keywords

---

IEEE 802.15.4           PHY/MAC for low-rate    CSMA-CA, FFD/RFD WPAN

ZigBee                      Network/higher layers     Coordinator, router,

                                 above 802.15.4                end device, mesh

6LoWPAN                 Adapt IPv6 for                Compression,fragmentation

                          low-power WPAN          

LOADng                  On-demand routing       RREQ, RREP, RERR

RPL                     Routing in LLNs         Distance-vector IPv6,topology maintenance

---

# QUICK MEMORISATION SHEET

## 19. Full forms and key abbreviations (Master course sheet)

<table class="ff-table">
<thead><tr><th>Abbreviation</th><th>Full Form</th></tr></thead>
<tbody>
<tr><td>6LoWPAN</td><td>IPv6 over Low-Power Wireless Personal Area Networks</td></tr>
<tr><td>ADC</td><td>Analog-to-Digital Converter</td></tr>
<tr><td>AIDC</td><td>Automatic Identification and Data Capture</td></tr>
<tr><td>AMQP</td><td>Advanced Message Queuing Protocol</td></tr>
<tr><td>ANOVA</td><td>Analysis of Variance</td></tr>
<tr><td>AoA</td><td>Angle of Arrival</td></tr>
<tr><td>AODV</td><td>Ad Hoc On-Demand Distance Vector routing</td></tr>
<tr><td>AP</td><td>Access Point</td></tr>
<tr><td>API</td><td>Application Programming Interface</td></tr>
<tr><td>APS</td><td>Application Support Sublayer (ZigBee)</td></tr>
<tr><td>BCM</td><td>Broadcom (Broadcom SOC channel pin numbering on Raspberry Pi)</td></tr>
<tr><td>BLE</td><td>Bluetooth Low Energy</td></tr>
<tr><td>BOARD</td><td>Physical Board pin numbering convention on Raspberry Pi</td></tr>
<tr><td>BPSK</td><td>Binary Phase Shift Keying</td></tr>
<tr><td>CCN</td><td>Content-Centric Networking</td></tr>
<tr><td>Ceilometer</td><td>OpenStack Telemetry and Metering Service</td></tr>
<tr><td>CIA</td><td>Confidentiality, Integrity, and Availability</td></tr>
<tr><td>Cinder</td><td>OpenStack Block Storage Service</td></tr>
<tr><td>CLI</td><td>Command Line Interface</td></tr>
<tr><td>CoAP</td><td>Constrained Application Protocol</td></tr>
<tr><td>CoV-I</td><td>Cloud of Virtual sensors Type I (homogeneous sensors in single region)</td></tr>
<tr><td>CoV-II</td><td>Cloud of Virtual sensors Type II (heterogeneous sensors across multiple regions)</td></tr>
<tr><td>CPS</td><td>Cyber-Physical Systems</td></tr>
<tr><td>CS</td><td>Content Store (CCN)</td></tr>
<tr><td>CSI</td><td>Camera Serial Interface</td></tr>
<tr><td>CSMA-CA</td><td>Carrier Sense Multiple Access with Collision Avoidance</td></tr>
<tr><td>CSV</td><td>Comma-Separated Values</td></tr>
<tr><td>DAC</td><td>Digital-to-Analog Converter</td></tr>
<tr><td>DHCP</td><td>Dynamic Host Configuration Protocol</td></tr>
<tr><td>DLNA</td><td>Digital Living Network Alliance</td></tr>
<tr><td>DNS</td><td>Domain Name System</td></tr>
<tr><td>DomoNet</td><td>Domestic Network (centralized SOA home automation)</td></tr>
<tr><td>DSI</td><td>Display Serial Interface</td></tr>
<tr><td>DSRC</td><td>Dedicated Short-Range Communications (75 MHz at 5850–5925 MHz)</td></tr>
<tr><td>DSSS</td><td>Direct Sequence Spread Spectrum</td></tr>
<tr><td>DTN</td><td>Delay-Tolerant Network</td></tr>
<tr><td>EEPROM</td><td>Electrically Erasable Programmable Read-Only Memory</td></tr>
<tr><td>FANET</td><td>Flying Ad Hoc Network</td></tr>
<tr><td>FFD</td><td>Full Function Device (IEEE 802.15.4)</td></tr>
<tr><td>FHSS</td><td>Frequency-Hopping Spread Spectrum</td></tr>
<tr><td>FIB</td><td>Forwarding Information Base (CCN)</td></tr>
<tr><td>GFSK</td><td>Gaussian Frequency Shift Keying</td></tr>
<tr><td>Glance</td><td>OpenStack Virtual Disk Image Service</td></tr>
<tr><td>GPIO</td><td>General-Purpose Input/Output</td></tr>
<tr><td>GPS</td><td>Global Positioning System</td></tr>
<tr><td>GUI</td><td>Graphical User Interface</td></tr>
<tr><td>HAN</td><td>Home Area Network</td></tr>
<tr><td>HART</td><td>Highway Addressable Remote Transducer</td></tr>
<tr><td>HDMI</td><td>High-Definition Multimedia Interface</td></tr>
<tr><td>Heat</td><td>OpenStack Orchestration Engine</td></tr>
<tr><td>Horizon</td><td>OpenStack Dashboard (Web GUI)</td></tr>
<tr><td>I2C / IIC</td><td>Inter-Integrated Circuit</td></tr>
<tr><td>IaaS</td><td>Infrastructure as a Service</td></tr>
<tr><td>IAM</td><td>Identity and Access Management</td></tr>
<tr><td>ICV</td><td>Intelligent Connected Vehicle</td></tr>
<tr><td>ICT</td><td>Information and Communications Technology</td></tr>
<tr><td>IDE</td><td>Integrated Development Environment</td></tr>
<tr><td>IEEE</td><td>Institute of Electrical and Electronics Engineers</td></tr>
<tr><td>IIoT</td><td>Industrial Internet of Things</td></tr>
<tr><td>INPP</td><td>In-Network Packet Processing (SDN-WISE)</td></tr>
<tr><td>IoT</td><td>Internet of Things</td></tr>
<tr><td>IP</td><td>Internet Protocol</td></tr>
<tr><td>IPv4</td><td>Internet Protocol version 4 (32-bit addresses)</td></tr>
<tr><td>IPv6</td><td>Internet Protocol version 6 (128-bit addresses)</td></tr>
<tr><td>ISA</td><td>International Society of Automation (ISA100.11a)</td></tr>
<tr><td>ISM</td><td>Industrial, Scientific and Medical (radio bands)</td></tr>
<tr><td>ISP</td><td>Internet Service Provider</td></tr>
<tr><td>ITS</td><td>Intelligent Transportation Systems</td></tr>
<tr><td>ITU</td><td>International Telecommunication Union</td></tr>
<tr><td>Jini</td><td>Java Intelligent Network Infrastructure</td></tr>
<tr><td>Keystone</td><td>OpenStack Identity and Authentication Service</td></tr>
<tr><td>KNX</td><td>Konnex (standardized home and building automation protocol)</td></tr>
<tr><td>L2CAP</td><td>Logical Link Control and Adaptation Protocol</td></tr>
<tr><td>LAN</td><td>Local Area Network</td></tr>
<tr><td>LLN</td><td>Low-Power and Lossy Network</td></tr>
<tr><td>LOADng</td><td>Lightweight On-demand Ad hoc Distance-vector routing — next generation</td></tr>
<tr><td>LonWorks</td><td>Local Operating Network Works (Neuron-chip based automation)</td></tr>
<tr><td>M2M</td><td>Machine-to-Machine</td></tr>
<tr><td>MAC</td><td>Medium Access Control</td></tr>
<tr><td>MANET</td><td>Mobile Ad Hoc Network</td></tr>
<tr><td>MCU</td><td>Microcontroller Unit</td></tr>
<tr><td>MQTT</td><td>Message Queue Telemetry Transport</td></tr>
<tr><td>Neutron</td><td>OpenStack Software-Defined Networking Service</td></tr>
<tr><td>NFC</td><td>Near Field Communication</td></tr>
<tr><td>NFV</td><td>Network Functions Virtualization</td></tr>
<tr><td>NIST</td><td>National Institute of Standards and Technology</td></tr>
<tr><td>NOS</td><td>Network Operating System</td></tr>
<tr><td>Nova</td><td>OpenStack Compute Service (manages VMs)</td></tr>
<tr><td>O-QPSK</td><td>Offset Quadrature Phase Shift Keying</td></tr>
<tr><td>OGDC</td><td>Optimal Geographical Density Control</td></tr>
<tr><td>ONOS</td><td>Open Network Operating System</td></tr>
<tr><td>OpenFlow</td><td>Open Communications Protocol for SDN Southbound API</td></tr>
<tr><td>OS</td><td>Operating System</td></tr>
<tr><td>PaaS</td><td>Platform as a Service</td></tr>
<tr><td>PHY</td><td>Physical Layer</td></tr>
<tr><td>PIL</td><td>Python Imaging Library (forked as Pillow)</td></tr>
<tr><td>PIR</td><td>Passive Infrared (motion sensor)</td></tr>
<tr><td>PLC</td><td>Programmable Logic Controller</td></tr>
<tr><td>PWM</td><td>Pulse Width Modulation</td></tr>
<tr><td>QoE</td><td>Quality of Experience</td></tr>
<tr><td>QoS</td><td>Quality of Service</td></tr>
<tr><td>RERR</td><td>Route Error (LOADng / AODV)</td></tr>
<tr><td>REST</td><td>Representational State Transfer</td></tr>
<tr><td>RFCOMM</td><td>Radio Frequency Communications (serial cable emulation over Bluetooth)</td></tr>
<tr><td>RFD</td><td>Reduced Function Device (IEEE 802.15.4)</td></tr>
<tr><td>RFID</td><td>Radio-Frequency Identification</td></tr>
<tr><td>RPi</td><td>Raspberry Pi</td></tr>
<tr><td>RPL</td><td>Routing Protocol for Low-Power and Lossy Networks</td></tr>
<tr><td>RREP</td><td>Route Reply (LOADng / AODV)</td></tr>
<tr><td>RREQ</td><td>Route Request (LOADng / AODV)</td></tr>
<tr><td>RSSI</td><td>Received Signal Strength Indicator</td></tr>
<tr><td>S3</td><td>Simple Storage Service (Amazon S3)</td></tr>
<tr><td>SaaS</td><td>Software as a Service</td></tr>
<tr><td>SAE</td><td>Society of Automotive Engineers (SAE J2735 / J2945)</td></tr>
<tr><td>SCADA</td><td>Supervisory Control and Data Acquisition</td></tr>
<tr><td>SCSP</td><td>Sensor-Cloud Service Provider</td></tr>
<tr><td>SDN</td><td>Software-Defined Networking</td></tr>
<tr><td>SDN-WISE</td><td>Software-Defined Networking for Wireless Sensor Networks</td></tr>
<tr><td>SDP</td><td>Service Discovery Protocol (Bluetooth)</td></tr>
<tr><td>Se-aaS</td><td>Sensing as a Service (also written SeaaS)</td></tr>
<tr><td>SLA</td><td>Service Level Agreement</td></tr>
<tr><td>SMQTT</td><td>Secure Message Queue Telemetry Transport</td></tr>
<tr><td>SoC</td><td>System on Chip</td></tr>
<tr><td>SPI</td><td>Serial Peripheral Interface</td></tr>
<tr><td>SRAM</td><td>Static Random-Access Memory</td></tr>
<tr><td>SSH</td><td>Secure Shell</td></tr>
<tr><td>SSID</td><td>Service Set Identifier</td></tr>
<tr><td>STA</td><td>Station (Wi-Fi client node)</td></tr>
<tr><td>Swift</td><td>OpenStack Object Storage Service</td></tr>
<tr><td>TCP</td><td>Transmission Control Protocol</td></tr>
<tr><td>TDoA</td><td>Time Difference of Arrival</td></tr>
<tr><td>TDMA</td><td>Time Division Multiple Access</td></tr>
<tr><td>ToA</td><td>Time of Arrival</td></tr>
<tr><td>UART</td><td>Universal Asynchronous Receiver-Transmitter</td></tr>
<tr><td>UAV</td><td>Unmanned Aerial Vehicle</td></tr>
<tr><td>UDP</td><td>User Datagram Protocol</td></tr>
<tr><td>UMB</td><td>Universal Middleware Bridge</td></tr>
<tr><td>UPnP</td><td>Universal Plug and Play</td></tr>
<tr><td>USART</td><td>Universal Synchronous/Asynchronous Receiver-Transmitter</td></tr>
<tr><td>UWASN</td><td>Underwater Acoustic Sensor Network</td></tr>
<tr><td>V2I</td><td>Vehicle-to-Infrastructure</td></tr>
<tr><td>V2N</td><td>Vehicle-to-Network</td></tr>
<tr><td>V2P</td><td>Vehicle-to-Pedestrian / Vehicle-to-Person</td></tr>
<tr><td>V2V</td><td>Vehicle-to-Vehicle</td></tr>
<tr><td>V2X</td><td>Vehicle-to-Everything</td></tr>
<tr><td>VANET</td><td>Vehicular Ad-hoc Network</td></tr>
<tr><td>VM</td><td>Virtual Machine</td></tr>
<tr><td>VMM</td><td>Virtual Machine Monitor (Hypervisor)</td></tr>
<tr><td>WAN</td><td>Wide Area Network</td></tr>
<tr><td>WAVE</td><td>Wireless Access in Vehicular Environments (IEEE 1609 standard family)</td></tr>
<tr><td>WBAN</td><td>Wireless Body Area Network</td></tr>
<tr><td>WirelessHART</td><td>Wireless Highway Addressable Remote Transducer</td></tr>
<tr><td>WMSN</td><td>Wireless Multimedia Sensor Network</td></tr>
<tr><td>WPAN</td><td>Wireless Personal Area Network</td></tr>
<tr><td>WSN</td><td>Wireless Sensor Network</td></tr>
<tr><td>X-10</td><td>Power-line control standard for home automation</td></tr>
<tr><td>XML</td><td>Extensible Markup Language</td></tr>
<tr><td>XMPP</td><td>Extensible Messaging and Presence Protocol</td></tr>
<tr><td>ZC</td><td>ZigBee Coordinator</td></tr>
<tr><td>ZDO</td><td>ZigBee Device Object</td></tr>
<tr><td>ZED</td><td>ZigBee End Device</td></tr>
<tr><td>ZigBee</td><td>ZigBee Specification (built on IEEE 802.15.4)</td></tr>
<tr><td>ZR</td><td>ZigBee Router</td></tr>
</tbody>
</table>

## 20. Numbers and lists to remember

- **IPv6 address:** 128 bits.
- **6LoWPAN extended link address:** 64 bits.
- **6LoWPAN short address:** 16 bits.
- **IEEE 802.15.4 typical range in the course guide:** 10--75 m.
- **IEEE 802.15.4 duty cycle in the guide:** below 1%.
- **AMQP frame types listed:** 9.
- **MQTT core methods in the guide:** 5.
- **LOADng route messages:** 3 --- RREQ, RREP, RERR.
- **6LoWPAN header types:** 3 --- Dispatch, Mesh addressing,Fragmentation.
- **ZigBee device roles:** 3 --- Coordinator, Router, End Device.
- **ITU report referenced:** 2005.
- **Ultrasonic distance:** speed of sound × round-trip time ÷ 2.

# **WEEK 3 - Connectivity Technologies and Sensor Networks**

## **1. HART and WirelessHART**

### **HART basics**

- **HART** stands for **Highway Addressable Remote Transducer**.
- HART (**Highway Addressable Remote Transducer**) is a hybrid analog-digital industrial automation protocol that bridges traditional 4–20 mA wiring with smart field device communication
- The course presents HART/WirelessHART in the context of industrial field devices and the Industrial Internet of Things (IIoT).
- The key distinction in the supplied material: **wired HART lacks a network layer**, while **WirelessHART includes mesh networking and routing**.

### **WirelessHART: important mechanisms**

- Operates in the **2.4 GHz ISM band**; the supplied slides describe 15 channels and a radio basis derived from IEEE 802.15.4.
- **TDMA (Time Division Multiple Access):** devices transmit in assigned time slots rather than competing at arbitrary times.
- **Super-frame:** groups time slots into a repeating schedule; the guide describes 10 ms timeslots.
- **Channel hopping:** changes the channel used for successive transmissions to improve resilience against interference.
- **Channel blacklisting:** removes channels that are persistently affected by interference. Do not confuse it with hopping.
- **Mesh routing:** nodes can forward packets for other nodes, extending reach and offering alternate paths.
- A **network manager** coordinates the network, including communication schedules and routes.
- Security and reliability are important because industrial monitoring and command traffic need predictable communication.

### **WirelessHART vs Zigbee (as framed in the course)**

---

Feature WirelessHART Zigbee comparison in the guide

---

Main emphasis Industrial field Commonly presented as devices / IIoT consumer-oriented IoT

Medium access TDMA, scheduled slots CSMA-family contention-based access

Channel behaviour Per-message channel Not described as hopping is emphasised hopping in the same per-message way

Topology Mesh Tree topology is discussed in the lecture comparison

## **Main selection cue Predictable industrial Low-power connected communication devices and broader consumer use cases**

**Exam traps:** TDMA is scheduled access; CSMA is contention-based. Hopping changes channels, while blacklisting excludes bad channels. These technologies' "primary emphasis" does not mean they can only be used in one domain.

## **2. Near Field Communication (NFC)**

- NFC is a **very short-range** communication technology for close-proximity identification and exchange.
- The course materials specify **13.56 MHz**, range **under 20 cm**, and data rates of **106, 212 or 424 kbps**.
- Working principle: **magnetic induction** between nearby coils.
- **Active devices** generate their own RF field. **Passive tags/devices** can use the reader's field/energy to respond.
- Three operating modes:
    1. **Reader/writer mode:** reads from or writes to a tag.
    2. **Card emulation mode:** a device behaves like a contactless card.
    3. **Peer-to-peer mode:** two active devices exchange information.
- Typical selection cues: tap-to-pay/contactless access, reading a tag, short-range pairing or information exchange.

**Remember:** MHz is frequency; kbps is data rate; centimetres describe range. A passive tag is not the same as an independently powered reader.

## **3. Bluetooth connectivity**

- Bluetooth supports **short-range personal-area networking** and wireless replacement of cables, such as for audio devices and peripherals.
- The guide places the radio in the **2.4--2.485 GHz** band and notes **1600 hops per second** in the described system.
- Range depends on radio class and transmission power; do not assume every Bluetooth device has the same range.
- Connection sequence:
    1. **Inquiry/discovery** finds nearby devices.
    2. **Paging** establishes contact with a discovered device.
    3. The devices enter the connected state and exchange data.
- Power-saving/operating modes reduce activity when a device does not need to communicate continuously.
- Protocol-stack terms to distinguish:
    - **L2CAP:** multiplexing and segmentation/reassembly of higher-layer data.
    - **RFCOMM:** serial-cable emulation.
    - **SDP:** service discovery.
- **Piconet:** small Bluetooth ad hoc network; the supplied slide model describes one master and up to seven active slaves.
- **Scatternet:** linked piconets, using devices that participate across piconets.

**Exam traps:** Inquiry is discovery; paging is connection establishment. A piconet is one small network, while a scatternet links piconets.

## **4. Z-Wave and ISA100.11a**

### **Z-Wave**

- Focuses on **home automation** and low-power smart-home devices.
- Uses region-dependent sub-GHz frequencies; the supplied material lists **865.2 MHz for India**.
- Modulation and encoding are different concepts:
    - **GFSK:** Gaussian Frequency Shift Keying; a Gaussian filter smooths pulses before FSK modulation.
    - **Manchester encoding:** line/channel encoding described in the course slides.
- **Home ID** identifies a network; **Node ID** identifies a device/node within it.
- A primary controller helps manage the network.
- **Source routing:** route information is known/selected at the source and included with the message as described in the guide.
- **Healing paths:** alternate routes can be used when a route or node fails.

### **ISA100.11a**

- Presented for industrial plant/complex networks.
- The course describes physical/MAC foundations based on IEEE 802.15.4, with frequency hopping, TDMA/QoS-related functions and security/key management.
- Supports industrial architectures and integration of different protocol types, including native and tunnelled/legacy applications as described in the guide.

**Exam traps:** Z-Wave is associated with home automation; ISA100.11a with industrial networks. GFSK is modulation, Manchester is encoding. Home ID is not the same as Node ID.

## **5. Wireless Sensor Networks (WSNs): fundamentals**

### **Sensor-node and network model**

A sensor node generally senses a physical phenomenon, processes the measurement, communicates it, and operates under energy and hardware constraints. A network may use: 

- **Single-hop communication:** node sends directly to a sink/gateway. 

- **Multi-hop communication:** intermediate nodes relay packets to extend reach. 

- **Sink node:** collection destination for sensed data, often connected to a gateway or Internet.

### **Topology and operating constraints**

- **Star, tree and mesh** are common ways to organise links.
- Large deployments must consider scalability, energy use, connectivity, reliability, delay and Quality of Service (QoS).
- QoS dimensions highlighted in the guide include **bandwidth, delay, jitter and packet-loss probability**.
- Sensor nodes may be stationary or mobile; mobile nodes make topology maintenance harder.
- **Sensor Web:** broader than one WSN; connects sensor networks, instruments, services, data resources and users so observations can be discovered and used.

### **Node behaviour and failures**

- **Failed node:** unable to perform its intended function.
- **Selfish node:** may avoid forwarding because relaying consumes its resources/energy.
- **Malicious node:** intentionally disrupts or attacks network operation.
- **Temporary "dumb" behaviour:** the lecture describes communication problems caused by environmental or temporary conditions; it should not automatically be labelled malicious.
- Network management includes topology management, information/data management, cooperation and fault handling.

### **Application cues from the week**

- **Social sensing:** people or their devices contribute observations.
- **Mines/industrial environments:** sensing supports monitoring and safety.
- **WBAN (Wireless Body Area Network):** physiological sensors communicate through a local processing/coordinator unit for healthcare or body monitoring.

### **Week 3 quick-recall list**

- [ ]  WirelessHART: TDMA + super-frames + hopping + blacklisting + mesh.
- [ ]  NFC: 13.56 MHz, under 20 cm, magnetic induction, three modes.
- [ ]  Bluetooth: inquiry → paging → connection; piconet vs scatternet.
- [ ]  Z-Wave: home automation, Home ID/Node ID, GFSK, Manchester, source routing.
- [ ]  ISA100.11a: industrial network, hopping, QoS and security.
- [ ]  WSN: sink, multi-hop, QoS, energy constraints, sensor web.
- [ ]  Failed vs selfish vs malicious vs temporary dumb behaviour.

---

# **WEEK 4 --- Sensor-Network Applications, Coverage, Mobility, UAV and M2M**

**Lectures 16--20**

## **1. Sensor-network applications (Lecture 16)**

### **Target tracking**

- A sensor network can detect and track a target using observations from multiple nodes.
- The system may activate only relevant nodes or adjust their duty cycles to conserve energy.
- **Duty cycle** is the fraction/pattern of time a node remains active rather than asleep.
- Event likelihood can guide activity: nodes near a likely target may need to be awake more often.

### **Agriculture**

- Distributed sensors can monitor field conditions and help make irrigation or crop-management decisions.
- Benefits include localised observation and reduced need for continuous manual inspection.
- Deployment must account for coverage, energy, communication reliability and environmental conditions.

### **Wireless Multimedia Sensor Networks (WMSNs)**

- WMSNs extend sensing to multimedia such as images and video.
- Multimedia produces larger data volumes than simple scalar measurements, creating greater bandwidth, processing, storage and energy demands.
- Applications include surveillance and monitoring where visual context matters.

### **Nanonetworks**

- Nanonetworks involve communication among nanoscale devices and introduce distinctive constraints on communication mechanisms and device capabilities.
- The exam focus is the special scale and communication challenges, rather than treating them as ordinary full-size sensor nodes.

### **Underwater Acoustic Sensor Networks (UWASNs)**

- Underwater communication commonly uses **acoustic** links in the course discussion.
- Challenges include propagation delay, limited bandwidth, energy constraints and changing underwater conditions/mobility.
- These constraints make underwater networks different from terrestrial radio WSNs.

## **2. Coverage and connectivity (Lecture 17)**

- **Coverage:** whether the required physical area, targets or points of interest are sensed.
- **Connectivity:** whether sensor nodes can communicate with each other or reach the sink.
- A network can cover an area but still fail to deliver readings if connectivity is broken. Conversely, nodes may be connected while leaving parts of the area unsensed.

### **Coverage-problem categories**

The guide discusses three types of coverage problems in static WSNs. Learn the exact category labels and diagrams used in your source guide, and be able to identify which requirement each problem optimises. In general, coverage planning weighs sensing completeness against node count, overlap and energy use.

### **Coverage maintenance and geometry**

- Node placement and sensing radii determine whether gaps exist.
- Overlap may provide redundancy but can waste energy if too many nodes remain active.
- Connectivity and coverage must be considered together; turning off nodes to save energy must not create a coverage hole or disconnect the network.
- Geometric conditions are used to reason about whether regions or points are covered.

### **OGDC**

**Optimal Geographical Density Control (OGDC)** is presented as a mechanism for managing which nodes remain active so that coverage and connectivity objectives can be maintained with reduced energy use. - The central intuition is to avoid keeping every node active when a smaller coordinated subset can satisfy the coverage requirement. - Be ready to explain the purpose and trade-off: energy conservation without sacrificing required coverage/connectivity.

- UAV networks use aerial platforms for sensing, relaying, coverage or communication.
- **Single-UAV systems** are simpler but can be limited by coverage, payload, energy or failure of that one vehicle.
- **Multi-UAV systems** can cooperate and cover larger areas, but coordination and topology management become more complex.
- **FANET:** Flying Ad Hoc Network --- an ad hoc network formed by UAVs.
- High mobility changes links and network topology frequently.
- Challenges include energy/power requirements, trajectory planning, link stability, routing, coordination, fault tolerance and time-critical communication.
- UAVs can act as **data mules** or gateways between terrestrial WSNs/VANETs and infrastructure.
- The lecture notes that layered gateway arrangements may be unsuitable for time-critical relaying in some cases.

## **5. Machine-to-Machine (M2M) communication (Lecture 20)**

- **M2M** is communication among machines/devices with minimal or no human intervention in the exchange.
- Typical components in an M2M ecosystem include sensing/actuating devices, a communication network, gateways, service platforms and applications.
- Devices may differ in capability: low-power constrained nodes and more capable/mobile nodes have different energy, processing and connectivity needs.
- Design concerns include energy efficiency, fault tolerance, scalability, service integration and reliable data delivery.

### **Week 4 connections to remember**

- Energy appears in tracking, OGDC, human-centric sensing, UAVs and M2M.
- Mobility changes links and makes topology maintenance harder.
- Data mules occur in mobile WSNs and UAV-based relaying.
- Coverage ≠ connectivity.
- Human-centric sensing ≠ M2M.

---

# **WEEK 5 --- Interoperability, Arduino, Sensors and Actuators**

**Lectures 21--25**

## **1. Interoperability in IoT (Lecture 21)**

### **Why it is needed**

IoT systems are heterogeneous: devices may use different hardware, operating systems, protocols, data formats, interfaces and application assumptions. **Interoperability** means that distinct systems can exchange information and use it meaningfully together.

### **Types discussed in the guide**

- **User interoperability:** making the overall system usable across differing services/devices and addressing the problems users face when components do not work together.
- **Device interoperability:** enabling devices with different interfaces/protocols to communicate or cooperate.

### **Universal Middleware Bridge (UMB)**

- The guide presents the **Universal Middleware Bridge (UMB)** as an approach to device interoperability.
- A middleware/bridge layer can mediate between incompatible device systems, reducing the need for every device to implement every other protocol directly.
- In scenario questions, identify whether the problem is about the user experience or the technical interaction between devices.

**Exam cue:** Heterogeneity is the underlying problem; interoperability is the capability needed to overcome it.

## **2. Arduino basics (Lecture 22)**

### **Definition and features**

- Arduino is described as an **open-source programmable electronic board with a built-in microcontroller**, supported by the Arduino IDE.
- It is inexpensive, accessible and suitable for prototyping IoT devices.
- It can receive analogue and digital inputs and provide outputs.
- Sensors and actuators can be attached; sensor data can then be communicated for storage, analytics or further action.

### **Arduino IDE and sketch structure**

A sketch has two principal functions:

```cpp
void setup(){
  // Runs once: configure pins and initialise components
}

void loop(){
  // Repeats: read inputs and control outputs
}
```

Core functions: - `pinMode(pin, INPUT/OUTPUT)` configures a pin. - `digitalWrite(pin, HIGH/LOW)` sets a digital output. - `digitalRead(pin)` reads a digital input. - `analogRead(pin)` reads an analogue input (available on analogue input pins). - `delay(ms)` pauses execution for the specified number of milliseconds. - Serial functions can print information to the serial monitor.

### **Blink logic**

1. Configure the LED pin as `OUTPUT` in `setup()`.
2. In `loop()`, set the pin `HIGH`, delay, set it `LOW`, delay.
3. Since `loop()` repeats, the LED continues blinking.

## **3. Arduino programming (Lecture 23)**

### **Core programming concepts**

- **Operators:** arithmetic, comparison and logical operators combine values or form conditions.
- **Control statements:** `if`, `else` and related branches select actions based on conditions.
- **Loops:** `for` and `while` repeat a block while a condition or iteration rule holds.
- **Arrays:** store multiple values of the same declared type under one name; indexing begins at 0 in C/C++.
- **Strings/characters:** used for text and character handling.
- **Math library:** provides mathematical operations.
- **Random numbers:** can be generated with the random-number functions; seeding affects the sequence.
- **Interrupts:** allow the controller to respond to an event without waiting for the normal loop to reach a polling check. Interrupt-service routines should be kept short and handled carefully.

### **Traffic-light example**

A traffic-control sketch is an application of pin configuration, digital outputs, delays and ordered control logic. In exam questions, trace the program sequentially and pay attention to pin states and timing.

## **4. Integrating sensors with Arduino (Lecture 24)**

- A **sensor** measures a physical quantity and supplies data to the controller.
- The DHT family discussed in the guide measures **temperature and humidity**.
- Integration involves identifying sensor pins, connecting power/ground/data correctly, installing the appropriate library and reading values in a sketch.
- The guide contrasts Arduino UNO with **Arduino Mega 2560**; board selection depends on required I/O and project needs.
- A library provides functions that simplify communication with a particular sensor. A sketch generally includes the library, initialises the sensor and requests readings in the main loop.
- Sensor readings can fail or be invalid; code should check the reading result rather than blindly treating every value as valid.

## **5. Actuators and servo motor (Lecture 25)**

- An **actuator** converts a control signal into physical action.
- Examples include motors and mechanisms that move, switch or regulate a physical system.
- A **servo motor** provides controlled angular positioning.
- The Arduino Servo library provides functions to attach a servo to a pin and command a position; the guide's example uses library-based control.
- A typical sketch initialises/attaches the servo, then writes a desired angle or position.
- Correct wiring, power and signal connections matter. Troubleshooting should distinguish code/library problems from wiring or power problems.

### **Week 5 quick comparison**

---

Concept What to remember

---

Sensor Measures a physical condition and provides data

Actuator Performs physical action in response to a control signal

Arduino `setup()` Executes once at start

Arduino `loop()` Repeats continuously

`digitalWrite()` Sets a digital output state

`analogRead()` Reads an analogue input

Library Reusable code that simplifies device/sensor control

## **Interoperability Different systems exchange and use information meaningfully**

---

# **WEEK 6 --- Python Programming and Raspberry Pi**

**Lectures 26--30**

## **1. Python programming fundamentals (Lecture 26)**

### **Why Python?**

The course uses Python for readable, practical programming and for working with files, networking and Raspberry Pi-based IoT applications.

### **Essentials**

- `print()` displays output.
- **Indentation** defines code blocks; incorrect indentation can cause errors or change program logic.
- Common data types: integers, floating-point numbers, strings, booleans and collections.
- **Conditionals:** `if`, `elif`, `else`.
- **Loops:** `for` and `while`.
- **Functions:** defined with `def`; parameters pass input and `return` sends a result back.
- **Scope:** local variables belong to a function/block context; global variables are defined at module level. Modifying globals inside functions requires care.
- **Modules:** reusable code imported with `import`.
- **Exception handling:** `try`/`except` handles runtime errors more gracefully.
- A prime-number example illustrates loops, conditions and testing divisibility.

### **Code-reading tips**

- Track variable values line by line.
- Check indentation and loop boundaries.
- Distinguish `=` (assignment) from `==` (comparison).
- Check whether a function prints a value or returns it.

## **2. Files, CSV, images and sockets (Lecture 27)**

### **File operations**

- `open()` opens a file; common modes include reading and writing.
- Read methods retrieve content; write methods send content to the file.
- Close files when finished; structured approaches help ensure files are closed correctly.
- Writing can replace or append content depending on the mode, so mode selection matters.

### **CSV**

- CSV means **Comma-Separated Values** and is used for tabular data.
- Each row represents a record; fields are separated by commas (subject to quoting/format rules).
- It is useful for storing sensor readings such as timestamps, temperature and humidity.

### **Images with PIL**

- The Python Imaging Library/Pillow supports opening, processing and saving images.
- Remember the distinction between reading image data and displaying/saving it.

### **Sockets**

- A **socket** is an endpoint used by programs to communicate over a network.
- Communication often uses an IP address and port.
- The client sends/requests data; the server waits for and handles client communication.
- TCP is connection-oriented; UDP sends datagrams without establishing the same kind of reliable stream connection.

## **3. Raspberry Pi basics (Lecture 28)**

- Raspberry Pi is a small single-board computer that can run an operating system and general-purpose programs.
- Compared with Arduino, it is more like a compact computer with richer OS/software capabilities; Arduino is a microcontroller board designed for direct embedded control.
- The Pi provides **GPIO (General-Purpose Input/Output)** pins for interfacing with electronics.
- Setup involves preparing storage/OS, booting the device, connecting peripherals/network, finding its IP address and optionally accessing it remotely.
- Raspberry Pi OS is the operating system setup described in the guide.
- Common uses include sensor acquisition, camera projects, networking, automation and data processing.

### **Arduino vs Raspberry Pi**

---

Arduino Raspberry Pi

---

Microcontroller-based board Single-board computer

Typically runs a sketch directly Runs an operating system and applications

Strong fit for simple, real-time Strong fit for networking, pin control processing, storage and richer software

Limited resources relative to a Pi Generally more compute and memory resources

## **Often paired with an external Can handle sensor collection and system for higher-level processing higher-level processing itself**

## **4. Raspberry Pi projects (Lecture 29)**

### **Blinking an LED**

- Configure a GPIO pin as output.
- Set it high/low with a delay between states.
- Ensure correct wiring and the appropriate GPIO library/configuration.

### **File transfer and camera**

- **FileZilla/FTP client** is shown for transferring files in the lecture.
- **PiCam** captures images using a camera attached to the Raspberry Pi.
- Know the broad workflow: connect hardware, configure software/library, run the capture command and save the result.

## **5. IoT implementation: auto-cooling system (Lecture 30)**

### **System logic**

1. DHT sensor measures temperature (and humidity).
2. Raspberry Pi reads the measurement.
3. Program compares temperature with a threshold.
4. A relay is controlled to switch the fan/cooling device.
5. The loop repeats so the response follows changing temperature.

### **Components**

- **DHT sensor:** supplies temperature/humidity readings.
- **Relay:** electrically controlled switch that lets a low-power control circuit switch another circuit.
- **GPIO:** interface for digital control and reading.
- **Library:** provides the code interface to the sensor or hardware.

### **Exam focus**

- Trace the threshold condition carefully: identify when the fan should switch ON and when it should switch OFF.
- Distinguish sensing (DHT), decision-making (program on Pi), and actuation/switching (relay/fan).
- Hardware wiring and power requirements matter; GPIO pins are not a substitute for a power driver for arbitrary loads.

---

# **WEEK 7 --- Raspberry Pi Networking and Software-Defined Networking**

**Lectures 31--35**

## **1. Remote data logging with Raspberry Pi (Lecture 31)**

### **Client-server model**

- A sensor-reading program runs on a Raspberry Pi and collects DHT data.
- A client sends measurements across the network to a server that receives and displays/stores them.
- A socket is the communication endpoint; IP address and port identify where communication is directed.

### **TCP vs UDP**

---

TCP UDP

---

Connection-oriented Connectionless datagrams

Uses connection establishment and a Sends individual datagrams; reliable ordered byte stream delivery/order are not guaranteed by UDP itself

Server commonly uses `bind()`, Uses datagram sockets and `listen()`, `accept()` `sendto()`/`recvfrom()` patterns

## **Useful when reliable stream Lightweight and useful when the delivery is required application can tolerate loss or handle it itself**

- The guide's first example includes server/client operations such as `connect()` and `accept()`.
- The sensor-data example uses **UDP datagrams**.
- Be able to identify which side sends, which side receives, and which socket operations belong to the protocol being used.

## **2. Data splitting and live plotting (Lecture 32)**

- Sensor readings sent as text may need parsing before they can be plotted.
- Python's `split()` separates a string into pieces based on a delimiter.
- After splitting, values may need conversion from strings to numeric types before plotting.
- **Matplotlib** is used to plot temperature/humidity or other readings over time.
- A monitoring server receives data, parses it, updates stored series and refreshes a live graph.

**Common error:** text such as `"25.4"` is a string until converted to a numeric value. Delimiter mismatches can also produce incorrect fields.

## **3. Software-Defined Networking (SDN) --- Part I (Lecture 33)**

### **Core idea**

Traditional networking often couples control decisions with the forwarding devices. **SDN separates the control plane from the data plane**, making network behaviour programmable through software.

### **Planes**

- **Data plane:** forwards packets according to installed rules.
- **Control plane:** makes decisions about paths and forwarding rules.
- **Application plane:** network applications express policy/requirements through controller-facing interfaces.

### **Controller and OpenFlow**

- A logically central controller manages forwarding policy, though deployment can be distributed.
- **OpenFlow** is discussed as a protocol enabling communication between controller and forwarding devices/switches.
- A switch can match packet fields against flow-table entries and apply actions.
- **Rule placement** means deciding where forwarding/processing rules should be installed.

### **Why SDN?**

- Programmability and centralised policy view.
- More flexible traffic management and network experimentation.
- Potential to respond to changing conditions, though controller placement, scalability, reliability and latency are challenges.

**Exam trap:** SDN does not mean all forwarding happens in the controller. The data plane still forwards packets; the controller manages policy/rules.

## **4. SDN --- Part II and SDN in IoT (Lecture 34--35)**

### **APIs and controller placement**

- APIs allow applications/controllers and network devices to interact.
- Controller placement affects latency, resilience, scalability and communication overhead.
- Controller architecture may be centralised or distributed; the trade-off is simpler global control versus scalability/fault tolerance.

### **Rule placement**

- Rules can be placed at access devices or in the backbone, depending on traffic needs and network constraints.
- Access-layer decisions may reduce delay near users/devices.
- Backbone placement can manage large traffic aggregates and inter-network flows.
- Rule placement questions are scenario-based: identify where a decision can be made effectively and what overhead it creates.

### **SDN applications from the guide**

- **Interference management** in software-defined wireless/mobile networks.
- **Traffic offloading:** shifting traffic to another access/network path when beneficial.
- **Mice flows vs elephant flows:** small/short flows versus large/high-volume flows; network policy may treat them differently.
- **Anomaly detection:** observe network behaviour and use programmable policy to respond.
- **Mininet-WiFi:** experimentation/emulation environment for wireless SDN.
- **ONOS:** SDN controller platform mentioned in the guide.

### **Week 7 quick recall**

- [ ]  Raspberry Pi sensor → client/socket → server.
- [ ]  TCP: connection/reliable stream; UDP: datagrams.
- [ ]  [ ] `split()` parses text; numeric conversion is needed for plotting.
- [ ]  Matplotlib visualises data.
- [ ]  SDN separates control plane and data plane.
- [ ]  OpenFlow supports controller-to-switch interaction.
- [ ]  Controller placement and rule placement are distinct design decisions.
- [ ]  Mice flows are small; elephant flows are large.

---

# **WEEK 8 --- Advanced SDN and Cloud Computing**

**Lectures 36--40**

## **1. Recent advances of SDN in IoT (Lecture 36)**

- SDN is applied to mobile/wireless and IoT networking to make traffic control more programmable.
- Traditional wireless mobile networks face challenges such as changing topology, interference and shifting traffic demand.
- SDN-based control can help manage interference and offload traffic based on network conditions.
- Rule placement can be performed at access devices or in the backbone; the best location depends on latency, scale and the kind of traffic.
- Data centres may distinguish **mice flows** (small, short flows) from **elephant flows** (large/high-volume flows).
- Network anomaly detection looks for traffic or behaviour that deviates from expected patterns.
- The guide names **Mininet-WiFi** for wireless-network experimentation and **ONOS** as a controller platform.

## **2. Cloud-computing fundamentals (Lecture 37)**

### **Why cloud for IoT?**

IoT generates data from many heterogeneous devices and may require scalable storage, processing and analytics. Cloud computing offers shared resources that can be provisioned as needed rather than requiring every organisation to own all infrastructure.

### **Five essential NIST characteristics**

1. **On-demand self-service:** users provision resources when needed.
2. **Broad network access:** services are accessible over networks through standard mechanisms.
3. **Resource pooling:** provider resources serve multiple customers using a shared pool.
4. **Rapid elasticity:** capacity can scale up/down quickly.
5. **Measured service:** resource use is monitored and can be billed/controlled.

### **Benefits described in the guide**

- Reduced upfront capital expenditure.
- Usage-based costing.
- Faster deployment and time-to-market.
- Flexible resource availability and utilisation.
- Easier scaling as demand changes.

### **Deployment models**

- **Public cloud:** services are offered to multiple customers over shared provider infrastructure.
- **Private cloud:** cloud infrastructure dedicated to one organisation; greater control can be a motivation.
- The course also discusses the broader deployment-model landscape; focus on who uses/controls the infrastructure and the trade-offs in sharing, connectivity and security.

## **3. Cloud service models (Lecture 38)**

### **IaaS, PaaS and SaaS**

- **IaaS --- Infrastructure as a Service:** provides infrastructure resources such as virtual machines, storage and networking. Users manage operating systems and applications above the infrastructure layer.
- **PaaS --- Platform as a Service:** provides a platform/runtime and supporting services so developers can build/deploy applications without managing the underlying OS/infrastructure.
- **SaaS --- Software as a Service:** provides a complete application to users; the provider manages the application and underlying stack.

### **Who manages what?**

Layer Traditional/on-premises IaaS PaaS SaaS

---

Applications User User User Provider Data User User User Provider (service-level responsibility) Runtime User User Provider Provider Middleware User User Provider Provider Operating system User User Provider Provider Virtualisation User Provider Provider Provider Servers User Provider Provider Provider Storage User Provider Provider Provider Networking User Provider Provider Provider

The guide's key learning objective is the **responsibility boundary**. In IaaS, the customer has more control and more administration; in SaaS, the provider manages most of the stack.

### **Additional concepts**

- Administrative services cut across layers: packaging, configuration, deployment, scaling, lifecycle management, utilisation and user management.
- IaaS uses virtualised infrastructure.
- PaaS supports application development/integration.
- SaaS commonly uses scalable service architecture, multi-tenancy and configurability, but customers may have less control over underlying implementation.

**Exam shortcut:** IaaS = rent infrastructure; PaaS = use a managed development platform; SaaS = use a finished application.

## **4. Cloud service management and security (Lecture 39)**

### **Service management**

- The goal is to deliver customer outcomes while controlling cost and risk.
- **SLA (Service Level Agreement):** specifies service expectations and quality commitments. The guide frames it around non-functional requirements and quality/utility/warranty.
- **Accounting** records resource usage.
- **Billing** combines usage records with prices and billing rules.

### **Cloud economics and scaling**

Cloud can reduce initial capital costs, support faster deployment and let customers scale capacity as needed. The economic benefit depends on workload, usage patterns and the service arrangement; cloud is not automatically cheaper for every workload.

### **Security**

The guide groups infrastructure security into three levels: 

1. **Network security** 2. **Host security** 3. **Application security**

Data-security goals use the **CIA triad**: - **Confidentiality:** only authorised parties can access information. - **Integrity:** information remains accurate and is not improperly altered. - **Availability:** systems/data remain accessible when needed.

Other terms: - **Identity and Access Management (IAM):** manages who may access which resources, when and under what conditions. - **Encryption:** protects data by making it unreadable without the appropriate key. - **Access control:** limits actions/resources according to permissions. - **Authentication:** verifies identity. - **Trust:** expectation that an entity/service will behave as required. - **Reputation:** standing or assessment based on past behaviour/others' experience. - **Risk assessment:** identifies and categorises risks to support appropriate controls.

Threats mentioned in the guide include data loss, account hijacking, service-traffic disruption and vulnerable APIs.

## **5. Cloud case studies and simulators (Lecture 40)**

### **Why simulate?**

Cloud simulation enables pre-deployment evaluation in a repeatable, controllable environment without needing to build the full infrastructure. It can help detect performance issues and test countermeasures before deployment.

### **Tools**

- **CloudSim:** simulation framework for cloud environments, including data centres, VMs, applications, users and network topology; described as Java-based and supporting dynamic resource addition/removal.
- **CloudAnalyst:** used for cloud application analysis with a focus on geographically distributed users and data-centre performance.
- **GreenCloud:** focuses on energy-aware cloud/data-centre simulation.
- Other simulator names in the guide include iCanCloud, GroudSim and DCSim.

### **Cloud platforms in the guide**

- **OpenStack:** open-source cloud platform.
- **Microsoft Azure:** discussed in relation to PaaS and IaaS.
- **Amazon EC2:** virtual compute infrastructure/service.
- Be prepared to compare open-source and commercial cloud approaches at a high level: customisation/control versus managed services/support and provider-specific features.

# WEEK 9 -- OpenStack, Sensor-Cloud & Fog Computing

## 1. Week 9 at a glance

- **OpenStack:** How to build and manage cloud infrastructure.
- **Sensor-cloud:** How to offer sensing resources as a service using
    
    virtualization.
    
- **Fog computing:** Where to process data when decisions must be made
    
    close to IoT devices.
    
- These ideas are **complementary**, not interchangeable.

**Basic IoT flow:** Sensors/devices → communication → data

handling/processing → inference or decision → service/actuation.

## 2. OpenStack

### Definition

**OpenStack** is open-source software for creating and managing cloud

infrastructure, including private or public clouds. It uses separate

services for compute, images, networking, storage, identity,

orchestration, and metering.

### OpenStack components --- memorize this table

---

Component               Main responsibility     Memory cue

---

**Horizon**             Dashboard / graphical   Human-facing dashboard

user interface (GUI)

**Keystone**            Identity;               Who are you? What may

authentication and      you access?

authorization

**Nova**                Compute; launches and   VM/compute

manages instances

**Glance**              VM image service;       Image

registers/retrieves

images and supports

material

**Neutron**             Networking; networks,   Network

routers, interfaces and

connectivity

**Swift**               Object storage          Objects/files

**Cinder**              Block storage           Attachable block volume

**Heat**                Orchestration           Coordinates resource

deployment

**Why are services separated?** Launching a VM needs compute, an image,

identity/access control, networking and sometimes storage. A VM can be

running but unreachable if routing, a floating IP, or security-group

rules are missing.

### OpenStack practical workflow

1. Create/import an **SSH key pair**.
2. Choose an image, flavor, and network.
3. Launch an instance (Nova).
4. Configure network/router connectivity where required (Neutron).
5. Set appropriate **security-group rules**.
6. Associate a **floating IP** if outside access is needed in the
    
    demonstrated setup.
    
7. Test connectivity using suitable rules and credentials (e.g.,
    
    ping/ICMP or SSH).
    

**Connectivity distinctions** - 

**Router:** connects networks. - **IPaddress:** identifies an interface/endpoint. - **Security group:**controls allowed traffic. - **Floating IP:** can provide externalreachability in the demonstrated configuration. - **Key pair:** supports secure instance access.

### DevStack --- course workflow

The supplied slides show a historical demonstration: install Git → clone

snapshots in the course

DevStack → enter the directory → configure `local.conf` with passwords

and `HOST_IP` → run `./stack.sh`. The slides name `./unstack.sh` for

removal. **Treat these as course-era commands, not a currentinstallation guide. Never put real passwords in shared notes.**

### OpenStack exam traps

- Horizon ≠ Keystone.
- Nova launches instances; Glance provides images.
- Swift = object storage; Cinder = block storage.
- A running VM is not necessarily reachable from outside.
- Heat = orchestration; Ceilometer = metering.

## 3. Wireless Sensor Networks (WSN) and cloud basics

- A **wireless sensor network (WSN)** consists of sensor nodes that
    
    observe conditions and communicate data.
    
- A **sink** is a central unit that collects data from sensor nodes.
- **Cloud computing** provides on-demand computing and storage
    
    resources.
    
- **Virtualization** abstracts physical resources so they can be
    
    shared or accessed as virtual resources.
    
- Traditional WSNs can be constrained by energy, processing, storage,
    
    communication range, and fixed-purpose deployment.
    

## 4. Sensor-Cloud

### Definition and purpose

**Sensor-cloud** integrates sensor networks with cloud computing and

virtualization so sensing capability can be managed and offered as a

service. The user can consume sensing services without necessarily

owning or directly managing every physical sensor.

**Se-aaS** = Sensors-as-a-Service / sensing-as-a-service.

### Main actors

---

Actor                               Role

---

**Sensor owner**                    Owns/purchases and deploys physical

sensor nodes

**Sensor-cloud service provider     Manages the sensing service and(SCSP)**                            offers access to sensor resources

### Physical vs virtual sensor

- **Physical sensor:** actual deployed device that measures a physical
    
    quantity.
    
- **Virtual sensor:** service-facing abstraction that can map to one
    
    or more physical sensors.
    
- A virtual sensor does **not** have to map one-to-one to a physical
    
    sensor.
    

### Virtual-sensor composition

Composition chooses which physical sensors contribute to a virtual

sensing service and how services are grouped for an application.

---

Formulation             Sensor pattern          Key recall

---

**CoV-I**               Homogeneous sensors     Same type, same region

within the same

geographic region

### Caching

**Purpose:** avoid repeatedly probing sensors when data have not changed

enough to justify a fresh reading. This can reduce communication and

energy use and improve network lifetime. Freshness requirements depend

on the application.

- **Internal cache (IC):** inside sensor-cloud; handles end-user
    
    requests and decides whether to serve cached data or re-cache.
    
- **External cache (EC):** separate server/hardware that stores
    
    readings and refreshes them at intervals.
    

### Sensor-cloud pricing

The course separates: - **pH:** hardware/sensor-related pricing

component. - **pI:** infrastructure-related pricing component.

The pricing proposal balances the interests of the SCSP, sensor owner,

and end user. The supplied material does **not** provide a complete

pricing equation, so do not invent one.

### Sensor-cloud exam traps

- Sensor-cloud is more than uploading raw sensor data to a cloud.
- SCSP manages/offers the service; sensor owner owns/deploys sensors;
    
    end user consumes the service.
    
- CoV-I = homogeneous/same region; CoV-II = heterogeneous/multiple
    
    regions.
    
- Internal and external cache are different locations/roles.
- pH = hardware; pI = infrastructure.

## 5. Fog computing

### Definition

**Fog computing** extends cloud-like processing and temporary storage

closer to IoT devices through an intermediate layer. It helps

time-sensitive decisions avoid waiting for a distant cloud round trip.

### Why cloud-only processing can be a problem

- Sending all raw sensor data to a distant cloud can cause delay.
- IoT devices may have limited bandwidth, processing, memory, and
    
    energy.
    
- Communication can consume a significant share of device energy.
- Some applications need a response within a fraction of a second.

### Cloud round-trip latency formula

**L = T(device → cloud) + T(analysis) + T(cloud → device)**

Add all terms after converting them to the same unit.

**Example:** 0.18 s + 0.04 s + 0.13 s = **0.35 s = 350 ms**.

### Fog processing tiers --- high priority

---

Data sensitivity /      Processing location     Typical course timing

deadline

---

Very time-sensitive     **Nearest fog node**    Fraction of a second

Less time-sensitive     **Aggregate fog node**  Seconds to minutes

Typical flow: device sends urgent data to the nearest fog node →

immediate action returns to device → less urgent data can go to an

aggregate fog node → summaries and long-term records go to cloud.

### Advantages

- Faster response for safety-critical events.
- Reduced bandwidth use through local filtering/aggregation.
- Potential privacy benefits when sensitive data remain local.
- Security policies can be applied closer to devices.
- Supports mobile, remote, or harsh-environment deployments.
- Allows applications to be deployed near the service that needs them.

### Challenges

- Distributed security management.
- Reliability and fault tolerance.
- Additional power consumption.
- Real-time analysis at scale.
- Programming/framework complexity.
- Nodes may move, join, or leave the system.

### Applications listed in the course

- Real-time health/emergency monitoring.
- Intelligent power-efficient systems.
- Railway-track monitoring.
- Oil/gas pipeline monitoring and optimization.
- Windmill/turbine analysis.

### Fog vs cloud vs sensor-cloud

---

Feature           Cloud             Sensor-cloud         Fog

---

Main purpose      On-demand compute Sensing resources as Near-device

and long-term     a service            processing for

storage                                timely response

Key idea          Compute/storage   Virtualize and       Process selected

resources         manage sensing       data closer to

capability           devices

Typical benefit   Large-scale       Access/composition   Low latency and

processing and    of sensor resources  less data

history                                transmission

---

# WEEK 10 --- Smart Cities, Data Fusion, Smart Homes & Connected Vehicles

## 1. Smart cities

### Definition

A **smart city** uses Information and Communication Technology (**ICT**)

to make urban infrastructure more interactive, accessible, and

efficient. Its value comes from integrated services---not simply from

having many devices.

### Why smart cities are needed

1. Rapid urban population growth.
2. Depletion of natural resources.
3. Environmental and climate changes.

### Human-body analogy

Human body       Smart-city equivalent

---

Skeleton         Buildings, industries, people

Skin             Transportation and logistics

Organs           Hospitals, police, banks, schools

Brain            Embedded intelligence

Nerves           Digital telecommunication networks

Sensory organs   Sensors and tags

Cognition        Software

### Six smart-city focus areas

Area                    Main emphasis

---

**Smart Economy**       Competitiveness

**Smart Governance**    Citizen participation

**Smart People**        Social and human capital

**Smart Mobility**      Transport and ICT

**Smart Environment**   Natural resources

**Smart Living**        Quality of life

**Applications:** smart homes and health monitoring, smart parking,

connected vehicles, pollution/calamity monitoring, smart energy, and

smart agriculture.

### Smart-city data pipeline

**Collection → Transmission → Storage → Processing** - **Collection:**

sensors, mobile devices, other sources observe events. -

**Transmission:** networks move observations to the relevant system. -

**Storage:** local, remote, warehouse, or cloud storage retains data. -

**Processing:** cleaning, analytics, and prediction turn data into

useful results.

### Challenges

- Security and privacy.
- Heterogeneous hardware/software and interoperability.
- Reliability and device/link failure.
- Large-scale deployment and mobility.
- Legal issues and informed consent.
- Big-data transfer, storage, cleaning, and processing.
- Sensor choice, placement, energy planning, and network architecture.

**Exam trap:** collecting data is not the same as fusing it; a sensor

network is an enabling technology, not the smart-city service itself.

## 2. Data fusion

### Definition

**Data fusion** combines information from multiple sources/sensors to

produce a richer, more useful understanding, estimate, or decision than

isolated streams may provide.

### Why use it?

- Different sensors provide complementary information.
- Combined data can improve the basis for decisions.
- Low-power/low-precision sensors may collectively provide useful
    
    information.
    
- Fusion can combine sources across different platforms.

### Data-fusion challenges

- **Imperfection:** inaccurate or uncertain measurements.
- **Ambiguity:** outliers or missing data, as categorized in the
    
    supplied guide.
    
- **Conflict:** different sources disagree.
- **Alignment:** convert data into a common frame or representation.
- **Trivial features:** distinguish useful information from features
    
    that add little value.
    

### Four fusion levels

---

Level                   What is combined?       Memory cue

---

**Decision level**      An ensemble of          Combine decisions

decisions

**Feature level**       Extracted features      Combine features

before decision-making

**Pixel level**         Information at the      Combine image

imaging-device/pixel    representations

level

### Method families

- **Probability-based:** Bayesian analysis, statistics, recursive
    
    methods.
    
- **AI-based:** artificial neural networks (ANN), machine learning,
    
    deep learning, convolutional neural networks (CNN).
    
- **Evidence-based:** belief functions and transferable belief models.

### AI in sensor-to-actuator systems

Instead of directly acting on one or two raw sensor values, intelligence

can combine information from multiple sources. The course example

mentions LiDAR, ultrasonic sensors, cameras, and GPS/satellite

information for autonomous-vehicle environmental awareness.

## 3. Smart parking

### Purpose

Detect vacant parking spaces, guide drivers toward available spaces, and

potentially support automatic charging. It can reduce parking-search

time, traffic, pollution, fuel use, and search cost.

### Functional stages

**Information collection → System deployment → Service dissemination**

- **Stationary sensing:** many fixed sensors detect parking-space
    
    occupancy.
    
- **Mobile sensing:** fewer sensors are carried along routes, as
    
    characterized in the course material.
    

## 4. Energy management in smart cities

### Energy efficiency approaches

The course lists: - Lightweight communication protocols. - Scheduling. -

Predictive models. - Cloud-based approaches. - Low-power transceivers. -

Cognitive management.

### Energy harvesting

- **Ambient harvesting:** collect energy available in the environment,
    
    e.g. RF, wind, sunlight, heat, or vibration.
    
- **Dedicated harvesting:** intentionally place an energy source near
    
    the IoT device; the course example is a nearby solar panel.
    

**Exam trap:** ambient = energy already available in surroundings;

dedicated = source intentionally deployed for the device.

## 5. Smart homes and Home Area Networks (HAN)

### Smart home

A smart home integrates household devices and services for automation,

security, safety, media, communication, and remote access/control.

### Home Area Network (HAN)

A **HAN** is a network bounded to the home that connects household

devices and systems.

### Wired vs wireless HAN

---

Wired HAN                           Wireless HAN

---

Can reuse existing                  Usually easier to install and

wiring/infrastructure and may be    supports mobility/flexible

low cost                            placement

### HAN standards --- memorize associations

---

Technology                          Course association

---

**UPnP**                            Application-layer/web-based

discovery; zero configuration

**DLNA**                            Domestic media sharing

**KNX**                             Multiple media/technologies for

home and building automation

**LonWorks**                        Associated with the Neuron chip

**ZigBee**                          Four layers; IEEE 802.15.4 provides

PHY and MAC, while ZigBee provides

network and application layers

## **X-10** Low-speed power-line control

### HAN architectures and initiatives

- **DomoNet:** central gateway, XML/web services, service-oriented
    
    architecture (SOA).
    
- **Jini:** Java/JVM-based distributed resource sharing; described in
    
    the course as distributed without a central node.
    
- **HYDRA:** middleware with device client/proxy.
- **Amigo:** ambient intelligence, interoperability, user-friendly
    
    interfaces, and discovery.
    

**Exam traps** - UPnP = discovery/zero-config; DLNA = media. - ZigBee's

PHY/MAC association is IEEE 802.15.4; ZigBee's network/application

layers are separate. - DomoNet = central gateway/SOA; Jini = Java/JVM

distributed architecture.

## 6. Connected vehicles, V2X and VANETs

### Stand-alone vs connected vehicles

A stand-alone vehicle may contain sensors and embedded systems. A

**connected vehicle** additionally exchanges information with other

devices, vehicles, infrastructure, or people.

### Communication types

---

Term                                Meaning

---

**In-vehicle**                      Communication among devices within

one vehicle

**V2V**                             Vehicle-to-vehicle

**V2I**                             Vehicle-to-infrastructure,

e.g. roadside unit

**V2P**                             Vehicle-to-pedestrian/person

### Vehicular cloud

Connected vehicles send data to cloud systems for analytics and sharing

with stakeholders. The course names stakeholders such as academia, law

enforcement, automobile companies, government agencies, standardization

groups, and cloud-service providers.

### Connected-vehicle challenges

- **Security:** wireless messages may be attacked or altered.
- **Privacy:** movement/location data can be exposed.
- **Scalability:** vehicles continually enter/leave areas and traffic
    
    loads change.
    
- **Reliability and QoS:** communication must work well enough for the
    
    application.
    
- **Global standards/interoperability:** systems must coordinate
    
    across different settings.
    

### VANET

A **Vehicular Ad-hoc Network (VANET)** supports communication among

vehicles and related roadside/network entities.

Key properties: - Highly dynamic topology because vehicles move. - Links

can appear/disappear and network partitions may change. - Mobility is

constrained by roads. - Large and changing numbers of vehicles create

scalability demands. - Vehicle devices may have substantial computing

capability, but communication links can still be unstable.

### Content-Centric Networking (CCN)

The course discusses CCN as a content-oriented alternative to

endpoint/location-oriented communication. Content is requested by a

**unique content name**.

- **FIB (Forwarding Information Base):** supports forwarding based on
    
    content-name prefixes.
    
- **CS (Content Store):** caches content chunks/data.
- **VANET + CCN:** caching can help disseminate content in a mobile
    
    environment, but dynamic topology and unstable links remain
    
    challenges.
    

**Exam trap:** FIB forwards; Content Store caches.

## 7. Connected-vehicle body-and-brain architecture

Remember the three layers in order:

1. **Sense/execution layer:** senses the environment and performs
    
    actions.
    
2. **Network/transmission layer:** communication bridge between
    
    sensing/execution and decision-making.
    
3. **Decision layer:** processes information and selects
    
    decisions/actions.
    

## 8. Intelligent Connected Vehicles (ICVs)

### Core idea

An **Intelligent Connected Vehicle (ICV)** combines vehicle connectivity

with intelligent processing and safety/transport applications.

### Course-era technical facts

The supplied slides mention a **75 MHz** spectrum allocation at

**5850--5925 MHz**, DSRC, IEEE 802.11p, the IEEE 1609 family, and SAE

J2735/J2945. These are reproduced as **course-slide facts**, not

verified current regulatory guidance.

### IEEE 1609 / WAVE recall

- The course associates **IEEE 1609.4** with WAVE multichannel
    
    operations.
    
- **DSRC/WAVE** is presented as a connected-vehicle communication
    
    stack in the slides.
    

### Three ICV development phases

Phase         Course description

---

**Phase 1**   2G/3G, infotainment and remote processing

**Phase 2**   4G LTE/DSRC and intelligent transport systems

**Phase 3**   Cloud-connected vehicles

### V2X advantages and disadvantage

**Advantages listed:** reduced travel time, improved driver safety, and

assistance in low visibility/bad weather.

**Disadvantage listed:** tracking of vehicle movements, raising privacy

concerns.

## **3. Mobility and human-centric sensing (Lecture 18)**

### **Stationary vs mobile WSN**

- In a stationary WSN, nodes are fixed or mostly fixed; topology is relatively stable.
- In a **Mobile Wireless Sensor Network (MWSN)**, sensors, sinks or data carriers may move, so links and neighbourhoods change.
- Mobility can improve reach or bring data to a collection point, but makes routing, localisation, coverage and topology maintenance more difficult.

### **Human-centric and participatory sensing**

- **Human-centric sensing:** humans may be the sensing target, operator or source of data through personal devices.
- **Participatory sensing:** people voluntarily contribute data or observations, often using mobile devices.
- Consider data quality, participation, privacy and device/energy constraints when interpreting these systems.

### **Data mules and Delay-Tolerant Networks (DTNs)**

- A **data mule** physically moves through an area, collects data from sensor nodes and carries it to a gateway/sink.
- **DTN (Delay-Tolerant Networking)** supports communication when continuous end-to-end connectivity is unavailable; data can be stored and forwarded when a suitable contact occurs.
- This is useful in sparse, disconnected or mobile environments, but it accepts delay.

**Exam trap:** Human-centric sensing intentionally involves humans in the sensing process. M2M communication, by contrast, aims for machine-to-machine communication without a human needing to participate in each exchange.

## **4. UAV networks and FANETs (Lecture 19)**

- **UAV:** Unmanned Aerial Vehicle.
- UAV networks use aerial platforms for sensing, relaying, coverage or communication.
- **Single-UAV systems** are simpler but can be limited by coverage, payload, energy or failure of that one vehicle.
- **Multi-UAV systems** can cooperate and cover larger areas, but coordination and topology management become more complex.
- **FANET:** Flying Ad Hoc Network --- an ad hoc network formed by UAVs.
- High mobility changes links and network topology frequently.
- Challenges include energy/power requirements, trajectory planning, link stability, routing, coordination, fault tolerance and time-critical communication.
- UAVs can act as **data mules** or gateways between terrestrial WSNs/VANETs and infrastructure.
- The lecture notes that layered gateway arrangements may be unsuitable for time-critical relaying in some cases.

## **5. Machine-to-Machine (M2M) communication (Lecture 20)**

- **M2M** is communication among machines/devices with minimal or no human intervention in the exchange.
- Typical components in an M2M ecosystem include sensing/actuating devices, a communication network, gateways, service platforms and applications.
- Devices may differ in capability: low-power constrained nodes and more capable/mobile nodes have different energy, processing and connectivity needs.
- Design concerns include energy efficiency, fault tolerance, scalability, service integration and reliable data delivery.

### **Week 4 connections to remember**

- Energy appears in tracking, OGDC, human-centric sensing, UAVs and M2M.
- Mobility changes links and makes topology maintenance harder.
- Data mules occur in mobile WSNs and UAV-based relaying.
- Coverage ≠ connectivity.
- Human-centric sensing ≠ M2M.

# **WEEK 5 --- Interoperability, Arduino, Sensors and Actuators**

**Lectures 21--25**

## **1. Interoperability in IoT (Lecture 21)**

### **Why it is needed**

IoT systems are heterogeneous: devices may use different hardware, operating systems, protocols, data formats, interfaces and application assumptions. **Interoperability** means that distinct systems can exchange information and use it meaningfully together.

### **Types discussed in the guide**

- **User interoperability:** making the overall system usable across differing services/devices and addressing the problems users face when components do not work together.
- **Device interoperability:** enabling devices with different interfaces/protocols to communicate or cooperate.

### **Universal Middleware Bridge (UMB)**

- The guide presents the **Universal Middleware Bridge (UMB)** as an approach to device interoperability.
- A middleware/bridge layer can mediate between incompatible device systems, reducing the need for every device to implement every other protocol directly.
- In scenario questions, identify whether the problem is about the user experience or the technical interaction between devices.

**Exam cue:** Heterogeneity is the underlying problem; interoperability is the capability needed to overcome it.

## **2. Arduino basics (Lecture 22)**

### **Definition and features**

- Arduino is described as an **open-source programmable electronic board with a built-in microcontroller**, supported by the Arduino IDE.
- It is inexpensive, accessible and suitable for prototyping IoT devices.
- It can receive analogue and digital inputs and provide outputs.
- Sensors and actuators can be attached; sensor data can then be communicated for storage, analytics or further action.

### **Arduino IDE and sketch structure**

A sketch has two principal functions:

```cpp
void setup(){
  // Runs once: configure pins and initialise components
}

void loop(){
  // Repeats: read inputs and control outputs
}
```

Core functions: - `pinMode(pin, INPUT/OUTPUT)` configures a pin. - `digitalWrite(pin, HIGH/LOW)` sets a digital output. - `digitalRead(pin)` reads a digital input. - `analogRead(pin)` reads an analogue input (available on analogue input pins). - `delay(ms)` pauses execution for the specified number of milliseconds. - Serial functions can print information to the serial monitor.

### **Blink logic**

1. Configure the LED pin as `OUTPUT` in `setup()`.
2. In `loop()`, set the pin `HIGH`, delay, set it `LOW`, delay.
3. Since `loop()` repeats, the LED continues blinking.

## **3. Arduino programming (Lecture 23)**

### **Core programming concepts**

- **Operators:** arithmetic, comparison and logical operators combine values or form conditions.
- **Control statements:** `if`, `else` and related branches select actions based on conditions.
- **Loops:** `for` and `while` repeat a block while a condition or iteration rule holds.
- **Arrays:** store multiple values of the same declared type under one name; indexing begins at 0 in C/C++.
- **Strings/characters:** used for text and character handling.
- **Math library:** provides mathematical operations.
- **Random numbers:** can be generated with the random-number functions; seeding affects the sequence.
- **Interrupts:** allow the controller to respond to an event without waiting for the normal loop to reach a polling check. Interrupt-service routines should be kept short and handled carefully.

### **Traffic-light example**

A traffic-control sketch is an application of pin configuration, digital outputs, delays and ordered control logic. In exam questions, trace the program sequentially and pay attention to pin states and timing.

## **4. Integrating sensors with Arduino (Lecture 24)**

- A **sensor** measures a physical quantity and supplies data to the controller.
- The DHT family discussed in the guide measures **temperature and humidity**.
- Integration involves identifying sensor pins, connecting power/ground/data correctly, installing the appropriate library and reading values in a sketch.
- The guide contrasts Arduino UNO with **Arduino Mega 2560**; board selection depends on required I/O and project needs.
- A library provides functions that simplify communication with a particular sensor. A sketch generally includes the library, initialises the sensor and requests readings in the main loop.
- Sensor readings can fail or be invalid; code should check the reading result rather than blindly treating every value as valid.

## **5. Actuators and servo motor (Lecture 25)**

- An **actuator** converts a control signal into physical action.
- Examples include motors and mechanisms that move, switch or regulate a physical system.
- A **servo motor** provides controlled angular positioning.
- The Arduino Servo library provides functions to attach a servo to a pin and command a position; the guide's example uses library-based control.
- A typical sketch initialises/attaches the servo, then writes a desired angle or position.
- Correct wiring, power and signal connections matter. Troubleshooting should distinguish code/library problems from wiring or power problems.

### **Week 5 quick comparison**

---

Concept What to remember

---

Sensor Measures a physical condition and provides data

Actuator Performs physical action in response to a control signal

Arduino `setup()` Executes once at start

Arduino `loop()` Repeats continuously

`digitalWrite()` Sets a digital output state

`analogRead()` Reads an analogue input

Library Reusable code that simplifies device/sensor control

## **Interoperability Different systems exchange and use information meaningfully**

---

# **WEEK 6 --- Python Programming and Raspberry Pi**

**Lectures 26--30**

## **1. Python programming fundamentals (Lecture 26)**

### **Why Python?**

The course uses Python for readable, practical programming and for working with files, networking and Raspberry Pi-based IoT applications.

### **Essentials**

- `print()` displays output.
- **Indentation** defines code blocks; incorrect indentation can cause errors or change program logic.
- Common data types: integers, floating-point numbers, strings, booleans and collections.
- **Conditionals:** `if`, `elif`, `else`.
- **Loops:** `for` and `while`.
- **Functions:** defined with `def`; parameters pass input and `return` sends a result back.
- **Scope:** lo- ocal variables belong to a function/block context; global variables are defined at module level. Modifying globals inside functions requires care.
- **Modules:** reusable code imported with `import`.
- **Exception handling:** `try`/`except` handles runtime errors more gracefully.
- A prime-number example illustrates loops, conditions and testing divisibility.

### **Code-reading tips**

- Track variable values line by line.
- Check indentation and loop boundaries.
- Distinguish `=` (assignment) from `==` (comparison).
- Check whether a function prints a value or returns it.

## **2. Files, CSV, images and sockets (Lecture 27)**

### **File operations**

- `open()` opens a file; common modes include reading and writing.
- Read methods retrieve content; write methods send content to the file.
- Close files when finished; structured approaches help ensure files are closed correctly.
- Writing can replace or append content depending on the mode, so mode selection matters.

### **CSV**

- CSV means **Comma-Separated Values** and is used for tabular data.
- Each row represents a record; fields are separated by commas (subject to quoting/format rules).
- It is useful for storing sensor readings such as timestamps, temperature and humidity.

### **Images with PIL**

- The Python Imaging Library/Pillow supports opening, processing and saving images.
- Remember the distinction between reading image data and displaying/saving it.

### **Sockets**

- A **socket** is an endpoint used by programs to communicate over a network.
- Communication often uses an IP address and port.
- The client sends/requests data; the server waits for and handles client communication.
- TCP is connection-oriented; UDP sends datagrams without establishing the same kind of reliable stream connection.

## **3. Raspberry Pi basics (Lecture 28)**

- Raspberry Pi is a small single-board computer that can run an operating system and general-purpose programs.
- Compared with Arduino, it is more like a compact computer with richer OS/software capabilities; Arduino is a microcontroller board designed for direct embedded control.
- The Pi provides **GPIO (General-Purpose Input/Output)** pins for interfacing with electronics.
- Setup involves preparing storage/OS, booting the device, connecting peripherals/network, finding its IP address and optionally accessing it remotely.
- Raspberry Pi OS is the operating system setup described in the guide.
- Common uses include sensor acquisition, camera projects, networking, automation and data processing.

### **Arduino vs Raspberry Pi**

---

Arduino Raspberry Pi

---

Microcontroller-based board Single-board computer

Typically runs a sketch directly Runs an operating system and applications

Strong fit for simple, real-time Strong fit for networking, pin control processing, storage and richer software

Limited resresources relative to a Pi Generally more compute and memory resources

## **Often paired with an external Can handle sensor collection and system for higher-level processing higher-level processing itself**

## **4. Raspberry Pi projects (Lecture 29)**

### **Blinking an LED**

- Configure a GPIO pin as output.
- Set it high/low with a delay between states.
- Ensure correct wiring and the appropriate GPIO library/configuration.

### **File transfer and camera**

- **FileZilla/FTP client** is shown for transferring files in the lecture.
- **PiCam** captures images using a camera attached to the Raspberry Pi.
- Know the broad workflow: connect hardware, configure software/library, run the capture command and save the result.

## **5. IoT implementation: auto-cooling system (Lecture 30)**

### **System logic**

1. DHT sensor measures temperature (and humidity).
2. Raspberry Pi reads the measurement.
3. Program compares temperature with a threshold.
4. A relay is controlled to switch the fan/cooling device.
5. The loop repeats so the response follows changing temperature.

### **Components**

- **DHT sensor:** supplies temperature/humidity readings.
- **Relay:** electrically controlled switch that lets a low-power control circuit switch another circuit.
- **GPIO:** interface for digital control and reading.
- **Library:** provides the code interface to the sensor or hardware.

### **Exam focus**

- Trace the threshold condition carefully: identify when the fan should switch ON and when it should switch OFF.
- Distinguish sensing (DHT), decision-making (program on Pi), and actuation/switching (relay/fan).
- Hardware wiring and power requirements matter; GPIO pins are not a substitute for a power driver for arbitrary loads.

---

# **WEEK 7 --- Raspberry Pi Networking and Software-Defined Networking**

**Lectures 31--35**

## **1. Remote data logging with Raspberry Pi (Lecture 31)**

### **Client-server model**

- A sensor-reading program runs on a Raspberry Pi and collects DHT data.
- A client sends measurements across the network to a server that receives and displays/stores them.
- A socket is the communication endpoint; IP address and port identify where communication is directed.

### **TCP vs UDP**
TCP UDP

---

Connection-oriented Connectionless datagrams

Uses connection establishment and a Sends individual datagrams; reliable ordered byte stream delivery/order are not guaranteed by UDP itself

Server commonly uses `bind()`, Uses datagram sockets and `listen()`, `accept()` `sendto()`/`recvfrom()` patterns

## **Useful when reliable stream Lightweight and useful when the delivery is required application can tolerate loss or handle it itself**

- The guide's first example includes server/client operations such as `connect()` and `accept()`.
- The sensor-data example uses **UDP datagrams**.
- Be able to identify which side sends, which side receives, and which socket operations belong to the protocol being used.

## **2. Data splitting and live plotting (Lecture 32)**

- Sensor readings sent as text may need parsing before they can be plotted.
- Python's `split()` separates a string into pieces based on a delimiter.
- After splitting, values may need conversion from strings to numeric types before plotting.
- **Matplotlib** is used to plot temperature/humidity or other readings over time.
- A monitoring server receives data, parses it, updates stored series and refreshes a live graph.

**Common error:** text such as `"25.4"` is a string until converted to a numeric value. Delimiter mismatches can also produce incorrect fields.

## **3. Software-Defined Networking (SDN) --- Part I (Lecture 33)**

### **Core idea**

Traditional networking often couples control decisions with the forwarding devices. **SDN separates the control plane from the data plane**, making network behaviour programmable through software.

### **Planes**

- **Data plane:** forwards packets according to installed rules.
- **Control plane:** makes decisions about paths and forwarding rules.
- **Application plane:** network applications express policy/requirements through controller-facing interfaces.

### **Controller and OpenFlow**

- A logically central controller manages forwarding policy, though deployment can be distributed.
- **OpenFlow** is discussed as a protocol enabling communication between controller and forwarding devices/switches.
- A switch can match packet fields against flow-table entries and apply actions.
- **Rule placement** means deciding where forwarding/processing rules should be installed.

### **Why SDN?**

- Programmability and centralised policy view.
- More flexible traffic management and network experimentation.
- Potential to respond to changing conditions, though controller placement, scalability, reliability and latency are challenges.

**Exam trap:** SDN does not mean all forwarding happens in the controller. The data plane still forwards packets; the controller manages policy/rules.

## **4. SDN --- Part II and SDN in IoT (Lecture 34--35)**

### **APIs and controller placement**

- APIs allo### **controller placement**

- APIs allow applications/controllers and network devices to interact.
- Controller placement affects latency, resilience, scalability and communication overhead.
- Controller architecture may be centralised or distributed; the trade-off is simpler global control versus scalability/fault tolerance.

### **Rule placement**

- Rules can be placed at access devices or in the backbone, depending on traffic needs and network constraints.
- Access-layer decisions may reduce delay near users/devices.
- Backbone placement can manage large traffic aggregates and inter-network flows.
- Rule placement questions are scenario-based: identify where a decision can be made effectively and what overhead it creates.

### **SDN applications from the guide**

- **Interference management** in software-defined wireless/mobile networks.
- **Traffic offloading:** shifting traffic to another access/network path when beneficial.
- **Mice flows vs elephant flows:** small/short flows versus large/high-volume flows; network policy may treat them differently.
- **Anomaly detection:** observe network behaviour and use programmable policy to respond.
- **Mininet-WiFi:** experimentation/emulation environment for wireless SDN.
- **ONOS:** SDN controller platform mentioned in the guide.

### **Week 7 quick recall**

- [ ]  Raspberry Pi sensor → client/socket → server.
- [ ]  TCP: connection/reliable stream; UDP: datagrams.
- [ ]  [ ] `split()` parses text; numeric conversion is needed for plotting.
- [ ]  Matplotlib visualises data.
- [ ]  SDN separates control plane and data plane.
- [ ]  OpenFlow supports controller-to-switch interaction.
- [ ]  Controller placement and rule placement are distinct design decisions.
- [ ]  Mice flows are small; elephant flows are large.

---

# **WEEK 8 --- Advanced SDN and Cloud Computing**

**Lectures 36--40**

## **1. Recent advances of SDN in IoT (Lecture 36)**

- SDN is applied to mobile/wireless and IoT networking to make traffic control more programmable.
- Traditional wireless mobile networks face challenges such as changing topology, interference and shifting traffic demand.
- SDN-based control can help manage interference and offload traffic based on network conditions.
- Rule placement can be performed at access devices or in the backbone; the best location depends on latency, scale and the kind of traffic.
- Data centres may distinguish **mice flows** (small, short flows) from **elephant flows** (large/high-volume flows).
- Network anomaly detection looks for traffic or behaviour that deviates from expected patterns.
- The guide names **Mininet-WiFi** for wireless-network experimentation and **ONOS** as a controller platform.

## **2. Cloud-computing fundamentals (Lecture 37)**

### **Why cloud for IoT?**

IoT generates data from many heterogeneous devices and may require scalable storage, processing and analytics. Cloud computing offers shared resources that can be provisioned as needed rather than requiring every organisation to own all infrastructure.

### **Five essential NIST characteristics**

1. **On-demand self-service:** users provision resources when needed.
2. **Broad network access:** services are accessible over networks through standard mechanisms.
3. **Resource pooling:** provider resources serve multiple customers using a shared pool.
4. **Rapid elasticity:** capacity can scale up/down quickly.
5. **Measured service:** resource use is monitored and can be billed/controlled.

### **Benefits described in the guide**
- Reduced upfront capital expenditure.
- Usage-based costing.
- Faster deployment and time-to-market.
- Flexible resource availability and utilisation.
- Easier scaling as demand changes.

### **Deployment models**

- **Public cloud:** services are offered to multiple customers over shared provider infrastructure.
- **Private cloud:** cloud infrastructure dedicated to one organisation; greater control can be a motivation.
- The course also discusses the broader deployment-model landscape; focus on who uses/controls the infrastructure and the trade-offs in sharing, connectivity and security.

## **3. Cloud service models (Lecture 38)**

### **IaaS, PaaS and SaaS**

- **IaaS --- Infrastructure as a Service:** provides infrastructure resources such as virtual machines, storage and networking. Users manage operating systems and applications above the infrastructure layer.
- **PaaS --- Platform as a Service:** provides a platform/runtime and supporting services so developers can build/deploy applications without managing the underlying OS/infrastructure.
- **SaaS --- Software as a Service:** provides a complete application to users; the provider manages the application and underlying stack.

### **Who manages what?**

Layer Traditional/on-premises IaaS PaaS SaaS

---

Applications User User User Provider Data User User User Provider (service-level responsibility) Runtime User User Provider Provider Middleware User User Provider Provider Operating system User User Provider Provider Virtualisation User Provider Provider Provider Servers User Provider Provider Provider Storage User Provider Provider Provider Networking User Provider Provider Provider

The guide's key learning objective is the **responsibility boundary**. In IaaS, the customer has more control and more administration; in SaaS, the provider manages most of the stack.

### **Additional concepts**

- Administrative services cut across layers: packaging, configuration, deployment, scaling, lifecycle management, utilisation and user management.
- IaaS uses virtualised infrastructure.
- PaaS supports application development/integration.
- SaaS commonly uses scalable service architecture, multi-tenancy and configurability, but customers may have less control over underlying implementation.

**Exam shortcut:** IaaS = rent infrastructure; PaaS = use a managed development platform; SaaS = use a finished application.

## **4. Cloud service management and security (Lecture 39)**

### **Service management**

- The goal is to deliver customer outcomes while controlling cost and risk.
- **SLA (Service Level Agreement):** specifies service expectations and quality commitments. The guide frames it around non-functional requirements and quality/utility/warranty.
- **Accounting** records resource usage.
- **Billing** combines usage records with prices and billing rules.

### **Cloud economics and scaling**

Cloud can reduce initial capital costs, support faster deployment and let customers scale capacity as needed. The economic benefit depends on workload, usage patterns and the service arrangement; cloud is not automatically cheaper for every workload.

### **Security**
The guide groups infrastructure security into three levels: 

1. **Network security** 2. **Host security** 3. **Application security**

Data-security goals use the **CIA triad**: - **Confidentiality:** only authorised parties can access information. - **Integrity:** information remains accurate and is not improperly altered. - **Availability:** systems/data remain accessible when needed.

Other terms: - **Identity and Access Management (IAM):** manages who may access which resources, when and under what conditions. - **Encryption:** protects data by making it unreadable without the appropriate key. - **Access control:** limits actions/resources according to permissions. - **Authentication:** verifies identity. - **Trust:** expectation that an entity/service will behave as required. - **Reputation:** standing or assessment based on past behaviour/others' experience. - **Risk assessment:** identifies and categorises risks to support appropriate controls.

Threats mentioned in the guide include data loss, account hijacking, service-traffic disruption and vulnerable APIs.

## **5. Cloud case studies and simulators (Lecture 40)**

### **Why simulate?**

Cloud simulation enables pre-deployment evaluation in a repeatable, controllable environment without needing to build the full infrastructure. It can help detect performance issues and test countermeasures before deployment.

### **Tools**

- **CloudSim:** simulation framework for cloud environments, including data centres, VMs, applications, users and network topology; described as Java-based and supporting dynamic resource addition/removal.
- **CloudAnalyst:** used for cloud application analysis with a focus on geographically distributed users and data-centre performance.
- **GreenCloud:** focuses on energy-aware cloud/data-centre simulation.
- Other simulator names in the guide include iCanCloud, GroudSim and DCSim.

### **Cloud platforms in the guide**

- **OpenStack:** open-source cloud platform.
- **Microsoft Azure:** discussed in relation to PaaS and IaaS.
- **Amazon EC2:** virtual compute infrastructure/service.
- Be prepared to compare open-source and commercial cloud approaches at a high level: customisation/control versus managed services/support and provider-specific features.

# WEEK 9 -- OpenStack, Sensor-Cloud & Fog Computing

## 1. Week 9 at a glance

- **OpenStack:** How to build and manage cloud infrastructure.
- **Sensor-cloud:** How to offer sensing resources as a service using
    
    virtualization.
    
- **Fog computing:** Where to process data when decisions must be made
    
    close to IoT devices.
    
- These ideas are **complementary**, not interchangeable.

**Basic IoT flow:** Sensors/devices → communication → data

handling/processing → inference or decision → service/actuation.

## 2. OpenStack

### Definition

**OpenStack** is open-source software for creating and managing cloud

infrastructure, including private or public clouds. It uses separate

services for compute, images, networking, storage, identity,

orchestration, and metering.

### OpenStack components --- memorize this table

---

Component               Main responsibility     Memory cue

---

**Horizon**             Dashboard / graphical   Human-facing dashboard

user interface (GUI)

**Keystone**            Identity;               Who are you? What may

authentication and      you access?

authorization

**Nova**                Compute; launches and   VM/compute

manages instances

**Glance**              VM image service;       Image

registers/retrieves

images and supports

material

**Neutron**             Networking; networks,   Network
routers, interfaces and

connectivity

**Swift**               Object storage          Objects/files

**Cinder**              Block storage           Attachable block volume

**Heat**                Orchestration           Coordinates resource

deployment

**Why are services separated?** Launching a VM needs compute, an image,

identity/access control, networking and sometimes storage. A VM can be

running but unreachable if routing, a floating IP, or security-group

rules are missing.

### OpenStack practical workflow

1. Create/import an **SSH key pair**.
2. Choose an image, flavor, and network.
3. Launch an instance (Nova).
4. Configure network/router connectivity where required (Neutron).
5. Set appropriate **security-group rules**.
6. Associate a **floating IP** if outside access is needed in the
    
    demonstrated setup.
    
7. Test connectivity using suitable rules and credentials (e.g.,
    
    ping/ICMP or SSH).
    

**Connectivity distinctions** - 

**Router:** connects networks. - **IPaddress:** identifies an interface/endpoint. - **Security group:**controls allowed traffic. - **Floating IP:** can provide externalreachability in the demonstrated configuration. - **Key pair:** supports secure instance access.

### DevStack --- course workflow

The supplied slides show a historical demonstration: install Git → clone

snapshots in the course

DevStack → enter the directory → configure `local.conf` with passwords

and `HOST_IP` → run `./stack.sh`. The slides name `./unstack.sh` for

removal. **Treat these as course-era commands, not a currentinstallation guide. Never put real passwords in shared notes.**

### OpenStack exam traps

- Horizon ≠ Keystone.
- Nova launches instances; Glance provides images.
- Swift = object storage; Cinder = block storage.
- A running VM is not necessarily reachable from outside.
- Heat = orchestration; Ceilometer = metering.

## 3. Wireless Sensor Networks (WSN) and cloud basics

- A **wireless sensor network (WSN)** consists of sensor nodes that
    
    observe conditions and communicate data.
    
- A **sink** is a central unit that collects data from sensor nodes.
- **Cloud computing** provides on-demand computing and storage
    
    resources.
    
- **Virtualization** abstracts physical resources so they can be
    
    shared or accessed as virtual resources.
    
- Traditional WSNs can be constrained by energy, processing, storage,
    
    communication range, and fixed-purpose deployment.
    

## 4. Sensor-Cloud

### Definition and purpose

**Sensor-cloud** integrates sensor networks with cloud computing and

virtualization so sensing capability can be managed and offered as a

service. The user can consume sensing services without necessarily

owning or directly managing every physical sensor.

**Se-aaS** = Sensors-as-a-Service / sensing-as-a-service.

### Main actors
Actor                               Role

---

**Sensor owner**                    Owns/purchases and deploys physical

sensor nodes

**Sensor-cloud service provider     Manages the sensing service and(SCSP)**                            offers access to sensor resources

### Physical vs virtual sensor

- **Physical sensor:** actual deployed device that measures a physical
    
    quantity.
    
- **Virtual sensor:** service-facing abstraction that can map to one
    
    or more physical sensors.
    
- A virtual sensor does **not** have to map one-to-one to a physical
    
    sensor.
    

### Virtual-sensor composition

Composition chooses which physical sensors contribute to a virtual

sensing service and how services are grouped for an application.

---

Formulation             Sensor pattern          Key recall

---

**CoV-I**               Homogeneous sensors     Same type, same region

within the same

geographic region

### Caching

**Purpose:** avoid repeatedly probing sensors when data have not changed

enough to justify a fresh reading. This can reduce communication and

energy use and improve network lifetime. Freshness requirements depend

on the application.

- **Internal cache (IC):** inside sensor-cloud; handles end-user
    
    requests and decides whether to serve cached data or re-cache.
    
- **External cache (EC):** separate server/hardware that stores
    
    readings and refreshes them at intervals.
    

### Sensor-cloud pricing

The course separates: - **pH:** hardware/sensor-related pricing

component. - **pI:** infrastructure-related pricing component.

The pricing proposal balances the interests of the SCSP, sensor owner,

and end user. The supplied material does **not** provide a complete

pricing equation, so do not invent one.

### Sensor-cloud exam traps

- Sensor-cloud is more than uploading raw sensor data to a cloud.
- SCSP manages/offers the service; sensor owner owns/deploys sensors;
    
    end user consumes the service.
    
- CoV-I = homogeneous/same region; CoV-II = heterogeneous/multiple
    
    regions.
    
- Internal and external cache are different locations/roles.
- pH = hardware; pI = infrastructure.

## 5. Fog computing

### Definition

**Fog computing** extends cloud-like processing and temporary storage

closer to IoT devices through an intermediate layer. It helps

time-sensitive decisions avoid waiting for a distant cloud round trip.

### Why cloud-only processing can be a problem

- Sending all raw sensor data to a distant cloud can cause delay.
- IoT devices may have limited bandwidth, processing, memory, and
    
    energy.
    
- Communication can consume a significant share of device energy.
- Some applications need a response within a fraction of a second.

### Cloud round-trip latency formula

**L = T(device → cloud) + T(analysis) + T(cloud → device)**

Add all terms after converting them to the same unit.

**Example:** 0.18 s + 0.04 s + 0.13 s = **0.35 s = 350 ms**.
### Fog processing tiers --- high priority

---

Data sensitivity /      Processing location     Typical course timing

deadline

---

Very time-sensitive     **Nearest fog node**    Fraction of a second

Less time-sensitive     **Aggregate fog node**  Seconds to minutes

Typical flow: device sends urgent data to the nearest fog node →

immediate action returns to device → less urgent data can go to an

aggregate fog node → summaries and long-term records go to cloud.

### Advantages

- Faster response for safety-critical events.
- Reduced bandwidth use through local filtering/aggregation.
- Potential privacy benefits when sensitive data remain local.
- Security policies can be applied closer to devices.
- Supports mobile, remote, or harsh-environment deployments.
- Allows applications to be deployed near the service that needs them.

### Challenges

- Distributed security management.
- Reliability and fault tolerance.
- Additional power consumption.
- Real-time analysis at scale.
- Programming/framework complexity.
- Nodes may move, join, or leave the system.

### Applications listed in the course

- Real-time health/emergency monitoring.
- Intelligent power-efficient systems.
- Railway-track monitoring.
- Oil/gas pipeline monitoring and optimization.
- Windmill/turbine analysis.

### Fog vs cloud vs sensor-cloud

---

Feature           Cloud             Sensor-cloud         Fog

---

Main purpose      On-demand compute Sensing resources as Near-device

and long-term     a service            processing for

storage                                timely response

Key idea          Compute/storage   Virtualize and       Process selected

resources         manage sensing       data closer to

capability           devices

Typical benefit   Large-scale       Access/composition   Low latency and

processing and    of sensor resources  less data

history                                transmission

---

# WEEK 10 --- Smart Cities, Data Fusion, Smart Homes & Connected Vehicles

## 1. Smart cities

### Definition

A **smart city** uses Information and Communication Technology (**ICT**)

to make urban infrastructure more interactive, accessible, and

efficient. Its value comes from integrated services---not simply from

having many devices.

### Why smart cities are needed

1. Rapid urban population growth.
2. Depletion of natural resources.
3. Environmental and climate changes.

### Human-body analogy

Human body       Smart-city equivalent

---

Skeleton         Buildings, industries, people

Skin             Transportation and logistics

Organs           Hospitals, police, banks, schools
Brain            Embedded intelligence

Nerves           Digital telecommunication networks

Sensory organs   Sensors and tags

Cognition        Software

### Six smart-city focus areas

Area                    Main emphasis

---

**Smart Economy**       Competitiveness

**Smart Governance**    Citizen participation

**Smart People**        Social and human capital

**Smart Mobility**      Transport and ICT

**Smart Environment**   Natural resources

**Smart Living**        Quality of life

**Applications:** smart homes and health monitoring, smart parking,

connected vehicles, pollution/calamity monitoring, smart energy, and

smart agriculture.

### Smart-city data pipeline

**Collection → Transmission → Storage → Processing** - **Collection:**

sensors, mobile devices, other sources observe events. -

**Transmission:** networks move observations to the relevant system. -

**Storage:** local, remote, warehouse, or cloud storage retains data. -

**Processing:** cleaning, analytics, and prediction turn data into

useful results.

### Challenges

- Security and privacy.
- Heterogeneous hardware/software and interoperability.
- Reliability and device/link failure.
- Large-scale deployment and mobility.
- Legal issues and informed consent.
- Big-data transfer, storage, cleaning, and processing.
- Sensor choice, placement, energy planning, and network architecture.

**Exam trap:** collecting data is not the same as fusing it; a sensor

network is an enabling technology, not the smart-city service itself.

## 2. Data fusion

### Definition

**Data fusion** combines information from multiple sources/sensors to

produce a richer, more useful understanding, estimate, or decision than

isolated streams may provide.

### Why use it?

- Different sensors provide complementary information.
- Combined data can improve the basis for decisions.
- Low-power/low-precision sensors may collectively provide useful
    
    information.
    
- Fusion can combine sources across different platforms.

### Data-fusion challenges

- **Imperfection:** inaccurate or uncertain measurements.
- **Ambiguity:** outliers or missing data, as categorized in the
    
    supplied guide.
    
- **Conflict:** different sources disagree.
- **Alignment:** convert data into a common frame or representation.
- **Trivial features:** distinguish useful information from features
    
    that add little value.
    

### Four fusion levels
Level                   What is combined?       Memory cue

---

**Decision level**      An ensemble of          Combine decisions

decisions

**Feature level**       Extracted features      Combine features

before decision-making

**Pixel level**         Information at the      Combine image

imaging-device/pixel    representations

level

### Method families

- **Probability-based:** Bayesian analysis, statistics, recursive
    
    methods.
    
- **AI-based:** artificial neural networks (ANN), machine learning,
    
    deep learning, convolutional neural networks (CNN).
    
- **Evidence-based:** belief functions and transferable belief models.

### AI in sensor-to-actuator systems

Instead of directly acting on one or two raw sensor values, intelligence

can combine information from multiple sources. The course example

mentions LiDAR, ultrasonic sensors, cameras, and GPS/satellite

information for autonomous-vehicle environmental awareness.

## 3. Smart parking

### Purpose

Detect vacant parking spaces, guide drivers toward available spaces, and

potentially support automatic charging. It can reduce parking-search

time, traffic, pollution, fuel use, and search cost.

### Functional stages

**Information collection → System deployment → Service dissemination**

- **Stationary sensing:** many fixed sensors detect parking-space
    
    occupancy.
    
- **Mobile sensing:** fewer sensors are carried along routes, as
    
    characterized in the course material.
    

## 4. Energy management in smart cities

### Energy efficiency approaches

The course lists: - Lightweight communication protocols. - Scheduling. -

Predictive models. - Cloud-based approaches. - Low-power transceivers. -

Cognitive management.

### Energy harvesting

- **Ambient harvesting:** collect energy available in the environment,
    
    e.g. RF, wind, sunlight, heat, or vibration.
    
- **Dedicated harvesting:** intentionally place an energy source near
    
    the IoT device; the course example is a nearby solar panel.
    

**Exam trap:** ambient = energy already available in surroundings;

dedicated = source intentionally deployed for the device.

## 5. Smart homes and Home Area Networks (HAN)

### Smart home

A smart home integrates household devices and services for automation,

security, safety, media, communication, and remote access/control.

### Home Area Network (HAN)

A **HAN** is a network bounded to the home that connects household

devices and systems.

### Wired vs wireless HAN

---

Wired HAN                           Wireless HAN

---

Can reuse existing                  Usually easier to install and

wiring/infrastructure and may be    supports mobility/flexible

low cost                            placement
### HAN standards --- memorize associations

---

Technology                          Course association

---

**UPnP**                            Application-layer/web-based

discovery; zero configuration

**DLNA**                            Domestic media sharing

**KNX**                             Multiple media/technologies for

home and building automation

**LonWorks**                        Associated with the Neuron chip

**ZigBee**                          Four layers; IEEE 802.15.4 provides

PHY and MAC, while ZigBee provides

network and application layers

## **X-10** Low-speed power-line control

### HAN architectures and initiatives

- **DomoNet:** central gateway, XML/web services, service-oriented
    
    architecture (SOA).
    
- **Jini:** Java/JVM-based distributed resource sharing; described in
    
    the course as distributed without a central node.
    
- **HYDRA:** middleware with device client/proxy.
- **Amigo:** ambient intelligence, interoperability, user-friendly
    
    interfaces, and discovery.
    

**Exam traps** - UPnP = discovery/zero-config; DLNA = media. - ZigBee's

PHY/MAC association is IEEE 802.15.4; ZigBee's network/application

layers are separate. - DomoNet = central gateway/SOA; Jini = Java/JVM

distributed architecture.

## 6. Connected vehicles, V2X and VANETs

### Stand-alone vs connected vehicles

A stand-alone vehicle may contain sensors and embedded systems. A

**connected vehicle** additionally exchanges information with other

devices, vehicles, infrastructure, or people.

### Communication types

---

Term                                Meaning

---

**In-vehicle**                      Communication among devices within

one vehicle

**V2V**                             Vehicle-to-vehicle

**V2I**                             Vehicle-to-infrastructure,

e.g. roadside unit

**V2P**                             Vehicle-to-pedestrian/person

### Vehicular cloud

Connected vehicles send data to cloud systems for analytics and sharing

with stakeholders. The course names stakeholders such as academia, law

enforcement, automobile companies, government agencies, standardization

groups, and cloud-service providers.

### Connected-vehicle challenges

- **Security:** wireless messages may be attacked or altered.
- **Privacy:** movement/location data can be exposed.
- **Scalability:** vehicles continually enter/leave areas and traffic
    
    loads change.
    
- **Reliability and QoS:** communication must work well enough for the
    
    application.
    
- **Global standards/interoperability:** systems must coordinate
    
    across different settings.
    

### VANET

A **Vehicular Ad-hoc Network (VANET)** supports communication among

vehicles and related roadside/network entities.
Key properties: - Highly dynamic topology because vehicles move. - Links

can appear/disappear and network partitions may change. - Mobility is

constrained by roads. - Large and changing numbers of vehicles create

scalability demands. - Vehicle devices may have substantial computing

capability, but communication links can still be unstable.

### Content-Centric Networking (CCN)

The course discusses CCN as a content-oriented alternative to

endpoint/location-oriented communication. Content is requested by a

**unique content name**.

- **FIB (Forwarding Information Base):** supports forwarding based on
    
    content-name prefixes.
    
- **CS (Content Store):** caches content chunks/data.
- **VANET + CCN:** caching can help disseminate content in a mobile
    
    environment, but dynamic topology and unstable links remain
    
    challenges.
    

**Exam trap:** FIB forwards; Content Store caches.

## 7. Connected-vehicle body-and-brain architecture

Remember the three layers in order:

1. **Sense/execution layer:** senses the environment and performs
    
    actions.
    
2. **Network/transmission layer:** communication bridge between
    
    sensing/execution and decision-making.
    
3. **Decision layer:** processes information and selects
    
    decisions/actions.
    

## 8. Intelligent Connected Vehicles (ICVs)

### Core idea

An **Intelligent Connected Vehicle (ICV)** combines vehicle connectivity

with intelligent processing and safety/transport applications.

### Course-era technical facts

The supplied slides mention a **75 MHz** spectrum allocation at

**5850--5925 MHz**, DSRC, IEEE 802.11p, the IEEE 1609 family, and SAE

J2735/J2945. These are reproduced as **course-slide facts**, not

verified current regulatory guidance.

### IEEE 1609 / WAVE recall

- The course associates **IEEE 1609.4** with WAVE multichannel
    
    operations.
    
- **DSRC/WAVE** is presented as a connected-vehicle communication
    
    stack in the slides.
    

### Three ICV development phases

Phase         Course description

---

**Phase 1**   2G/3G, infotainment and remote processing

**Phase 2**   4G LTE/DSRC and intelligent transport systems

**Phase 3**   Cloud-connected vehicles
V### 2X advantages and disadvantage

**Advantages listed:** reduced travel time, improved driver safety, and

assistance in low visibility/bad weather.

**Disadvantage listed:** tracking of vehicle movements, raising privacy

concerns.