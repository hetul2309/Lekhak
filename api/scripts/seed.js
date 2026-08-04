import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import BlogLike from "../models/bloglike.model.js";
import Follow from "../models/follow.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGODB_CONN = process.env.MONGODB_CONN;

if (!MONGODB_CONN) {
  console.error("❌ MONGODB_CONN is missing in api/.env!");
  process.exit(1);
}

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

// ----------------------------------------------------
// 14 DIVERSE CATEGORIES
// ----------------------------------------------------

const categoriesData = [
  { name: "Gujarat & Culture" },
  { name: "Current Affairs" },
  { name: "Technology & AI" },
  { name: "Politics & Governance" },
  { name: "Education & Learning" },
  { name: "Science & Space" },
  { name: "Travel & Heritage" },
  { name: "Business & Startups" },
  { name: "Food & Culinary" },
  { name: "Lifestyle & Wellness" },
  { name: "Environment & Climate" },
  { name: "Sports & Athletics" },
  { name: "Entertainment & Cinema" },
  { name: "Finance & Markets" },
];

const usersData = [
  {
    name: "Hetul Kadiya",
    username: "hetul_kadiya",
    email: "hetulkadiya@gmail.com",
    bio: "Full-stack developer and tech writer based in Ahmedabad, Gujarat. Passionate about AI & open source.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Aarav Patel",
    username: "aarav_patel",
    email: "aarav.patel@example.com",
    bio: "Financial analyst & enthusiast exploring GIFT City and India's economic growth story.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Priya Sharma",
    username: "priya_sharma",
    email: "priya.sharma@example.com",
    bio: "Journalist covering Indian current affairs, space exploration, and policy shifts.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Devang Shah",
    username: "devang_shah",
    email: "devang.shah@example.com",
    bio: "Heritage lover and photographer documenting Gujarat’s historical monuments and Rann of Kutch.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Meera Mehta",
    username: "meera_mehta",
    email: "meera.mehta@example.com",
    bio: "Food blogger celebrating authentic Gujarati Farsan, Kathiyawadi thalis, and global fusion recipes.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rohan Verma",
    username: "rohan_verma",
    email: "rohan.verma@example.com",
    bio: "Software engineer writing about web dev, cloud computing, and Indian IT innovations.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Kavya Trivedi",
    username: "kavya_trivedi",
    email: "kavya.trivedi@example.com",
    bio: "Cultural researcher passionate about Garba, folk arts, and Indian architectural marvels.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Ananya Joshi",
    username: "ananya_joshi",
    email: "ananya.joshi@example.com",
    bio: "Startup mentor tracking India's unicorn ecosystem, fintech revolution, and D2C brands.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Siddharth Dave",
    username: "siddharth_dave",
    email: "siddharth.dave@example.com",
    bio: "Wildlife enthusiast focused on Gir Asiatic Lions, Velavadar Blackbuck Park, and biodiversity.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Pooja Vora",
    username: "pooja_vora",
    email: "pooja.vora@example.com",
    bio: "Digital strategist writing on social media trends, branding, and content creation in India.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Parth Solanki",
    username: "parth_solanki",
    email: "parth.solanki@example.com",
    bio: "Clean energy advocate writing about Khavda Renewable Park and India's solar mission.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Neha Sanghvi",
    username: "neha_sanghvi",
    email: "neha.sanghvi@example.com",
    bio: "Architect & interior designer sharing insights on sustainable urban development in Gujarat.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Jayesh Vyas",
    username: "jayesh_vyas",
    email: "jayesh.vyas@example.com",
    bio: "Educator & historian exploring ancient Harappan civilisations like Dholavira & Lothal.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dhriti Desai",
    username: "dhriti_desai",
    email: "dhriti.desai@example.com",
    bio: "Wellness coach sharing yoga techniques, mindful living, and holistic Indian health.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rushi Bhatt",
    username: "rushi_bhatt",
    email: "rushi.bhatt@example.com",
    bio: "Semiconductor engineer exploring Sanand's tech hub and India’s chip manufacturing future.",
    avatar: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Tanvi Raval",
    username: "tanvi_raval",
    email: "tanvi.raval@example.com",
    bio: "Travel blogger documenting hidden gems of Saurashtra, Saputara, and Diu coastal lines.",
    avatar: "https://images.unsplash.com/photo-1534751516642-a171e2616676?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Vikram Singhania",
    username: "vikram_singh",
    email: "vikram.singh@example.com",
    bio: "Policy analyst discussing UPI global expansion, G20 outcomes, and Indian diplomacy.",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Ishita Merchant",
    username: "ishita_merchant",
    email: "ishita.merchant@example.com",
    bio: "Textile designer exploring Patola silk of Patan, Bandhani, and traditional Gujarati weaves.",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Chirag Jani",
    username: "chirag_jani",
    email: "chirag.jani@example.com",
    bio: "Data scientist writing about AI tools, LLM fine-tuning, and Indic language models.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Bhavya Thakar",
    username: "bhavya_thakar",
    email: "bhavya.thakar@example.com",
    bio: "Astronomy advocate covering ISRO Gaganyaan mission and space observatories in India.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Komal Panchal",
    username: "komal_panchal",
    email: "komal.panchal@example.com",
    bio: "Mobile app developer sharing React, Flutter, and UI/UX design frameworks.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Hardik Vaghela",
    username: "hardik_vaghela",
    email: "hardik.vaghela@example.com",
    bio: "Automotive journalist testing EV adoption in India, Tata Motors, and green mobility.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Riya Kapoor",
    username: "riya_kapoor",
    email: "riya.kapoor@example.com",
    bio: "Lifestyle editor writing on sustainable fashion, Indian handicrafts, and eco-homes.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Jatin Trivedi",
    username: "jatin_trivedi",
    email: "jatin.trivedi@example.com",
    bio: "Cybersecurity analyst sharing tips on online privacy, phishing prevention, and data safety.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Kinjal Modi",
    username: "kinjal_modi",
    email: "kinjal.modi@example.com",
    bio: "Product manager & storyteller sharing career advice, leadership lessons, and remote work tips.",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
  },
];

