import { Card, Typography, Badge, Pagination } from 'antd'
import { TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

interface Collection {
  id: number
  operator: string
  amount: number
  time: string
  status: 'completed'
}

// Mock real-time collections data
const mockCollections: Collection[] = [
  { id: 1, operator: '22Bet', amount: 47000000, time: '10:32 AM', status: 'completed' as const },
  { id: 2, operator: 'SportyBet', amount: 10100000, time: '10:32 AM', status: 'completed' as const },
  { id: 3, operator: 'Bet9ja', amount: 50000000, time: '10:05 AM', status: 'completed' as const },
  { id: 4, operator: 'SportyBet', amount: 35000000, time: '09:30 AM', status: 'completed' as const },
  { id: 5, operator: '1xBet', amount: 28000000, time: '08:15 AM', status: 'completed' as const },
  { id: 6, operator: 'BetKing', amount: 42000000, time: 'Yesterday', status: 'completed' as const },
  { id: 7, operator: 'NairaBet', amount: 18500000, time: 'Yesterday', status: 'completed' as const },
  { id: 8, operator: '22Bet', amount: 31000000, time: '2 days ago', status: 'completed' as const },
  { id: 9, operator: 'Bet9ja', amount: 55000000, time: '2 days ago', status: 'completed' as const },
  { id: 10, operator: 'SportyBet', amount: 29000000, time: '3 days ago', status: 'completed' as const },
]

const RealTimeCollectionsFeed = () => {
  const [collections, setCollections] = useState<Collection[]>(mockCollections)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a new collection
      if (Math.random() > 0.7) {
        const operators = ['Bet9ja', 'SportyBet', '1xBet', 'BetKing', '22Bet', 'NairaBet']
        const newCollection: Collection = {
          id: Date.now(),
          operator: operators[Math.floor(Math.random() * operators.length)],
          amount: Math.floor(Math.random() * 50000000) + 10000000,
          time: 'Just now',
          status: 'completed',
        }
        setCollections((prev) => [newCollection, ...prev])
        setCurrentPage(1) // Reset to first page when new item arrives
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get current page items
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentCollections = collections.slice(startIndex, endIndex)

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="m-0">
          <TrendingUp className="inline mr-2" size={18} />
          Real-Time Collections Feed
        </Title>
        <Badge status="processing" text="Live" />
      </div>

      <div className="space-y-3">
        {currentCollections.map((collection) => (
          <div
            key={collection.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-all"
            style={{
              animation: collection.time === 'Just now' ? 'slideIn 0.4s ease-out' : 'none',
              background: collection.time === 'Just now' ? '#f0fdf4' : '#fff',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: '#008751' }}
              >
                {collection.operator.charAt(0)}
              </div>
              <div>
                <Text strong className="block">
                  {collection.operator}
                </Text>
                <Text className="text-green-600 font-semibold">
                  ₦{(collection.amount / 1000000).toFixed(1)}M
                </Text>
              </div>
            </div>
            <Text type="secondary" className="text-xs">
              {collection.time}
            </Text>
          </div>
        ))}
      </div>

      {collections.length > pageSize && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={collections.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            size="small"
            showSizeChanger={false}
          />
        </div>
      )}
    </Card>
  )
}

export default RealTimeCollectionsFeed
