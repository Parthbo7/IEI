/**
 * Configurable metadata for the Futuristic City Hackathon.
 * Organizer: IEI Student Chapter, Information Technology Department, MGM's College of Engineering, Nanded, Maharashtra, India.
 * Theme: Futuristic Cities and Smart Urban Innovation.
 */

export interface HackathonConfig {
  eventName: string;
  tagline: string;
  organizer: {
    chapter: string;
    department: string;
    institution: string;
    location: string;
    stateCountry: string;
    shortLocation: string;
  };
  eventDates: {
    display: string;
    duration: string;
    startDate: string;
    endDate: string;
    status: 'Upcoming' | 'Registrations Open' | 'Live' | 'Completed';
  };
  theme: {
    title: string;
    description: string;
    focus: string[];
  };
  prizes: {
    poolDisplay: string;
    distributionStatus: string;
    breakdown: { rank: string; amount: string; perks: string }[];
  };
  registration: {
    link: string;
    portalStatus: string;
    deadline: string;
    teamSize: string;
    fee: string;
  };
  tracks: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    metric: string;
    description: string;
    challenges: string[];
    status?: string;
  }[];
  schedule: {
    day: string;
    title: string;
    status: string;
    items: { time: string; event: string; detail: string }[];
  }[];
  sponsorsPartners: {
    type: string;
    name: string;
    status: string;
  }[];
  contact: {
    email: string;
    helpline: string;
    contactPersons: string;
    website: string;
  };
}

