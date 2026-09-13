export const POPULAR_CITIES = [
  "Indore",
  "Bhopal",
  "Jabalpur",
  "Mumbai",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Delhi",
  "Ujjain",
  "Gwalior",
  "Nagpur",
  "Surat",
  "Bengaluru"
];

export const RECENT_SEARCHES = [
  { from: "Indore", to: "Jabalpur", label: "Indore → Jabalpur", subtitle: "Frequent Route" },
  { from: "Indore", to: "Bhopal", label: "Indore → Bhopal", subtitle: "Express Route" },
  { from: "Indore", to: "Mumbai", label: "Indore → Mumbai", subtitle: "Overnight Sleeper" },
  { from: "Bhopal", to: "Jabalpur", label: "Bhopal → Jabalpur", subtitle: "Central MP Corridor" },
];

export const POPULAR_BOARDING_POINTS = [
  { name: "Teen Imli Square", city: "Indore", terminal: "Teen Imli Square", subtitle: "Board at Indore" },
  { name: "Star Square", city: "Indore", terminal: "Star Square", subtitle: "Board at Indore" },
  { name: "Chhotigwaltoli", city: "Indore", terminal: "Chhotigwaltoli (Head Office)", subtitle: "Board at Indore" },
  { name: "Vijay Nagar", city: "Indore", terminal: "Vijay Nagar Square", subtitle: "Board at Indore" },
  { name: "Sarwate Bus Stand", city: "Indore", terminal: "Sarwate Bus Stand", subtitle: "Board at Indore" },
  { name: "ISBT Habibganj", city: "Bhopal", terminal: "ISBT Habibganj", subtitle: "Board at Bhopal" },
  { name: "ISBT Deendayal Chowk", city: "Jabalpur", terminal: "ISBT Deendayal Chowk", subtitle: "Board at Jabalpur" }
];

export const POPULAR_DROPPING_POINTS = [
  { name: "ISBT Deendayal Chowk", city: "Jabalpur", terminal: "ISBT Deendayal Chowk", subtitle: "Drop at Jabalpur" },
  { name: "Damoh Naka", city: "Jabalpur", terminal: "Damoh Naka Bus Stand", subtitle: "Drop at Jabalpur" },
  { name: "Borivali East", city: "Mumbai", terminal: "National Park, Borivali (E)", subtitle: "Drop at Mumbai" },
  { name: "Wakad Hinjewadi", city: "Pune", terminal: "Wakad Flyover / Hinjewadi", subtitle: "Drop at Pune" },
  { name: "Geeta Mandir", city: "Ahmedabad", terminal: "Geeta Mandir Central Stand", subtitle: "Drop at Ahmedabad" },
  { name: "Lal Ghati", city: "Bhopal", terminal: "Lal Ghati Square", subtitle: "Drop at Bhopal" }
];

