import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const appPath = path.join(root, "app.js");

let content = fs.readFileSync(appPath, "utf8");

// 1. Update NPTEL_IMP_TOPICS by appending Week 11 & 12 topics
const newImpTopics = `    {
      week: "Week 11",
      title: "Smart Grid, Net Metering & Time-of-Use (ToU)",
      badge: "EXAM CORE",
      points: [
        "Smart Grid: Bidirectional energy flow with two-way digital communication ('Electricity with a brain / Electronet').",
        "PMU (Phasor Measurement Unit): Samples voltage/current waveforms at microsecond GPS synchronization; streams to SCADA.",
        "Time-of-Use (ToU) Pricing: Higher rates during on-peak hours, lower during off-peak; incentivizes shifting heavy loads.",
        "Net Metering: Credits consumers for exported rooftop solar energy (Net Bill = Energy Inflow − Energy Outflow).",
        "Cyber Security: Denial-of-Service (DoS) attacks specifically violate Availability; False Data Injection causes blackout line trips."
      ],
      formula: "Net Bill = Inflow − Outflow · DoS = Violates Availability · PMU = Microsecond GPS Sync"
    },
    {
      week: "Week 11 & 12",
      title: "IIoT Wrap & Re-use vs. Big Data 7Vs & HDFS",
      badge: "HIGH YIELD",
      points: [
        "IIoT vs Consumer IoT: IIoT emphasizes operational efficiency, safety, and zero downtime across harsh factory floors.",
        "Wrap and Re-use: Retrofitting existing legacy machinery with modern IoT sensors and gateways instead of costly 'rip and replace'.",
        "7Vs of Big Data: Volume (scale), Velocity (speed), Variety (types), Variability (changing context), Veracity (trust/noise), Visualization, Value.",
        "HDFS Architecture: NameNode (Master) manages filesystem metadata and block locations; DataNodes (Slaves) store actual file data blocks.",
        "Redundancy Mitigation: Filters and compresses duplicate identical sensor readings to save bandwidth and power."
      ],
      formula: "HDFS: NameNode = Metadata only · DataNodes = Data blocks · Wrap & Re-use = Retrofit"
    },
    {
      week: "Week 12",
      title: "Statistical Analysis: ANOVA & Pearson Correlation (r)",
      badge: "EXAM CORE",
      points: [
        "Qualitative vs. Quantitative: Qualitative = categorical ('what kind'); Quantitative = numerical measurements ('how much').",
        "Complete vs. Incomplete Model: Complete model has N_vars = N_eqs; Incomplete model has N_vars ≠ N_eqs.",
        "ANOVA (Analysis of Variance): Parametric test comparing means of MORE THAN TWO groups/populations (F ≈ 1 if null hypothesis true; F > 1 if false).",
        "Pearson Correlation (r): Measures linear association between two variables from −1 to +1 (r = 0 means no linear correlation; does NOT prove causation!).",
        "Precision vs Standard Error: Precision is inversely proportional to standard error (smaller SE = higher precision)."
      ],
      formula: "ANOVA = >2 group means · −1 ≤ r ≤ +1 · Complete Model: N_vars = N_eqs"
    },
    {
      week: "Week 12",
      title: "AgriSens & AmbuSens Healthcare Architecture",
      badge: "CASE STUDIES",
      points: [
        "AgriSens Motto: 'More crop per drop' - precision irrigation based on real-time soil moisture (EC-05 sensor) and water levels.",
        "AgriSens 3 Layers: 1) Sensing & Actuating, 2) Processing, Storage & Service, 3) Application. PMU handles solar harvesting and duty cycling.",
        "Multi-User Remote Server: Sends field condition summaries to farmers via SMS and processes remote pump control commands.",
        "AmbuSens Healthcare: Ambulatory telemedicine with single-hop WBAN over Bluetooth (IEEE 802.15.1); monitors ECG, Heart Rate, Temperature, GSR.",
        "Privacy & Fall Detection: Identity-masking via cryptographic hashing/reverse hashing of patient IDs; accelerometer fall detection for elderly."
      ],
      formula: "AgriSens = More crop per drop (SMS alerts) · AmbuSens = WBAN (Bluetooth 802.15.1) + ECG/GSR"
    }`;

