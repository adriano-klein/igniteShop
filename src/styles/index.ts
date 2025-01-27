import { createStitches } from '@stitches/react'

export const {
  config, 
  styled, 
  globalCss, 
  keyframes, 
  getCssText, 
  theme, 
  createTheme, 
  css 
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray900: '#121214',
      gray800: '#202024',
      gray300: '#e1e1e6',
      gray100:'#C4C4CC',

      green500:'#00875f',
      green300: '#00b37e'
    }
  }
})