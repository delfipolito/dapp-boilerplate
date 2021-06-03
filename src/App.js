import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Main, ToastHub } from '@aragon/ui'
import theme from './theme'
import AppLoader from './components/AppLoader'
import GlobalErrorHandler from './GlobalErrorHandler'
import MainView from './components/MainView'
import Routes from './Routes'
import { WalletProvider } from './providers/Wallet'

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Main
          assetsUrl="/aragon-ui/"
          layout={false}
          scrollView={false}
          theme={theme}
        >
          <GlobalErrorHandler>
            <ToastHub threshold={1} timeout={1500}>
              <MainView>
                <AppLoader>
                  <Routes />
                </AppLoader>
              </MainView>
            </ToastHub>
          </GlobalErrorHandler>
        </Main>
      </BrowserRouter>
    </WalletProvider>
  )
}

export default App
