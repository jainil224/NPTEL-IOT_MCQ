# WEEK 12 --- IoT DATA ANALYTICS, AGRICULTURAL SYSTEMS AND HEALTHCARE

## 1. Data Analytics in IoT

### 1.1 Qualitative vs. Quantitative Analysis
- **Qualitative Analysis:** Applied to **categorical data** (data that represents types, categories, names, labels, or qualities, such as device status, machine model, or color).
- **Quantitative Analysis:** Applied to **numerical data** (data that can be counted or measured, such as temperature, pressure, current, or weight).

### 1.2 Statistical Modeling: Complete vs. Incomplete Models
- In IoT data modeling, a statistical model expresses the relationships among system variables using mathematical equations.
- **Complete Model:** A model where the **number of variables equals the number of equations**.
- **Incomplete Model:** A model where the number of variables does not match the number of equations (e.g. fewer equations than variables).

### 1.3 Analysis of Variance (ANOVA)
- **ANOVA (Analysis of Variance):** A statistical hypothesis-testing technique used to compare the means of **more than two populations or samples**.
- It evaluates whether observed differences between group sample means are statistically significant or occurred merely due to random chance.

### 1.4 Pearson's Correlation Coefficient ($r$)
- **Pearson's Correlation Coefficient ($r$):** Measures the **strength and direction of linear association** between two quantitative variables.
- Value range: $-1 \le r \le +1$
  - $r = +1$: Perfect positive linear correlation (as $X$ increases, $Y$ increases).
  - $r = 0$: No linear correlation.
  - $r = -1$: Perfect negative linear correlation (as $X$ increases, $Y$ decreases).

## 2. AgriSens: Smart Water Management in Agriculture

### 2.1 What is AgriSens?
**AgriSens** is an IoT-based smart agricultural water-management system.
- **Primary objective:** **Achieving more crop yield with less water** through precision irrigation and continuous soil-moisture monitoring.

### 2.2 The Three Layers of AgriSens Architecture
1. **Sensing and Actuating Layer:** Collects field parameters (soil moisture, temperature, humidity) and operates physical actuators (water pumps, solenoid valves).
2. **Processing, Storage and Service Layer:** Cleans, aggregates, processes, and stores incoming sensor streams in databases.
3. **Application Layer:** Provides web dashboards, farmer interfaces, and automated notification services.

### 2.3 AgriSens Sensor Node Components
An integrated field node contains:
- Soil moisture and ambient temperature sensors.
- Microcontroller and wireless RF transceiver.
- **Power Management Unit (PMU):** Manages battery charging, solar harvesting, and low-power sleep cycles.

### 2.4 Multi-User Remote Server
- The multi-user server acts as the bridge between the smart farm and farmers.
- **Functions:**
  - Sends field condition summaries and irrigation alerts to the farmer's mobile phone via **SMS**.
  - Receives and executes farmer queries and remote pump control commands (e.g., turning on irrigation via SMS/App).

## 3. IoT in Healthcare & Activity Monitoring

### 3.1 Healthcare IoT Layered Architecture
- **Sensing Layer:** Wearable body sensors (ECG, pulse oximeter, blood glucose, temperature).
- **Aggregated Layer:** Uses local smart devices like **smartphones and tablets as data aggregators** to gather readings from wearable body sensors via Bluetooth/BLE and relay them to medical servers.
- **Cloud Platform Layer:** Long-term Electronic Health Record (EHR) storage, doctor portals, and predictive analytics.

### 3.2 Preventive Healthcare
- IoT healthcare shifts medicine from reactive treatment to **preventive care**.
- **Key example:** **Fall detection for senior citizens**, wearable cardiac arrhythmia monitoring, and automatic emergency caregiver dispatch.

### 3.3 Continuous Activity Monitoring
- Collects wearable sensor data over 24/7 time periods.
- **Primary advantage:** Enables **daily observation of human behavior and repetitive activity patterns**, helping detect early signs of mobility loss, sleep disorders, or cognitive decline.

### 3.4 Deep Learning in IoT
- Deep learning architectures (CNNs, RNNs, LSTMs) can process heterogeneous multi-modal IoT data:
  - Time-series sensor data (accelerometer, gyroscope).
  - Medical imagery (X-rays, ultrasound).
  - Continuous video surveillance feeds.

