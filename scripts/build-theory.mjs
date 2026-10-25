import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const srcPath = path.join(root, "thory.md");
const outPath = path.join(root, "theory.js");

marked.setOptions({ gfm: true, breaks: false });

/* ------------------------------------------------------------------ *
 * Curated week-level material: a plain-language overview plus the
 * facts students most often need when answering the MCQs.
 * ------------------------------------------------------------------ */
const WEEK_META = {
  1: {
    title: "Introduction to IoT",
    lectures: "Week 1 · Lectures 1–5",
    intro:
      "IoT means putting sensing, computing and communication into everyday objects. A device measures something, a controller decides what it means, a network carries the data, and an application shows it or sends back a command. This week builds the vocabulary for the rest of the course.",
    highlights: [
      "IoT is an internetwork of physical objects with embedded electronics, sensing/actuation, processing and communication.",
      "An embedded system is a small computer built into a product to do a defined job.",
      "IPv6 uses 128-bit addresses; IPv4 has a much smaller address space.",
      "A gateway connects networks and forwards packets; a proxy performs application-layer mediation.",
      "A sensor measures, a transducer converts energy/signals, and an actuator creates a physical action.",
      "Accuracy = closeness to the true value. Precision = agreement between repeated readings. They are different.",
      "Resolution = smallest detectable change; sensitivity = output change per input change.",
      "Ultrasonic distance = (speed of sound × round-trip time) ÷ 2 because the sound travels there and back.",
      "A relay is an electrically controlled switch; a solenoid valve uses an electromagnet to control flow.",
      "Typical data path: environment → sensor → controller → local network → gateway → wider network/backend → application.",
      "Troubleshooting follows the same path: sensor → controller → link → gateway → backend → application, then check units and interpretation.",
    ],
  },
  2: {
    title: "IoT Networking Protocols and Connectivity",
    lectures: "Week 2 · Lectures 6–15",
    intro:
      "Different IoT jobs need different protocols. Application protocols move messages, IEEE 802.15.4 and ZigBee handle low-power wireless links, 6LoWPAN carries IPv6 over those links, and LOADng/RPL route packets. Learn one identifying clue for each protocol and the comparisons become much easier.",
    highlights: [
      "MQTT = lightweight publish–subscribe over TCP, with a broker, topics, publishers and subscribers.",
      "MQTT methods: CONNECT, DISCONNECT, SUBSCRIBE, UNSUBSCRIBE, PUBLISH. A + in a topic filter is a single-level wildcard.",
      "CoAP = Constrained Application Protocol, REST-like request/response over UDP; methods GET, POST, PUT, DELETE.",
      "CoAP confirmable (CON) expects an acknowledgement; non-confirmable (NON) does not. Piggyback/separate describes how the response is delivered.",
      "XMPP = XML-based messaging and presence, with federation, service discovery, Jingle and multi-user chat.",
      "AMQP = binary messaging over TCP with producer → exchange → binding → queue → consumer.",
      "AMQP exchange types: direct (exact key), fan-out (all), topic (pattern), headers (header attributes).",
      "Delivery guarantees: at-most-once may lose messages; at-least-once may duplicate; exactly-once is hardest.",
      "IEEE 802.15.4 defines PHY and MAC for low-rate WPANs. ZigBee adds network and higher layers above it.",
      "802.15.4 uses CSMA-CA. FFD supports the full protocol; RFD is simpler. Beacon-enabled uses slotted CSMA-CA; non-beacon uses unslotted access.",
      "ZigBee roles: coordinator (ZC), router (ZR), end device (ZED). Topologies include star, tree and mesh.",
      "6LoWPAN adapts IPv6 for low-power links using compression, fragmentation and header handling.",
      "LOADng and RPL are routing protocols for constrained networks. RFID identifies tagged objects using radio communication.",
    ],
  },
  3: {
    title: "Connectivity Technologies and Sensor Networks",
    lectures: "Week 3 · Lectures 11–15",
    intro:
      "This week compares the main short-range and industrial connectivity choices, then moves to Wireless Sensor Networks. Focus on the numbers, the medium-access method, and the difference between similar terms such as hopping vs blacklisting, inquiry vs paging, and piconet vs scatternet.",
    highlights: [
      "HART is a hybrid analog-digital industrial protocol. Wired HART lacks a network layer; WirelessHART adds mesh networking and routing.",
      "WirelessHART uses the 2.4 GHz band, TDMA, super-frames (10 ms slots in the course), channel hopping, channel blacklisting and a network manager.",
      "Hopping changes the channel used; blacklisting removes a persistently bad channel. They are not the same.",
      "NFC: 13.56 MHz, under 20 cm, 106/212/424 kbps, magnetic induction, active/passive devices, and three modes (reader/writer, card emulation, peer-to-peer).",
      "Bluetooth connection order: inquiry (discovery) → paging (contact) → connected. L2CAP multiplexes, RFCOMM emulates a serial cable, SDP discovers services.",
      "A piconet has one master and up to seven active slaves; a scatternet links piconets.",
      "Z-Wave targets home automation, uses sub-GHz frequencies (865.2 MHz for India in the course), and distinguishes Home ID from Node ID. GFSK is modulation; Manchester is encoding.",
      "ISA100.11a targets industrial networks and builds on IEEE 802.15.4 with TDMA, frequency hopping, QoS and security.",
      "A WSN node senses, processes and communicates under energy and hardware constraints. Communication can be single-hop or multi-hop through a sink.",
      "WSN QoS dimensions include bandwidth, delay, jitter and packet-loss probability. A Sensor Web connects sensor networks, services, data and users.",
      "Failed, selfish and malicious nodes are different: failed = cannot function; selfish = will not forward; malicious = intentionally disrupts.",
      "Applications include social sensing, mines/industrial monitoring and wireless body area networks (WBANs).",
    ],
  },
  4: {
    title: "Sensor-Network Applications, Coverage, Mobility, UAV and M2M",
    lectures: "Week 4 · Lectures 16–20",
    intro:
      "Sensor networks are judged by what they can observe and whether they can deliver that information. This week covers applications, the difference between coverage and connectivity, energy-saving density control, mobile and human-centric sensing, UAV networks, and machine-to-machine communication.",
    highlights: [
      "Target tracking uses observations from multiple nodes and can save energy by activating only relevant nodes (duty cycling).",
      "WMSNs carry images/video and therefore need much more bandwidth, processing, storage and energy than scalar sensors.",
      "Underwater acoustic sensor networks (UWASNs) face propagation delay, limited bandwidth, energy limits and changing conditions.",
      "Coverage asks whether the area/targets are sensed; connectivity asks whether readings can reach the sink. One can exist without the other.",
      "OGDC (Optimal Geographical Density Control) keeps a coordinated subset of nodes active to preserve coverage and connectivity while saving energy.",
      "A stationary WSN has a relatively stable topology; mobility changes links and makes routing, localisation and coverage harder.",
      "Human-centric sensing involves people as target/operator/source; participatory sensing has people voluntarily contribute data.",
      "A data mule physically carries data between nodes and a sink. A DTN stores and forwards data when continuous connectivity is unavailable.",
      "Single-UAV systems are simpler but limited by coverage, payload, energy or failure; multi-UAV systems cover more but need coordination.",
      "FANET = Flying Ad Hoc Network. UAVs can act as data mules or gateways.",
      "M2M means machine-to-machine communication with minimal or no human intervention; it is not the same as human-centric sensing.",
    ],
  },
  5: {
    title: "Interoperability, Arduino, Sensors and Actuators",
    lectures: "Week 5 · Lectures 21–25",
    intro:
      "Interoperability is about systems not just connecting but understanding each other. Arduino is the hands-on platform for this week: a small microcontroller board, a sketch with setup() and loop(), simple digital/analog functions, sensors such as DHT, and actuators such as servos.",
    highlights: [
      "Interoperability = different systems exchange information and use it meaningfully together. Heterogeneity is the underlying problem.",
      "User interoperability focuses on the overall user experience; device interoperability focuses on devices with different interfaces/protocols working together.",
      "UMB (Universal Middleware Bridge) is presented as a middleware approach to device interoperability.",
      "Arduino is an open-source programmable electronic board with a built-in microcontroller, programmed through the Arduino IDE.",
      "setup() runs once at start; loop() repeats continuously.",
      "pinMode() configures a pin; digitalWrite() sets an output; digitalRead() reads a digital input; analogRead() reads an analog input; delay() pauses in milliseconds.",
      "C/C++ arrays start at index 0. Interrupts let the board respond to an event without waiting for the normal polling loop; keep interrupt routines short.",
      "The DHT sensor family measures temperature and humidity. Libraries simplify sensor communication, and readings should be checked for validity.",
      "Arduino UNO vs Mega 2560: board choice depends on required I/O and project needs.",
      "An actuator converts a control signal into physical action. A servo motor provides controlled angular positioning using the Servo library.",
      "Sensor = measures; actuator = acts. Do not mix them up in scenario questions.",
    ],
  },
  6: {
    title: "Python Programming and Raspberry Pi",
    lectures: "Week 6 · Lectures 26–30",
    intro:
      "Python is the glue for reading sensors, handling files and talking over a network. Raspberry Pi is a small single-board computer that can run Python and an operating system. Together they support data logging, camera projects and the auto-cooling example.",
    highlights: [
      "Python uses indentation to define code blocks; incorrect indentation can break or change a program.",
      "= assigns a value; == compares values. Learn to read code line by line.",
      "Conditionals use if/elif/else; loops use for/while; functions use def and return.",
      "A local variable belongs to a function; a global variable is defined at module level. Modules are imported with import.",
      "try/except handles runtime errors more gracefully.",
      "open() opens a file; the mode determines reading, writing, replacing or appending. Close files when done.",
      "CSV = Comma-Separated Values, used for tabular data such as sensor readings.",
      "PIL/Pillow opens, processes and saves images. A socket is a network endpoint identified by an IP address and port.",
      "TCP is connection-oriented and reliable; UDP sends datagrams without the same reliable stream guarantees.",
      "Raspberry Pi is a single-board computer with an OS and GPIO pins; Arduino is a microcontroller board typically running one sketch.",
      "Raspberry Pi projects: blink an LED through GPIO, transfer files with FileZilla/FTP, and capture images with PiCam.",
      "Auto-cooling: DHT measures temperature → Raspberry Pi compares with a threshold → relay switches the fan. Sensing, decision and actuation are separate stages.",
    ],
  },
  7: {
    title: "Raspberry Pi Networking and Software-Defined Networking",
    lectures: "Week 7 · Lectures 31–35",
    intro:
      "First the Raspberry Pi sends sensor readings to a server; then the course moves from sockets to SDN. SDN separates the control decisions from packet forwarding, making the network programmable through a controller and rules.",
    highlights: [
      "Client–server logging: the Pi collects sensor data and sends it over a socket to a server that receives, displays or stores it.",
      "A socket is identified by an IP address and port. TCP is connection-oriented and reliable; UDP is connectionless datagrams.",
      "Typical TCP server calls: bind(), listen(), accept(); client calls connect(). UDP uses sendto()/recvfrom() patterns.",
      "Sensor text must be split and converted from strings to numbers before plotting; split() separates on a delimiter.",
      "Matplotlib is used for live plots of readings over time.",
      "SDN separates the control plane from the data plane, making forwarding behaviour programmable.",
      "Data plane forwards packets; control plane decides paths/rules; application plane expresses policy through the controller.",
      "OpenFlow is the controller-to-switch protocol. A switch matches packet fields against flow-table entries and applies actions.",
      "The controller does not forward every packet itself; the data plane still forwards.",
      "Controller placement and rule placement are different design choices. Rules can sit at access devices or in the backbone.",
      "SDN applications in the course: interference management, traffic offloading, mice vs elephant flows, anomaly detection, Mininet-WiFi and ONOS.",
    ],
  },
  8: {
    title: "Advanced SDN and Cloud Computing",
    lectures: "Week 8 · Lectures 36–40",
    intro:
      "This week connects programmable networking to cloud computing. Learn the five NIST cloud characteristics, the IaaS/PaaS/SaaS responsibility boundary, service management, security goals, and the simulators used to study cloud behaviour.",
    highlights: [
      "SDN can make wireless/IoT traffic control programmable; it can help with interference, offloading and anomaly detection.",
      "Five NIST cloud characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity and measured service.",
      "Cloud benefits: lower upfront cost, usage-based pricing, faster deployment, flexible capacity and easier scaling.",
      "Public cloud is shared provider infrastructure; private cloud is dedicated to one organisation.",
      "IaaS = rent infrastructure (VMs, storage, networking); PaaS = managed platform for building/deploying apps; SaaS = finished application.",
      "Responsibility boundary: the customer manages more in IaaS and less in SaaS.",
      "SLA states service expectations and quality commitments. Accounting records usage; billing applies prices and rules.",
      "Cloud security levels: network, host and application. CIA triad = confidentiality, integrity, availability.",
      "IAM manages who can access what; encryption protects data; authentication verifies identity; access control limits actions.",
      "CloudSim is a Java-based cloud simulator; CloudAnalyst focuses on geographically distributed users; GreenCloud focuses on energy.",
      "OpenStack is open-source cloud infrastructure; Azure and Amazon EC2 are commercial cloud platforms.",
      "Cloud is not automatically cheaper for every workload; economics depend on usage pattern and service arrangement.",
    ],
  },
  9: {
    title: "OpenStack, Sensor-Cloud and Fog Computing",
    lectures: "Week 9 · Lectures 41–45",
    intro:
      "OpenStack shows how cloud infrastructure is built and managed. Sensor-cloud turns sensing into a service. Fog computing moves selected processing close to devices so time-sensitive decisions do not wait for a distant cloud.",
    highlights: [
      "OpenStack is open-source software for creating and managing cloud infrastructure.",
      "Horizon = dashboard; Keystone = identity; Nova = compute/instances; Glance = images; Neutron = networking.",
      "Swift = object storage; Cinder = block storage; Heat = orchestration; Ceilometer = metering.",
      "OpenStack workflow: key pair → image/flavor/network → launch instance → router → security group → floating IP → test.",
      "A running VM is not automatically reachable from outside; routing, floating IP and security-group rules matter.",
      "DevStack course demo: ./stack.sh starts the install; ./unstack.sh removes it.",
      "Sensor-cloud offers sensing as a service (Se-aaS). Actors: sensor owner, sensor-cloud service provider (SCSP), end user.",
      "A virtual sensor can map to one or more physical sensors; it does not need a one-to-one mapping.",
      "CoV-I = homogeneous sensors in the same region; CoV-II = heterogeneous sensors across multiple regions.",
      "Caching avoids repeatedly probing sensors when data is still fresh enough. Internal cache is inside sensor-cloud; external cache is separate.",
      "Pricing: pH is the hardware/sensor component; pI is the infrastructure component. The source does not give a complete pricing equation.",
      "Fog latency: L = device→cloud + analysis + cloud→device. Example: 0.18 + 0.04 + 0.13 = 0.35 s = 350 ms.",
      "Very time-sensitive data goes to the nearest fog node (fraction of a second); less urgent data to an aggregate fog node; long-term records to cloud.",
    ],
  },
  10: {
    title: "Smart Cities, Data Fusion, Smart Homes and Connected Vehicles",
    lectures: "Week 10 · Lectures 46–50",
    intro:
      "This week applies IoT to cities, homes and vehicles. Smart cities combine ICT and integrated services; data fusion turns many imperfect readings into a better decision; connected vehicles add V2X communication, VANETs and increasingly intelligent processing.",
    highlights: [
      "A smart city uses ICT to make urban infrastructure more interactive, accessible and efficient; value comes from integrated services, not just many devices.",
      "Smart-city needs: urban population growth, resource depletion, and environmental/climate change.",
      "Human-body analogy: skeleton/buildings, skin/transport, organs/services, brain/embedded intelligence, nerves/networks, sensory organs/sensors, cognition/software.",
      "Six focus areas: economy, governance, people, mobility, environment and living.",
      "Smart-city data pipeline: collection → transmission → storage → processing.",
      "Data fusion combines multiple sources/sensors to produce a richer estimate or decision than isolated streams.",
      "Fusion challenges: imperfection, ambiguity, conflict, alignment and trivial features.",
      "Fusion levels: decision, feature and pixel (the source heading says four but lists three).",
      "Fusion method families: probability-based, AI-based and evidence-based.",
      "Smart parking stages: information collection → system deployment → service dissemination.",
      "Energy efficiency: lightweight protocols, scheduling, predictive models, cloud approaches, low-power transceivers and cognitive management.",
      "Ambient harvesting uses energy already in the surroundings; dedicated harvesting places a source near the device.",
      "HAN standards: UPnP = zero-config discovery; DLNA = media sharing; KNX = building automation; LonWorks = Neuron chip; ZigBee = four layers; X-10 = power-line control.",
      "HAN initiatives: DomoNet = central gateway/SOA; Jini = Java/JVM distributed; HYDRA = middleware; Amigo = ambient intelligence.",
      "Connected vehicle adds communication to embedded sensors. Communication types: in-vehicle, V2V, V2I and V2P.",
      "VANET has highly dynamic topology, road-constrained mobility and scalability challenges.",
      "CCN requests content by unique name; the FIB forwards by name prefix and the Content Store caches content.",
      "Body-and-brain layers: sense/execution → network/transmission → decision.",
      "ICV course facts: 75 MHz at 5850–5925 MHz, DSRC, IEEE 802.11p, IEEE 1609 and SAE J2735/J2945.",
      "ICV phases: 2G/3G + infotainment → 4G LTE/DSRC + ITS → cloud-connected vehicles.",
      "V2X advantages: reduced travel time, safety and bad-weather assistance; disadvantage: vehicle tracking/privacy.",
    ],
  },
};

