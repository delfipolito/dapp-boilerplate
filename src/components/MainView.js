import React from 'react'
import {
  GU,
  Layout,
  Link,
  Root,
  ScrollView,
  textStyle,
  useTheme,
  useViewport,
} from '@aragon/ui'
import Header from './Header/Header'

function MainView({ children }) {
  const { width: vw, below } = useViewport()
  const theme = useTheme()
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
              <footer
                css={`
                  flex-shrink: 0;
                  margin-bottom: ${5 * GU}px;
                  width: 100%;
                  text-align: center;
                  ${textStyle('body2')};
                  color: ${theme.surfaceContentSecondary};
                `}
              >
                Footer & <Link href="https://aragon.one"> footer link</Link>.
              </footer>
            </div>
          </ScrollView>
        </Root.Provider>
      </div>
    </div>
  )
}

export default MainView