### 3.5 In-Place Processing vs. Cloud Processing
- **In-Place Approach:** Sensor data is processed and classified **directly on the local edge device** (e.g., smartphone or smartwatch).
  - *Advantage:* Operates offline without internet connection, zero transmission latency, enhanced patient data privacy.
  - *Trade-off:* Higher battery consumption and processing load on the wearable device.

### 3.6 Activity Monitoring Demonstration Setup
- **Three basic components:**
  1. A **Smartphone** (generates sensor data).
  2. A **Network** (transmits data packets).
  3. A **Remote Server** (logs and displays activity).
- **Logged Sensor:** Continuous **3-axis Accelerometer values** ($x, y, z$ acceleration forces) are logged to recognize activities such as walking, running, sitting, and standing.

## 4. Week 12 — Key full forms and abbreviations

<div class="table-wrap"><table class="ff-table">
<thead><tr><th>Abbreviation</th><th>Full Form</th></tr></thead>
<tbody>
<tr><td>ANOVA</td><td>Analysis of Variance</td></tr>
<tr><td>BLE</td><td>Bluetooth Low Energy</td></tr>
<tr><td>CNN</td><td>Convolutional Neural Network</td></tr>
<tr><td>ECG</td><td>Electrocardiogram</td></tr>
<tr><td>EHR</td><td>Electronic Health Record</td></tr>
<tr><td>LSTM</td><td>Long Short-Term Memory</td></tr>
<tr><td>PMU</td><td>Power Management Unit</td></tr>
<tr><td>RF</td><td>Radio Frequency</td></tr>
<tr><td>RNN</td><td>Recurrent Neural Network</td></tr>
<tr><td>SMS</td><td>Short Message Service</td></tr>
<tr><td>WSN</td><td>Wireless Sensor Network</td></tr>
</tbody>
</table></div>


week 12 thory concat -----------

Week 12 — Detailed Study Notes
Course: Introduction to Internet of Things (IoT)
Source: Uploaded Week-12(1).pdf
Writing style: Simple and easy English
These notes follow the headings and subtopics present in the supplied PDF. Explanations and small examples are included to make those same topics easier to understand; no separate topics have been added.

Contents
1. Data Handling and Analytics – Part II
2. Case Study: Agriculture
3. Case Study: Healthcare
4. Activity Monitoring – Part 1
1. Data Handling and Analytics – Part II
PDF pages 1–26
1.1 What is Data Analytics?
Data analytics is the process of examining data to understand what it means and to draw useful conclusions from it. Software and specialized systems can help people examine large or complicated datasets.

Data analytics is used to:
- help organizations make better-informed business decisions;
- help researchers check whether a scientific model, theory, or hypothesis is supported by the data; and
- find useful information or patterns in collected data.
Simple example: A shop examines its sales records to identify which products sell most often. The information can help the shop make better decisions about stock.
1.2 Types of Data Analysis
The PDF describes two types of data analysis:
1. Qualitative analysis — studies descriptive or categorical information.
2. Quantitative analysis — studies numerical information.
1.3 Qualitative Analysis
Definition: Qualitative analysis studies information that is described in words, categories, or other non-numerical forms rather than by numerical values alone.
Main points
- Information may be described through text or other descriptive details.
- Data may be collected through interviews, videos, audio recordings, and field notes.
- The collected information must be interpreted.
- Similar information can be grouped into identifiable themes.
The PDF summarizes qualitative analysis with three basic principles:
1. Notice things — observe what is happening in the information.
2. Collect things — gather relevant observations and evidence.
3. Think about things — interpret the collected information and identify themes.
Example: If people are interviewed about a hospital service, comments such as “the waiting time was long” and “the staff were helpful” are descriptive information. The comments can be interpreted and grouped by theme.
1.4 Quantitative Analysis
Definition: Quantitative analysis is the process of analyzing numerical data.