export const TRANSIT_HUBS = [
  // Indore Hubs & Boarding Points
  { id: "indore-teenimli", city: "Indore", terminal: "Teen Imli Square", state: "Madhya Pradesh", isPopular: true },
  { id: "indore-starsquare", city: "Indore", terminal: "Star Square", state: "Madhya Pradesh", isPopular: true },
  { id: "indore-chhotigwaltoli", city: "Indore", terminal: "Chhotigwaltoli", state: "Madhya Pradesh", isPopular: true },
  { id: "indore-vijaynagar", city: "Indore", terminal: "Vijay Nagar", state: "Madhya Pradesh", isPopular: true },
  { id: "indore-sarwate", city: "Indore", terminal: "Sarwate Bus Stand", state: "Madhya Pradesh", isPopular: true },
  { id: "indore-naulakha", city: "Indore", terminal: "Naulakha Bus Stand", state: "Madhya Pradesh", isPopular: true },
  { id: "indore-mr10", city: "Indore", terminal: "MR 10 Junction / Radisson Square", state: "Madhya Pradesh", isPopular: true },

  // Bhopal Hubs
  { id: "bhopal-isbt", city: "Bhopal", terminal: "ISBT Habibganj", state: "Madhya Pradesh", isPopular: true },
  { id: "bhopal-lalghati", city: "Bhopal", terminal: "Lal Ghati Square", state: "Madhya Pradesh", isPopular: true },

  // Jabalpur Hubs
  { id: "jabalpur-isbt", city: "Jabalpur", terminal: "ISBT Deendayal Chowk", state: "Madhya Pradesh", isPopular: true },
  { id: "jabalpur-damohnaka", city: "Jabalpur", terminal: "Damoh Naka Bus Stand", state: "Madhya Pradesh", isPopular: false },

  // Mumbai Hubs
  { id: "mumbai-borivali", city: "Mumbai", terminal: "Borivali (E) / National Park", state: "Maharashtra", isPopular: true },
  { id: "mumbai-dadar", city: "Mumbai", terminal: "Dadar (E) / Asiad Bus Stand", state: "Maharashtra", isPopular: true },
  { id: "mumbai-sion", city: "Mumbai", terminal: "Sion Circle / Chunabhatti", state: "Maharashtra", isPopular: true },
  { id: "mumbai-thane", city: "Mumbai", terminal: "Thane Teen Hath Naka", state: "Maharashtra", isPopular: true },

  // Pune Hubs
  { id: "pune-wakad", city: "Pune", terminal: "Wakad / Hinjewadi Flyover", state: "Maharashtra", isPopular: true },
  { id: "pune-swargate", city: "Pune", terminal: "Swargate Bus Stand", state: "Maharashtra", isPopular: true },
  { id: "pune-shivajinagar", city: "Pune", terminal: "Shivaji Nagar", state: "Maharashtra", isPopular: true },
  { id: "pune-station", city: "Pune", terminal: "Pune Railway Station", state: "Maharashtra", isPopular: false },

  // Ahmedabad Hubs
  { id: "ahmedabad-geetamandir", city: "Ahmedabad", terminal: "Geeta Mandir Central Bus Stand", state: "Gujarat", isPopular: true },
  { id: "ahmedabad-ctm", city: "Ahmedabad", terminal: "CTM Char Rasta Express Toll", state: "Gujarat", isPopular: true },

  // Ujjain Hubs
  { id: "ujjain-dewasgate", city: "Ujjain", terminal: "Dewas Gate Bus Stand", state: "Madhya Pradesh", isPopular: true },
  { id: "ujjain-freeganj", city: "Ujjain", terminal: "Freeganj Tower Chowk", state: "Madhya Pradesh", isPopular: false },

  // Nagpur Hubs
  { id: "nagpur-busstand", city: "Nagpur", terminal: "Central Bus Stand", state: "Maharashtra", isPopular: true },
  { id: "nagpur-ganeshpeth", city: "Nagpur", terminal: "Ganeshpeth Bus Stand", state: "Maharashtra", isPopular: true },

  // Jalgaon, Akola, Dhule, Vadodara, Surat
  { id: "jalgaon-central", city: "Jalgaon", terminal: "Old Bus Stand / Akashwani Chowk", state: "Maharashtra", isPopular: false },
  { id: "akola-central", city: "Akola", terminal: "Nimwadi / Ramlata Complex", state: "Maharashtra", isPopular: false },
  { id: "dhule-central", city: "Dhule", terminal: "Dhule Bypass / Jhansi Rani Chowk", state: "Maharashtra", isPopular: false },
  { id: "vadodara-central", city: "Vadodara", terminal: "Central Bus Stand / Amit Nagar Circle", state: "Gujarat", isPopular: true },
  { id: "surat-central", city: "Surat", terminal: "Kamrej Char Rasta / Sahara Darwaja", state: "Gujarat", isPopular: true },

  // Regional Capital Hubs
  { id: "jaipur-sindhicamp", city: "Jaipur", terminal: "Sindhi Camp / 200 Ft Bypass", state: "Rajasthan", isPopular: true },
  { id: "delhi-isbt", city: "Delhi", terminal: "Kashmere Gate ISBT / Dhaula Kuan", state: "Delhi NCR", isPopular: true },
  { id: "gwalior-central", city: "Gwalior", terminal: "Jhansi Road Bus Stand", state: "Madhya Pradesh", isPopular: false }
];

export const CITY_TERMINALS = TRANSIT_HUBS;

