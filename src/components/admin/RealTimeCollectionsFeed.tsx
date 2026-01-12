import { Card, Typography, Badge, Pagination, Tag } from 'antd'
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

interface BettingRecord {
  id: number
  playerName: string
  company: string
  betType: string
  stake: number
  outcome: 'win' | 'loss'
  payout: number
  time: string
  state: string
}

interface RealTimeCollectionsFeedProps {
  selectedState: string
  selectedCompany: string
}

// Nigerian states
const nigerianStates = [
  'Lagos', 'Kano', 'Rivers', 'Kaduna', 'Oyo', 'Abuja', 'Anambra', 
  'Delta', 'Edo', 'Enugu', 'Imo', 'Ogun', 'Ondo', 'Osun', 'Plateau'
]

// Mock betting records data
const mockRecords: BettingRecord[] = [
  { id: 1, playerName: 'Chidi O.', company: 'SportyBet', betType: 'Football - Premier League', stake: 5000, outcome: 'win', payout: 12500, time: 'Just now', state: 'Lagos' },
  { id: 2, playerName: 'Amaka N.', company: 'Bet9ja', betType: 'Virtual Racing', stake: 2000, outcome: 'loss', payout: 0, time: 'Just now', state: 'Abuja' },
  { id: 3, playerName: 'Tunde A.', company: 'BetKing', betType: 'Basketball - NBA', stake: 10000, outcome: 'win', payout: 18000, time: '1 min ago', state: 'Lagos' },
  { id: 4, playerName: 'Ngozi M.', company: 'NairaBet', betType: 'Tennis - ATP', stake: 3500, outcome: 'win', payout: 7000, time: '2 mins ago', state: 'Rivers' },
  { id: 5, playerName: 'Ibrahim K.', company: '1xBet', betType: 'Football - La Liga', stake: 8000, outcome: 'loss', payout: 0, time: '3 mins ago', state: 'Kano' },
  { id: 6, playerName: 'Blessing U.', company: 'SportyBet', betType: 'Virtual Football', stake: 1500, outcome: 'win', payout: 4500, time: '5 mins ago', state: 'Oyo' },
  { id: 7, playerName: 'Emeka P.', company: 'Bet9ja', betType: 'Cricket - IPL', stake: 6000, outcome: 'loss', payout: 0, time: '7 mins ago', state: 'Anambra' },
  { id: 8, playerName: 'Fatima S.', company: '22Bet', betType: 'Football - Serie A', stake: 12000, outcome: 'win', payout: 24000, time: '10 mins ago', state: 'Kaduna' },
  { id: 9, playerName: 'Oluwaseun D.', company: 'BetKing', betType: 'Boxing', stake: 4000, outcome: 'win', payout: 9200, time: '12 mins ago', state: 'Lagos' },
  { id: 10, playerName: 'Chioma E.', company: 'NairaBet', betType: 'Horse Racing', stake: 7500, outcome: 'loss', payout: 0, time: '15 mins ago', state: 'Enugu' },
]

const companies = ['Bet9ja', 'SportyBet', '1xBet', 'BetKing', '22Bet', 'NairaBet']
const betTypes = [
  'Football - Premier League',
  'Football - La Liga',
  'Football - Serie A',
  'Basketball - NBA',
  'Tennis - ATP',
  'Virtual Racing',
  'Virtual Football',
  'Cricket - IPL',
  'Boxing',
  'Horse Racing',
]
const playerNames = [
  'Chidi O.', 'Amaka N.', 'Tunde A.', 'Ngozi M.', 'Ibrahim K.',
  'Blessing U.', 'Emeka P.', 'Fatima S.', 'Oluwaseun D.', 'Chioma E.',
  'Adebayo L.', 'Zainab H.', 'Chukwuma I.', 'Aisha B.', 'Kunle F.'
]