It may use descriptive statistics such as the mean, median, and standard deviation. The PDF lists the following areas associated with quantitative analysis:
- statistical models;
- analysis of variables;
- data dispersion;
- relationships between variables;
- regression analysis;
- statistical significance;
- precision;
- error limits; and
- contingency and correlation.
Example: If a sensor records temperatures every hour, quantitative analysis can be used to examine the recorded numbers and how they change over time.
1.5 Qualitative Data and Quantitative Data: Comparison
Qualitative data	Quantitative data
Data is observed and described.	Data is measured and represented numerically.
Focuses on descriptions and qualities.	Focuses on quantities and amounts.
Examples include colour, smell, and taste.	Examples include volume and weight.


Easy way to remember: Qualitative data tells us what kind; quantitative data tells us how much or how many.
1.6 Advantages of Data Analytics
The PDF identifies these advantages:
1. It can reveal important trends, including trends that are critical to an organization.
2. It can help businesses identify performance problems that need action.
3. Presenting data visually can help people make decisions faster and more effectively.
4. It can improve understanding of potential customers’ habits.
5. It can help a company gain an advantage over competitors.
1.7 Statistical Models
Definition: A statistical model is a mathematical description of relationships between variables. It helps describe how one set of random variables is related to another.

The PDF represents a statistical model as the ordered pair (X, P):
- X represents the set of all possible observations.
- P represents the set of probability distributions on X.
Types of statistical models in the PDF
- Complete model: The number of variables is equal to the number of equations.
- Incomplete model: The number of variables is not equal to the number of equations.
Steps for building a statistical model
1. Data gathering: Collect the relevant data.
2. Descriptive methods: Examine and describe what the collected data shows.
3. Think about predictors: Consider which variables may help explain or predict the result.
4. Build the model: Form the mathematical model using the data and selected variables.
5. Interpret the results: Explain what the model’s results mean.
1.8 Analysis of Variance (ANOVA)
ANOVA means Analysis of Variance. It is a parametric statistical technique used to compare datasets. The PDF notes that it is especially useful when comparing more than two populations or samples.

To perform ANOVA, the data should include:
- a continuous response variable; and
- at least one categorical factor with two or more levels.
The PDF also states that the populations should be approximately normally distributed.
Conditions for ANOVA
1. Independence of cases: Samples should be selected randomly, without a pattern that makes observations dependent on one another.
2. Normality: The data in each group should be approximately normally distributed.
3. Homogeneity: The variances of the groups should be approximately the same.
Types of ANOVA listed in the PDF
- One-way analysis: Uses one factor whose levels are set by the investigator; examples of factors given in the PDF include age and gender.
- Two-way analysis: Considers two factors.
- K-way analysis: Considers k factors.
Terms used with ANOVA
Total Sum of Squares (TSS or SST): The sum of the squared differences between each observation and the overall mean. It describes how much the observations vary around the overall mean.

F-ratio: A ratio used when comparing variation. The PDF notes that the F-ratio is approximately 1 when the null hypothesis is true and tends to be greater than 1 when the null hypothesis is false. Interpretation in an actual analysis depends on the appropriate statistical test and its assumptions.

Degrees of freedom: The number of values that are free to vary in the final calculation of a statistic.
1.9 Data Dispersion
Definition: Data dispersion describes how spread out or different the values in a dataset are. If all values are the same, dispersion is zero; dispersion increases as the values become more varied.

The PDF lists four measures or descriptions of dispersion:
Range
The range is the difference between the maximum and minimum values.

Formula:

Range = Maximum value − Minimum value

Example: For values 3, 5, 7, and 10, the range is 10 − 3 = 7.
Average Absolute Deviation
The average absolute deviation, also called mean absolute deviation in the PDF, is the average of the absolute differences between the data values and the mean. It indicates how far values lie from the mean on average, without allowing positive and negative differences to cancel each other.
Variance
Variance describes the expected squared deviation of a random variable from its mean. In simple terms, it measures spread by looking at squared differences from the average.
Standard Deviation
Standard deviation (SD) measures how much the data values vary or spread out. A smaller standard deviation means the values are generally closer to the mean; a larger one means they are more spread out.
1.10 Contingency and Correlation
Contingency table
A contingency table, also called a cross-tabulation or crosstab, is a table that displays the frequency distribution of variables. It gives a basic picture of how two or more variables are related in the collected data.

