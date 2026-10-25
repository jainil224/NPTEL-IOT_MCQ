import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const indexPath = path.join(root, "index.html");

const week11Data = {
  title: "WEEK 11 — Smart Grid, IIoT, and Big Data Analytics",
  topics: [
    {
      title: "1. Smart Grid Fundamentals & Architecture",
      summary: "Smart Grids replace traditional one-way electrical grids with two-way communication and bidirectional energy flows, featuring PMUs, SCADA, and self-healing automation.",
      qs: [
        {
          q: "What is the primary distinguishing characteristic of a Smart Grid compared to a traditional electrical grid?",
          o: [
            "Use of higher transmission voltage only",
            "Bidirectional flow of energy with two-way digital communication and automated control",
            "Elimination of all renewable energy generation",
            "Requirement for manual meter inspection"
          ],
          a: 1,
          w: "Traditional grids have one-way power flow from central plants to consumers. Smart grids feature bidirectional energy flow coupled with two-way real-time digital communication and control."
        },
        {
          q: "Which term is frequently used in NPTEL course slides to describe a Smart Grid?",
          o: [
            "Electricity with a brain / The Electronet",
            "Analog Power Highway",
            "One-Way Energy Feeder",
            "Passive Current Distributor"
          ],
          a: 0,
          w: "The course lectures explicitly describe a Smart Grid as 'Electricity with a brain', 'The energy internet', and 'The electronet'."
        },
        {
          q: "What is the primary function of a Phasor Measurement Unit (PMU) in a smart grid?",
          o: [
            "Billing residential consumers once a month",
            "Sampling voltage and current waveforms at high speed with microsecond GPS time-synchronization",
            "Acting as a step-down transformer in local sub-stations",
            "Generating solar electricity on residential rooftops"
          ],
          a: 1,
          w: "A PMU measures electrical waves (voltage and current phasors) at fixed high sampling rates with microsecond GPS time-stamping to give a real-time synchronized snapshot of grid stability."
        },
        {
          q: "In smart grid wide-area monitoring, what system analyzes data streamed from a network of PMUs?",
          o: [
            "SCADA (Supervisory Control and Data Acquisition)",
            "DNS (Domain Name System)",
            "DHCP server",
            "Simple Mail Transfer Protocol"
          ],
          a: 0,
          w: "Data collected across a phasor network is aggregated and analyzed by central SCADA systems to provide wide-area situational awareness and automated grid protection."
        },
        {
          q: "How does a 'self-healing' smart grid respond to transmission line disturbances?",
          o: [
            "It permanently shuts down the entire national power grid",
            "It automatically isolates faulted line segments and reroutes electricity through alternate paths",
            "It requires field technicians to manually walk the power lines before any action is taken",
            "It converts all AC lines to DC lines permanently"
          ],
          a: 1,
          w: "Self-healing grids use automated monitoring and switches to damp unwanted oscillations, isolate faulted sections, and reroute power automatically without waiting for manual repair crews."
        },
        {
          q: "What is the difference between real power and reactive power in power systems?",
          o: [
            "Real power does useful work; reactive power sustains electromagnetic fields in AC equipment",
            "Real power is only used in DC circuits; reactive power is used in solar panels",
            "Reactive power is billed to consumers; real power is free",
            "There is no difference; they are identical terms"
          ],
          a: 0,
          w: "Real power performs net useful work (turning motors, lighting bulbs). Reactive power is temporarily stored and returned by inductive and capacitive fields, crucial for voltage control."
        }
      ]
    },
    {
      title: "2. Smart Metering, HEMS, and Energy Pricing",
      summary: "Smart meters bridge consumers and utilities, supporting Time-of-Use (ToU) pricing, demand-side management, and Net Metering for rooftop solar.",
      qs: [
        {
          q: "In a smart home, what device provides the digital interface between the consumer and the utility service provider?",
          o: [
            "Smart Meter",
            "Analog fuse box",
            "Step-down transformer",
            "Wi-Fi access point"
          ],
          a: 0,
          w: "The smart meter is the electronic gateway device that digitally records energy usage and acts as the interface between the consumer and the utility provider."
        },
        {
          q: "Under Time-of-Use (ToU) electricity pricing, how are rates structured?",
          o: [
            "A constant flat rate per kWh regardless of time or demand",
            "Higher electricity prices during on-peak hours and lower prices during off-peak hours",
            "Free electricity during daytime hours for all industrial users",
            "Random prices generated every second without prior notification"
          ],
          a: 1,
          w: "ToU pricing charges different rates based on time of day: higher prices during on-peak hours (high demand) and lower prices during off-peak hours (low demand)."
        },
        {
          q: "What is the primary consumer incentive under Time-of-Use (ToU) tariffs?",
          o: [
            "Running high-load appliances exclusively during peak afternoon hours",
            "Shifting flexible heavy electrical loads (EV charging, laundry, water pumps) to off-peak hours to save money",
            "Disconnecting all solar panels from the roof",
            "Using manual analog electricity meters"
          ],
          a: 1,
          w: "ToU encourages consumers to shift discretionary heavy consumption to off-peak periods, saving on bills and helping utilities flatten grid demand peaks."
        },
        {
          q: "Net Metering calculates consumer electricity billing based on which formula?",
          o: [
            "Net Bill = Energy Inflow (from grid) − Energy Outflow (fed to grid)",
            "Net Bill = Energy Inflow × Energy Outflow",
            "Net Bill = Energy Outflow only",
            "Net Bill = Fixed connection charge with zero energy calculation"
          ],
          a: 0,
          w: "Net metering accounts for both energy consumed from the grid (inflow) and excess distributed solar power exported back into the grid (outflow): Net = Inflow − Outflow."
        },
        {
          q: "What does the term 'Islanding' mean in distributed smart grid terminology?",
          o: [
            "Laying undersea power cables to offshore islands",
            "A localized microgrid or home continuing to power itself from local generation when disconnected from the main grid",
            "The permanent destruction of power generators by flooding",
            "Operating a smart meter without an IP address"
          ],
          a: 1,
          w: "Islanding occurs when a home or microgrid continues to be energized by its own distributed generation resources (e.g. solar + battery) even after disconnecting from the main utility grid."
        },
        {
          q: "In a Vehicle-to-Grid (V2G) system, how do Plug-In Electric Vehicles (PEVs) assist the smart grid?",
          o: [
            "They consume 100% of grid energy at all times without discharging",
            "They act as distributed mobile batteries that can discharge stored power back into the grid during peak demand",
            "They replace the need for transmission power lines completely",
            "They convert AC electricity into nuclear energy"
          ],
          a: 1,
          w: "In V2G systems, PEVs act as distributed energy storage resources, charging when electricity is cheap off-peak and discharging stored energy back into the grid during peak hours."
        }
      ]
    },
    {
      title: "3. Distribution Intelligence, Gateways & Cyber Security",
      summary: "Distribution networks use gateways, DAUs, and MDMS for hierarchical data delivery, while defending against DoS and false data injection attacks.",
      qs: [
        {
          q: "What is the correct sequential information path in smart grid communication architecture?",
          o: [
            "Operation Centre → Smart Meter → Gateway → Appliance",
            "Smart Meter → IoT Gateway → Data Aggregator Unit (DAU) → MDMS / Operation Centre",
            "DAU → Smart Meter → SCADA → Gateway",
            "MDMS → Appliance → Gateway → Smart Meter"
          ],
          a: 1,
          w: "The standard path is: Smart Appliances → Smart Meter → IoT Gateway → Data Aggregator Unit (DAU) → Meter Data Management System (MDMS) / Operation Centre."
        },
        {
          q: "What is the primary role of a Data Aggregator Unit (DAU) in a smart grid?",
          o: [
            "Generating electricity from wind turbines",
            "Collecting, buffering, and aggregating meter data from a geographic cluster of meters before forwarding to the utility",
            "Step-up voltage transformation for long-distance lines",
            "Physically cutting consumer power cables during storms"
          ],
          a: 1,
          w: "DAUs aggregate energy-consumption records from local groups of smart meters, buffer the readings, and forward them to the central MDMS."
        },
        {
          q: "Which security dimension is specifically compromised by a Denial-of-Service (DoS) attack on a smart grid?",
          o: [
            "Confidentiality",
            "Availability",
            "Non-repudiation",
            "Physical encryption"
          ],
          a: 1,
          w: "A Denial-of-Service (DoS) attack aims to make systems, communication links, or grid data unavailable to operators when needed, directly violating Availability."
        },
        {
          q: "What is the primary danger of a False Data Injection Attack (FDIA) on a smart grid SCADA system?",
          o: [
            "It turns off the display backlight of household smart meters",
            "It injects manipulated sensor readings that make dangerously congested lines look safe, triggering line trips and cascading blackouts",
            "It increases the battery life of solar panels",
            "It converts digital meters into analog mechanical meters"
          ],
          a: 1,
          w: "FDIAs manipulate power flow and voltage telemetry. If operators believe a heavily overloaded line is operating safely, protection systems may trip unexpectedly, causing cascading grid collapse."
        },
        {
          q: "What occurs during a Replay Attack against smart grid telemetry?",
          o: [
            "The attacker deletes all historical database records",
            "The attacker intercepts valid past sensor messages and re-transmits them later to deceive controllers into believing conditions are normal",
            "The attacker physically steals electricity cables",
            "The attacker reverses the polarity of AC current"
          ],
          a: 1,
          w: "In a replay attack, an attacker records valid past 'all-normal' sensor readings and re-sends them during an active fault or physical disturbance to blind grid operators."
        }
      ]
    },
    {
      title: "4. Industrial Internet of Things (IIoT)",
      summary: "IIoT connects machines, heavy manufacturing, and mining through a 'wrap and re-use' migration strategy, emphasizing safety, reliability, and zero downtime.",
      qs: [
        {
          q: "How does Industrial IoT (IIoT) primarily differ from general Consumer IoT?",
          o: [
            "Consumer IoT requires higher reliability than IIoT",
            "IIoT focuses on operational efficiency, safety, zero downtime, and robust M2M communication under harsh environments",
            "IIoT only uses Bluetooth and Wi-Fi",
            "Consumer IoT never uses cloud computing"
          ],
          a: 1,
          w: "IIoT prioritizes high reliability, worker safety, industrial compliance, and zero downtime across harsh factory floors, whereas consumer IoT emphasizes user convenience."
        },
        {
          q: "What is the 'Wrap and Re-use' migration strategy in IIoT?",
          o: [
            "Discarding and replacing every machine on the factory floor with new robots ('Rip and Replace')",
            "Retrofitting existing legacy industrial machinery with modern IoT sensors, controllers, and gateways to add smart capabilities cost-effectively",
            "Wrapping electrical cables in plastic tape",
            "Using consumer smartphones as industrial drill controllers"
          ],
          a: 1,
          w: "'Wrap and Re-use' adds modern IoT sensors, computing, and gateways around existing legacy machinery, avoiding the prohibitive capital cost of 'Rip and Replace'."
        },
        {
          q: "In an IIoT physical-to-virtual plant architecture, what does the 'Virtual Plant' represent?",
          o: [
            "A greenhouse where robotic plants grow",
            "A software-based digital simulation / digital twin that mirrors real-time machine telemetry and status",
            "A factory that exists only on paper without real equipment",
            "An online store selling consumer electronics"
          ],
          a: 1,
          w: "The virtual plant is the digital model/twin running on servers or cloud platforms that mirrors physical machine sensor readings for monitoring and predictive maintenance."
        },
        {
          q: "In underground mining applications of IIoT, what critical environmental parameters do WSNs monitor?",
          o: [
            "Ambient music volume",
            "Toxic gases (CO, CH4, H2S), oxygen depletion, and seismic rock stability",
            "Worker smartphone screen brightness",
            "Social media activity of miners"
          ],
          a: 1,
          w: "WSNs in underground mines provide early warning of mine collapse and asphyxiation by continuously monitoring oxygen levels, seismic rock vibration, and toxic gases (carbon monoxide, methane, hydrogen sulfide)."
        },
        {
          q: "In IIoT service management, how is a 'Primary Service' distinguished from a 'Secondary Service'?",
          o: [
            "Primary service performs the device's main operational function; secondary service provides auxiliary support like health monitoring",
            "Primary services run in the cloud; secondary services run on batteries",
            "Primary services are free; secondary services require subscriptions",
            "There is no distinction in IIoT"
          ],
          a: 0,
          w: "A primary service delivers the node's main duty (e.g. measuring temperature), while secondary services perform supporting tasks (e.g. battery health monitoring, configuration management)."
        }
      ]
    },
    {
      title: "5. Big Data 7Vs, Preprocessing & Hadoop HDFS",
      summary: "IoT generates massive continuous sensor streams handled through data cleaning, redundancy mitigation, and distributed storage via Hadoop HDFS.",
      qs: [
        {
          q: "Which of the following represents the 7Vs of Big Data in IoT?",
          o: [
            "Volume, Velocity, Variety, Variability, Veracity, Visualization, Value",
            "Voltage, Vector, Valve, Variable, Visible, Virtual, Vapour",
            "Vibration, Voice, Video, View, Variance, Value, Vector",
            "Verification, Validity, Vacuum, Vitality, Vertex, Velocity, Volume"
          ],
          a: 0,
          w: "The 7Vs listed in the NPTEL curriculum are: Volume, Velocity, Variety, Variability, Veracity, Visualization, and Value."
        },
        {
          q: "What does the 'Veracity' characteristic of Big Data refer to in IoT systems?",
          o: [
            "The physical storage size of hard drives",
            "The speed of network transmission",
            "The truthfulness, trustworthiness, noise, and reliability of collected sensor readings",
            "The aesthetic beauty of dashboard graphs"
          ],
          a: 2,
          w: "Veracity refers to data trustworthiness, including noise, sensor bias, abnormalities, and reliability. High veracity means the data accurately reflects reality."
        },
        {
          q: "Why is 'Redundancy Mitigation' essential during IoT data preprocessing?",
          o: [
            "To prevent sensors from measuring temperature",
            "To eliminate duplicate or unchanged sensor readings, conserving wireless transmission bandwidth and battery power",
            "To delete all incoming sensor data before storage",
            "To encrypt data using RSA keys"
          ],
          a: 1,
          w: "IoT sensors often generate repetitive identical readings (e.g. room temperature staying 24°C). Redundancy mitigation filters or compresses duplicate data, saving wireless bandwidth and power."
        },
        {
          q: "In Hadoop Distributed File System (HDFS), what is the key responsibility of the NameNode?",
          o: [
            "Storing the raw binary file data blocks on its local disks",
            "Managing the filesystem metadata, directory tree, and block-to-DataNode mapping",
            "Powering the cooling fans of data center racks",
            "Connecting individual smart meters via Wi-Fi"
          ],
          a: 1,
          w: "The NameNode acts as master and stores filesystem metadata (directory structure, permissions, and locations of file blocks). It does NOT store the actual file content blocks."
        },
        {
          q: "Where are the actual data file blocks stored in Hadoop HDFS?",
          o: [
            "Inside the NameNode RAM only",
            "Distributed across physical disks on multiple worker DataNodes",
            "On the client's web browser",
            "Inside the GPS satellite receiver"
          ],
          a: 1,
          w: "In HDFS, DataNodes are worker nodes that store and manage the physical data blocks on disk and fulfill read/write requests from clients."
        },
        {
          q: "How does HDFS ensure fault tolerance if a physical DataNode server crashes?",
          o: [
            "By shutting down all other machines immediately",
            "By automatically replicating each data block across multiple distinct DataNodes (default replication factor = 3)",
            "By asking the user to re-enter all data manually",
            "By deleting the missing file from the system"
          ],
          a: 1,
          w: "HDFS divides files into blocks and maintains multiple copies (typically 3 replicas) across different DataNodes. If one node fails, data remains accessible from other replicas."
        }
      ]
    }
  ]
};

