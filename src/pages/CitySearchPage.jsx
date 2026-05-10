import { useState } from "react";
import { Search, Star, Plus, MapPin, X, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import { mockCities } from "../data/mockData";
import PageTransition from "../components/ui/PageTransition";

// TODO: replace with citiesAPI.getAll({ search, region, costIndex })

const REGIONS = ["All", "Europe", "Asia", "North America", "Middle East", "Africa", "Oceania"];
const costLabel = ["", "Budget", "Moderate", "Luxury"];

const coverGradients = [
  "linear-gradient(135deg, #003580 0%, #006CE4 100%)",
  "linear-gradient(135deg, #0F4C81 0%, #1E88E5 100%)",
  "linear-gradient(135deg, #004D40 0%, #00897B 100%)",
  "linear-gradient(135deg, #1A237E 0%, #3949AB 100%)",
  "linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)",
  "linear-gradient(135deg, #BF360C 0%, #FF6B35 100%)",
  "linear-gradient(135deg, #006064 0%, #00ACC1 100%)",
  "linear-gradient(135deg, #1B5E20 0%, #43A047 100%)",
];

function CityCard({ city, idx, onClick }) {
  const bg = coverGradients[idx % coverGradients.length];
  const staggerClass = `animate-stagger-${(idx % 5) + 1}`;
  
  const handleViewOnMap = (e) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${city.name}, ${city.country}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div
      onClick={() => onClick(city)}
      className={`rounded-2xl overflow-hidden relative group hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-[#006CE4]/20 card-hover animate-fadeInUp ${staggerClass}`}
      style={{ minHeight: 180 }}
    >
      {/* Background Image or Gradient */}
      {city.image ? (
        <>
          <img 
            src={city.image} 
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = bg;
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
        </>
      ) : (
        <div 
          className="absolute inset-0"
          style={{ background: bg }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
        </div>
      )}
      <div className="relative z-10 p-5 h-full flex flex-col justify-between" style={{ minHeight: 180 }}>
        <div className="flex items-start justify-between">
          <span className="text-3xl leading-none">{city.flag}</span>
          <span className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/20 font-bold">
            {costLabel[city.costIndex]}
          </span>
        </div>
        <div>
          <h3 className="text-white font-bold text-base leading-tight">{city.name}</h3>
          <p className="text-white/70 text-xs mt-0.5 font-medium">{city.country}</p>
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className={i < Math.round(city.popularity) ? "text-yellow-400 fill-yellow-400" : "text-white/30"} />
              ))}
              <span className="text-white/60 text-xs ml-1.5 font-medium">{city.popularity}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                onClick={handleViewOnMap}
                className="flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg border border-white/20 font-semibold hover:bg-white/30 transition-colors btn-animate"
                title="View on Google Maps"
              >
                <MapPin size={10} /> Map
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg border border-white/20 font-semibold hover:bg-white/30 transition-colors btn-animate">
                <Plus size={10} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CitySearchPage() {
  const [search, setSearch]           = useState("");
  const [region, setRegion]           = useState("All");
  const [costFilter, setCostFilter]   = useState(0);
  const [popularOnly, setPopularOnly] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCityInfo, setShowCityInfo] = useState(false);

  const filtered = mockCities.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || c.region === region;
    const matchCost   = costFilter === 0 || c.costIndex === costFilter;
    const matchPop    = !popularOnly || c.popularity >= 4.6;
    return matchSearch && matchRegion && matchCost && matchPop;
  });

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setShowCityInfo(true);
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6">Explore Cities</h1>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
        <input
          type="text"
          placeholder="Search cities or countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#E5E9F2] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all duration-200 shadow-sm font-medium"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-white border border-[#E5E9F2] rounded-xl px-3 py-2.5 text-sm text-[#374151] outline-none focus:border-[#006CE4] transition-colors cursor-pointer shadow-sm font-medium"
        >
          {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        <div className="flex gap-1">
          {[0, 1, 2, 3].map((c) => (
            <button
              key={c}
              onClick={() => setCostFilter(c === costFilter ? 0 : c)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${costFilter === c
                  ? "bg-[#006CE4] text-white shadow-sm"
                  : "bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#374151] hover:border-[#006CE4]/30 shadow-sm"
                }`}
            >
              {c === 0 ? "All" : costLabel[c]}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPopularOnly((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
            ${popularOnly
              ? "bg-[#006CE4] text-white shadow-sm"
              : "bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#374151] hover:border-[#006CE4]/30 shadow-sm"
            }`}
        >
          <Star size={14} className={popularOnly ? "fill-white" : ""} />
          Popular
        </button>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
          <div className="w-14 h-14 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-4">
            <MapPin size={26} className="text-[#006CE4]" />
          </div>
          <p className="text-[#1A1A2E] font-bold mb-1">No cities found</p>
          <p className="text-sm text-[#6B7280] font-medium">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-[#6B7280] font-semibold mb-4">
            {filtered.length} {filtered.length === 1 ? "city" : "cities"} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((city, idx) => <CityCard key={city.id} city={city} idx={idx} onClick={handleCityClick} />)}
          </div>
        </>
      )}

      {/* City Information Modal */}
      {showCityInfo && selectedCity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1A1A2E]">{selectedCity.name}</h2>
              <button
                onClick={() => setShowCityInfo(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Location Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1A1A2E]">Location</h3>
                  <button
                    onClick={() => {
                      const query = encodeURIComponent(`${selectedCity.name}, ${selectedCity.country}`);
                      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#006CE4] text-white text-sm rounded-lg hover:bg-[#0057B8] transition-colors font-medium"
                  >
                    <ExternalLink size={14} />
                    View on Google Maps
                  </button>
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-blue-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">{selectedCity.name}, {selectedCity.country}</p>
                    <p className="text-sm text-gray-500 mt-1">Click "View on Google Maps" to see location</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City Image and Basic Info */}
                <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <img 
                    src={selectedCity.image} 
                    alt={selectedCity.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl font-bold">{selectedCity.flag}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[#006CE4]" size={16} />
                    <span className="font-semibold text-[#374151]">{selectedCity.country}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="font-semibold text-[#374151]">Popularity: {selectedCity.popularity}/5</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6B7280]">Cost Level:</span>
                    <span className="font-semibold text-[#374151]">{costLabel[selectedCity.costIndex]}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">About {selectedCity.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {selectedCity.name} is a beautiful destination in {selectedCity.country} known for its stunning architecture, 
                  rich cultural heritage, and vibrant atmosphere. This city offers visitors a perfect blend of 
                  historical landmarks, modern amenities, and warm hospitality that makes every trip memorable.
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-[#374151] mb-2">Best Time to Visit</h4>
                    <p className="text-gray-600">October to March offers pleasant weather with fewer crowds</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#374151] mb-2">Popular Attractions</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Historic Old Town</li>
                      <li>• City Museum</li>
                      <li>• Central Park</li>
                      <li>• Local Markets</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#374151] mb-2">Travel Tips</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Book accommodations 2-3 months in advance</li>
                      <li>• Try local cuisine at street food vendors</li>
                      <li>• Use public transportation for easy city navigation</li>
                      <li>• Learn basic local phrases for better communication</li>
                    </ul>
                  </div>
                </div>

                {/* Contact Information */}
                {selectedCity.contact && (
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      {selectedCity.contact.phone && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#E8F1FD] rounded-lg flex items-center justify-center">
                            <Phone size={16} className="text-[#006CE4]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7280] font-medium">Phone</p>
                            <p className="text-sm text-[#374151] font-semibold">{selectedCity.contact.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedCity.contact.email && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#E8F1FD] rounded-lg flex items-center justify-center">
                            <Mail size={16} className="text-[#006CE4]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7280] font-medium">Email</p>
                            <p className="text-sm text-[#374151] font-semibold">{selectedCity.contact.email}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedCity.contact.website && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#E8F1FD] rounded-lg flex items-center justify-center">
                            <Globe size={16} className="text-[#006CE4]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7280] font-medium">Website</p>
                            <a 
                              href={`https://${selectedCity.contact.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#006CE4] font-semibold hover:underline"
                            >
                              {selectedCity.contact.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => setShowCityInfo(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setShowCityInfo(false)}
                className="flex-1 px-6 py-3 bg-[#006CE4] text-white rounded-xl font-semibold hover:bg-[#0056B3] transition-colors"
              >
                Plan Trip to {selectedCity.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </PageTransition>
  );
}