const WEEK_FULL_FORMS = {
  1: [
    { abbr: "ADC", full: "Analog-to-Digital Converter" },
    { abbr: "AIDC", full: "Automatic Identification and Data Capture" },
    { abbr: "DAC", full: "Digital-to-Analog Converter" },
    { abbr: "IoT", full: "Internet of Things" },
    { abbr: "IP", full: "Internet Protocol" },
    { abbr: "IPv4", full: "Internet Protocol version 4 (32-bit address space)" },
    { abbr: "IPv6", full: "Internet Protocol version 6 (128-bit address space)" },
    { abbr: "ISP", full: "Internet Service Provider" },
    { abbr: "ITU", full: "International Telecommunication Union (2005 IoT Report)" },
    { abbr: "LAN", full: "Local Area Network" },
    { abbr: "M2M", full: "Machine-to-Machine" },
    { abbr: "PIR", full: "Passive Infrared (motion sensor)" },
    { abbr: "RFID", full: "Radio-Frequency Identification" },
    { abbr: "WAN", full: "Wide Area Network" },
  ],
  2: [
    { abbr: "6LoWPAN", full: "IPv6 over Low-Power Wireless Personal Area Networks" },
    { abbr: "AMQP", full: "Advanced Message Queuing Protocol" },
    { abbr: "AODV", full: "Ad Hoc On-Demand Distance Vector routing" },
    { abbr: "APS", full: "Application Support Sublayer (ZigBee)" },
    { abbr: "CoAP", full: "Constrained Application Protocol (REST-like over UDP)" },
    { abbr: "CSMA-CA", full: "Carrier Sense Multiple Access with Collision Avoidance" },
    { abbr: "FFD", full: "Full Function Device (IEEE 802.15.4)" },
    { abbr: "IEEE", full: "Institute of Electrical and Electronics Engineers" },
    { abbr: "LLN", full: "Low-Power and Lossy Network" },
    { abbr: "LOADng", full: "Lightweight On-demand Ad hoc Distance-vector routing — next generation" },
    { abbr: "MAC", full: "Medium Access Control" },
    { abbr: "MQTT", full: "Message Queue Telemetry Transport (publish-subscribe over TCP)" },
    { abbr: "PHY", full: "Physical Layer" },
    { abbr: "QoS", full: "Quality of Service" },
    { abbr: "RERR", full: "Route Error (LOADng / AODV)" },
    { abbr: "REST", full: "Representational State Transfer" },
    { abbr: "RFD", full: "Reduced Function Device (IEEE 802.15.4)" },
    { abbr: "RPL", full: "Routing Protocol for Low-Power and Lossy Networks" },
    { abbr: "RREP", full: "Route Reply (LOADng / AODV)" },
    { abbr: "RREQ", full: "Route Request (LOADng / AODV)" },
    { abbr: "SMQTT", full: "Secure MQTT (Secure Message Queue Telemetry Transport)" },
    { abbr: "TCP", full: "Transmission Control Protocol" },
    { abbr: "UDP", full: "User Datagram Protocol" },
    { abbr: "WPAN", full: "Wireless Personal Area Network" },
    { abbr: "XML", full: "Extensible Markup Language" },
    { abbr: "XMPP", full: "Extensible Messaging and Presence Protocol" },
    { abbr: "ZC", full: "ZigBee Coordinator" },
    { abbr: "ZDO", full: "ZigBee Device Object" },
    { abbr: "ZED", full: "ZigBee End Device" },
    { abbr: "ZigBee", full: "ZigBee Specification (networking & application layers above 802.15.4)" },
    { abbr: "ZR", full: "ZigBee Router" },
  ],
  3: [
    { abbr: "BLE", full: "Bluetooth Low Energy" },
    { abbr: "BPSK", full: "Binary Phase Shift Keying" },
    { abbr: "DSSS", full: "Direct Sequence Spread Spectrum" },
    { abbr: "FHSS", full: "Frequency-Hopping Spread Spectrum" },
    { abbr: "GFSK", full: "Gaussian Frequency Shift Keying" },
    { abbr: "HART", full: "Highway Addressable Remote Transducer" },
    { abbr: "ISA", full: "International Society of Automation (ISA100.11a standard)" },
    { abbr: "ISM", full: "Industrial, Scientific and Medical (radio frequency bands)" },
    { abbr: "L2CAP", full: "Logical Link Control and Adaptation Protocol" },
    { abbr: "NFC", full: "Near Field Communication" },
    { abbr: "O-QPSK", full: "Offset Quadrature Phase Shift Keying" },
    { abbr: "PLC", full: "Programmable Logic Controller" },
    { abbr: "RFCOMM", full: "Radio Frequency Communications (serial cable emulation over Bluetooth)" },
    { abbr: "SDP", full: "Service Discovery Protocol (Bluetooth)" },
    { abbr: "TDMA", full: "Time Division Multiple Access" },
    { abbr: "WBAN", full: "Wireless Body Area Network" },
    { abbr: "WirelessHART", full: "Wireless Highway Addressable Remote Transducer" },
    { abbr: "WSN", full: "Wireless Sensor Network" },
    { abbr: "Z-Wave", full: "Z-Wave Wireless Protocol (sub-GHz smart home automation standard)" },
  ],
  4: [
    { abbr: "AoA", full: "Angle of Arrival (sensor localization technique)" },
    { abbr: "DTN", full: "Delay-Tolerant Network" },
    { abbr: "FANET", full: "Flying Ad Hoc Network" },
    { abbr: "GPS", full: "Global Positioning System" },
    { abbr: "MANET", full: "Mobile Ad Hoc Network" },
    { abbr: "OGDC", full: "Optimal Geographical Density Control (WSN coverage algorithm)" },
    { abbr: "RSSI", full: "Received Signal Strength Indicator" },
    { abbr: "SCADA", full: "Supervisory Control and Data Acquisition" },
    { abbr: "TDoA", full: "Time Difference of Arrival (sensor localization technique)" },
    { abbr: "ToA", full: "Time of Arrival (sensor localization technique)" },
    { abbr: "UAV", full: "Unmanned Aerial Vehicle" },
    { abbr: "UWASN", full: "Underwater Acoustic Sensor Network" },
    { abbr: "VANET", full: "Vehicular Ad-hoc Network" },
    { abbr: "WMSN", full: "Wireless Multimedia Sensor Network" },
  ],
  5: [
    { abbr: "ADC", full: "Analog-to-Digital Converter" },
    { abbr: "DAC", full: "Digital-to-Analog Converter" },
    { abbr: "EEPROM", full: "Electrically Erasable Programmable Read-Only Memory" },
    { abbr: "GPIO", full: "General-Purpose Input/Output" },
    { abbr: "I2C / IIC", full: "Inter-Integrated Circuit (two-wire serial bus)" },
    { abbr: "IDE", full: "Integrated Development Environment (Arduino IDE)" },
    { abbr: "MCU", full: "Microcontroller Unit" },
    { abbr: "PWM", full: "Pulse Width Modulation" },
    { abbr: "SoC", full: "System on Chip" },
    { abbr: "SPI", full: "Serial Peripheral Interface (synchronous 4-wire serial data link)" },
    { abbr: "SRAM", full: "Static Random-Access Memory" },
    { abbr: "UART", full: "Universal Asynchronous Receiver-Transmitter" },
    { abbr: "UMB", full: "Universal Middleware Bridge (enables heterogeneous IoT interoperability)" },
    { abbr: "USART", full: "Universal Synchronous/Asynchronous Receiver-Transmitter" },
  ],
  6: [
    { abbr: "BCM", full: "Broadcom (Broadcom chip GPIO pin numbering on Raspberry Pi)" },
    { abbr: "BOARD", full: "Physical Board pin numbering convention on Raspberry Pi header" },
    { abbr: "CPU", full: "Central Processing Unit" },
    { abbr: "CSI", full: "Camera Serial Interface (dedicated ribbon connector for RPi camera)" },
    { abbr: "CSV", full: "Comma-Separated Values" },
    { abbr: "DSI", full: "Display Serial Interface (dedicated ribbon connector for RPi display)" },
    { abbr: "GPIO", full: "General-Purpose Input/Output (40 pins on Raspberry Pi 3 Model B)" },
    { abbr: "GPU", full: "Graphics Processing Unit" },
    { abbr: "HDMI", full: "High-Definition Multimedia Interface" },
    { abbr: "OS", full: "Operating System (Raspberry Pi OS / Raspbian)" },
    { abbr: "PIL", full: "Python Imaging Library (forked and maintained as Pillow)" },
    { abbr: "RPi", full: "Raspberry Pi" },
    { abbr: "SoC", full: "System on Chip (e.g., Broadcom BCM2837 on Raspberry Pi 3)" },
  ],
  7: [
    { abbr: "AP", full: "Access Point (Wi-Fi master / hotspot mode)" },
    { abbr: "API", full: "Application Programming Interface" },
    { abbr: "DHCP", full: "Dynamic Host Configuration Protocol" },
    { abbr: "DNS", full: "Domain Name System" },
    { abbr: "INPP", full: "In-Network Packet Processing (flow-rule execution layer in SDN-WISE)" },
    { abbr: "NFV", full: "Network Functions Virtualization" },
    { abbr: "NOS", full: "Network Operating System" },
    { abbr: "ONOS", full: "Open Network Operating System" },
    { abbr: "OpenFlow", full: "Open standard communications protocol for SDN Southbound API" },
    { abbr: "SDN", full: "Software-Defined Networking (separation of control and data planes)" },
    { abbr: "SDN-WISE", full: "Software-Defined Networking for Wireless Sensor Networks" },
    { abbr: "SSH", full: "Secure Shell" },
    { abbr: "SSID", full: "Service Set Identifier (Wi-Fi network name)" },
    { abbr: "STA", full: "Station (Wi-Fi client node mode)" },
  ],
  8: [
    { abbr: "CIA", full: "Confidentiality, Integrity, and Availability (information security triad)" },
    { abbr: "EC2", full: "Elastic Compute Cloud (Amazon IaaS compute platform)" },
    { abbr: "IaaS", full: "Infrastructure as a Service" },
    { abbr: "IAM", full: "Identity and Access Management" },
    { abbr: "NIST", full: "National Institute of Standards and Technology (5 cloud characteristics)" },
    { abbr: "PaaS", full: "Platform as a Service" },
    { abbr: "QoE", full: "Quality of Experience" },
    { abbr: "QoS", full: "Quality of Service" },
    { abbr: "S3", full: "Simple Storage Service (Amazon object storage)" },
    { abbr: "SaaS", full: "Software as a Service" },
    { abbr: "SLA", full: "Service Level Agreement" },
    { abbr: "VM", full: "Virtual Machine" },
    { abbr: "VMM", full: "Virtual Machine Monitor (Hypervisor)" },
  ],
  9: [
    { abbr: "Ceilometer", full: "OpenStack Telemetry and Metering Service" },
    { abbr: "Cinder", full: "OpenStack Block Storage Service" },
    { abbr: "CLI", full: "Command Line Interface" },
    { abbr: "CoV-I", full: "Cloud of Virtual sensors Type I (homogeneous physical sensors in same region)" },
    { abbr: "CoV-II", full: "Cloud of Virtual sensors Type II (heterogeneous physical sensors across multiple regions)" },
    { abbr: "CSP", full: "Cloud Service Provider" },
    { abbr: "Glance", full: "OpenStack Virtual Machine Disk Image Service" },
    { abbr: "GUI", full: "Graphical User Interface" },
    { abbr: "Heat", full: "OpenStack Orchestration Engine (template-based deployment)" },
    { abbr: "Horizon", full: "OpenStack Dashboard Service (Web-based GUI)" },
    { abbr: "Keystone", full: "OpenStack Identity and Authentication Service" },
    { abbr: "Neutron", full: "OpenStack Software-Defined Networking Service" },
    { abbr: "Nova", full: "OpenStack Compute Service (manages virtual machine instances)" },
    { abbr: "SCSP", full: "Sensor-Cloud Service Provider" },
    { abbr: "Se-aaS", full: "Sensing as a Service (also written SeaaS)" },
    { abbr: "Swift", full: "OpenStack Object Storage Service" },
    { abbr: "VM", full: "Virtual Machine" },
    { abbr: "WSN", full: "Wireless Sensor Network" },
  ],
  10: [
    { abbr: "CCN", full: "Content-Centric Networking (retrieves data by unique content name)" },
    { abbr: "CS", full: "Content Store (caches content chunks locally in CCN)" },
    { abbr: "DLNA", full: "Digital Living Network Alliance (media sharing standard)" },
    { abbr: "DomoNet", full: "Domestic Network (centralized SOA smart home architecture)" },
    { abbr: "DSRC", full: "Dedicated Short-Range Communications (75 MHz bandwidth at 5850–5925 MHz)" },
    { abbr: "FIB", full: "Forwarding Information Base (CCN prefix-based forwarding table)" },
    { abbr: "HAN", full: "Home Area Network" },
    { abbr: "ICV", full: "Intelligent Connected Vehicle (connectivity + intelligent processing)" },
    { abbr: "ICT", full: "Information and Communications Technology" },
    { abbr: "ITS", full: "Intelligent Transportation Systems" },
    { abbr: "Jini", full: "Java Intelligent Network Infrastructure (distributed middleware)" },
    { abbr: "KNX", full: "Konnex (international standard for commercial and domestic home automation)" },
    { abbr: "LonWorks", full: "Local Operating Network Works (Neuron chip building automation standard)" },
    { abbr: "SAE", full: "Society of Automotive Engineers (SAE J2735 message sets, SAE J2945)" },
    { abbr: "UPnP", full: "Universal Plug and Play (zero-configuration device discovery)" },
    { abbr: "V2I", full: "Vehicle-to-Infrastructure" },
    { abbr: "V2N", full: "Vehicle-to-Network" },
    { abbr: "V2P", full: "Vehicle-to-Pedestrian / Vehicle-to-Person" },
    { abbr: "V2V", full: "Vehicle-to-Vehicle" },
    { abbr: "V2X", full: "Vehicle-to-Everything" },
    { abbr: "VANET", full: "Vehicular Ad-hoc Network" },
    { abbr: "WAVE", full: "Wireless Access in Vehicular Environments (IEEE 1609 standard family)" },
    { abbr: "X-10", full: "Power-line communication standard for home automation" },
  ],
};

