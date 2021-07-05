import React from 'react'
import { Layout, Root, ScrollView, useViewport } from '@aragon/ui'
import Header from './Header/Header'

function MainView({ children }) {
  const { width: vw, below } = useViewport()
  const compactMode = below('medium')

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        height: 100vh;
      `}
    >
      <div
        css={`
          flex-shrink: 0;
        `}
      >
        <Header compactMode={compactMode} />
      </div>
      <div
        css={`
          flex-grow: 1;
          flex-shrink: 1;
          height: 0;
          display: flex;
        `}
      >
        <Root.Provider
          css={`
            flex-grow: 1;
            height: 100%;
            position: relative;
          `}
        >
          <ScrollView>
            <div
              css={`
                display: flex;
                flex-direction: column;
                height: 100%;
              `}
            >
              <div
                css={`
                  flex: 1 0 auto;
                `}
              >
                <Layout
                  parentWidth={vw - (compactMode ? 0 : 0)}
                  paddingBottom={0}
                >
                  {children}
                </Layout>
              </div>
            </div>
          </ScrollView>
        </Root.Provider>
      </div>
    </div>
  )
}

export default MainView
