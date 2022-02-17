import { Fragment } from 'react'
import Clock from './components/Clock'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Fragment>
      <Container>
        <Clock />
      </Container>
    </Fragment>
  )
}

export default App
