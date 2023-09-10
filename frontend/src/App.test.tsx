import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import  App  from './App'

it('renders hello message', () => {
  render(<App />)
  expect(screen.getByText('Click on the Vite and React logos to learn more')).toBeInTheDocument()
})