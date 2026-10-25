import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const thoryPath = path.join(root, "thory.md");

const week11Text = `

# WEEK 11 --- SMART GRID, IIoT, AND BIG DATA ANALYTICS

## 1. Smart Grid and Modern Electrical Networks

### 1.1 What is a Smart Grid?
A **Smart Grid** is a modernized electrical power grid that integrates digital sensing, automated control, information technology, and two-way communication networks. While the traditional power grid was designed over a century ago for simple one-way delivery, the smart grid represents "electricity with a brain", often termed the **Energy Internet** or **Electronet**.

\`\`\`
Traditional Grid vs. Smart Grid:
Feature                   Traditional Grid             Smart Grid
Energy Flow               One-way (Power plant → User) Bidirectional (Two-way: User ↔ Grid)
Communication             One-way or manual            Two-way real-time communication
Monitoring                Manual / slow inspection     Automated continuous digital sensing
Restoration               Manual field repair crews    Self-healing / automatic rerouting
Generation                Centralized only             Centralized + Distributed (Solar, Wind, Batteries)
Customer Interaction      Passive consumer             Active "prosumer" (produces & consumes)
\`\`\`

**Key exam point:** The primary distinguishing characteristic of a smart grid is **bidirectional flows of energy with two-way communication and control**.

### 1.2 Phasor Measurement Units (PMU) & SCADA
- **Phasor Measurement Unit (PMU):** A high-speed digital device placed across power transmission systems to sample electrical waves (voltage and current phasors) at high sampling rates with microsecond GPS time-synchronization.
- **Phasor Network:** Multiple PMUs deployed across regions stream synchronized snapshots of grid conditions to provide wide-area situational awareness.
- **Role of SCADA:** Supervisory Control and Data Acquisition (SCADA) systems gather data from PMUs and field devices to provide wide-area grid visibility, early disturbance detection, and automated emergency control to prevent wide-scale blackouts.

### 1.3 Self-Healing Grid and Power Quality
A **Self-Healing Grid** uses automated monitoring and control algorithms to detect, isolate, and respond to grid disturbances with minimal human intervention:
- **Damping oscillations:** Quickly dampens unwanted power frequency fluctuations.
- **Automated line switching:** Automatically isolates faulted lines and reroutes power through alternate paths to prevent cascading transmission line overloads.
- **Reactive power management:** Balances real power (work-producing power) and reactive power (power sustaining electromagnetic fields in AC machinery) to maintain voltage stability.

## 2. Smart Metering, HEMS, and Energy Pricing

### 2.1 Smart Meter & Home Energy Management System (HEMS)
- **Smart Meter:** An electronic device that digitally records electricity consumption at frequent intervals and communicates the information back to the utility service provider for automated monitoring, billing, and demand management.
  - In a smart home, the smart meter provides the **digital interface between the consumer and the energy service provider**.
- **Home Energy Management System (HEMS):** A centralized home automation system that tracks real-time electricity usage, displays pricing signals, and schedules high-load appliances (washing machines, EV chargers, water heaters) during hours with lower electricity rates.

### 2.2 Time-of-Use (ToU) Pricing
Electricity demand fluctuates significantly throughout the day. Under **Time-of-Use (ToU)** pricing, utilities charge different electricity rates depending on the time of day:
- **On-Peak Hours:** High overall electricity demand periods with higher electricity prices.
- **Off-Peak Hours:** Low overall electricity demand periods (e.g., late night) with lower electricity prices.
- **Demand Response:** Consumers are financially incentivized to shift flexible heavy appliance usage to **off-peak hours**, flattening demand curves and reducing stress on generators.

### 2.3 Net Metering & Distributed Energy Resources
- **Distributed Generation:** Small-scale electricity generation located close to the point of consumption (e.g., residential rooftop solar PV panels, micro-wind turbines).
- **Net Metering:** A billing mechanism that credits customers for excess electricity generated locally and fed back into the electrical grid.
- **Billing formula:**
  $$\\text{Net Energy Bill} = \\text{Energy Inflow (Consumed from Grid)} - \\text{Energy Outflow (Fed to Grid)}$$
- **Islanding:** A condition where a microgrid or home continues to power itself locally from distributed resources even after disconnecting from the main electrical grid.
- **Plug-In Electric Vehicles (PEV / V2G):** Electric vehicles act as distributed energy storage units. In Vehicle-to-Grid (V2G) systems, vehicles charge during low-cost off-peak hours and discharge stored battery power back into the grid during peak demand.

## 3. Smart Grid Architecture, Distribution Intelligence and Cyber Security

### 3.1 Smart Grid Communication Architecture
Smart Grid communication spans multiple hierarchical tiers:
- **Home Area Network (HAN):** Connects appliances, sensors, and HEMS within a building.
- **Neighborhood Area Network (NAN):** Connects smart meters from a neighborhood to local gateways.
- **Wide Area Network (WAN):** High-speed optical or cellular backhaul linking regional substations to the utility control center.
- **End-to-End Information Path:**
  $$\\text{Smart Appliances} \\rightarrow \\text{Smart Meter} \\rightarrow \\text{IoT Gateway} \\rightarrow \\text{Data Aggregator Unit (DAU)} \\rightarrow \\text{Meter Data Management System (MDMS)} / \\text{Operation Centre}$$
- **Data Aggregator Units (DAUs):** Aggregate energy-consumption readings from a geographic cluster of meters and buffer data before forwarding it to the utility's MDMS.

### 3.2 Distribution Intelligence
- Distribution intelligence deploys sensors, automated reclosers, and smart switches along medium- and low-voltage distribution feeder lines.
- **Key benefits:**
  - Pinpoints the exact physical location of power line faults and outages.
  - Automatically isolates faulty feeder segments and restores power to non-faulted branches.
  - Balances feeder phase loads and maintains optimal voltage levels.

### 3.3 Cyber Security in Smart Grids
Because smart grids are critical cyber-physical systems, security attacks can trigger physical damage or blackouts:
- **Denial-of-Service (DoS) Attacks:** Floods communication channels or crashes gateways, making grid monitoring and control services unavailable. **DoS attacks specifically violate Availability.**
- **False Data Injection Attacks (FDIA):** An adversary injects manipulated sensor or meter readings into SCADA systems. Manipulated measurements can make a dangerously congested line look safe, causing physical line tripping and cascading blackouts.
- **Replay Attacks:** An attacker intercepts valid past sensor messages and re-transmits them later to deceive controllers into believing the grid is operating normally during a fault.
- **Time-Synchronization Attacks:** Corrupts the GPS time-stamping of PMUs, invalidating synchronized wide-area phase calculations.

## 4. Industrial Internet of Things (IIoT)

### 4.1 What is IIoT?
The **Industrial Internet of Things (IIoT)** applies IoT technologies to manufacturing, logistics, heavy utilities, oil & gas, and industrial automation. 

\`\`\`
Consumer IoT vs. Industrial IoT (IIoT):
Dimension                 Consumer IoT (IoT)           Industrial IoT (IIoT)
Primary Focus             User convenience & lifestyle Efficiency, safety, zero downtime, high ROI
Environment               Benign (home, office, gym)   Harsh (vibration, heat, dust, EMI, explosive)
Network Reliability       Tolerates delays & drops     Requires deterministic, ultra-reliable low latency
Architecture              Device-to-Cloud / App        Heavy Machine-to-Machine (M2M) & SCADA integration
Failure Consequence       Inconvenience / annoyance    Catastrophic (financial loss, injury, explosion)
\`\`\`

### 4.2 Migration Strategy: "Wrap and Re-use"
- Completely replacing existing multi-million dollar industrial machinery is economically impossible ("Rip and Replace").
- **Wrap and Re-use:** An engineering migration strategy where legacy industrial machines are retrofitted ("wrapped") with modern IoT sensors, microcontrollers, and communication gateways, allowing plants to gain smart monitoring capabilities while re-using functional capital assets.

### 4.3 Physical Plant vs. Virtual Plant & Digital Twins
- **Physical Plant:** The physical factory floor containing motors, boilers, pumps, and robotic arms.
- **Virtual Plant (Digital Twin):** A real-time software model and simulation running in the cloud or edge server that mirrors the physical machinery.
- **Sensors:** Stream vibration, thermal, and electrical telemetry to the virtual plant.
- **Predictive Maintenance:** Analytics detect early wear or abnormal bearing vibration signatures, triggering maintenance before catastrophic breakdown.

### 4.4 Key IIoT Applications
1. **Manufacturing:** Predictive maintenance, asset tracking, automated quality inspection.
2. **Underground Mining:** Wireless Sensor Networks (WSNs) monitor hazardous underground shafts:
   - Detect toxic and explosive gases ($CO, CH_4, H_2S$).
   - Monitor oxygen ($O_2$) depletion and seismic rock vibrations for early miner evacuation.
3. **Intelligent Transportation Systems (ITS):** Connected fleet management, vehicle diagnostics, cargo cold-chain temperature logging.
4. **Firefighting & Public Safety:** WSN and RFID deployed in hazardous structures to guide emergency rescue teams and locate trapped personnel.

## 5. Big Data and Pre-processing in IoT

### 5.1 The 7Vs of Big Data in IoT
IoT sensor networks continuously generate massive data streams characterized by the **7Vs**:
1. **Volume:** Massive scale of data generated by billions of continuous sensors.
2. **Velocity:** Extreme speed at which incoming sensor data arrives and must be processed.
3. **Variety:** Heterogeneous formats (structured relational records, semi-structured JSON, unstructured video/audio).
4. **Variability:** Dynamic changes in data flow rates and seasonal sensor measurement patterns.
5. **Veracity:** The truthfulness, noise, bias, and reliability of collected sensor readings.
6. **Visualization:** Presenting complex multi-dimensional data via dashboards and graphs for actionable human decisions.
7. **Value:** Transforming raw raw measurements into meaningful business and operational insights.

### 5.2 Big Data Flow & Preprocessing
The fundamental data pipeline in IoT:
$$\\text{DATA GENERATION} \\rightarrow \\text{DATA ACQUISITION} \\rightarrow \\text{DATA STORAGE} \\rightarrow \\text{DATA ANALYSIS}$$
- **Data Preprocessing Stages:**
  1. **Data Integration:** Harmonizing sensor streams from diverse protocols and vendors into uniform schemas.
  2. **Data Cleaning:** Filtering sensor noise, outlier detection, and imputing missing sensor packets.
  3. **Redundancy Mitigation:** Detecting and eliminating duplicate sensor transmissions (e.g. repeated identical temperature readings) through in-network filtering and data compression to save wireless bandwidth and battery power.

### 5.3 Distributed Storage: Hadoop & HDFS
Traditional relational databases (RDBMS) struggle with high-volume, unstructured IoT data. Apache Hadoop provides a distributed storage and processing cluster framework:
- **Hadoop Common:** Shared utilities and libraries.
- **MapReduce:** A distributed, parallel data-processing programming model.
- **YARN:** Resource management and job scheduling across cluster nodes.
- **HDFS (Hadoop Distributed File System) Architecture:**
  - **NameNode (Master):** Stores and manages the filesystem metadata (directory structure, permissions, block-to-DataNode mapping). **The NameNode does NOT store the actual file content blocks.**
  - **DataNodes (Slaves/Workers):** Physical cluster machines that store the actual data blocks on disk and execute read/write requests as directed by the NameNode.
  - **Block Replication:** HDFS divides large files into fixed blocks (e.g., 128 MB) and automatically replicates each block across multiple distinct DataNodes (default replication factor = 3) to ensure fault tolerance.
`;