export const HACKATHON_CONFIG: HackathonConfig = {
  eventName: "SMART CITY INNOVATION HACKATHON 2026",
  tagline: "Engineering Next-Gen Urban Intelligence & Municipal Solutions",
  organizer: {
    chapter: "IEI (The Institution of Engineers India) Student Chapter",
    department: "Department of Information Technology",
    institution: "MGM's College of Engineering",
    location: "Nanded, Maharashtra",
    stateCountry: "Maharashtra, India",
    shortLocation: "MGM COE, Nanded"
  },
  eventDates: {
    display: "3 – 4 December 2026",
    duration: "24 Hours",
    startDate: "2026-12-03",
    endDate: "2026-12-04",
    status: "Registrations Open"
  },
  theme: {
    title: "Futuristic Cities and Smart Urban Innovation",
    description: "Empowering young engineering innovators to conceptualize, prototype, and deploy high-impact computational solutions for smart urban governance, renewable energy distribution, autonomous transit, and civic resource resilience.",
    focus: [
      "Smart Mobility & Adaptive Traffic Routing",
      "Decentralized Renewable Grids & Green Infrastructure",
      "Automated Municipal Solid Waste & Water Reclamation",
      "Urban Sensor Telemetry & Crisis Early-Warning Systems",
      "Citizen-Centric Digital Public Infrastructure"
    ]
  },
  prizes: {
    poolDisplay: "COMING SOON",
    distributionStatus: "COMING SOON",
    breakdown: [
      { rank: "Champion (1st Place)", amount: "COMING SOON", perks: "Category award distribution: COMING SOON" },
      { rank: "1st Runner Up (2nd Place)", amount: "COMING SOON", perks: "Category award distribution: COMING SOON" },
      { rank: "2nd Runner Up (3rd Place)", amount: "COMING SOON", perks: "Category award distribution: COMING SOON" },
      { rank: "Special Track Awards", amount: "COMING SOON", perks: "Municipal innovation category awards: COMING SOON" }
    ]
  },
  registration: {
    link: "#",
    portalStatus: "COMING SOON",
    deadline: "COMING SOON",
    teamSize: "2 – 4 Members",
    fee: "₹600"
  },
  tracks: [
    {
      id: "track-energy",
      title: "Smart Energy Grid & Eco-Infrastructure",
      subtitle: "Decentralized Green Grids & Carbon Auditing",
      icon: "Zap",
      metric: "Track 01",
      description: "Design AI-orchestrated microgrid load-balancing, distributed solar-battery storage telemetry, and smart campus consumption monitors to slash municipal transmission loss.",
      status: "COMING SOON",
      challenges: [
        "Problem statements & challenge datasets: COMING SOON",
        "Technical guidelines & evaluation rubric: COMING SOON"
      ]
    },
    {
      id: "track-mobility",
      title: "Autonomous Transit & Dynamic Traffic",
      subtitle: "Congestion Elimination & Multi-modal Routing",
      icon: "Navigation",
      metric: "Track 02",
      description: "Build computer-vision traffic flow regulation, green corridor prioritization for first responders, and EV fleet autonomous charging allocation.",
      status: "COMING SOON",
      challenges: [
        "Problem statements & challenge datasets: COMING SOON",
        "Technical guidelines & evaluation rubric: COMING SOON"
      ]
    },
    {
      id: "track-civic",
      title: "Civic Intelligence & Urban Waste Recycling",
      subtitle: "AI Sorting, Water Networks & Citizen Grievance",
      icon: "Activity",
      metric: "Track 03",
      description: "Develop automated waste segregation sensor networks, leak detection along municipal aqueducts, and automated geotagged grievance dispatch.",
      status: "COMING SOON",
      challenges: [
        "Problem statements & challenge datasets: COMING SOON",
        "Technical guidelines & evaluation rubric: COMING SOON"
      ]
    },
    {
      id: "track-resilience",
      title: "Disaster Resilience & Sensor Telemetry",
      subtitle: "Early Warning & Real-Time Emergency Dispatch",
      icon: "ShieldAlert",
      metric: "Track 04",
      description: "Architect high-reliability sensor mesh networks for flood/heatwave early warnings, automated fire alert relays, and structural health monitoring.",
      status: "COMING SOON",
      challenges: [
        "Problem statements & challenge datasets: COMING SOON",
        "Technical guidelines & evaluation rubric: COMING SOON"
      ]
    }
  ],
  schedule: [
    {
      day: "Day 1 — Thursday, 03 Dec 2026",
      title: "Hackathon Inception & Sprint Kickoff",
      status: "COMING SOON",
      items: [
        { time: "Morning", event: "Reporting & Desk Check-in", detail: "Detailed hourly schedule & activity timings: COMING SOON" },
        { time: "Sprint Kickoff", event: "24-Hour Hackathon Begins", detail: "Detailed timeline & checkpoints: COMING SOON" },
        { time: "Checkpoint", event: "Mentorship & Progress Review", detail: "Detailed activity timings: COMING SOON" }
      ]
    },
    {
      day: "Day 2 — Friday, 04 Dec 2026",
      title: "Final Development, Evaluation & Valedictory",
      status: "COMING SOON",
      items: [
        { time: "Final Hours", event: "Submission & Code Freeze", detail: "Submission deadlines: COMING SOON" },
        { time: "Grand Finale", event: "Jury Evaluation & Demos", detail: "Jury panel & demo slots: COMING SOON" },
        { time: "Valedictory", event: "Valedictory & Prize Distribution", detail: "Detailed timings: COMING SOON" }
      ]
    }
  ],
  sponsorsPartners: [
    { type: "Organizing Body", name: "IEI Student Chapter, IT Department", status: "Confirmed" },
    { type: "Host Institution", name: "MGM's College of Engineering, Nanded", status: "Confirmed" },
    { type: "Municipal Knowledge Partner", name: "Nanded-Waghala City Municipal Corporation (NWCMC)", status: "Confirmed" },
    { type: "Sponsors & Industry Partners", name: "Partner Announcements", status: "COMING SOON" },
    { type: "Judges, Mentors & Speakers", name: "Distinguished Panel", status: "COMING SOON" }
  ],
  contact: {
    email: "iei.it@mgmcen.ac.in",
    helpline: "COMING SOON",
    contactPersons: "COMING SOON",
    website: "https://mgmcen.ac.in"
  }
};