Example: A table might show the number of people in different age groups who selected different options in a survey.
Correlation
Correlation is a technique for examining the relationship between two quantitative, continuous variables.

The Pearson correlation coefficient (r) measures the strength of the association between two variables. Correlation can be useful when looking for a relationship that may help with prediction.

Important: A relationship between two variables does not, by itself, prove that one variable causes the other.
1.11 Regression Analysis
Definition: Regression analysis is a statistical process used to estimate relationships among variables.

It focuses on:
- the dependent variable — the result we want to understand or estimate; and
- one or more independent variables — the variables used to explain or estimate the result.
The function used to estimate the dependent variable from the independent variables is called the regression function.

Regression analysis is used for:
- prediction and forecasting;
- understanding how the dependent variable changes with independent variables; and
- identifying which independent variables are related to the result.
Example: The relationship between the number of hours studied and an exam score could be examined using regression analysis. The score is the dependent variable, and study hours is an independent variable in this example.
1.12 Statistical Significance
Definition: Statistical significance helps assess whether an observed difference is likely to reflect a real difference rather than random chance alone.

The PDF identifies two key factors used when determining statistical significance:
- Sample size: The number of observations in an experiment. A larger, properly selected random sample can provide more confidence in the result.
- Effect size: A measure of the size of the difference between groups. The PDF describes it as the standardized mean difference between two groups.
When an experiment is repeated, the effect-size estimates from different studies can be combined to obtain an overall estimate.
1.13 Precision and Error Limits
Precision
Precision describes how close estimates from different samples are to one another. The PDF identifies the standard error as a measure of precision.
- A small standard error means estimates from different samples tend to be close together.
- A large standard error means estimates tend to vary more.
- Precision is inversely related to standard error: as standard error decreases, precision generally increases.
Limits of error and margin of error
The limits of error describe the greatest possible overestimate and underestimate associated with the combined sampling and non-sampling errors.

The PDF gives the relationship:

Limit of error = Critical value × Standard deviation of the statistic

The critical value determines the selected tolerance level for error.
2. Case Study: Agriculture
PDF pages 27–41
2.1 Future of IoT Applications in Agriculture
The PDF lists these possible IoT applications in agriculture:
- soil-moisture and water-level monitoring;
- automated irrigation systems;
- automation in organic-waste recycling and vermicomposting; and
- automated sowing and weeding systems.
These applications use sensors and connected equipment to collect information from farms and support agricultural tasks.
2.2 Smart Water Management Using IoT: AgriSens
AgriSens is presented in the PDF as a smart water-management system using IoT for irrigated crops.
Objectives
The project aims to:
1. obtain more crop yield using less water;
2. help conserve limited water resources;
3. automate the irrigation cycle;
4. adjust irrigation treatment during different stages of a crop’s life; and
5. allow remote monitoring and control.
Proposed architecture
The PDF describes three layers:
1. Sensing and actuating layer: Sensors measure conditions such as soil moisture and water level. Actuators can carry out a control action, such as operating irrigation equipment.
2. Processing, storage, and service layer: Collected information is processed, stored, and made available to other parts of the system.
3. Application layer: Provides the interface or services through which the information can be viewed and the system can be monitored or controlled.
System design
The project includes integrated designs for:
- sensors;
- the sensor node; and
- the remote server.
Sensors
The PDF shows a water-level sensor and an EC-05 soil-moisture sensor. Their purpose is to collect information about water level and the moisture condition of the soil. This information can support irrigation decisions.
Sensor node
The sensor-node diagram in the PDF includes these main functional parts:
- sensor and actuator unit;
- processing and memory unit;
- wireless communication unit; and
- power-management unit.
In simple terms, the node gathers readings, processes or stores data as needed, communicates the information, and manages its power supply.
Remote server design
The PDF identifies three server components:
- Repository data server: Communicates with the IoT gateway deployed in the field using GPRS technology.
- Web server: Allows field data to be accessed remotely.
- Multi-user server: Sends field information to the farmer’s mobile phone using SMS and handles the farmer’s queries and control messages.
Implementation
The implementation material in the PDF includes a field demonstration, a website demonstration, and project details available through the website.
Results shown in the PDF
The results slides show measurements or graphs for:
- average soil moisture;
- average water level; and
- average packet delivery ratio (PDR).
The graph labels divide the crop timeline into vegetative, reproductive, and maturity phases. The PDR slide reports an average range of 98.75–89.75% and identifies possible noise sources such as airflow, temperature, solar radiation, and rain.

