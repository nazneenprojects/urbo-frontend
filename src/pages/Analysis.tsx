import React, { useState } from 'react';
import { Search, Download, MapPin, Wind, AlertTriangle } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface AnalysisFormData {
  address: string;
  keywords: string;
  region: string;
  radius: number;
}

interface PollutantInfo {
  pollutant_name: string;
  description: string;
  source: string;
  health_effects: string;
}

interface NearbyPlace {
  distance: number;
  placeName: string;
  placeAddress: string;
  type: string;
}

interface AnalysisResult {
  address: string;
  latitude: number;
  longitude: number;
  Nearby_places: {
    suggestedLocations: NearbyPlace[];
    pageInfo: {
      totalHits: number;
    };
  };
  nearby_places_recommendation: string;
  air_quality_index: number;
  aqi_recommendation: string;
  air_pollution_params: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  pollutants_info: PollutantInfo[];
  still_map_image: string;
}

// Mock data for development
const mockAnalysisResult: AnalysisResult = {
  address: "New Delhi",
  latitude: 28.63141,
  longitude: 77.21676,
  Nearby_places: {
    suggestedLocations: [
      {
        distance: 113,
        placeName: "Palika Park",
        placeAddress: "Barakhamba Road, Palika Bazar, Mandi House, New Delhi",
        type: "POI"
      }
    ],
    pageInfo: {
      totalHits: 1
    }
  },
  nearby_places_recommendation: "You have good enough parks in the radius of 1000 meters",
  air_quality_index: 5,
  aqi_recommendation: "Air quality is very poor. Avoid all outdoor exertion. Use masks if necessary.",
  air_pollution_params: {
    co: 5767.82,
    no: 72.42,
    no2: 108.3,
    o3: 0,
    so2: 96.32,
    pm2_5: 341.86,
    pm10: 496.61,
    nh3: 65.86
  },
  pollutants_info: [
    {
      pollutant_name: "Particulate Matter (PM10)",
      description: "Coarse particulates that can penetrate into the lungs",
      source: "Vehicle emissions, industrial activities, and dust",
      health_effects: "Can cause respiratory issues, especially in sensitive individuals"
    }
  ],
  still_map_image: ""
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

const AnalysisPDF = ({ data }: { data: AnalysisResult }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Urban Area Analysis Report</Text>

      <View style={styles.section}>
        <Text style={styles.header}>Location Information</Text>
        <Text style={styles.text}>Address: {data.address}</Text>
        <Text style={styles.text}>Coordinates: {data.latitude}, {data.longitude}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Map</Text>
        {data.still_map_image && data.still_map_image !== "data:image/png;base64,None" ?
          (<Image
            src={data.still_map_image}
            style={{ width: '100%', height: 200 }}
          />
          ) : (
            <Text style={styles.text}>Map image not available</Text>
          )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Air Quality Information</Text>
        <Text style={styles.text}>Air Quality Index: {data.air_quality_index}</Text>
        <Text style={styles.text}>Recommendation: {data.aqi_recommendation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Nearby Places</Text>
        <Text style={styles.text}>Recommendation: {data.nearby_places_recommendation}</Text>
        {data.Nearby_places.suggestedLocations.map((place, index) => (
          <View key={index} style={{ marginBottom: 5 }}>
            <Text style={styles.text}> • {place.placeName} ({place.distance}m)</Text>
          </View>
        ))}
      </View>


    </Page>
  </Document>
);

const Analysis = () => {
  const [formData, setFormData] = useState<AnalysisFormData>({
    address: '',
    keywords: '',
    region: 'IND',
    radius: 1000
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/aggregate-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          keywords: formData.keywords.split(',').map(k => k.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: AnalysisResult = await response.json(); // Ensure response is correctly parsed

      setAnalysisResult(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze the location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Urban Area Analysis</h1>
          {analysisResult && (
            <PDFDownloadLink
              document={<AnalysisPDF data={analysisResult} />}
              fileName="urban-analysis-report.pdf"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2" >
              {({ loading, error }) => (
                <>
                  <Download className="w-5 h-5" />
                  {loading ? 'Generating...' : error ? 'Error generating PDF' : 'Get Report'}
                </>
              )}
            </PDFDownloadLink>
          )}
        </div>

        {/* Analysis Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-green-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter location address"
                  required
                />
              </div>

              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-green-700 mb-1">
                  Keywords
                </label>
                <input
                  type="text"
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter keywords (comma-separated)"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Example: parks, schools, hospitals</p>
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-green-700 mb-1">
                  Region
                </label>
                <select
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="IND">IND</option>
                </select>
              </div>

              <div>
                <label htmlFor="radius" className="block text-sm font-medium text-green-700 mb-1">
                  Radius (meters)
                </label>
                <select
                  id="radius"
                  value={formData.radius}
                  onChange={(e) => setFormData({ ...formData, radius: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="100">100</option>
                  <option value="1000">1000</option>
                  <option value="10000">10000</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Analyzing...'
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze
                </>
              )}
            </button>
          </form>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-8">
            {/* Location Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-green-800">Location Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600">Address</p>
                  <p className="text-lg font-semibold">{analysisResult.address}</p>
                </div>
                <div>
                  <p className="text-gray-600">Coordinates</p>
                  <p className="text-lg font-semibold">
                    {analysisResult.latitude}, {analysisResult.longitude}
                  </p>
                </div>
              </div>
            </div>

            {/* Still Map Image */}
            {analysisResult.still_map_image && analysisResult.still_map_image !== "data:image/png;base64,None" ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">Location Map</h2>
                <img
                  src={analysisResult.still_map_image}
                  alt="Still Map"
                  className="w-full h-auto rounded-lg border border-gray-300"
                />
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8 h-64">
                <p className="text-gray-500">Still map image not available</p>
              </div>
            )}


            {/* Air Quality */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Wind className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-purple-800">Air Quality</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <p className="text-gray-600">Air Quality Index</p>
                    <p className="text-3xl font-bold text-red-600">{analysisResult.air_quality_index}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <p className="font-semibold text-red-800">AQI Recommendation</p>
                    </div>
                    <p className="text-red-700">{analysisResult.aqi_recommendation}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Pollutant Levels</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(analysisResult.air_pollution_params).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">{key.toUpperCase()}</p>
                        <p className="text-lg font-semibold">{value.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Nearby Places</h2>
              <p className="text-lg mb-4">{analysisResult.nearby_places_recommendation}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResult.Nearby_places.suggestedLocations.map((place, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-1">{place.placeName}</h3>
                    <p className="text-gray-600 text-sm mb-2">{place.placeAddress}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">{place.distance}m away</span>
                      <span className="text-purple-600">{place.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pollutants Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Pollutants Information</h2>
              <div className="grid grid-cols-1 gap-6">
                {analysisResult.pollutants_info.map((pollutant, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">{pollutant.pollutant_name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Description</p>
                        <p className="text-gray-600">{pollutant.description}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Source</p>
                        <p className="text-gray-600">{pollutant.source}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Health Effects</p>
                        <p className="text-gray-600">{pollutant.health_effects}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;