const week12Text = `

# WEEK 12 --- IoT DATA ANALYTICS, AGRICULTURAL SYSTEMS AND HEALTHCARE

## 1. Data Analytics in IoT

### 1.1 Qualitative vs. Quantitative Analysis
Data analytics examines raw sensor datasets to discover patterns, draw conclusions, and support automated decision-making:
- **Qualitative Analysis:** Evaluates **categorical, descriptive, or nominal data** (non-numerical information such as device status, alarm labels, equipment models, or text notes).
  - *Three core principles:* **Notice things** (observe patterns) $\\rightarrow$ **Collect things** (gather evidence) $\\rightarrow$ **Think about things** (interpret themes).
- **Quantitative Analysis:** Evaluates **numerical, measurable data** (numbers that can be counted or measured such as temperature, pressure, current, acceleration, or packet delivery ratio).
  - Uses descriptive statistics: mean, median, variance, standard deviation, and regression models.

\`\`\`
Qualitative vs. Quantitative Data:
Feature               Qualitative Data               Quantitative Data
Nature of data        Descriptive / Categorical      Numerical / Continuous or Discrete
Question answered     "What kind?" / "Which type?"   "How much?" / "How many?"
Measurement           Observed qualities             Measured quantities
Examples              Color, machine status, labels  Temperature (28.4°C), Pressure (101.3 kPa)
\`\`\`

### 1.2 Statistical Modeling: Complete vs. Incomplete Models
A statistical model mathematically formalizes the relationship between random variables, denoted as the ordered pair $(X, P)$ where $X$ is the set of observations and $P$ is the set of probability distributions:
- **Complete Model:** A model in which the **number of variables equals the number of equations** ($N_{\\text{vars}} = N_{\\text{eqs}}$).
- **Incomplete Model:** A model in which the **number of variables does NOT equal the number of equations** ($N_{\\text{vars}} \\neq N_{\\text{eqs}}$, e.g. more variables than equations).
- **Steps to build a statistical model:** Data gathering $\\rightarrow$ Descriptive exploration $\\rightarrow$ Identify predictor variables $\\rightarrow$ Formulate mathematical equations $\\rightarrow$ Validate and interpret results.

### 1.3 Analysis of Variance (ANOVA)
**ANOVA (Analysis of Variance)** is a parametric statistical hypothesis-testing technique used to determine whether statistically significant differences exist between the means of **more than two groups or populations**.
- **When to use ANOVA:** When comparing 3 or more sample groups simultaneously (comparing just 2 groups uses a Student's t-test).
- **Key Assumptions:**
  1. *Independence:* Sample observations must be randomly and independently sampled.
  2. *Normality:* Data within each group should be approximately normally distributed.
  3. *Homogeneity of Variance:* Variances across the groups should be approximately equal.
- **F-Ratio:** Compares variance between groups against variance within groups:
  - If null hypothesis is true (no real group difference): $F \\approx 1$.
  - If null hypothesis is false (significant difference between groups): $F > 1$.
- **Types of ANOVA:** One-way ANOVA (one factor, e.g. soil moisture level), Two-way ANOVA (two factors), K-way ANOVA ($k$ factors).

### 1.4 Data Dispersion, Correlation & Regression
- **Measures of Dispersion:**
  - **Range:** $\\text{Maximum value} - \\text{Minimum value}$.
  - **Mean Absolute Deviation:** Average distance of data points from the mean without allowing positive and negative differences to cancel.
  - **Variance ($\\sigma^2$):** Average squared deviation from the mean.
  - **Standard Deviation ($\\sigma$):** Square root of variance, measuring spread in original data units.
- **Pearson's Correlation Coefficient ($r$):**
  - Measures the strength and direction of linear association between two quantitative continuous variables.
  - Range: $-1 \\le r \\le +1$.
  - $r = +1$: Perfect positive linear correlation.
  - $r = 0$: No linear relationship (does NOT imply absence of non-linear relation!).
  - $r = -1$: Perfect negative linear correlation.
  - **Crucial Rule:** *Correlation does NOT imply causation!*
- **Regression Analysis:** Models the relationship between a **dependent variable** (the target outcome to predict) and one or more **independent variables** (predictors).

## 2. AgriSens: Smart Water Management in Agriculture

### 2.1 The AgriSens System
**AgriSens** is an IoT-based precision agriculture and water-management system designed for irrigated crops.
- **Core Motto / Objective:** **"More crop per drop"** — maximizing crop yield while minimizing freshwater consumption through precision micro-irrigation.
- **Key Agricultural Functions:**
  - Automated irrigation scheduling based on real-time soil moisture and crop growth stages.
  - Continuous field monitoring of soil moisture, ambient humidity, temperature, and water levels.
  - Remote farmer control and emergency SMS alerts.

### 2.2 AgriSens 3-Layer Architecture
1. **Sensing and Actuating Layer:** Field-deployed sensor nodes equipped with soil-moisture probes (e.g. EC-05) and water-level sensors, plus actuator units controlling electric water pumps and solenoid valves.
2. **Processing, Storage and Service Layer:** GPRS/cellular gateways collect field telemetry, perform local data validation, and store records in central database servers.
3. **Application Layer:** Web portals and mobile dashboards providing analytics, irrigation status, and farmer alert services.

### 2.3 Sensor Node Design & Power Management
- **Sensor Node Hardware Components:**
  - Sensing and actuation unit (soil moisture, water level, relay drivers).
  - Microcontroller and memory unit.
  - Wireless communication transceiver (RF / GPRS).
  - **Power Management Unit (PMU):** Manages battery charging, solar PV harvesting, and low-power sleep/wake duty cycles to achieve multi-season unattended field lifetime.
- **Remote Server Architecture:**
  - **Repository Data Server:** Communicates with field gateways over GPRS to log incoming sensor packets.
  - **Web Server:** Renders online analytics and interactive field dashboards.
  - **Multi-User Server:** Delivers automated SMS alerts to farmers' mobile phones and accepts SMS commands (e.g. turning pumps on/off remotely).

## 3. IoT in Healthcare & AmbuSens

### 3.1 Healthcare IoT Layered Architecture
IoT transforms healthcare from reactive disease treatment into continuous **preventive healthcare**:
- **Sensing Layer:** Wearable body sensors (ECG, pulse oximeter, blood pressure, GSR, body temperature).
- **Aggregation Layer:** Local portable smart devices (smartphones, tablets) collect readings from on-body sensors via Bluetooth / BLE and act as data aggregators.
- **Processing Layer:** Edge/hospital servers parse physiological parameters and evaluate emergency risk thresholds.
- **Cloud Platform Layer:** Long-term Electronic Health Records (EHR) storage, doctor portals, and predictive machine learning models.

### 3.2 Preventive Care & Fall Detection
- Continuous monitoring enables early detection of abnormal medical trends before clinical symptoms become fatal.
- **Fall Detection:** Wearable 3-axis accelerometers detect sudden high-G impacts followed by prolonged immobility, automatically dispatching GPS location alerts to caregivers.

### 3.3 AmbuSens: Telemedicine & Ambulatory Monitoring
**AmbuSens** is an IoT healthcare framework designed for real-time patient monitoring inside ambulances and remote clinics:
- **Wireless Body Area Network (WBAN):** Single-hop body network using **Bluetooth (IEEE 802.15.1)** to link wearable physiological sensors to a patient monitoring gateway.
- **Monitored Physiological Parameters:**
  - **Electrocardiogram (ECG):** Real-time cardiac electrical wave monitoring.
  - **Heart Rate (HR):** Beats per minute.
  - **Body Temperature:** Core thermal measurements.
  - **Galvanic Skin Response (GSR):** Measures electrical conductance of the skin (reflects sympathetic nervous system and stress levels).
- **Privacy-Aware Cloud Framework:** Implements identity-masking via **cryptographic hashing and reverse hashing** of patient IDs to preserve confidentiality under HIPAA/EHR privacy regulations.

## 4. Activity Monitoring in IoT

### 4.1 Wearable Activity Monitoring
Activity monitoring captures human physical movements 24/7 to assess fitness, track recovery, or monitor elderly patients:
- **Actions:** Macro whole-body movements (running, walking, climbing stairs, jumping).
- **Gestures:** Local limb movements (waving a hand, bending legs, head nodding).
- **Core Advantages:** 24/7 continuous observation of human behavior, early detection of mobility decline, non-invasive long-term observation.

### 4.2 Sensors & Data Analytics Approaches
- **Sensors Used in Mobile Devices:**
  - **3-Axis Accelerometer:** Measures acceleration forces along $x, y, z$ axes (primary sensor for detecting walking, running, sitting, standing).
  - **Gyroscope:** Measures angular velocity and rotational orientation.
  - **GPS:** Tracks geographical position and velocity.
- **Analytics Methodologies:**
  - *Statistical Analysis:* Feature extraction (mean, peak-to-peak amplitude, spectral energy of accelerometer signals).
  - *Machine Learning:* Random Forests, SVMs, and Decision Trees classifying movement features.
  - *Deep Learning:* CNNs and LSTMs analyzing raw multi-modal time-series sensor data and video frames without manual feature engineering.

### 4.3 In-Place vs. Network-Based (Cloud) Approaches
\`\`\`
In-Place (Edge) vs. Network-Based (Cloud) Activity Monitoring:
Dimension                 In-Place (Edge) Approach     Network-Based (Cloud) Approach
Processing Location       On local smartphone/wearable Remote cloud servers
Network Requirement       Zero network needed (offline) Requires continuous reliable internet
Latency                   Instant / Real-time          Subject to network transmission delay
Data Privacy              High (raw data stays on device) Lower (raw sensor telemetry uploaded)
Device Battery Impact     High (heavy CPU/battery drain) Low (sensor offloads heavy computation)
Scalability & Model Size  Limited by device RAM/storage Unlimited cloud compute & massive models
\`\`\`
`;

const currentContent = fs.readFileSync(thoryPath, "utf8");
if (currentContent.includes("# WEEK 11 --- SMART GRID")) {
  console.log("Week 11 already present in thory.md");
} else {
  fs.writeFileSync(thoryPath, currentContent.trimEnd() + "\n" + week11Text + "\n" + week12Text + "\n", "utf8");
  console.log("Successfully appended Week 11 and Week 12 to thory.md");
}