export const POPULAR_ROUTES = [
  {
    id: "route-1",
    from: "Indore",
    to: "Mumbai",
    distance: "585 km",
    duration: "10h 30m",
    price: "₹1,450",
    frequency: "14 Buses Daily",
    busType: "BharatBenz / Volvo Multi-Axle AC Sleeper",
    departureTimes: ["18:30", "19:45", "21:00", "22:15"]
  },
  {
    id: "route-2",
    from: "Indore",
    to: "Pune",
    distance: "590 km",
    duration: "11h 15m",
    price: "₹1,500",
    frequency: "12 Buses Daily",
    busType: "Volvo 9600 Multi-Axle AC Sleeper",
    departureTimes: ["19:00", "20:30", "21:45"]
  },
  {
    id: "route-3",
    from: "Bhopal",
    to: "Ahmedabad",
    distance: "592 km",
    duration: "10h 45m",
    price: "₹1,350",
    frequency: "8 Buses Daily",
    busType: "Mercedes-Benz Luxury Sleeper (2+1)",
    departureTimes: ["19:30", "20:45", "22:00"]
  },
  {
    id: "route-4",
    from: "Delhi",
    to: "Jaipur",
    distance: "280 km",
    duration: "5h 15m",
    price: "₹750",
    frequency: "18 Buses Daily",
    busType: "Volvo Executive Semi-Sleeper AC",
    departureTimes: ["06:00", "09:30", "14:00", "18:00", "23:00"]
  },
  {
    id: "route-5",
    from: "Indore",
    to: "Ahmedabad",
    distance: "390 km",
    duration: "7h 30m",
    price: "₹950",
    frequency: "16 Buses Daily",
    busType: "Scania Metrolink Multi-Axle Sleeper",
    departureTimes: ["21:15", "22:30", "23:45"]
  },
  {
    id: "route-6",
    from: "Indore",
    to: "Gwalior",
    distance: "495 km",
    duration: "9h 00m",
    price: "₹1,100",
    frequency: "6 Buses Daily",
    busType: "BharatBenz Luxury AC Sleeper",
    departureTimes: ["20:00", "21:30"]
  }
];