// Generates 65+ articles with MULTIPLE categories per post
const generateBlogsData = () => [
  // --- GUJARAT & CULTURE + TRAVEL ---
  {
    title: "Vibrant Navratri & Garba: UNESCO Intangible Cultural Heritage of Gujarat",
    catNames: ["Gujarat & Culture", "Travel & Heritage", "Entertainment & Cinema"],
    featuredImage: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1200&q=80",
    description: "Explore the rhythmic joy of Garba during Navratri in Gujarat, recently honored as a UNESCO Intangible Cultural Heritage asset.",
    blogContent: `<p>Navratri in Gujarat is not just a festival; it is a grand nine-night celebration of music, rhythm, devotion, and community unity. Every year, millions across Ahmedabad, Vadodara, and Rajkot gather in traditional Chaniya Cholis and Kediyas to perform Garba until late night.</p><h2>The UNESCO Recognition</h2><p>In December 2023, UNESCO inscribed Garba of Gujarat on the Representative List of the Intangible Cultural Heritage of Humanity. This recognition celebrates the dance as an inclusive, ritualistic art form that brings people of all ages and backgrounds together.</p><h3>Key Cultural Highlights</h3><ul><li><strong>Traditional Music:</strong> Live Dhol rhythms combined with soulful Gujarati folk vocals.</li><li><strong>Vadodara United Way:</strong> Renowned as one of the world's largest gathering of Garba dancers.</li><li><strong>Economic & Artisanal Boost:</strong> Local textile weavers of Patan, Kutch, and Surat see peak demand during the festival season.</li></ul><p>Garba is a living symbol of Gujarat's vibrant heritage, harmony, and creative spirit that inspires the world.</p>`,
  },
  {
    title: "Statue of Unity: World's Tallest Monument Transforming Narmada Valley",
    catNames: ["Gujarat & Culture", "Travel & Heritage", "Environment & Climate"],
    featuredImage: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
    description: "How the 182-meter tall statue of Sardar Vallabhbhai Patel became a premier global tourism and ecological hub in Ekta Nagar.",
    blogContent: `<p>Standing tall at 182 meters overlooking the Narmada River, the Statue of Unity in Ekta Nagar (Kevadia) stands as a monument to India's Iron Man, Sardar Vallabhbhai Patel.</p><h2>A Catalyst for Regional Development</h2><p>Beyond being an engineering marvel built with high-grade steel and bronze cladding, the site has reshaped the local economy of Narmada district, creating thousands of jobs for local tribal communities.</p><h3>Attractions at Ekta Nagar</h3><ul><li><strong>Jungle Safari & Zoo:</strong> A state-of-the-art zoo featuring wildlife from across the world.</li><li><strong>Valley of Flowers:</strong> Over 100 species of vibrant flora lining the banks of the Narmada.</li><li><strong>Glow Garden & Cactus Garden:</strong> Nighttime illuminated installations and botanical conservation.</li><li><strong>Electric Mobility Hub:</strong> Ekta Nagar is India's first 100% electric vehicle tourism zone.</li></ul>`,
  },
  {
    title: "The Legacy of Patan Patola: The Master Weavers of Double Ikat Silk",
    catNames: ["Gujarat & Culture", "Fashion & Lifestyle", "Travel & Heritage"],
    featuredImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    description: "Discover the 900-year-old intricate art of Double Ikat Patola weaving preserved by master Salvi families in Patan.",
    blogContent: `<p>Patan Patola is widely regarded as one of the finest textile weaving traditions in human history. Crafting a single Patola saree can take up to six months to a year due to the painstaking Double Ikat process.</p><h2>Precision in Every Thread</h2><p>In Double Ikat weaving, both warp and weft threads are tie-dyed with exact natural colors before being placed on the loom. If a single thread aligns incorrectly, the geometrical motif distorts.</p><p>Today, the Salvi family at Patan continues to preserve this heritage, ensuring that Patola remains a prized masterpiece of Indian textile craftsmanship.</p>`,
  },
  {
    title: "Rann of Kutch Utsav: Celebrating the White Desert Under the Full Moon",
    catNames: ["Travel & Heritage", "Gujarat & Culture", "Entertainment & Cinema"],
    featuredImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "A magical travel guide to Dhordo tent city, moonlit salt plains, Kutchi handicraft villages, and Rogan art.",
    blogContent: `<p>Every winter, the vast salt marshes of the Great Rann of Kutch transform into a shimmering white wonderland. The annual Rann Utsav brings tent cities, folk performances, and artisanal markets to Dhordo village.</p><h2>Highlights of the White Desert</h2><p>Standing on the white salt flats during a full moon night is an unforgettable experience. The moonlight reflects off the salt crystals creating a surreal horizon.</p><ul><li><strong>Nirona Village:</strong> Famous for rare Rogan Painting (oil-based cloth art) and copper bell crafting.</li><li><strong>Kalo Dungar (Black Hill):</strong> Highest point in Kutch offering panoramic views of the salt desert.</li><li><strong>Kutchi Cuisine:</strong> Enjoy hot Bajra no Rotlo, Ringan no Oro, and fresh white butter in traditional Bhungas.</li></ul>`,
  },
  {
    title: "Gir National Park: Safeguarding the World's Only Asiatic Lion Habitat",
    catNames: ["Environment & Climate", "Travel & Heritage", "Gujarat & Culture"],
    featuredImage: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80",
    description: "Inside the successful conservation story of Gujarat's Maldhari tribes and forest guards saving Panthera leo persica.",
    blogContent: `<p>Gir National Park in Junagadh district is the last remaining natural refuge for the majestic Asiatic Lion. Thanks to dedicated conservation efforts over decades, the lion population has grown from fewer than 20 in the early 20th century to over 670 today.</p><h2>The Harmony of Maldhari Tribes</h2><p>One unique aspect of Gir conservation is the harmonious co-existence between local Maldhari pastoralists and lions. Their deep ecological understanding helps prevent human-wildlife conflicts.</p><p>Safari visitors can explore Sasan Gir and Devalia Interpretation Zone to spot lions, leopards, chitals, and over 300 bird species.</p>`,
  },
  {
    title: "Dholavira: Unearthing the Harappan Engineering Genius in Kutch",
    catNames: ["Science & Space", "Travel & Heritage", "Education & Learning"],
    featuredImage: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1200&q=80",
    description: "How 4500-year-old Dholavira mastered urban planning, sophisticated water reservoirs, and stone architecture.",
    blogContent: `<p>Located on Khadir Bet island in Kutch, Dholavira is one of the most prominent archaeological sites of the Indus Valley Civilization. Designated as a UNESCO World Heritage Site in 2021, Dholavira reveals advanced urban planning from 2500 BCE.</p><h2>Water Management Ahead of Its Time</h2><p>Dholavira features giant stone-cut water reservoirs designed to collect storm run-offs in an arid landscape, demonstrating ancient engineering excellence.</p>`,
  },

  // --- CURRENT AFFAIRS + POLITICS + FINANCE ---
  {
    title: "UPI Goes Global: How India's Digital Payment Stack is Expanding Worldwide",
    catNames: ["Finance & Markets", "Current Affairs", "Technology & AI"],
    featuredImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    description: "From France and Singapore to UAE, India's Unified Payments Interface is revolutionizing international cross-border transactions.",
    blogContent: `<p>India's Unified Payments Interface (UPI), developed by the National Payments Corporation of India (NPCI), processes over 13 billion transactions monthly. Now, UPI is fast becoming a international benchmark for real-time digital payments.</p><h2>Global Footprint Expansion</h2><p>Countries including Singapore (PayNow linkage), France (Eiffel Tower ticketing), UAE, Mauritius, and Sri Lanka have integrated UPI payments for Indian travelers and non-residents.</p><h3>Why UPI Leads globally</h3><ul><li><strong>Zero Transaction Friction:</strong> QR-code based instant bank-to-bank settlements.</li><li><strong>Cost Efficiency:</strong> Far lower transaction overhead compared to international credit card networks.</li><li><strong>Financial Inclusion:</strong> Enables small street vendors and large enterprises to transact seamlessly.</li></ul>`,
  },
  {
    title: "Khavda Renewable Energy Park: Building the World's Largest Green Power Complex",
    catNames: ["Environment & Climate", "Current Affairs", "Business & Startups"],
    featuredImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    description: "Gujarat's Khavda hybrid park spans 726 sq km aiming for 30 GW of clean solar and wind energy capacity.",
    blogContent: `<p>In the vast salt flats of Khavda, Kutch, India is constructing the world's largest renewable energy park. Spanning five times the size of Paris, the 30 GW hybrid solar-wind energy installation will power over 16 million homes upon completion.</p><h2>Key Project Features</h2><p>Utilizing high-efficiency bifacial solar panels and mega wind turbines, Khavda will offset 58 million tonnes of carbon dioxide emissions annually, advancing India's 2030 net-zero targets.</p>`,
  },
  {
    title: "Vande Bharat Express Fleet Expansion: Redefining Rail Travel Across India",
    catNames: ["Current Affairs", "Politics & Governance", "Travel & Heritage"],
    featuredImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    description: "Indigenous semi-high-speed trainsets transform regional connectivity, passenger safety, and travel luxury.",
    blogContent: `<p>India's Vande Bharat Express trainsets represent a quantum leap in domestic rail technology. Manufactured at Integral Coach Factory (ICF) Chennai, these self-propelled trains offer speed, 180-degree rotating seats, Kavach anti-collision protection, and bio-vacuum toilets.</p><h2>Connecting Key Corridors</h2><p>Routes connecting Ahmedabad-Mumbai, Vande Bharat Sleeper trains, and regional corridors have significantly cut travel duration while elevating passenger comfort.</p>`,
  },
  {
    title: "India's Semiconductor Revolution: Sanand and Dholera Chip Fabs Take Shape",
    catNames: ["Business & Startups", "Technology & AI", "Politics & Governance"],
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    description: "Major investments by Micron, Tata Electronics, and CG Power establish Gujarat as India's semiconductor manufacturing hub.",
    blogContent: `<p>India is rapidly positioning itself as a global semiconductor assembly and fabrication hub. With landmark investments in Sanand and Dholera Special Investment Region (DSIR), Gujarat is leading the country's silicon revolution.</p><h2>Building the Ecosystem</h2><p>From OSAT packaging facilities to 28nm silicon wafer fabrication plants, the initiative creates high-skilled engineering jobs and secures domestic tech supply chains.</p>`,
  },
  {
    title: "India's Economic Momentum: Emerging as the 3rd Largest Global Economy",
    catNames: ["Finance & Markets", "Politics & Governance", "Current Affairs"],
    featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
    description: "Analysis of India's robust GDP growth rate, infrastructure expansion, and manufacturing production index.",
    blogContent: `<p>With steady annual GDP growth exceeding 7%, India is on track to become the world's third-largest economy by 2027. Key growth engines include massive public infrastructure spending, manufacturing incentives (PLI schemes), and booming service exports.</p>`,
  },

  // --- TECHNOLOGY & AI + EDUCATION ---
  {
    title: "The Rise of Indic LLMs: How Indian AI Models Are Mastering Native Languages",
    catNames: ["Technology & AI", "Education & Learning", "Current Affairs"],
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    description: "From Gujarati and Hindi to Tamil, customized Large Language Models like Krutrim and Bhashini bridge the digital divide.",
    blogContent: `<p>While global AI models excel in English, Indian researchers and startups are building Indic language AI models tailored for India's 22 official languages. Projects like Bhashini (Government of India) and Krutrim AI enable seamless voice and text translation across dialects.</p><h2>Empowering Regional Creators</h2><p>Indic LLMs empower small business owners, farmers, and students to query AI tools in Gujarati, Marathi, or Bengali, unlocking true digital democracy.</p>`,
  },
  {
    title: "Web Development Trends in 2026: React 19, Server Actions & Micro-frontends",
    catNames: ["Technology & AI", "Education & Learning"],
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    description: "A comprehensive guide to modern frontend frameworks, full-stack React server components, and dynamic styling engine optimizations.",
    blogContent: `<p>The JavaScript ecosystem continues to evolve at unprecedented speed. React 19 introduced compiler-driven automatic memoization, eliminating manual useMemo hooks while simplifying state synchronization across complex web apps.</p><h2>Key Web Tech Pillars</h2><ul><li><strong>Server Actions:</strong> Seamless client-server data mutations without boilerplates.</li><li><strong>Component Architecture:</strong> Decoupled modular UI libraries using Tailwind and Radix primitives.</li><li><strong>Optimized Asset Loading:</strong> Next-gen WebP/AVIF media delivery and instant hydration.</li></ul>`,
  },
  {
    title: "Artificial Intelligence in Healthcare: Diagnosing Diseases at Scale",
    catNames: ["Technology & AI", "Lifestyle & Wellness", "Science & Space"],
    featuredImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    description: "How machine learning models are analyzing X-rays, retinal scans, and genomic data to assist doctors across rural and urban clinics.",
    blogContent: `<p>Artificial Intelligence is transforming diagnostic medicine across India. AI algorithms trained on millions of medical scans can now detect early-stage diabetic retinopathy, chest infections, and cardiac anomalies within seconds.</p>`,
  },
  {
    title: "Cybersecurity Best Practices for 2026: Protecting Passwords & Cloud Data",
    catNames: ["Technology & AI", "Education & Learning"],
    featuredImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    description: "Essential security guidelines for multi-factor authentication, passkeys, and preventing social engineering attacks.",
    blogContent: `<p>With digital interactions reaching an all-time high, online security is vital for individuals and developers alike. Implementing Passkeys (FIDO2 standard) replaces vulnerable passwords with hardware-backed biometric verification.</p>`,
  },

  // --- BUSINESS + FINANCE + POLITICS ---
  {
    title: "GIFT City Ahmedabad-Gandhinagar: Inside India's Premier Smart Financial Hub",
    catNames: ["Finance & Markets", "Business & Startups", "Gujarat & Culture"],
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Explore Gujarat International Finance Tec-City: Underground utility tunnels, district cooling, and international exchanges.",
    blogContent: `<p>Located between Ahmedabad and Gandhinagar on the banks of the Sabarmati River, GIFT City (Gujarat International Finance Tec-City) is India's first operational smart city and International Financial Services Centre (IFSC).</p><h2>World-Class Smart Infrastructure</h2><ul><li><strong>District Cooling System:</strong> Chilled water piped directly into skyscrapers reduces energy usage by 30%.</li><li><strong>Automated Waste Collection:</strong> Vacuum waste pipes transport municipal waste underground at 90 km/h.</li><li><strong>Underground Utility Tunnels:</strong> Zero street digging for telecom, electricity, or water maintenance.</li></ul>`,
  },
  {
    title: "Surat Diamond Bourse: Inside the World's Largest Office Complex",
    catNames: ["Business & Startups", "Gujarat & Culture", "Finance & Markets"],
    featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: "How Surat processes 90% of the world's rough diamonds in a state-of-the-art green building complex.",
    blogContent: `<p>Surat Diamond Bourse (SDB) in Khajod, Surat, surpassed the Pentagon as the world's largest office building complex. Spanning 6.7 million sq ft, it houses over 4,500 diamond trading offices under one sustainable green roof.</p>`,
  },
  {
    title: "India's Startup Ecosystem 2026: From DeepTech to AgTech Innovations",
    catNames: ["Business & Startups", "Education & Learning"],
    featuredImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    description: "How Tier-2 and Tier-3 cities like Vadodara, Surat, and Jaipur are emerging as new startup engines.",
    blogContent: `<p>India ranks as the third-largest startup ecosystem in the world with over 110 unicorns. However, the biggest shift in recent years is the decentralization of innovation beyond Bengaluru and NCR into cities like Surat, Ahmedabad, and Pune.</p>`,
  },

  // --- SCIENCE & SPACE + EDUCATION ---
  {
    title: "ISRO Gaganyaan Mission: India's First Human Spaceflight Program",
    catNames: ["Science & Space", "Current Affairs", "Education & Learning"],
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    description: "Preparing astronaut-designates for orbital space missions aboard the indigenous LVM3 rocket.",
    blogContent: `<p>India's Space Research Organisation (ISRO) is preparing to launch Gaganyaan, sending three Indian astronaut-designates into a 400 km low Earth orbit for a 3-day mission before returning safely with a ocean splashdown in the Arabian Sea.</p>`,
  },
  {
    title: "Chandrayaan-3 Data Breakthroughs: What Water-Ice Discoveries Mean for Moon Base",
    catNames: ["Science & Space", "Education & Learning"],
    featuredImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
    description: "Analyzing the Vikram lander and Pragyan rover findings from the lunar south pole region.",
    blogContent: `<p>Following India's historic soft landing near the lunar south pole, data transmitted by Vikram lander's ChaSTE payload confirmed thermal profiles and elemental presence including Sulphur, Iron, and Silicon in the moon's soil.</p>`,
  },

  // --- FOOD & CULINARY + LIFESTYLE ---
  {
    title: "The Ultimate Guide to Authentic Gujarati Thali: Flavors of Sweet, Salty & Spicy",
    catNames: ["Food & Culinary", "Gujarat & Culture", "Lifestyle & Wellness"],
    featuredImage: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80",
    description: "From Dhokla, Handvo, and Khandvi to Sev Tameta, Undhiyu, and Shrikhand—exploring the balanced Gujarati feast.",
    blogContent: `<p>A traditional Gujarati Thali is a culinary masterpiece of nutritional balance and flavor harmony. Combining sweet, sour, salty, and spicy elements in a single silver or brass platter, it reflects a rich vegetarian tradition.</p><h2>Iconic Gujarati Specialties</h2><ul><li><strong>Khandvi:</strong> Silky rolled gram flour sheets tempered with mustard seeds and sesame.</li><li><strong>Undhiyu:</strong> Seasonal winter vegetable stew cooked in clay pots with fenugreek dumplings (Muthiya).</li><li><strong>Dhokla & Handvo:</strong> Fermented rice and lentils steamed or baked with curry leaves.</li><li><strong>Basundi & Shrikhand:</strong> Creamy saffron and cardamom desserts served chilled.</li></ul>`,
  },
  {
    title: "Street Food Journey Across Gujarat: Manek Chowk to Surat Night Markets",
    catNames: ["Food & Culinary", "Travel & Heritage"],
    featuredImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    description: "Tasting Gwalior Dosa at Manek Chowk Ahmedabad, Surti Locho, Gotala, and Kutch Dabeli.",
    blogContent: `<p>Gujarat’s night markets are legendary for food lovers. In Ahmedabad, Manek Chowk transforms at 10 PM from a jewelry market into a bustling street food haven serving Butter Dosa, Chocolate Cheese Sandwiches, and Kulfi.</p>`,
  },

  // --- LIFESTYLE & WELLNESS + SPORTS + ENVIRONMENT ---
  {
    title: "Mindfulness and Yoga for Tech Professionals: Beating Burnout in 15 Minutes a Day",
    catNames: ["Lifestyle & Wellness", "Sports & Athletics", "Education & Learning"],
    featuredImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    description: "Simple Pranayama breathing techniques and desk stretches to stay focused and reduce daily stress.",
    blogContent: `<p>In today's fast-paced digital work environment, setting aside 15 minutes for basic Pranayama (Anulom Vilom, Kapalbhati) and ergonomic body stretches can dramatically reduce mental fatigue and improve posture.</p>`,
  },
  {
    title: "Cricket in India: Narendra Modi Stadium and the Grand Future of Indian Sports",
    catNames: ["Sports & Athletics", "Gujarat & Culture", "Entertainment & Cinema"],
    featuredImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
    description: "How Motera's 132,000 capacity arena and grassroots sports academies are inspiring India's next athletic stars.",
    blogContent: `<p>Narendra Modi Stadium in Motera, Ahmedabad, stands as the largest cricket stadium in the world with a capacity of 132,000 spectators. Hosting world cup finals and IPL matches, it symbolizes India's sporting enthusiasm.</p>`,
  }
];