const week12Data = {
  title: "WEEK 12 — IoT Data Analytics, Agricultural Systems and Healthcare",
  topics: [
    {
      title: "1. Data Analytics & Statistical Modeling",
      summary: "IoT data analytics encompasses qualitative (categorical) and quantitative (numerical) analysis, dispersion metrics, and complete vs incomplete mathematical models.",
      qs: [
        {
          q: "What is the core difference between Qualitative and Quantitative data analysis in IoT?",
          o: [
            "Qualitative analyzes numerical measurements; Quantitative analyzes non-numerical categories",
            "Qualitative analyzes categorical/descriptive data ('what kind'); Quantitative analyzes numerical/measurable data ('how much')",
            "Qualitative analysis is only used in agriculture; Quantitative is only used in smart grids",
            "There is no difference between qualitative and quantitative analysis"
          ],
          a: 1,
          w: "Qualitative data deals with descriptions and categories (machine model, alarm type). Quantitative data deals with measurable numbers (temperature, pressure, voltage)."
        },
        {
          q: "Which three core principles summarize Qualitative Data Analysis in the NPTEL curriculum?",
          o: [
            "Notice things → Collect things → Think about things",
            "Filter things → Compress things → Delete things",
            "Add things → Multiply things → Divide things",
            "Sample things → Digitize things → Modulate things"
          ],
          a: 0,
          w: "The NPTEL lecture explicitly summarizes qualitative analysis with three basic principles: Notice things (observe) → Collect things (gather) → Think about things (interpret)."
        },
        {
          q: "In statistical modeling, how is a 'Complete Model' defined?",
          o: [
            "A model where the number of variables equals the number of equations (Nvars = Neqs)",
            "A model where there are zero variables and infinite equations",
            "A model where the number of variables does not equal the number of equations",
            "A model that contains only qualitative data"
          ],
          a: 0,
          w: "In IoT statistical modeling, a Complete Model is one where the number of system variables equals the number of mathematical equations."
        },
        {
          q: "What is an 'Incomplete Model' in statistical modeling?",
          o: [
            "A model that has never been written down",
            "A model where the number of variables does not equal the number of equations (Nvars ≠ Neqs)",
            "A model that contains no numbers",
            "A model where all variables are constants"
          ],
          a: 1,
          w: "An Incomplete Model is one where the number of variables does not match the number of equations (e.g. fewer equations than unknown variables)."
        },
        {
          q: "How is Precision related to Standard Error in data analysis?",
          o: [
            "Precision is identical to standard deviation",
            "Precision is inversely related to standard error: as standard error decreases, precision increases",
            "Precision increases as standard error increases",
            "Precision is completely independent of sample size and standard error"
          ],
          a: 1,
          w: "Standard error is a direct measure of sampling precision. As standard error becomes smaller, sample estimates cluster more tightly, meaning precision increases."
        },
        {
          q: "What is the formula for the Limit of Error in statistical estimation?",
          o: [
            "Limit of Error = Critical Value × Standard Deviation of the statistic",
            "Limit of Error = Mean ÷ Variance",
            "Limit of Error = Maximum Value + Minimum Value",
            "Limit of Error = Sample Size × Degrees of Freedom"
          ],
          a: 0,
          w: "The NPTEL lecture specifies: Limit of Error = Critical Value × Standard Deviation of the statistic."
        }
      ]
    },
    {
      title: "2. ANOVA & Correlation Analysis",
      summary: "ANOVA compares means across more than two sample groups using the F-ratio, while Pearson's r evaluates linear association between variables.",
      qs: [
        {
          q: "When is Analysis of Variance (ANOVA) primarily used instead of a standard t-test?",
          o: [
            "When analyzing only qualitative text strings",
            "When comparing the means of more than two populations or sample groups simultaneously",
            "When comparing exactly two observations",
            "When data has zero variance"
          ],
          a: 1,
          w: "ANOVA is specifically designed to test for statistically significant differences between the means of more than two groups (3 or more samples)."
        },
        {
          q: "Which of the following is NOT an assumption required for performing ANOVA?",
          o: [
            "Independence of cases (random, independent sampling)",
            "Approximate normality of data distributions within groups",
            "Homogeneity of group variances",
            "Variables must be measured using a 10-bit Arduino ADC"
          ],
          a: 3,
          w: "ANOVA requires independence of observations, approximate normality, and homogeneity of variances (equal variances across groups)."
        },
        {
          q: "In an ANOVA test, what does an F-ratio approximately equal to 1 indicate?",
          o: [
            "The null hypothesis is true (no significant difference between group means)",
            "The null hypothesis is completely false (extreme difference between groups)",
            "All group sample sizes are zero",
            "The calculation has produced a mathematical error"
          ],
          a: 0,
          w: "When the null hypothesis is true (no true difference between group means), the between-group variance equals within-group variance, yielding F ≈ 1. F significantly > 1 indicates true differences."
        },
        {
          q: "What is the Total Sum of Squares (TSS or SST) in ANOVA?",
          o: [
            "The difference between the maximum and minimum values",
            "The sum of squared differences between each individual observation and the overall grand mean",
            "The total number of samples multiplied by degrees of freedom",
            "The average standard deviation across all groups"
          ],
          a: 1,
          w: "Total Sum of Squares (TSS/SST) measures total dispersion by summing the squared deviations of all individual observations around the overall grand mean."
        },
        {
          q: "What is the valid numerical range of Pearson's correlation coefficient (r)?",
          o: [
            "0 to +100",
            "−1 to +1",
            "0 to 1",
            "−∞ to +∞"
          ],
          a: 1,
          w: "Pearson's correlation coefficient r strictly ranges from −1 (perfect negative linear correlation) through 0 (no linear correlation) to +1 (perfect positive linear correlation)."
        },
        {
          q: "If Pearson's correlation coefficient between two sensor variables is r = 0, what does this indicate?",
          o: [
            "There is a perfect non-linear exponential relationship",
            "There is no linear association between the two variables",
            "One variable definitely causes the other variable to increase",
            "Both sensors are broken and reporting null values"
          ],
          a: 1,
          w: "r = 0 indicates the absence of a linear relationship between the two variables (though a non-linear relationship could still exist). Remember: correlation does NOT imply causation!"
        }
      ]
    },
    {
      title: "3. AgriSens: Smart Water Management in Agriculture",
      summary: "AgriSens is an IoT precision irrigation system aiming for 'more crop per drop' via a 3-layer architecture, PMU solar harvesting, and SMS remote server control.",
      qs: [
        {
          q: "What is the primary motto and objective of the AgriSens IoT agricultural system?",
          o: [
            "Using 100% manual irrigation without sensors",
            "Obtaining more crop yield using less water ('More crop per drop')",
            "Flooding fields continuously 24 hours a day",
            "Eliminating all electrical pumps in farming"
          ],
          a: 1,
          w: "AgriSens is designed for precision water management in irrigated agriculture, with the central objective of achieving higher crop yield while conserving water ('More crop per drop')."
        },
        {
          q: "What are the three architectural layers of the AgriSens system?",
          o: [
            "Sensing and Actuating Layer, Processing/Storage/Service Layer, Application Layer",
            "Physical Layer, Data Link Layer, Network Layer",
            "Perception Layer, Transport Layer, Business Layer",
            "Hardware Layer, Android Layer, Web Layer"
          ],
          a: 0,
          w: "The AgriSens architecture is divided into: 1) Sensing and Actuating Layer, 2) Processing, Storage, and Service Layer, and 3) Application Layer."
        },
        {
          q: "In the AgriSens sensor node design, what is the role of the Power Management Unit (PMU)?",
          o: [
            "Measuring soil salinity and nitrogen levels",
            "Managing battery charging, solar harvesting, and low-power sleep cycles for unattended field operation",
            "Sending SMS text messages directly to farmers",
            "Opening the physical water valve with an electric motor"
          ],
          a: 1,
          w: "The PMU regulates energy harvesting from solar PV panels, controls battery charging, and governs low-power duty cycling so field nodes can run unattended across crop seasons."
        },
        {
          q: "In AgriSens, how does the Multi-User Remote Server interact with farmers?",
          o: [
            "By physically mailing paper letters weekly",
            "By sending field condition summaries and alerts via SMS, and handling farmer remote queries and pump control commands",
            "By requiring farmers to visit the university laboratory in person",
            "By making automated phone calls in satellite frequencies only"
          ],
          a: 1,
          w: "The multi-user server connects to farmers' mobile phones via SMS, delivering real-time field summaries and alerts, and accepting SMS commands to turn irrigation pumps on or off."
        },
        {
          q: "What soil sensor probe is prominently used in the AgriSens case study to guide irrigation?",
          o: [
            "PIR sensor",
            "EC-05 soil moisture sensor",
            "Ultrasonic distance sensor",
            "MQ-2 gas sensor"
          ],
          a: 1,
          w: "The AgriSens case study uses the EC-05 soil moisture sensor alongside water level sensors to continuously measure soil water content across crop growth phases."
        }
      ]
    },
    {
      title: "4. Healthcare IoT & AmbuSens Ambulatory Monitoring",
      summary: "Healthcare IoT facilitates 24/7 preventive care, wearable fall detection, and AmbuSens telemedicine with WBAN (Bluetooth), ECG, and privacy-preserving cloud hashing.",
      qs: [
        {
          q: "How does IoT transform traditional healthcare paradigms?",
          o: [
            "By replacing all hospitals with robotic surgery drones",
            "By shifting medicine from episodic reactive treatment to continuous 24/7 preventive care and remote patient monitoring",
            "By eliminating the need for physiological vital sensors",
            "By making patient medical records completely public"
          ],
          a: 1,
          w: "IoT shifts healthcare from reactive treatment (treating illness after symptoms appear) to continuous preventive care (detecting subtle physiological anomalies early to prevent acute crisis)."
        },
        {
          q: "In healthcare IoT architecture, what role do smartphones and tablets play in the Aggregation Layer?",
          o: [
            "They manufacture medications for patients",
            "They act as local data aggregators, gathering vitals from wearable body sensors via Bluetooth/BLE and relaying them to servers",
            "They act as step-down transformers for medical equipment",
            "They replace doctor consultations entirely without networks"
          ],
          a: 1,
          w: "In the aggregation layer, mobile devices (smartphones, tablets) collect physiological streams from wearable sensors over short-range links (BLE/Bluetooth) and relay them to processing servers."
        },
        {
          q: "What is an important preventive healthcare application of wearable accelerometers for senior citizens?",
          o: [
            "Monitoring keyboard typing speed",
            "Real-time Fall Detection and automated emergency caregiver alert dispatch",
            "Counting eye blinks per minute",
            "Measuring room ambient lighting"
          ],
          a: 1,
          w: "Fall detection algorithms analyze sudden acceleration spikes followed by prolonged immobility to detect falls in elderly patients and immediately send emergency caregiver alerts."
        },
        {
          q: "In the AmbuSens healthcare case study, which communication protocol forms the Wireless Body Area Network (WBAN)?",
          o: [
            "Bluetooth (IEEE 802.15.1)",
            "ZigBee 802.15.4 in star mode only",
            "Satellite DSRC",
            "Wired Ethernet cable"
          ],
          a: 0,
          w: "AmbuSens implements a single-hop Wireless Body Area Network (WBAN) utilizing Bluetooth based on the IEEE 802.15.1 standard."
        },
        {
          q: "Which physiological vitals are monitored in real-time by the AmbuSens ambulatory system?",
          o: [
            "Electrocardiogram (ECG), Heart Rate, Body Temperature, and Galvanic Skin Response (GSR)",
            "Blood type, hair color, and eyesight score",
            "Voice pitch, shoe size, and step length",
            "Brain skull thickness and dental X-rays"
          ],
          a: 0,
          w: "AmbuSens monitors ECG (cardiac waveforms), heart rate, body temperature, and Galvanic Skin Response (GSR) to assess patient stability inside ambulances."
        },
        {
          q: "What physiological property does Galvanic Skin Response (GSR) measure in AmbuSens?",
          o: [
            "Body core temperature in Celsius",
            "Changes in electrical conductance of the skin reflecting sweat gland activity and autonomic sympathetic arousal",
            "Blood oxygen saturation levels",
            "Frequency of heart sound murmurs"
          ],
          a: 1,
          w: "GSR measures changes in the electrical conductance of the skin, which varies with sweat gland activity controlled by the sympathetic nervous system, indicating emotional or physical stress."
        },
        {
          q: "How does the AmbuSens health-cloud framework ensure patient privacy and regulatory compliance?",
          o: [
            "By publishing patient records on social media",
            "By implementing identity-masking through cryptographic hashing and reverse hashing of patient IDs",
            "By refusing to store any medical records in the cloud",
            "By using unencrypted plain-text files on public FTP servers"
          ],
          a: 1,
          w: "AmbuSens protects sensitive medical records using an identity-masking framework with cryptographic hashing and reverse hashing of patient identifiers."
        }
      ]
    },
    {
      title: "5. Activity Monitoring & Multi-Modal Analytics",
      summary: "Activity monitoring classifies human actions and gestures using smartphone 3-axis accelerometers, comparing in-place edge processing with network-based cloud analytics.",
      qs: [
        {
          q: "What is a major advantage of continuous 24/7 IoT Activity Monitoring?",
          o: [
            "It permanently prevents the user from exercising",
            "It enables continuous observation of daily human behavior, tracking mobility trends and identifying repetitive activity patterns",
            "It replaces the need for any physical medical examinations forever",
            "It requires zero sensors on the human body"
          ],
          a: 1,
          w: "Continuous activity monitoring enables long-term observation of daily human routine, helping detect early onset of mobility impairment, cognitive decline, or rehabilitation progress."
        },
        {
          q: "Which built-in smartphone sensor is primarily logged to classify physical activities such as walking, running, and sitting?",
          o: [
            "Barometer only",
            "3-Axis Accelerometer (measuring x, y, and z acceleration forces)",
            "Ambient light sensor",
            "Capacitive touchscreen"
          ],
          a: 1,
          w: "A 3-axis accelerometer measures dynamic acceleration forces along the x, y, and z axes, providing the primary signal used to classify postures and movement activities."
        },
        {
          q: "What is the primary operational trade-off of the 'In-Place' (edge) activity monitoring approach?",
          o: [
            "It requires a supercomputer cluster with constant internet connectivity",
            "It processes data locally without needing a network connection, but imposes higher computational and battery drain on the wearable device",
            "It can only run once every 24 hours",
            "It has infinite battery life but cannot measure acceleration"
          ],
          a: 1,
          w: "In-place monitoring operates locally on the smartphone/wearable (working offline with zero latency and high privacy), but demands significant CPU processing and drains device battery faster."
        },
        {
          q: "How does the 'Network-Based' (cloud) activity monitoring approach compare with the In-Place approach?",
          o: [
            "Network-based offloads heavy computation to cloud servers, lowering wearable device battery drain, but requires a reliable network connection",
            "Network-based requires zero network connection at all times",
            "Network-based is slower than manual paper calculations",
            "Network-based cannot support group analytics"
          ],
          a: 0,
          w: "Network-based monitoring offloads computationally heavy algorithms to powerful cloud servers (enabling complex models and saving wearable battery), but depends on continuous, reliable internet."
        },
        {
          q: "In modern activity recognition, why are Deep Learning models (CNNs and LSTMs) applied to multi-modal IoT data?",
          o: [
            "They can automatically learn complex spatio-temporal features directly from raw sensor time-series and video frames without manual feature engineering",
            "They require zero training data and zero processing power",
            "They convert digital sensors back into analog transducers",
            "They only work with text messages"
          ],
          a: 0,
          w: "Deep learning architectures (CNNs for spatial/visual patterns and LSTMs/RNNs for temporal time-series dynamics) excel at learning rich representations directly from heterogeneous sensor streams."
        }
      ]
    }
  ]
};

const indexHtml = fs.readFileSync(indexPath, "utf8");
const match = indexHtml.match(/const DATA = (\[[\s\S]*?\]);\s*<\/script>/);

if (!match) {
  console.error("Could not find const DATA in index.html");
  process.exit(1);
}

const currentData = JSON.parse(match[1]);
console.log(`Current weeks in DATA: ${currentData.length}`);

// Check if week 11 or 12 already exist
const hasW11 = currentData.some(w => w.title.includes("WEEK 11"));
const hasW12 = currentData.some(w => w.title.includes("WEEK 12"));

if (!hasW11) currentData.push(week11Data);
if (!hasW12) currentData.push(week12Data);

console.log(`New weeks in DATA: ${currentData.length}`);

const newConstData = `const DATA = ${JSON.stringify(currentData)};\n</script>`;
const newIndexHtml = indexHtml.replace(/const DATA = \[[\s\S]*?\];\s*<\/script>/, newConstData);

fs.writeFileSync(indexPath, newIndexHtml, "utf8");
console.log("Successfully updated index.html with Week 11 and Week 12 MCQs!");