const oldImpEnd = `    {
      week: "Week 9 & 10",
      title: "OpenStack, Sensor-Cloud & Smart Cities (V2X)",
      badge: "APPLICATIONS",
      points: [
        "OpenStack: Nova (Compute), Swift/Cinder (Storage), Neutron (Network), Glance (Images), Keystone (Identity), Horizon (Dashboard).",
        "Sensor-Cloud: Sensing-as-a-Service (Se-aaS). CoV-I (same region) vs CoV-II (multi-region).",
        "Connected Vehicles (V2X): V2V, V2I, V2P. Dedicated Short-Range Communications (DSRC): 75 MHz bandwidth at 5.850–5.925 GHz, IEEE 802.11p/1609.",
        "Smart City Body Analogy: Nerves = Networks, Brain = Intelligence, Organs = Services."
      ],
      formula: "DSRC = 75 MHz (5.9 GHz band) · V2X = V2V + V2I + V2P"
    }
  ];`;

const newImpEnd = `    {
      week: "Week 9 & 10",
      title: "OpenStack, Sensor-Cloud & Smart Cities (V2X)",
      badge: "APPLICATIONS",
      points: [
        "OpenStack: Nova (Compute), Swift/Cinder (Storage), Neutron (Network), Glance (Images), Keystone (Identity), Horizon (Dashboard).",
        "Sensor-Cloud: Sensing-as-a-Service (Se-aaS). CoV-I (same region) vs CoV-II (multi-region).",
        "Connected Vehicles (V2X): V2V, V2I, V2P. Dedicated Short-Range Communications (DSRC): 75 MHz bandwidth at 5.850–5.925 GHz, IEEE 802.11p/1609.",
        "Smart City Body Analogy: Nerves = Networks, Brain = Intelligence, Organs = Services."
      ],
      formula: "DSRC = 75 MHz (5.9 GHz band) · V2X = V2V + V2I + V2P"
    },
${newImpTopics}
  ];`;

if (content.includes(oldImpEnd)) {
  content = content.replace(oldImpEnd, newImpEnd);
  console.log("Updated NPTEL_IMP_TOPICS with Week 11 & 12 cards!");
} else {
  console.log("oldImpEnd pattern not matched or already updated");
}