export const MOCK_BUSES = [
  {
    id: "hans-101",
    name: "Hans Premium Sleeper Express",
    operator: "Hans Travels",
    busType: "Volvo 9600 Multi-Axle AC Sleeper (2+1)",
    departureTime: "20:00",
    arrivalTime: "06:30",
    duration: "10h 30m",
    timeSlot: "night",
    rating: "4.9",
    reviewsCount: 428,
    price: 1450,
    seatsAvailable: 14,
    hasAC: true,
    isSleeper: true,
    isSeater: false,
    hasSingleSeats: true,
    isPrimo: true,
    liveTracking: true,
    freeCancellation: true,
    amenities: ["Water Bottle", "Blanket & Pillow", "Fast USB Charging", "GPS Live Tracking", "Reading Light", "Air Suspension"],
    boardingPoints: [
      { location: "Hans Travels Navlakha Square, Indore", time: "20:00" },
      { location: "Pipliyahana Junction, Indore", time: "20:25" },
      { location: "Bypass Radisson Blu Square, Indore", time: "20:50" }
    ],
    droppingPoints: [
      { location: "ISBT Deendayal Chowk, Jabalpur", time: "06:00" },
      { location: "Damoh Naka Bus Stand, Jabalpur", time: "06:30" }
    ]
  },
  {
    id: "hans-102",
    name: "Hans Royal Club Mercedes Sleeper",
    operator: "Hans Travels",
    busType: "Mercedes-Benz 2436 Luxury Sleeper (2+1)",
    departureTime: "21:15",
    arrivalTime: "07:30",
    duration: "10h 15m",
    timeSlot: "night",
    rating: "4.8",
    reviewsCount: 312,
    price: 1650,
    seatsAvailable: 9,
    hasAC: true,
    isSleeper: true,
    isSeater: false,
    hasSingleSeats: true,
    isPrimo: true,
    liveTracking: true,
    freeCancellation: true,
    amenities: ["Mineral Water", "Fresh Linen & Duvet", "65W Type-C Charging", "SOS Emergency Alert", "Individual AC Control"],
    boardingPoints: [
      { location: "Hans Head Office, Chhoti Gwaltoli, Indore", time: "21:15" },
      { location: "Rajiv Gandhi Circle, Indore", time: "21:40" }
    ],
    droppingPoints: [
      { location: "ISBT Deendayal Chowk, Jabalpur", time: "07:15" },
      { location: "Russell Chowk, Jabalpur", time: "07:30" }
    ]
  },
  {
    id: "hans-103",
    name: "Maa Sharda Bus Service (by Hans)",
    operator: "Maa Sharda & Hans",
    busType: "BharatBenz Luxury AC Sleeper (2+1)",
    departureTime: "06:30",
    arrivalTime: "15:30",
    duration: "09h 00m",
    timeSlot: "morning",
    rating: "4.8",
    reviewsCount: 264,
    price: 1150,
    seatsAvailable: 19,
    hasAC: true,
    isSleeper: true,
    isSeater: false,
    hasSingleSeats: true,
    isPrimo: true,
    liveTracking: true,
    freeCancellation: true,
    amenities: ["Water Bottle", "Blanket & Pillow", "GPS Tracking", "Devotional Audio / Video"],
    boardingPoints: [
      { location: "Teen Imli Square, Indore", time: "06:30" },
      { location: "Star Square, Indore", time: "06:55" }
    ],
    droppingPoints: [
      { location: "ISBT Deendayal Chowk, Jabalpur", time: "15:15" },
      { location: "Damoh Naka, Jabalpur", time: "15:30" }
    ]
  },
  {
    id: "hans-104",
    name: "Hans Smart Intercity Seater",
    operator: "Hans Travels",
    busType: "Volvo B11R Executive AC Seater (2+2)",
    departureTime: "08:15",
    arrivalTime: "16:45",
    duration: "08h 30m",
    timeSlot: "morning",
    rating: "4.6",
    reviewsCount: 178,
    price: 850,
    seatsAvailable: 26,
    hasAC: true,
    isSleeper: false,
    isSeater: true,
    hasSingleSeats: false,
    isPrimo: false,
    liveTracking: true,
    freeCancellation: false,
    amenities: ["Water Bottle", "Fast USB Charging", "Reclining Leather Seats", "CCTV Surveillance"],
    boardingPoints: [
      { location: "Sarwate Bus Stand, Indore", time: "08:15" },
      { location: "Vijay Nagar Square, Indore", time: "08:45" }
    ],
    droppingPoints: [
      { location: "ISBT Deendayal Chowk, Jabalpur", time: "16:30" },
      { location: "Madan Mahal Station, Jabalpur", time: "16:45" }
    ]
  },
  {
    id: "hans-105",
    name: "Hans Comfort Express",
    operator: "Hans Travels",
    busType: "Tata Ultra Air Suspension Sleeper / Seater",
    departureTime: "14:00",
    arrivalTime: "23:15",
    duration: "09h 15m",
    timeSlot: "afternoon",
    rating: "4.5",
    reviewsCount: 142,
    price: 750,
    seatsAvailable: 22,
    hasAC: false,
    isSleeper: true,
    isSeater: true,
    hasSingleSeats: false,
    isPrimo: false,
    liveTracking: true,
    freeCancellation: false,
    amenities: ["Water Bottle", "Reading Light", "Spacious Luggage Rack"],
    boardingPoints: [
      { location: "Teen Imli Bus Station, Indore", time: "14:00" },
      { location: "Bypass Junction, Indore", time: "14:30" }
    ],
    droppingPoints: [
      { location: "Damoh Naka, Jabalpur", time: "23:00" },
      { location: "ISBT Chowk, Jabalpur", time: "23:15" }
    ]
  },
  {
    id: "hans-106",
    name: "Hans Diamond Club Volvo 9600",
    operator: "Hans Travels",
    busType: "Volvo 9600 Ultra AC Sleeper (2+1)",
    departureTime: "22:45",
    arrivalTime: "08:30",
    duration: "09h 45m",
    timeSlot: "night",
    rating: "4.9",
    reviewsCount: 540,
    price: 1750,
    seatsAvailable: 7,
    hasAC: true,
    isSleeper: true,
    isSeater: false,
    hasSingleSeats: true,
    isPrimo: true,
    liveTracking: true,
    freeCancellation: true,
    amenities: ["Mineral Water", "Premium Linen", "Type-C Charging", "Snack Hamper", "Live GPS"],
    boardingPoints: [
      { location: "Hans Head Office, Chhotigwaltoli, Indore", time: "22:45" },
      { location: "Vijay Nagar Square, Indore", time: "23:10" }
    ],
    droppingPoints: [
      { location: "ISBT Deendayal Chowk, Jabalpur", time: "08:15" },
      { location: "Damoh Naka, Jabalpur", time: "08:30" }
    ]
  },
  {
    id: "hans-107",
    name: "Hans Starline Mercedes Sleeper",
    operator: "Hans Travels",
    busType: "Mercedes-Benz Luxury Sleeper AC (2+1)",
    departureTime: "17:30",
    arrivalTime: "03:15",
    duration: "09h 45m",
    timeSlot: "afternoon",
    rating: "4.7",
    reviewsCount: 220,
    price: 1350,
    seatsAvailable: 15,
    hasAC: true,
    isSleeper: true,
    isSeater: false,
    hasSingleSeats: true,
    isPrimo: true,
    liveTracking: true,
    freeCancellation: true,
    amenities: ["Water Bottle", "Blanket & Pillow", "USB Charging", "GPS Tracking"],
    boardingPoints: [
      { location: "Teen Imli Square, Indore", time: "17:30" },
      { location: "Radisson Square, Indore", time: "18:00" }
    ],
    droppingPoints: [
      { location: "ISBT Deendayal Chowk, Jabalpur", time: "03:15" }
    ]
  }
];