/* ------------------------------------------------------------------ *
 * Read and split the raw notes into one clean block per week.
 * The raw file contains a second copy of weeks 5–10 and a misplaced
 * Week 4 fragment, so we deliberately take the complete first copies.
 * ------------------------------------------------------------------ */
const raw = fs.readFileSync(srcPath, "utf8").replace(/\r\n/g, "\n");
const lines = raw.split("\n");
const weekHeadRe = /^#\s+\*{0,2}\s*WEEK\s+(\d+)\b(.*)$/i;
const weekHeads = [];
lines.forEach((line, i) => {
  const m = line.match(weekHeadRe);
  if (m) weekHeads.push({ index: i, week: Number(m[1]) });
});

function firstHead(week) {
  const h = weekHeads.find((x) => x.week === week);
  if (!h) throw new Error(`Week ${week} heading not found`);
  return h.index;
}

function nextWeekHead(afterIndex) {
  const h = weekHeads.find((x) => x.index > afterIndex);
  return h ? h.index : lines.length;
}

function block(week) {
  const start = firstHead(week);
  let end = nextWeekHead(start);
  if (week === 4) {
    // Keep sections 1–2, then replace the stray UAV bullets and duplicate
    // section 5 with the complete fragment located after Week 10.
    const fragStart = lines.findIndex((l, i) => i > firstHead(10) && /^##\s+\*{0,2}3\.\s*Mobility/i.test(l));
    if (fragStart < 0) throw new Error("Week 4 fragment not found");
    const fragEnd = lines.findIndex((l, i) => i > fragStart && weekHeadRe.test(l));
    const main = lines.slice(start, end);
    const cut = main.findIndex((l) => /^-\s+UAV networks use/i.test(l));
    const before = cut >= 0 ? main.slice(0, cut) : main;
    return [...before, ...lines.slice(fragStart, fragEnd < 0 ? lines.length : fragEnd)].join("\n");
  }
  if (week === 10) {
    const fragStart = lines.findIndex((l, i) => i > start && /^##\s+\*{0,2}3\.\s*Mobility/i.test(l));
    if (fragStart > start) end = fragStart;
  }
  return lines.slice(start, end).join("\n");
}

/* ------------------------------------------------------------------ *
 * Small text fixes and chapter splitting.
 * ------------------------------------------------------------------ */
function cleanTitle(s) {
  return s
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/, "")
    .replace(/^\d+\.\s*/, "")
    .replace(/\s+---?\s+/g, " — ")
    .replace(/\s+--\s+/g, " — ")
    .replace(/[\s—–-]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fixText(s) {
  return s
    .replace(/conditionsremotely/g, "conditions remotely")
    .replace(/andwork/g, "and work")
    .replace(/t ime/g, "time")
    .replace(/IPaddress/g, "IP address")
    .replace(/Dfinition/g, "Definition")
    .replace(/GroudSim/g, "GroundSim")
    .replace(/3\.Attach/g, "3. Attach")
    .replace(/128-bitaddresses/g, "128-bit addresses")
    .replace(/(\d)--(\d)/g, "$1–$2")
    .replace(/\bClient--server\b/g, "Client–server")
    .replace(/\bZigbee\b/g, "ZigBee")
    .replace(/\s+\n/g, "\n");
}

function splitChapters(weekText) {
  let text = weekText.split("\n").slice(1).join("\n"); // drop week heading
  // Demote stray level-1 headings inside a week (e.g. Week 2 revision sheets).
  text = text.replace(/^#\s+(?!\*{0,2}\s*WEEK)/gm, "## ");
  text = fixText(text);
  const parts = text.split(/^##\s+/m);
  const chapters = [];

  for (const part of parts) {
    const ls = part.split("\n");
    let title = cleanTitle(ls.shift() || "");
    let body = ls.join("\n").trim();
    if (!title || !body) continue;
    // Ignore leaked table-cell headings that became ## lines in the source.
    if (/^(Main selection cue|Often paired with an external|Useful when reliable stream|Sensor owner|SCSP|Horizon|Nova|Keystone|Glance|Neutron|Swift|Cinder|Heat)/i.test(title)) {
      continue;
    }
    title = title.replace(/^(\d+)\.\s+/, "$1. ");
    chapters.push({ title, body });
  }
  return chapters;
}

const CHAPTER_NOTES = [
  {
    match: /^Coverage and connectivity/i,
    html: `<div class="callout note"><strong>Clarification:</strong> The three standard coverage categories are <strong>area coverage</strong> (the whole region is sensed), <strong>target/point coverage</strong> (specific targets are sensed) and <strong>barrier coverage</strong> (movement across a boundary is detected). Check the exact labels used in your lecture slides.</div>`,
  },
  {
    match: /^Data fusion$/i,
    html: `<div class="callout note"><strong>Clarification:</strong> The table in the supplied notes is headed “Four fusion levels” but lists three: decision, feature and pixel. Some texts add a signal/data level before feature level. Learn the three named in the table and use the exact labels from your slides if a fourth is listed there.</div>`,
  },
  {
    match: /^Sensor-Cloud$/i,
    html: `<div class="callout note"><strong>Remember:</strong> CoV-I uses homogeneous sensors in one region; CoV-II uses heterogeneous sensors across multiple regions.</div>`,
  },
];

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function preprocessMarkdown(md) {
  // A paragraph that follows a list without a blank line would otherwise
  // become part of the last list item.
  md = md.replace(/(\n[-*] [^\n]+)\n(\*\*[^\n]+)/g, "$1\n\n$2");

  const lines = md.split("\n");
  const out = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line.trim())) inFence = !inFence;
    if (!inFence && /^---+\s*$/.test(line)) {
      // Old notes contain space-aligned tables surrounded by --- rules.
      // Keep them aligned in a scrollable monospace block instead of
      // letting Markdown turn them into a giant paragraph.
      let j = i + 1;
      const buf = [];
      while (j < lines.length && !/^#{1,6}\s/.test(lines[j])) {
        buf.push(lines[j]);
        j++;
      }
      const nonEmpty = buf.filter((x) => x.trim());
      const tableish = nonEmpty.filter((x) => /\S\s{2,}\S/.test(x)).length >= 2;
      if (tableish && nonEmpty.length >= 2) {
        const text = buf
          .join("\n")
          .replace(/^---+\s*$/gm, "")
          .replace(/\*\*/g, "")
          .trim();
        out.push(`<pre class="ascii-table">${escapeHtml(text)}</pre>`);
        i = j - 1;
        continue;
      }
    }
    out.push(line);
  }
  return out.join("\n").replace(/^---+\s*$/gm, '\n\n<hr class="soft-rule">\n\n');
}

function chapterHtml(md, title = "") {
  md = preprocessMarkdown(md);
  let html = marked.parse(md);
  // Turn exam-style paragraphs into callouts.
  html = html.replace(
    /<p><strong>(Exam (?:trap|clue)|Remember|Important|Note|Common error|Exam focus|Exam shortcut):?<\/strong>\s*([\s\S]*?)<\/p>/gi,
    (_, label, body) => `<div class="callout tip"><strong>${label}:</strong> ${body}</div>`,
  );
  // Keep every table scrollable on narrow screens, preserving any custom class on the table.
  html = html.replace(/<table(\s[^>]*)?>/g, (m, attrs) => `<div class="table-wrap"><table${attrs || ''}>`);
  html = html.replace(/<\/table>/g, '</table></div>');
  // The source has many old ASCII tables. Give their leftover rules a class.
  html = html.replace(/<hr>/g, '<hr class="soft-rule">');
  return html;
}

function plainText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function keyTerms(html) {
  const found = [];
  const re = /<strong>([\s\S]*?)<\/strong>/gi;
  let m;
  while ((m = re.exec(html))) {
    const t = plainText(m[1]).replace(/:$/, "").trim();
    if (!t || t.length > 44) continue;
    if (/^(exam|remember|important|note|common|why|what|how|definition|core idea|key|types|main|components|advantages|challenges|applications|week|coverage-problem|topology|basic|other|additional)/i.test(t)) continue;
    if (/^(sensor owner|scsp|horizon|nova|keystone|glance|neutron|swift|cinder|heat)$/i.test(t)) continue;
    if (!found.some((x) => x.toLowerCase() === t.toLowerCase())) found.push(t);
  }
  return found.slice(0, 8);
}

const theory = [];
for (let w = 1; w <= 10; w++) {
  const meta = WEEK_META[w];
  const chapters = splitChapters(block(w))
    .map((c) => {
      let html = chapterHtml(c.body, c.title);
      for (const note of CHAPTER_NOTES) {
        if (note.match.test(c.title)) html = note.html + html;
      }
      return {
        title: c.title,
        html,
        text: plainText(html),
        terms: keyTerms(html),
      };
    })
    .filter((c) => c.text.length > 0);

  const weekForms = WEEK_FULL_FORMS[w] || [];
  if (weekForms.length) {
    const rows = weekForms
      .map((item) => `<tr><td>${escapeHtml(item.abbr)}</td><td>${escapeHtml(item.full)}</td></tr>`)
      .join("\n");
    const ffHtml = `<div class="table-wrap"><table class="ff-table">\n<thead><tr><th>Abbreviation</th><th>Full Form</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table></div>`;
    chapters.push({
      title: `Week ${w} — Key full forms and abbreviations`,
      html: ffHtml,
      text: plainText(ffHtml),
      terms: weekForms.slice(0, 8).map((x) => x.abbr),
    });
  }

  const numberedChapters = chapters.map((c, ci) => ({ ...c, id: `w${w}-c${ci + 1}` }));

  theory.push({
    id: `week-${w}`,
    week: w,
    title: meta.title,
    lectures: meta.lectures,
    intro: meta.intro,
    highlights: meta.highlights,
    chapters: numberedChapters,
  });
}

// Basic validation so a broken source can never silently ship.
for (const week of theory) {
  if (!week.chapters.length) throw new Error(`Week ${week.week} has no chapters`);
  const ids = new Set();
  for (const c of week.chapters) {
    if (ids.has(c.id)) throw new Error(`Duplicate chapter id ${c.id}`);
    ids.add(c.id);
    if (!c.text) throw new Error(`Empty chapter ${c.id}`);
  }
}
const totalChapters = theory.reduce((n, w) => n + w.chapters.length, 0);
if (theory.length !== 10) throw new Error("Expected 10 weeks");

fs.writeFileSync(
  outPath,
  `/* Generated by scripts/build-theory.mjs from thory.md. Do not edit directly. */\nwindow.THEORY = ${JSON.stringify(theory, null, 0)};\n`,
  "utf8",
);

console.log(`Wrote ${outPath}`);
console.log(`Weeks: ${theory.length}; chapters: ${totalChapters}`);
theory.forEach((w) => console.log(`Week ${w.week}: ${w.chapters.length} chapters, ${w.highlights.length} highlights`));
