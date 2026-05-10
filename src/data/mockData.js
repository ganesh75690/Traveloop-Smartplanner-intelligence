// Mock data for Traveloop — replace with API calls when backend is ready

export const mockUser = {
  id: "u1",
  name: "Arjun Sharma",
  email: "arjun@example.com",
  avatar: null,
  bio: "Passionate traveler. Exploring India and beyond.",
  language: "en",
  savedDestinations: ["i1", "i3", "c1"],
};

// ── Indian Cities ─────────────────────────────────────────────────────────────
export const mockIndianCities = [
  { id: "i1",  name: "Goa",       state: "Goa",             region: "Domestic", costIndex: 2, popularity: 4.8, flag: "🏖️", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80", gradient: "linear-gradient(135deg,#0F4C81 0%,#1E88E5 100%)" },
  { id: "i2",  name: "Manali",    state: "Himachal Pradesh", region: "Domestic", costIndex: 2, popularity: 4.7, flag: "🏔️", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80", gradient: "linear-gradient(135deg,#1A237E 0%,#3949AB 100%)" },
  { id: "i3",  name: "Jaipur",    state: "Rajasthan",        region: "Domestic", costIndex: 2, popularity: 4.7, flag: "🏰", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80", gradient: "linear-gradient(135deg,#BF360C 0%,#E64A19 100%)" },
  { id: "i4",  name: "Kerala",    state: "Kerala",           region: "Domestic", costIndex: 2, popularity: 4.9, flag: "🌴", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", gradient: "linear-gradient(135deg,#1B5E20 0%,#388E3C 100%)" },
  { id: "i5",  name: "Ladakh",    state: "J&K",              region: "Domestic", costIndex: 3, popularity: 4.9, flag: "🏔️", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", gradient: "linear-gradient(135deg,#37474F 0%,#546E7A 100%)" },
  { id: "i6",  name: "Mumbai",    state: "Maharashtra",      region: "Domestic", costIndex: 3, popularity: 4.6, flag: "🌆", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80", gradient: "linear-gradient(135deg,#4A148C 0%,#7B1FA2 100%)" },
  { id: "i7",  name: "Delhi",     state: "Delhi",            region: "Domestic", costIndex: 2, popularity: 4.5, flag: "🕌", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80", gradient: "linear-gradient(135deg,#880E4F 0%,#C2185B 100%)" },
  { id: "i8",  name: "Udaipur",   state: "Rajasthan",        region: "Domestic", costIndex: 2, popularity: 4.8, flag: "🏯", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80", gradient: "linear-gradient(135deg,#006064 0%,#00838F 100%)" },
  { id: "i9",  name: "Rishikesh", state: "Uttarakhand",      region: "Domestic", costIndex: 1, popularity: 4.6, flag: "🕉️", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80", gradient: "linear-gradient(135deg,#004D40 0%,#00796B 100%)" },
  { id: "i10", name: "Andaman",   state: "A&N Islands",      region: "Domestic", costIndex: 3, popularity: 4.8, flag: "🌴", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80", gradient: "linear-gradient(135deg,#006CE4 0%,#0288D1 100%)" },
];

// ── International Cities ──────────────────────────────────────────────────────
export const mockCities = [
  { id: "c1",  name: "Paris",       country: "France",       region: "Europe",        costIndex: 3, popularity: 4.9, flag: "🇫🇷", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", gradient: "linear-gradient(135deg,#1A237E 0%,#283593 100%)", contact: { phone: "+33 1 42 68 53 00", email: "info@paris-tourism.com", website: "www.parisinfo.com" } },
  { id: "c2",  name: "Dubai",       country: "UAE",          region: "Middle East",   costIndex: 3, popularity: 4.7, flag: "🇦🇪", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80", gradient: "linear-gradient(135deg,#E65100 0%,#F57C00 100%)", contact: { phone: "+971 4 222 4444", email: "info@visitdubai.com", website: "www.visitdubai.com" } },
  { id: "c3",  name: "Tokyo",       country: "Japan",        region: "Asia",          costIndex: 3, popularity: 4.8, flag: "🇯🇵", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", gradient: "linear-gradient(135deg,#880E4F 0%,#AD1457 100%)", contact: { phone: "+81 3-3201-3331", email: "info@tokyo-tourism.jp", website: "www.gotokyo.org" } },
  { id: "c4",  name: "Bali",        country: "Indonesia",    region: "Asia",          costIndex: 1, popularity: 4.7, flag: "🇮🇩", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", gradient: "linear-gradient(135deg,#1B5E20 0%,#2E7D32 100%)", contact: { phone: "+62 361 222 567", email: "info@balitourism.com", website: "www.bali-tourism.com" } },
  { id: "c5",  name: "Singapore",   country: "Singapore",    region: "Asia",          costIndex: 3, popularity: 4.6, flag: "🇸🇬", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80", gradient: "linear-gradient(135deg,#006064 0%,#00838F 100%)", contact: { phone: "+65 6736 2000", email: "info@visitsingapore.com", website: "www.visitsingapore.com" } },
  { id: "c6",  name: "London",      country: "UK",           region: "Europe",        costIndex: 3, popularity: 4.7, flag: "🇬🇧", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80", gradient: "linear-gradient(135deg,#37474F 0%,#455A64 100%)", contact: { phone: "+44 20 7234 5800", email: "info@visitlondon.com", website: "www.visitlondon.com" } },
  { id: "c7",  name: "Switzerland", country: "Switzerland",  region: "Europe",        costIndex: 3, popularity: 4.8, flag: "🇨🇭", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", gradient: "linear-gradient(135deg,#1A237E 0%,#3949AB 100%)" },
  { id: "c8",  name: "New York",    country: "USA",          region: "North America", costIndex: 3, popularity: 4.8, flag: "🇺🇸", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80", gradient: "linear-gradient(135deg,#4A148C 0%,#6A1B9A 100%)" },
  { id: "c9",  name: "Rome",        country: "Italy",        region: "Europe",        costIndex: 2, popularity: 4.6, flag: "🇮🇹", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80", gradient: "linear-gradient(135deg,#BF360C 0%,#D84315 100%)" },
  { id: "c10", name: "Thailand",    country: "Thailand",     region: "Asia",          costIndex: 1, popularity: 4.5, flag: "🇹🇭", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80", gradient: "linear-gradient(135deg,#006CE4 0%,#1976D2 100%)" },
  { id: "c11", name: "Amsterdam",   country: "Netherlands",  region: "Europe",        costIndex: 3, popularity: 4.4, flag: "🇳🇱", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80", gradient: "linear-gradient(135deg,#004D40 0%,#00695C 100%)" },
  { id: "c12", name: "Barcelona",   country: "Spain",        region: "Europe",        costIndex: 2, popularity: 4.6, flag: "🇪🇸", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80", gradient: "linear-gradient(135deg,#E65100 0%,#EF6C00 100%)" },
  { id: "c13", name: "Kyoto",       country: "Japan",        region: "Asia",          costIndex: 2, popularity: 4.7, flag: "🇯🇵", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", gradient: "linear-gradient(135deg,#880E4F 0%,#C2185B 100%)" },
  { id: "c14", name: "Prague",      country: "Czech Rep.",   region: "Europe",        costIndex: 1, popularity: 4.5, flag: "🇨🇿", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&q=80", gradient: "linear-gradient(135deg,#37474F 0%,#546E7A 100%)" },
  { id: "c15", name: "Maldives",    country: "Maldives",     region: "Asia",          costIndex: 3, popularity: 4.9, flag: "🇲🇻", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80", gradient: "linear-gradient(135deg,#006CE4 0%,#0288D1 100%)" },
  { id: "c16", name: "Istanbul",    country: "Turkey",       region: "Europe/Asia",   costIndex: 2, popularity: 4.6, flag: "🇹🇷", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80", gradient: "linear-gradient(135deg,#BF360C 0%,#E64A19 100%)" },
  { id: "c17", name: "Vienna",      country: "Austria",      region: "Europe",        costIndex: 2, popularity: 4.4, flag: "🇦🇹", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400&q=80", gradient: "linear-gradient(135deg,#1A237E 0%,#283593 100%)" },
  { id: "c18", name: "Sydney",      country: "Australia",    region: "Oceania",       costIndex: 3, popularity: 4.5, flag: "🇦🇺", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80", gradient: "linear-gradient(135deg,#006064 0%,#00838F 100%)" },
  { id: "c19", name: "Santorini",   country: "Greece",       region: "Europe",        costIndex: 3, popularity: 4.8, flag: "🇬🇷", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", gradient: "linear-gradient(135deg,#1565C0 0%,#1976D2 100%)" },
  { id: "c20", name: "Lisbon",      country: "Portugal",     region: "Europe",        costIndex: 2, popularity: 4.5, flag: "🇵🇹", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=80", gradient: "linear-gradient(135deg,#E65100 0%,#F57C00 100%)" },
];

// ── Activities ────────────────────────────────────────────────────────────────
export const mockActivities = [
  // Indian activities
  { id: "ia1",  cityId: "i1",  name: "Baga Beach Sunset",        type: "sightseeing", cost: 0,    durationHours: 2,   description: "Watch the stunning sunset at Goa's most popular beach.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g297604-d3186947-Reviews-Baga_Beach-Goa_Goa_State.html" },
  { id: "ia2",  cityId: "i1",  name: "Dudhsagar Waterfall Trek", type: "adventure",   cost: 800,  durationHours: 6,   description: "Trek to the magnificent four-tiered waterfall in Goa.", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g297604-d570695-Reviews-Dudhsagar_Falls-Goa_Goa_State.html" },
  { id: "ia3",  cityId: "i1",  name: "Goan Seafood Trail",       type: "food",        cost: 600,  durationHours: 3,   description: "Taste authentic Goan fish curry, prawn balchão and more.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Restaurants-g297604-Goa_Goa_State.html" },
  { id: "ia4",  cityId: "i2",  name: "Rohtang Pass Excursion",   type: "adventure",   cost: 1200, durationHours: 8,   description: "Drive to the snow-covered Rohtang Pass at 3,978m.", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180306-Reviews-Rohtang_Pass-Manali_Kullu_District_Himachal_Pradesh.html" },
  { id: "ia5",  cityId: "i2",  name: "Solang Valley Skiing",     type: "adventure",   cost: 1500, durationHours: 4,   description: "Ski and snowboard at Solang Valley in winter.", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180307-Reviews-Solang_Valley-Manali_Kullu_District_Himachal_Pradesh.html" },
  { id: "ia6",  cityId: "i3",  name: "Amber Fort Tour",          type: "culture",     cost: 500,  durationHours: 3,   description: "Explore the magnificent hilltop Amber Fort.", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g304555-d3186933-Reviews-Amber_Fort-Jaipur_Jaipur_District_Rajasthan.html" },
  { id: "ia7",  cityId: "i3",  name: "Hawa Mahal Visit",         type: "sightseeing", cost: 200,  durationHours: 1.5, description: "See the iconic Palace of Winds in the Pink City.", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g304555-d3186932-Reviews-Hawa_Mahal-Jaipur_Jaipur_District_Rajasthan.html" },
  { id: "ia8",  cityId: "i3",  name: "Rajasthani Thali Dinner",  type: "food",        cost: 400,  durationHours: 2,   description: "Enjoy a traditional Rajasthani thali with dal baati churma.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Restaurants-g304555-Jaipur_Jaipur_District_Rajasthan.html" },
  { id: "ia9",  cityId: "i4",  name: "Alleppey Houseboat Stay",  type: "sightseeing", cost: 4500, durationHours: 24,  description: "Cruise the backwaters of Kerala on a traditional houseboat.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180308-Reviews-Alleppey_Backwaters-Alleppey_Alappuzha_District_Kerala.html" },
  { id: "ia10", cityId: "i4",  name: "Munnar Tea Plantation",    type: "culture",     cost: 300,  durationHours: 3,   description: "Walk through lush green tea estates in Munnar.", image: "https://images.unsplash.com/photo-1595497200323-cf6c01631466?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180309-Reviews-Tea_Museums-Munnar_Idukki_District_Kerala.html" },
  { id: "ia11", cityId: "i5",  name: "Pangong Lake Visit",       type: "sightseeing", cost: 800,  durationHours: 8,   description: "Visit the stunning high-altitude Pangong Tso lake.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180310-Reviews-Pangong_Tso-Leh_Ladakh_Jammu_and_Kashmir.html" },
  { id: "ia12", cityId: "i5",  name: "Khardung La Pass Ride",    type: "adventure",   cost: 1000, durationHours: 6,   description: "Ride to one of the world's highest motorable passes.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180311-Reviews-Khardung_La_Pass-Leh_Ladakh_Jammu_and_Kashmir.html" },
  { id: "ia13", cityId: "i6",  name: "Gateway of India",         type: "sightseeing", cost: 0,    durationHours: 1,   description: "Visit the iconic arch monument on Mumbai's waterfront.", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g304554-d3186935-Reviews-Gateway_of_India-Mumbai_Maharashtra.html" },
  { id: "ia14", cityId: "i6",  name: "Dharavi Slum Tour",        type: "culture",     cost: 700,  durationHours: 2,   description: "Guided tour of Asia's largest urban settlement.", image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g304554-d3186936-Reviews-Dharavi-Mumbai_Maharashtra.html" },
  { id: "ia15", cityId: "i7",  name: "Red Fort & Chandni Chowk", type: "culture",     cost: 350,  durationHours: 4,   description: "Explore the Mughal-era Red Fort and old Delhi's bazaars.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g304551-d3186938-Reviews-Red_Fort-New_Delhi_National_Capital_Territory_of_Delhi.html" },
  { id: "ia16", cityId: "i8",  name: "City Palace Udaipur",      type: "culture",     cost: 300,  durationHours: 3,   description: "Tour the magnificent City Palace overlooking Lake Pichola.", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g304554-d3186939-Reviews-City_Palace-Udaipur_Udaipur_District_Rajasthan.html" },
  { id: "ia17", cityId: "i9",  name: "White Water Rafting",      type: "adventure",   cost: 600,  durationHours: 3,   description: "Raft through the rapids of the Ganges in Rishikesh.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180312-Reviews-White_Water_Rafting-Rishikesh_Dehradun_District_Uttarakhand.html" },
  { id: "ia18", cityId: "i10", name: "Radhanagar Beach",         type: "sightseeing", cost: 0,    durationHours: 3,   description: "Relax on Asia's best beach in Havelock Island.", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop", url: "https://www.tripadvisor.com/Attraction_Review-g1138908-d1180313-Reviews-Radhanagar_Beach-Havelock_Island_Andaman_and_Nicobar_Islands.html" },
  // International activities
  { id: "a1",  cityId: "c1",  name: "Eiffel Tower Visit",        type: "sightseeing", cost: 28,   durationHours: 2,   description: "Visit the iconic iron lattice tower on the Champ de Mars.", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400&h=300&fit=crop", url: "https://www.toureiffel.paris/en" },
  { id: "a2",  cityId: "c1",  name: "Louvre Museum",             type: "culture",     cost: 22,   durationHours: 4,   description: "Explore one of the world's largest art museums.", image: "https://images.unsplash.com/photo-1499426600726-d3c7b6ab396d?w=400&h=300&fit=crop", url: "https://www.louvre.fr/en" },
  { id: "a3",  cityId: "c2",  name: "Burj Khalifa Observation",  type: "sightseeing", cost: 45,   durationHours: 2,   description: "Views from the world's tallest building.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop", url: "https://www.burjkhalifa.ae/en" },
  { id: "a4",  cityId: "c2",  name: "Desert Safari Dubai",       type: "adventure",   cost: 90,   durationHours: 6,   description: "Dune bashing and camel riding in the Arabian desert.", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&h=300&fit=crop", url: "https://www.visitdubai.com/en/dubai-desert-safari" },
  { id: "a5",  cityId: "c3",  name: "Shibuya Crossing",          type: "sightseeing", cost: 0,    durationHours: 1,   description: "Experience the world's busiest pedestrian crossing.", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop", url: "https://www.japan.travel/en/spot/1043/" },
  { id: "a6",  cityId: "c3",  name: "Mount Fuji Day Trip",       type: "adventure",   cost: 80,   durationHours: 8,   description: "Full day trip to Japan's iconic volcano.", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop", url: "https://www.fujitravel.net/en" },
  { id: "a7",  cityId: "c4",  name: "Ubud Rice Terraces",        type: "sightseeing", cost: 10,   durationHours: 3,   description: "Walk through stunning emerald rice paddies.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop", url: "https://www.bali.com/attraction/ubud-rice-terraces" },
  { id: "a8",  cityId: "c4",  name: "Surf Lesson Kuta Beach",    type: "adventure",   cost: 35,   durationHours: 2,   description: "Learn to surf on Bali's famous beach.", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop", url: "https://www.bali.com/attraction/kuta-beach" },
  { id: "a9",  cityId: "c5",  name: "Gardens by the Bay",        type: "sightseeing", cost: 28,   durationHours: 3,   description: "Explore the futuristic Supertree Grove and domes.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop", url: "https://www.gardensbythebay.com.sg" },
  { id: "a10", cityId: "c6",  name: "Tower of London",           type: "culture",     cost: 35,   durationHours: 3,   description: "Discover 1,000 years of history at the Tower of London.", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop", url: "https://www.hrp.org.uk/tower-of-london/" },
  { id: "a11", cityId: "c7",  name: "Swiss Alps Hiking",         type: "adventure",   cost: 60,   durationHours: 6,   description: "Hike through breathtaking Alpine scenery.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", url: "https://www.myswitzerland.com/en/activities/hiking" },
  { id: "a12", cityId: "c8",  name: "Central Park Walk",         type: "sightseeing", cost: 0,    durationHours: 2,   description: "Stroll through Manhattan's iconic green space.", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop", url: "https://www.centralparknyc.org" },
  { id: "a13", cityId: "c9",  name: "Colosseum Tour",            type: "culture",     cost: 18,   durationHours: 2,   description: "Explore the ancient Roman amphitheater.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop", url: "https://www.colosseum.it/en" },
  { id: "a14", cityId: "c10", name: "Grand Palace Bangkok",      type: "culture",     cost: 15,   durationHours: 2,   description: "Visit Thailand's most famous royal complex.", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300&fit=crop", url: "https://www.thailandtourism.org/go/grand-palace-bangkok" },
  { id: "a15", cityId: "c15", name: "Maldives Snorkeling",       type: "adventure",   cost: 80,   durationHours: 3,   description: "Snorkel in crystal-clear waters with tropical fish.", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop", url: "https://visitmaldives.com" },
];

// ── Trips ─────────────────────────────────────────────────────────────
export const mockTrips = [
  {
    id: "t1",
    name: "Rajasthan Royal Tour",
    description: "Exploring the royal heritage of Rajasthan — forts, palaces, and desert sunsets.",
    startDate: "2025-10-15",
    endDate: "2025-10-25",
    coverPhoto: "https://picsum.photos/600/400?random=1",
    status: "Upcoming",
    totalBudget: 45000,
    isPublic: true,
    shareId: "share-raj123",
    stops: [
      {
        id: "s1", cityId: "i3", cityName: "Jaipur", country: "India", flag: "🏰",
        stopOrder: 1, startDate: "2025-10-15", endDate: "2025-10-18",
        activities: [
          { id: "sa1", activityId: "ia6", name: "Amber Fort Tour",   type: "culture",     scheduledTime: "09:00", cost: 500 },
          { id: "sa2", activityId: "ia7", name: "Hawa Mahal Visit",  type: "sightseeing", scheduledTime: "14:00", cost: 200 },
          { id: "sa3", activityId: "ia8", name: "Rajasthani Thali",  type: "food",        scheduledTime: "19:00", cost: 400 },
        ],
      },
      {
        id: "s2", cityId: "i8", cityName: "Udaipur", country: "India", flag: "🏯",
        stopOrder: 2, startDate: "2025-10-19", endDate: "2025-10-25",
        activities: [
          { id: "sa4", activityId: "ia16", name: "City Palace Tour", type: "culture", scheduledTime: "10:00", cost: 300 },
        ],
      },
    ],
    budget: {
      total: 45000,
      breakdown: [
        { category: "Transport",     estimated: 8000,  actual: 7500 },
        { category: "Accommodation", estimated: 15000, actual: 14000 },
        { category: "Activities",    estimated: 5000, actual: 4500 },
        { category: "Meals",         estimated: 8000, actual: 7000 },
        { category: "Other",         estimated: 4000, actual: 3000 },
      ],
    },
  },
  {
    id: "t2",
    name: "Goa Beach Escape",
    description: "Sun, sand, and seafood on the beautiful beaches of Goa.",
    startDate: "2025-12-20",
    endDate: "2025-12-27",
    coverPhoto: "https://picsum.photos/600/400?random=2",
    status: "Upcoming",
    totalBudget: 30000,
    isPublic: false,
    shareId: "share-goa456",
    stops: [
      {
        id: "s3", cityId: "i1", cityName: "Goa", country: "India", flag: "🏖️",
        stopOrder: 1, startDate: "2025-12-20", endDate: "2025-12-27",
        activities: [
          { id: "sa5", activityId: "ia1", name: "Baga Beach Sunset",        type: "sightseeing", scheduledTime: "17:00", cost: 0 },
          { id: "sa6", activityId: "ia2", name: "Dudhsagar Waterfall Trek", type: "adventure",   scheduledTime: "07:00", cost: 800  },
          { id: "sa7", activityId: "ia3", name: "Goan Seafood Trail",       type: "food",        scheduledTime: "13:00", cost: 600  },
        ],
      },
    ],
    budget: {
      total: 30000,
      breakdown: [
        { category: "Transport",     estimated: 5000,  actual: 0 },
        { category: "Accommodation", estimated: 12000, actual: 0 },
        { category: "Activities",    estimated: 4000, actual: 0 },
        { category: "Meals",         estimated: 6000, actual: 0 },
        { category: "Other",         estimated: 2000, actual: 0 },
      ],
    },
  },
  {
    id: "t3",
    name: "Dubai & Singapore",
    description: "A luxury international trip across two of Asia's most glamorous cities.",
    startDate: "2025-08-10",
    endDate: "2025-08-20",
    coverPhoto: "https://picsum.photos/600/400?random=3",
    status: "Past",
    totalBudget: 150000,
    isPublic: true,
    shareId: "share-intl789",
    stops: [
      {
        id: "s4", cityId: "c2", cityName: "Dubai", country: "UAE", flag: "🇦🇪",
        stopOrder: 1, startDate: "2025-08-10", endDate: "2025-08-14",
        activities: [
          { id: "sa8", activityId: "a3", name: "Burj Khalifa Observation",  type: "sightseeing", scheduledTime: "10:00", cost: 45 },
          { id: "sa9", activityId: "a4", name: "Desert Safari Dubai",       type: "adventure",   scheduledTime: "15:00", cost: 90 },
        ],
      },
      {
        id: "s5", cityId: "c5", cityName: "Singapore", country: "Singapore", flag: "🇸🇬",
        stopOrder: 2, startDate: "2025-08-15", endDate: "2025-08-20",
        activities: [
          { id: "sa10", activityId: "a9", name: "Gardens by the Bay", type: "sightseeing", scheduledTime: "10:00", cost: 28 },
        ],
      },
    ],
    budget: {
      total: 150000,
      breakdown: [
        { category: "Transport",     estimated: 40000, actual: 38000 },
        { category: "Accommodation", estimated: 55000, actual: 52000 },
        { category: "Activities",    estimated: 20000, actual: 18000 },
        { category: "Meals",         estimated: 25000, actual: 22000 },
        { category: "Other",         estimated: 10000, actual: 8000 },
      ],
    },
  },
  {
    id: "t4",
    name: "Ladakh Adventure",
    description: "The ultimate high-altitude adventure through the land of high passes.",
    startDate: "2025-07-01",
    endDate: "2025-07-10",
    coverPhoto: "https://picsum.photos/600/400?random=4",
    status: "Ongoing",
    totalBudget: 55000,
    isPublic: false,
    shareId: "share-leh012",
    stops: [
      {
        id: "s6", cityId: "i5", cityName: "Ladakh", country: "India", flag: "🏔️",
        stopOrder: 1, startDate: "2025-07-01", endDate: "2025-07-10",
        activities: [
          { id: "sa11", activityId: "ia11", name: "Pangong Lake Visit",       type: "sightseeing", scheduledTime: "08:00", cost: 800  },
          { id: "sa12", activityId: "ia12", name: "Khardung La Pass Ride",    type: "adventure",   scheduledTime: "06:00", cost: 1000  },
        ],
      },
    ],
    budget: {
      total: 55000,
      breakdown: [
        { category: "Transport",     estimated: 15000, actual: 14500 },
        { category: "Accommodation", estimated: 18000, actual: 17000 },
        { category: "Activities",    estimated: 8000, actual: 7500  },
        { category: "Meals",         estimated: 8000, actual: 8500  },
        { category: "Other",         estimated: 5000, actual: 4000  },
      ],
    },
  },
  {
    id: "t5",
    name: "Kerala Backwaters",
    description: "Serene houseboat journey through Kerala's enchanting backwaters.",
    startDate: "2025-11-05",
    endDate: "2025-11-12",
    coverPhoto: "https://picsum.photos/600/400?random=5",
    status: "Upcoming",
    totalBudget: 40000,
    isPublic: false,
    shareId: "share-ker345",
    stops: [
      {
        id: "s7", cityId: "i4", cityName: "Kerala", country: "India", flag: "🌴",
        stopOrder: 1, startDate: "2025-11-05", endDate: "2025-11-12",
        activities: [
          { id: "sa9", activityId: "ia9", name: "Alleppey Houseboat Stay",  type: "sightseeing", scheduledTime: "10:00", cost: 4500  },
          { id: "sa10", activityId: "ia10", name: "Munnar Tea Plantation",    type: "culture",     scheduledTime: "09:00", cost: 300  },
        ],
      },
    ],
    budget: {
      total: 40000,
      breakdown: [
        { category: "Themed",     estimated: 5000,  actual: 0 },
        { category: "Accommodation", estimated: 16000, actual: 0 },
        { category: "Activities",    estimated: 8000, actual: 0 },
        { category: "Meals",         estimated: 8000, actual: 0 },
        { category: "Other",         estimated: 6000, actual: 0 },
      ],
    },
  },
  {
    id: "t6",
    name: "European Culture Tour",
    description: "Experience the rich cultural heritage of Europe's most iconic cities.",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    coverPhoto: "https://picsum.photos/600/400?random=6",
    status: "Past",
    totalBudget: 80000,
    isPublic: true,
    shareId: "share-euro456",
    stops: [
      {
        id: "s8", cityId: "c1", cityName: "Paris", country: "France", flag: "🇫🇷",
        stopOrder: 1, startDate: "2025-09-01", endDate: "2025-09-10",
        activities: [
          { id: "sa1", activityId: "a1", name: "Eiffel Tower Visit",        type: "sightseeing", scheduledTime: "09:00", cost: 28 },
          { id: "sa2", activityId: "a2", name: "Louvre Museum",             type: "culture",     scheduledTime: "11:00", cost: 22 },
        ],
      },
      {
        id: "s9", cityId: "c9", cityName: "Rome", country: "Italy", flag: "🇮🇹",
        stopOrder: 2, startDate: "2025-09-11", endDate: "2025-09-20",
        activities: [
          { id: "sa13", activityId: "a13", name: "Colosseum Tour",            type: "culture",     scheduledTime: "14:00", cost: 18 },
        ],
      },
    ],
    budget: {
      total: 80000,
      breakdown: [
        { category: "Transport",     estimated: 30000, actual: 28000 },
        { category: "Accommodation", estimated: 20000, actual: 19000 },
        { category: "Activities",    estimated: 25000, actual: 23000 },
        { category: "Meals",         estimated: 30000, actual: 27000 },
        { category: "Other",         estimated: 10000, actual: 7000 },
      ],
    },
  },
  {
    id: "t7",
    name: "Island Paradise",
    description: "Tropical island hopping adventure across Southeast Asia's most beautiful destinations.",
    startDate: "2025-12-01",
    endDate: "2025-12-20",
    coverPhoto: "https://picsum.photos/600/400?random=7",
    status: "Upcoming",
    totalBudget: 120000,
    isPublic: true,
    shareId: "share-island789",
    stops: [
      {
        id: "s10", cityId: "c4", cityName: "Bali", country: "Indonesia", flag: "🇮🇩",
        stopOrder: 1, startDate: "2025-12-01", endDate: "2025-12-07",
        activities: [
          { id: "sa7", activityId: "a7", name: "Ubud Rice Terraces",        type: "sightseeing", scheduledTime: "09:00", cost: 10 },
          { id: "sa8", activityId: "a8", name: "Surf Lesson Kuta Beach",    type: "adventure",   scheduledTime: "11:00", cost: 35 },
        ],
      },
      {
        id: "s11", cityId: "c15", cityName: "Maldives", country: "Maldives", flag: "🇲🇻",
        stopOrder: 2, startDate: "2025-12-08", endDate: "2025-12-20",
        activities: [
          { id: "sa11", activityId: "a15", name: "Maldives Snorkeling",       type: "adventure",   scheduledTime: "14:00", cost: 80 },
        ],
      },
    ],
    budget: {
      total: 120000,
      breakdown: [
        { category: "Transport",     estimated: 35000, actual: 32000 },
        { category: "Accommodation", estimated: 45000, actual: 41000 },
        { category: "Activities",    estimated: 30000, actual: 28000 },
        { category: "Meals",         estimated: 25000, actual: 22000 },
        { category: "Other",         estimated: 20000, actual: 0 },
      ],
    },
  },
];

// ── Notes ─────────────────────────────────────────────────────────────────────
export const mockNotes = [
  { id: "n1", tripId: "t1", stopId: "s1", content: "Book Amber Fort tickets online to avoid long queues. Elephant ride is optional but worth it.", createdAt: "2025-09-01T10:00:00Z", updatedAt: "2025-09-01T10:00:00Z" },
  { id: "n2", tripId: "t1", stopId: "s2", content: "Udaipur boat ride on Lake Pichola is a must. Best at sunset. Book in advance.", createdAt: "2025-09-02T14:30:00Z", updatedAt: "2025-09-02T14:30:00Z" },
  { id: "n3", tripId: "t1", stopId: null, content: "Carry cash — many local shops in Rajasthan don't accept cards. ATMs available in cities.", createdAt: "2025-09-03T09:00:00Z", updatedAt: "2025-09-03T09:00:00Z" },
];

// ── Packing Items ─────────────────────────────────────────────────────────────
export const mockPackingItems = [
  { id: "p1",  tripId: "t1", name: "Aadhaar Card / Passport",  category: "documents",   isPacked: true  },
  { id: "p2",  tripId: "t1", name: "Travel Insurance",         category: "documents",   isPacked: true  },
  { id: "p3",  tripId: "t1", name: "Train/Flight Tickets",     category: "documents",   isPacked: false },
  { id: "p4",  tripId: "t1", name: "Cotton Kurtas (3)",        category: "clothing",    isPacked: false },
  { id: "p5",  tripId: "t1", name: "Comfortable Jeans (2)",    category: "clothing",    isPacked: false },
  { id: "p6",  tripId: "t1", name: "Walking Shoes",            category: "clothing",    isPacked: true  },
  { id: "p7",  tripId: "t1", name: "Light Jacket",             category: "clothing",    isPacked: false },
  { id: "p8",  tripId: "t1", name: "Phone Charger",            category: "electronics", isPacked: true  },
  { id: "p9",  tripId: "t1", name: "Power Bank (20000mAh)",    category: "electronics", isPacked: false },
  { id: "p10", tripId: "t1", name: "Universal Adapter",        category: "electronics", isPacked: true  },
  { id: "p11", tripId: "t1", name: "Earphones",                category: "electronics", isPacked: false },
  { id: "p12", tripId: "t1", name: "Toothbrush & Paste",       category: "toiletries",  isPacked: false },
  { id: "p13", tripId: "t1", name: "Sunscreen SPF 50+",        category: "toiletries",  isPacked: false },
  { id: "p14", tripId: "t1", name: "Hand Sanitizer",           category: "toiletries",  isPacked: true  },
  { id: "p15", tripId: "t1", name: "Travel Pillow",            category: "other",       isPacked: false },
  { id: "p16", tripId: "t1", name: "Reusable Water Bottle",    category: "other",       isPacked: true  },
];

// ── Sample Notifications ──────────────────────────────────────────────────────
export const mockNotifications = [
  { id: "notif1", type: "reminder",       title: "Trip Reminder",              message: "Your Rajasthan Royal Tour starts in 5 days. Time to pack!", time: "2 hours ago",   read: false },
  { id: "notif2", type: "weather",        title: "Weather Alert — Jaipur",     message: "Expect warm weather (32°C) during your Jaipur visit. Carry sunscreen.", time: "5 hours ago",   read: false },
  { id: "notif3", type: "recommendation", title: "New Destination for You",    message: "Based on your trips, you might love Spiti Valley, Himachal Pradesh!", time: "1 day ago",    read: false },
  { id: "notif4", type: "booking",        title: "Booking Confirmed",          message: "Your hotel in Udaipur (Taj Lake Palace) is confirmed for Oct 19–25.", time: "2 days ago",   read: true  },
  { id: "notif5", type: "recommendation", title: "Trending: Andaman Islands",  message: "Andaman is trending this winter. Best time to visit: Nov–Feb.", time: "3 days ago",   read: true  },
];