// 2. Update EASY_WEEK_SUMMARIES by appending Week 11 & 12 summaries
const newWeekSummaries = `    {
      week: 11,
      title: "Smart Grid, IIoT & Big Data Analytics",
      lectures: "Lectures 51–55",
      simpleWords: "Smart Grids modernize traditional electric power with two-way communication and bidirectional energy so homes can sell solar power back to the grid. IIoT connects factory machines using a 'wrap and reuse' strategy so older machines don't have to be thrown away, and Hadoop HDFS stores massive sensor data across computer clusters.",
      keyNotes: [
        "<b>Smart Grid vs. Traditional Grid:</b> Traditional grid is one-way (power plant → user). Smart Grid is <b>bidirectional</b> (two-way energy and real-time digital communication). Described as 'electricity with a brain' or 'electronet'.",
        "<b>Phasor Measurement Unit (PMU):</b> High-speed digital device sampling voltage and current waveforms with microsecond GPS time-stamping; streams data to SCADA for wide-area grid stability.",
        "<b>Time-of-Use (ToU) Pricing:</b> Charges higher rates during busy <i>on-peak hours</i> and lower rates during <i>off-peak hours</i>. Encourages consumers to run heavy loads (EV charging, water pumps) at night.",
        "<b>Net Metering:</b> Billing mechanism crediting consumers for rooftop solar power fed back into the grid: <code>Net Bill = Energy Inflow (consumed) − Energy Outflow (exported)</code>.",
        "<b>Smart Grid Information Hierarchy:</b> Smart Appliances → Smart Meter → IoT Gateway → Data Aggregator Unit (DAU) → Meter Data Management System (MDMS) / Operation Centre.",
        "<b>Cyber Security Attacks:</b>",
        "• <b>Denial of Service (DoS):</b> Floods grid networks and specifically violates <b>Availability</b>.",
        "• <b>False Data Injection (FDIA):</b> Injects false sensor values to make congested lines look safe, causing physical line trips and blackouts.",
        "• <b>Replay Attack:</b> Records past normal readings and re-sends them during a fault to trick operators.",
        "<b>IIoT vs Consumer IoT:</b> IIoT prioritizes efficiency, worker safety, and zero downtime under harsh industrial environments using extensive Machine-to-Machine (M2M) communication.",
        "<b>'Wrap and Re-use' Migration Strategy:</b> Retrofitting existing legacy factory machines with modern IoT sensors and gateways rather than expensive 'Rip and Replace'.",
        "<b>Underground Mining with WSNs:</b> Deploys wireless sensor networks in mine shafts to detect toxic gases ($CO, CH_4, H_2S$), oxygen depletion, and seismic rock instability.",
        "<b>7Vs of Big Data in IoT:</b> Volume (data scale), Velocity (streaming speed), Variety (diverse formats), Variability (changing context), Veracity (trustworthiness/noise), Visualization (charts), Value (practical benefit).",
        "<b>Redundancy Mitigation:</b> In-network detection, filtering, and compression of repeated identical sensor readings to conserve wireless bandwidth and device battery.",
        "<b>Hadoop HDFS Architecture:</b>",
        "• <b>NameNode (Master):</b> Manages filesystem metadata, directory trees, and block locations. <i>NameNode does NOT store file content blocks!</i>",
        "• <b>DataNodes (Slaves):</b> Store the actual data blocks on local disks across the cluster with automatic replication (default 3x) for fault tolerance."
      ],
      examTraps: [
        "<b>DoS Attacks Target Availability:</b> The #1 exam question on smart grid security: DoS attacks compromise <b>Availability</b>, not confidentiality.",
        "<b>NameNode Does NOT Store File Blocks:</b> The NameNode holds only metadata (the directory map). The actual data blocks live on DataNodes.",
        "<b>Wrap & Re-use vs Rip & Replace:</b> Wrap and Re-use retrofits existing machines; Rip & Replace throws them away."
      ],
      formula: "Net Bill = Inflow − Outflow · NameNode = Metadata only · 7Vs: Volume, Velocity, Variety, Variability, Veracity, Visualization, Value"
    },
    {
      week: 12,
      title: "IoT Data Analytics, Agricultural Systems (AgriSens) & Healthcare (AmbuSens)",
      lectures: "Lectures 56–60",
      simpleWords: "Explains statistical tools to make sense of sensor data (qualitative vs quantitative, ANOVA, and correlation), and explores two real-world case studies: AgriSens (smart watering for crops using SMS alerts) and AmbuSens (ambulance health monitoring with ECG, heart rate, and privacy protection).",
      keyNotes: [
        "<b>Qualitative vs. Quantitative Analysis:</b>",
        "• <b>Qualitative:</b> Analyzes categorical/descriptive data ('what kind?'). 3 Core Principles: <i>Notice things → Collect things → Think about things</i>.",
        "• <b>Quantitative:</b> Analyzes numerical/measurable data ('how much? / how many?'). Uses mean, standard deviation, dispersion, and regression.",
        "<b>Statistical Models: Complete vs. Incomplete:</b>",
        "• <b>Complete Model:</b> Number of system variables equals number of equations ($N_{vars} = N_{eqs}$).",
        "• <b>Incomplete Model:</b> Number of system variables does not equal number of equations ($N_{vars} \\neq N_{eqs}$).",
        "<b>Analysis of Variance (ANOVA):</b> Parametric hypothesis test used to compare means of <b>MORE THAN TWO groups or populations</b>. Assumptions: independent samples, normality, and homogeneity of variances. $F \\approx 1$ means null hypothesis is true; $F > 1$ means significant difference between groups.",
        "<b>Pearson's Correlation Coefficient ($r$):</b> Measures strength and direction of linear association between two continuous variables. Range: <b>$-1 \\le r \\le +1$</b>. $r = 0$ means no linear relationship. <i>Correlation does NOT imply causation!</i>",
        "<b>AgriSens Smart Agriculture:</b> IoT precision irrigation aiming for <b>'More crop per drop'</b>.",
        "• <b>3 Layers:</b> 1) Sensing & Actuating (EC-05 soil moisture, water level, pump relays), 2) Processing, Storage & Service, 3) Application.",
        "• <b>Power Management Unit (PMU):</b> Controls solar harvesting, battery charging, and sleep duty cycles for long-term field operation.",
        "• <b>Multi-User Remote Server:</b> Sends field summaries and irrigation alerts to farmers via SMS, and accepts remote pump control commands.",
        "<b>AmbuSens Healthcare System:</b> Real-time ambulatory telemedicine inside ambulances.",
        "• <b>Single-Hop WBAN:</b> Uses <b>Bluetooth (IEEE 802.15.1)</b> to connect wearable body sensors to a patient gateway.",
        "• <b>Monitored Vitals:</b> ECG (cardiac waves), Heart Rate, Body Temperature, and <b>Galvanic Skin Response (GSR)</b> (measures skin electrical conductance reflecting stress).",
        "• <b>Privacy Protection:</b> Identity-masking via <b>cryptographic hashing and reverse hashing</b> of patient IDs.",
        "<b>Continuous Activity Monitoring:</b> Uses smartphone <b>3-axis accelerometers</b> ($x, y, z$ forces) to classify walking, running, sitting, and standing. <i>In-place approach:</i> runs on device (works offline, instant, private, but high battery drain). <i>Network approach:</i> offloads to cloud (saves device power, but requires reliable internet)."
      ],
      examTraps: [
        "<b>ANOVA Group Count Trap:</b> ANOVA is for comparing means of <b>MORE THAN TWO groups</b> (if exactly 2 groups, use a Student's t-test).",
        "<b>Complete Model Definition:</b> Complete Model = Number of variables <b>EQUALS</b> number of equations ($N_{vars} = N_{eqs}$).",
        "<b>Pearson $r$ Range & Meaning:</b> Range is strictly $-1$ to $+1$. $r = 0$ means no <i>linear</i> correlation, but a non-linear relationship can still exist!"
      ],
      formula: "−1 ≤ r ≤ +1 · ANOVA = >2 groups · Complete Model: N_vars = N_eqs · AgriSens = 'More crop per drop'"
    }`;

