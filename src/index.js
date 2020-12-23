// app/src/index.tsx

// Import deps
import React from 'react'
import { render } from 'react-dom'

// Import components
import { Apiario } from './components/Apiario/apiario'
import { Arnie } from './components/Arnie/arnie'

// Import styles
import './styles/styles.css'

// Find div container
const rootElement = document.getElementById('root')

// Render Apiario component in the DOM
render(
    <div>
      <Apiario />
      <Arnie />
    </div>
  , rootElement
)