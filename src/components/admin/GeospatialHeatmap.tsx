import { Card, Typography } from 'antd'
import { MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const { Title, Text } = Typography

// Mock data for heatmap points
const heatmapData = [
  { lat: 6.5244, lng: 3.3792, weight: 0.8 }, // Lagos Island
  { lat: 6.6018, lng: 3.3515, weight: 0.6 }, // Ikeja
  { lat: 6.4281, lng: 3.4219, weight: 0.9 }, // Victoria Island
  { lat: 6.4698, lng: 3.5852, weight: 0.5 }, // Lekki
  { lat: 6.4969, lng: 3.3841, weight: 0.4 }, // Surulere
  { lat: 6.5056, lng: 3.3784, weight: 0.3 }, // Yaba
]

const GeospatialHeatmap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setMapError('Google Maps API key not found. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.')
      return
    }

    const initMap = async () => {
      try {
        // Load the Google Maps script
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization&v=weekly`
        script.async = true
        script.defer = true
        
        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Google Maps script'))
          document.head.appendChild(script)
        })

        if (!mapContainer.current || !window.google) return

        // Create the map
        const map = new window.google.maps.Map(mapContainer.current, {
          center: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
          zoom: 11,
          mapTypeId: 'satellite',
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        })

        // Create heatmap layer
        const heatmapPoints = heatmapData.map(
          (point) => ({
            location: new window.google.maps.LatLng(point.lat, point.lng),
            weight: point.weight,
          })
        )

        new window.google.maps.visualization.HeatmapLayer({
          data: heatmapPoints,
          map: map,
          radius: 50,
          opacity: 0.6,
        })

        // Add markers for high-activity areas
        heatmapData.forEach((point, index) => {
          const marker = new window.google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map: map,
            title: `Territory ${index + 1}`,
          })

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold;">Territory ${index + 1}</h3>
                <p style="margin: 4px 0;"><strong>Activity Level:</strong> ${(point.weight * 100).toFixed(0)}%</p>
                <p style="margin: 4px 0;"><strong>Active Users:</strong> ${Math.floor(point.weight * 50000).toLocaleString()}</p>
              </div>
            `,
          })

          marker.addListener('click', () => {
            infoWindow.open(map, marker)
          })
        })
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setMapError('Failed to load Google Maps. Please check your API key and internet connection.')
      }
    }

    initMap()
  }, [])

  return (
    <Card className="mt-6">
      <Title level={4}>
        <MapPin className="inline mr-2" size={20} />
        Active Player Heatmap
      </Title>
      {mapError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <MapPin size={64} className="text-red-400 mx-auto mb-4" />
            <Text className="text-red-600 block mb-2">{mapError}</Text>
            <Text type="secondary" className="text-sm">
              Add your Google Maps API key to the .env file as VITE_GOOGLE_MAPS_API_KEY
            </Text>
          </div>
        </div>
      ) : (
        <div
          ref={mapContainer}
          className="rounded-lg"
          style={{ height: '500px', width: '100%' }}
        />
      )}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <Text className="text-xs">High Activity</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <Text className="text-xs">Medium Activity</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <Text className="text-xs">Low Activity</Text>
        </div>
      </div>
    </Card>
  )
}

export default GeospatialHeatmap