const oldSummEnd = `      formula: "DSRC = 75 MHz (5.9 GHz) · V2X = V2V + V2I + V2P · Body Analogy: Nerves = Networks"
    }
  ];`;

const newSummEnd = `      formula: "DSRC = 75 MHz (5.9 GHz) · V2X = V2V + V2I + V2P · Body Analogy: Nerves = Networks"
    },
${newWeekSummaries}
  ];`;

if (content.includes(oldSummEnd)) {
  content = content.replace(oldSummEnd, newSummEnd);
  console.log("Updated EASY_WEEK_SUMMARIES with Weeks 11 & 12!");
} else {
  console.log("oldSummEnd pattern not matched or already updated");
}

// 3. Update titles and UI labels from 1–10 to 1–12
content = content
  .replace(/Weeks 1–10 Consolidated Summaries/g, "Weeks 1–12 Consolidated Summaries")
  .replace(/Consolidated 1–10 Week Summaries/g, "Consolidated 1–12 Week Summaries")
  .replace(/All 1–10 Week Summaries/g, "All 1–12 Week Summaries")
  .replace(/All 1–10 Week Consolidated Summaries/g, "All 1–12 Week Consolidated Summaries")
  .replace(/All Weeks \(1–10\)/g, "All Weeks (1–12)");

fs.writeFileSync(appPath, content, "utf8");
console.log("Successfully updated app.js!");
