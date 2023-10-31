
import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from 'react-query'


type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const QueryClientContextProvider: React.FC<Props> = ({children}) => {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryClientContextProvider