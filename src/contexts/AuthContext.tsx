import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'admin' | 'consultant' | 'operator'

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database for testing
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@rotcs.gov': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@rotcs.gov',
      role: 'admin',
      name: 'Admin User',
    },
  },
  'consultant@rotcs.gov': {
    password: 'consultant123',
    user: {
      id: '2',
      email: 'consultant@rotcs.gov',
      role: 'consultant',
      name: 'Consultant User',
    },
  },
  'operator@rotcs.gov': {
    password: 'operator123',
    user: {
      id: '3',
      email: 'operator@rotcs.gov',
      role: 'operator',
      name: 'Operator User',
    },
  },
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rotcs_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('rotcs_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userRecord = MOCK_USERS[email.toLowerCase()]

    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid email or password')
    }

    const authenticatedUser = userRecord.user
    setUser(authenticatedUser)
    localStorage.setItem('rotcs_user', JSON.stringify(authenticatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rotcs_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