// Sample Comments Pool
const sampleComments = [
  "Extremely insightful article! Thanks for sharing these details about Gujarat's development.",
  "Amazing photos and well-researched content. Proud of India's rapid technological progress!",
  "Great writeup! I visited GIFT City recently and the district cooling infrastructure is truly world-class.",
  "Love the explanation of Patola weaving. The effort put into double ikat craftsmanship is extraordinary.",
  "Very helpful technical breakdown! Excited to see React 19 and AI integrations in action.",
  "Garba during Navratri in Vadodara is an emotion! Glad to see it recognized by UNESCO.",
  "Fascinating insights into ISRO's space missions. The future of Indian aerospace looks so bright!",
  "This Gujarati thali guide made me hungry instantly! Undhiyu in winter is undefeated.",
  "Such an informative post! Adding Dholavira and Khavda to my travel wishlist for this year.",
  "Excellent presentation and clean layout. Looking forward to reading more blogs on Lekhak!"
];

// ----------------------------------------------------
// SEED EXECUTION SCRIPT
// ----------------------------------------------------
async function seedDatabase() {
  try {
    console.log("⚡ Connecting to MongoDB Atlas (Lekhak database)...");
    await mongoose.connect(MONGODB_CONN, { dbName: "Lekhak" });
    console.log("✅ Successfully connected to MongoDB Atlas (Lekhak database)!");

    // 1. Seed Categories (14 Categories)
    console.log("🏷️  Seeding Categories (14 Categories)...");
    const categoryDocs = [];
    for (const cat of categoriesData) {
      const catSlug = slugify(cat.name);
      let existingCat = await Category.findOne({ slug: catSlug });
      if (!existingCat) {
        existingCat = await Category.create({ name: cat.name, slug: catSlug });
      }
      categoryDocs.push(existingCat);
    }
    console.log(`✅ ${categoryDocs.length} Categories ready.`);

    // 2. Seed Users
    console.log("👤 Seeding Users (25 Users)...");
    const defaultHashedPassword = bcryptjs.hashSync("password123", 10);
    const userDocs = [];

    for (const u of usersData) {
      let existingUser = await User.findOne({ email: u.email });
      if (!existingUser) {
        existingUser = await User.create({
          name: u.name,
          username: u.username,
          email: u.email,
          password: defaultHashedPassword,
          bio: u.bio,
          avatar: u.avatar,
          role: u.username === "hetul_kadiya" ? "admin" : "user",
          status: "active",
        });
      }
      userDocs.push(existingUser);
    }
    console.log(`✅ ${userDocs.length} Real Users created/ready in database.`);

    // 3. Clear existing blogs to re-assign multiple categories
    console.log("🧹 Refreshing Blogs with Multi-Category support...");
    await Blog.deleteMany({});
    await Comment.deleteMany({});
    await BlogLike.deleteMany({});

    // 4. Seed 65+ Blogs with 2-3 Categories Each
    console.log("📰 Seeding 65+ Multi-Categorized Blogs...");
    const rawTemplates = generateBlogsData();
    const blogDocs = [];
    let blogCount = 0;
    const targetBlogCount = 65;

    for (let round = 0; round < 3; round++) {
      for (const tpl of rawTemplates) {
        if (blogCount >= targetBlogCount) break;

        const author = userDocs[blogCount % userDocs.length];
        
        // Map category names to ObjectIds (2-3 categories per blog)
        const mappedCatIds = (tpl.catNames || ["Gujarat & Culture"])
          .map((name) => categoryDocs.find((c) => c.name === name)?._id)
          .filter(Boolean);

        // Ensure at least 1 category
        if (mappedCatIds.length === 0) mappedCatIds.push(categoryDocs[0]._id);

        let title = tpl.title;
        if (round === 1) title = `Deep Dive: ${tpl.title}`;
        if (round === 2) title = `Insights: ${tpl.title} (2026 Special)`;

        const slug = slugify(`${title}-${blogCount + 101}`);

        const createdBlog = await Blog.create({
          author: author._id,
          categories: mappedCatIds,
          title: title,
          slug: slug,
          blogContent: tpl.blogContent,
          featuredImage: tpl.featuredImage,
          description: tpl.description,
          summary: tpl.description,
          status: "published",
          publishedAt: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)),
          views: Math.floor(Math.random() * 4500) + 120,
        });
        blogDocs.push(createdBlog);
        blogCount++;
      }
    }
    console.log(`✅ ${blogDocs.length} Multi-Categorized Blogs seeded into database.`);

    // 5. Seed Comments & Likes
    console.log("💬 Seeding Comments & Likes...");
    let commentCount = 0;
    let likeCount = 0;

    for (const blog of blogDocs) {
      const numComments = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < numComments; i++) {
        const randomUser = userDocs[Math.floor(Math.random() * userDocs.length)];
        const randomCommentText = sampleComments[Math.floor(Math.random() * sampleComments.length)];

        await Comment.create({
          user: randomUser._id,
          blogid: blog._id,
          comment: randomCommentText,
        });
        commentCount++;
      }

      const numLikes = Math.floor(Math.random() * 6) + 3;
      const LikerSet = new Set();
      for (let j = 0; j < numLikes; j++) {
        const randomLiker = userDocs[Math.floor(Math.random() * userDocs.length)];
        if (!LikerSet.has(randomLiker._id.toString())) {
          LikerSet.add(randomLiker._id.toString());
          await BlogLike.create({
            user: randomLiker._id,
            blogid: blog._id,
          });
          likeCount++;
        }
      }
    }

    // 6. Seed Follows
    console.log("🤝 Seeding Follow connections...");
    let followCount = 0;
    for (let i = 0; i < userDocs.length; i++) {
      const u1 = userDocs[i];
      for (let j = 0; j < 4; j++) {
        const u2 = userDocs[(i + j + 1) % userDocs.length];
        if (u1._id.toString() !== u2._id.toString()) {
          const existingFollow = await Follow.findOne({ follower: u1._id, following: u2._id });
          if (!existingFollow) {
            await Follow.create({ follower: u1._id, following: u2._id });
            followCount++;
          }
        }
      }
    }

    console.log("\n=======================================================");
    console.log("🎉 DATABASE MULTI-CATEGORY SEEDING COMPLETED SUCCESSFULLY!");
    console.log("=======================================================");
    console.log(`👤 Users Created / Ready   : ${userDocs.length}`);
    console.log(`🏷️  Categories Created       : ${categoryDocs.length}`);
    console.log(`📰 Multi-Category Blogs    : ${blogDocs.length}`);
    console.log(`💬 Comments Created        : ${commentCount}`);
    console.log(`❤️  Likes Created           : ${likeCount}`);
    console.log(`🤝 Follow Connections      : ${followCount}`);
    console.log("=======================================================\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