What this case study demonstrates: IoT sensors can monitor water-related conditions on a farm, and the readings can be sent through a connected system so field conditions can be viewed remotely and irrigation can be managed more effectively.
3. Case Study: Healthcare
PDF pages 42–61
3.1 Emergence of IoT Healthcare
The PDF explains that improvements in sensors and connectivity support IoT-based healthcare.

They can help to:
- collect patient data over time;
- support preventive care;
- help understand the effects of therapy on a patient; and
- let devices collect information automatically when and where doctors need it.
Automated collection can reduce the risk of manual errors. Fewer errors can improve efficiency and reduce costs.
3.2 Components of IoT Healthcare
The PDF organizes IoT healthcare into four layers.
1. Sensing layer
Contains sensors, RFID devices, and wireless sensor networks (WSNs) that collect information. The PDF gives Google Glass and a Fitbit tracker as examples.
2. Aggregation layer
Combines or gathers data from sensing devices. The PDF gives smartphones and tablets as examples of aggregators.
3. Processing layer
Uses servers to process the information received from the aggregation layer.
4. Cloud platform
Processed information is uploaded to a cloud platform, where it can be accessed by many users.

Basic flow: Sensors collect measurements → an aggregator gathers the data → servers process it → processed data is stored in the cloud for authorized access.
3.3 IoT in Healthcare: Directions
The PDF discusses these directions in the following slides:
Remote healthcare
- Helps people who do not have easy access to effective healthcare.
- Uses wireless IoT solutions to bring healthcare services closer to patients.
- Captures medical data through connected sensors and analyzes it with suitable algorithms.
- Shares the information wirelessly with healthcare professionals so they can give recommendations.
Real-time monitoring
- Uses non-invasive IoT monitoring.
- Sensors collect physiological information.
- Gateways and cloud systems store and analyze the data.
- Information can be sent wirelessly to caregivers.
- This approach can lower healthcare costs.
Preventive care
The PDF lists fall detection for older people, detection of emergency situations, and alerts to family members. It also mentions using machine learning to track health trends and detect unusual patterns early.
3.4 AmbuSens: IoT Healthcare System Use Case
AmbuSens is the healthcare system use case described in the PDF. The slides discuss remote healthcare, patient monitoring, physiological measurements, a wireless body-area network, a cloud framework, and web-based access.
Problem definition and scope
The PDF identifies the following problems and proposed solutions.
Area	Problem described in the PDF	Solution described in the PDF
Telemedicine and remote healthcare	Physical presence is necessary.	Use wireless sensors.
Emergency response time	The system may not be equipped to deal with complications.	Provide instant remote monitoring and feedback from skilled medical professionals.
Real-time patient-status monitoring	Lack of collaboration.	Use real-time monitoring.
Digitized medical history	Records may be inconsistent and physical documents can wear out or be lost.	Use a consistent cloud-based digital record-keeping system.


3.5 AmbuSens Physiological Parameters
The PDF shows these physiological parameters:
- Electrocardiogram (ECG): Records the electrical activity of the heart.
- Heart rate: Indicates how fast the heart is beating.
- Temperature: Measures body temperature.
- Galvanic Skin Response (GSR): Measures changes in the skin’s electrical conductance.
These measurements provide information that can be monitored through the system.
3.6 AmbuSens: Development of WBAN
WBAN means Wireless Body Area Network. The PDF describes a single-hop WBAN and identifies Bluetooth, based on IEEE 802.15.1, as the communication protocol used.