const RealTimeCollectionsFeed = ({ selectedState, selectedCompany }: RealTimeCollectionsFeedProps) => {
  const [records, setRecords] = useState<BettingRecord[]>(mockRecords)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Simulate real-time betting activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new betting record randomly
      if (Math.random() > 0.6) {
        const stake = Math.floor(Math.random() * 15000) + 1000
        const isWin = Math.random() > 0.5
        const multiplier = isWin ? (Math.random() * 2 + 1.5) : 0
        
        const newRecord: BettingRecord = {
          id: Date.now(),
          playerName: playerNames[Math.floor(Math.random() * playerNames.length)],
          company: companies[Math.floor(Math.random() * companies.length)],
          betType: betTypes[Math.floor(Math.random() * betTypes.length)],
          stake: stake,
          outcome: isWin ? 'win' : 'loss',
          payout: Math.floor(stake * multiplier),
          time: 'Just now',
          state: nigerianStates[Math.floor(Math.random() * nigerianStates.length)],
        }
        setRecords((prev) => [newRecord, ...prev])
        setCurrentPage(1)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Filter records based on selected state and company
  const filteredRecords = records.filter((record) => {
    const stateMatch = selectedState === 'all' || record.state === selectedState
    const companyMatch = selectedCompany === 'all' || record.company === selectedCompany
    return stateMatch && companyMatch
  })

  // Get current page items
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentRecords = filteredRecords.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedState, selectedCompany])

  return (
    <Card className="shadow-sm">
      {/* Header with Title and Live Badge */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <Title level={4} className="m-0 flex items-center gap-2">
          <TrendingUp size={20} className="sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg">Real-Time Betting Activity Feed</span>
        </Title>
        <div className="flex items-center gap-2 sm:gap-4">
          <Text className="text-xs sm:text-sm text-gray-600">
            {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''}
          </Text>
          <Badge status="processing" text="Live" className="text-sm sm:text-base" />
        </div>
      </div>

      <div className="space-y-2">
        {currentRecords.length > 0 ? (
          currentRecords.map((record) => (
            <div
              key={record.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all border-l-4"
              style={{
                animation: record.time === 'Just now' ? 'slideIn 0.4s ease-out' : 'none',
                background: '#f9fafb',
                borderLeftColor: record.outcome === 'win' ? '#10b981' : '#ef4444',
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                {/* Company Avatar */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
                  style={{ background: '#059669' }}
                >
                  {record.company.charAt(0)}
                </div>
                
                {/* Betting Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                    <Text strong className="text-sm sm:text-base">{record.playerName}</Text>
                    <Text type="secondary" className="text-xs">• {record.company}</Text>
                    <Tag color="blue" className="text-xs">{record.state}</Tag>
                  </div>
                  <Text className="text-xs sm:text-sm text-gray-600 block truncate">{record.betType}</Text>
                </div>
              </div>

              {/* Stake & Outcome */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {record.outcome === 'win' ? (
                      <ArrowUpRight size={14} className="text-green-600" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-600" />
                    )}
                    <Tag color={record.outcome === 'win' ? 'success' : 'error'} className="m-0 text-xs">
                      {record.outcome.toUpperCase()}
                    </Tag>
                  </div>
                  <div className="space-y-0.5">
                    <Text className="text-xs text-gray-500 block">Stake: ₦{record.stake.toLocaleString()}</Text>
                    {record.outcome === 'win' && (
                      <Text className="text-xs sm:text-sm font-bold text-green-600 block">
                        +₦{record.payout.toLocaleString()}
                      </Text>
                    )}
                  </div>
                </div>
                
                {/* Timestamp */}
                <Text type="secondary" className="text-xs flex-shrink-0">
                  {record.time}
                </Text>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Text type="secondary">No betting records found for the selected filters</Text>
          </div>
        )}
      </div>

      {filteredRecords.length > pageSize && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredRecords.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      )}
    </Card>
  )
}

export default RealTimeCollectionsFeed