export const FLEET_DETAILS = [
  {
    id: "fleet-1",
    title: "Volvo 9600 Multi-Axle Sleeper",
    category: "Flagship Sleeper",
    specs: "15-Meter Luxury Chassis | 380 HP D8K Engine",
    image: "/assets/bus-hero.jpg",
    features: ["Silent Cabin Technology", "Individual 12-inch FHD Displays", "Ergonomic Memory Foam Berths", "Dynamic Air Suspension"]
  },
  {
    id: "fleet-2",
    title: "Executive Private Sleeper Suite",
    category: "Interior Comfort",
    specs: "Full Privacy Curtains | Hotel-Grade Linen",
    image: "/assets/bus-interior.jpg",
    features: ["Crisp Sanitized Blankets & Pillows", "USB-A & 45W Type-C Fast Chargers", "Individual Directional Reading LED", "Adjustable Chilled AC Louvers"]
  },
  {
    id: "fleet-3",
    title: "Mercedes-Benz 2436 Luxury Coach",
    category: "Inter-City Express",
    specs: "German Engineering | Dual Braking Safety",
    image: "/assets/bus-mint.jpg",
    features: ["Electronic Stability Program (ESP)", "Zero Jerk Comfort System", "Generous Overhead Stowage", "Punctual High-Speed Corridors"]
  },
  {
    id: "fleet-4",
    title: "BharatBenz Glider Air-Suspension",
    category: "Long-Haul Transit",
    specs: "Heavy Commercial Monocoque Body | Anti-Roll Bars",
    image: "/assets/bus-blue.jpg",
    features: ["Panoramic UV-Cut Tinted Windows", "Driver Fatigue Monitoring", "Fire Detection & Suppression (FDSS)", "24x7 Control Room Telematics"]
  }
];

export const JOB_CATEGORIES = [
  {
    id: "fleet-ops",
    title: "Fleet Operations",
    icon: "Truck",
    description: "Operate India's finest bus fleet with highest safety standards.",
    roles: [
      { name: "Heavy Passenger Vehicle Captain (Driver)", type: "Full-Time", location: "Indore / Mumbai / Ahmedabad / Delhi", isDriver: true },
      { name: "Senior Route Dispatcher", type: "Full-Time", location: "Central Hub Indore", isDriver: false },
      { name: "Terminal Operations Supervisor", type: "Full-Time", location: "Bhopal / Pune", isDriver: false }
    ]
  },
  {
    id: "maintenance",
    title: "Maintenance & Engineering",
    icon: "Wrench",
    description: "Ensure zero-breakdown reliability across Volvo, Mercedes & BharatBenz coaches.",
    roles: [
      { name: "Chief Diagnostic Technician (Volvo/Mercedes)", type: "Full-Time", location: "Indore Central Workshop", isDriver: false },
      { name: "Automotive Electrical & AC Specialist", type: "Full-Time", location: "Ahmedabad Workshop", isDriver: false },
      { name: "Fleet Preventive Inspection Officer", type: "Full-Time", location: "Mumbai Terminal Depot", isDriver: false }
    ]
  },
  {
    id: "customer-exp",
    title: "Customer Experience",
    icon: "Headphones",
    description: "Deliver a seamless, warm, and helpful travel journey to 5,000+ daily riders.",
    roles: [
      { name: "Passenger Relations Officer (Boarding Points)", type: "Full-Time", location: "Major Boarding Lounges", isDriver: false },
      { name: "24x7 Command Center Support Agent", type: "Full-Time / Shifts", location: "Indore HQ", isDriver: false },
      { name: "Quality & Passenger Feedback Lead", type: "Full-Time", location: "Indore HQ", isDriver: false }
    ]
  },
  {
    id: "corporate",
    title: "Corporate & Technology",
    icon: "Building2",
    description: "Innovate transport logistics, revenue optimization, and digital ticketing.",
    roles: [
      { name: "Logistics & Route Optimization Analyst", type: "Full-Time", location: "Indore HQ", isDriver: false },
      { name: "Ticketing & Enterprise Partner Manager", type: "Full-Time", location: "Mumbai Corporate Office", isDriver: false },
      { name: "Full Stack Web Developer (Transit Tech)", type: "Full-Time / Remote", location: "Indore / Remote", isDriver: false }
    ]
  }
];