The development tasks listed in the PDF are:
- power management and data-rate tuning;
- calibration of data; and
- filtering and noise removal.
In simple terms, the system must manage battery use, adjust data transmission, make sure readings are properly calibrated, and reduce unwanted noise in the collected data.
3.7 AmbuSens: Development of Cloud Framework
The PDF describes the health-cloud framework as:
- Privacy-aware: Patient information must be handled with privacy in mind.
- Identity-masking: Patient identity is masked. The slide describes hashing and reverse hashing of patient ID.
- Scalable: The architecture is designed to support growth in the amount of data or use of the system.
3.8 AmbuSens: Web Interface
The PDF lists these features of the web interface:
- portals for paramedics and doctors;
- a facility to record medical history and send feedback;
- support for sensor initialization and data streaming; and
- data-visualization tools to help users understand the information.
3.9 AmbuSens System Architecture, Implementation, and Trials
The PDF includes a system-architecture slide and implementation demonstrations covering:
- AmbuSens in a hospital;
- a brief description of the sensors; and
- ambulatory healthcare.
It also shows hospital and ambulatory system trials.
3.10 AmbuSens Results: Comparison of ECG Tracing
The final results slide compares an ECG tracing from a manual system with a real-time ECG tracing from AmbuSens. The purpose of the comparison is to show the ECG information produced by the proposed IoT healthcare system alongside the manual-system tracing.

What this case study demonstrates: IoT healthcare can collect physiological information with connected sensors, send readings for processing and storage, and make the information available remotely to healthcare professionals through a connected system.
4. Activity Monitoring – Part 1
PDF pages 62–71
4.1 Introduction
The PDF explains that wearable sensors are used for different purposes, including:
- medical applications;
- childcare;
- elderly care;
- entertainment; and
- security.
These sensors help monitor the physical activities of people. In IoT systems, activity monitoring can support a better quality of life and help safeguard people. The PDF highlights accurate and reliable information and continuous monitoring.
4.2 Traditional Architecture
The traditional architecture slide illustrates continuous monitoring and an analyzer. In simple terms, information is monitored over time and passed to an analyzer, which examines the collected information.
4.3 Advantages of Activity Monitoring
The PDF lists these advantages:
1. Continuous observation: Monitoring can reveal everyday human behaviour and repetitive activity patterns.
2. Easy integration and fast equipping: Sensors can be integrated into devices and put into use relatively easily.
3. Long-term monitoring: Activities can be tracked over an extended period.
4. Use of handheld-device sensors: Sensors already found in portable devices can be used.
The PDF specifically mentions these handheld-device sensors:
- Accelerometer: Measures acceleration or changes in movement.
- Gyroscope: Measures rotation or angular movement.
- GPS: Provides location information.
- Others: Other available sensors may also be used.
4.4 Important Human Activities
The PDF groups examples into actions and gestures.
- Actions: Running and jumping.
- Gestures: Folding the legs and moving a hand.
Activity-monitoring systems use sensor data to help identify or track these kinds of human movement.
4.5 Types of Sensors
The PDF shows three sources or forms of activity-monitoring equipment:
- Camera
- Smartphone
- Activity tracker band
These devices can gather different kinds of information about a person’s activity.
4.6 Data Analysis Tools
The PDF lists three kinds of analysis approaches for activity monitoring.
Statistical analysis
Uses sensor data and statistical methods to examine collected measurements and identify patterns.
Machine-learning-based analysis
Uses sensor data to learn patterns that can help classify or recognize activities.
Deep-learning-based analysis
The PDF lists images and videos as inputs for deep-learning-based analysis. In this context, the system can analyze visual information to help understand activity.
4.7 Approaches to Activity Monitoring
The PDF identifies two approaches: in-place and network-based.
In-place approach
- Analysis happens on the device itself.
- It can be power-intensive.
- It does not require a network connection for the analysis to take place.
Simple explanation: A device processes the activity information locally instead of needing to send it elsewhere for analysis.
Network-based approach
- Larger and more processing-intensive methods can be applied.
- Group-based analytics are possible.
- Power consumption can be low on the individual device because some processing is carried out elsewhere.
- An average-to-good network connection is required.
Simple explanation: A device sends information over a network to another system for analysis. This can allow more processing, but it depends on a suitable network connection.
End of notes — based on the topics in the uploaded Week 12 PDF.