import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import { Col, Row, Button, Table } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

const Clock = (props) => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString(),
  )

  const [fibonacciSeries, setFibonacciSeries] = useState([])
  const [currentTime, setCurrentTime] = useState('')

  const createFibonacci = () => {
    let currentTime = currentDate.split(' ')[1]
    let seeds = currentTime.split(':')[1]
    let resultNumber = parseInt(currentTime.split(':')[2])
    let initialSerie = []
    initialSerie.push(parseInt(seeds[0]), parseInt(seeds[1]))
    setCurrentTime(currentTime)
    generateSerie(initialSerie, resultNumber)
  }

  const generateSerie = (initialSerie, resultNumber) => {
    for (let i = 0; i < resultNumber; i++) {
      const newNumber =
        initialSerie[initialSerie.length - 2] +
        initialSerie[initialSerie.length - 1]
      initialSerie.push(newNumber)
    }
    setFibonacciSeries(initialSerie)
  }

  useEffect(() => {
    let secTimer = setInterval(() => {
      setCurrentDate(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(secTimer)
  }, [])

  let message = (
    <p>Oprime el boton para conocer la serie con tu hora actual!!!</p>
  )

  let columns = [
    { dataField: 'indice', text: 'Indice' },
    { dataField: 'valor', text: 'valor' },
  ]
  let data

  if (fibonacciSeries.length > 0) {
    data = fibonacciSeries.map((value, index) => {
      return {
        indice: index + 1,
        valor: value,
      }
    })
  }

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
  })

  return (
    <Row className="justify-content-center">
      <Col className="text-center">
        <h1>
          <b>Prueba Front End de Proteccion S.A</b>
        </h1>
        <p>
          Se requiere conocer los N primeros números de la serie Fibonacci para
          las semillas X y Y.
        </p>
        <p>
          <b>{currentDate}</b>
        </p>
        <Button onClick={() => createFibonacci()}>Serie de Fibonacci</Button>
        {fibonacciSeries.length > 0 ? (
          <>
            <p>
              Hora Exacta del Click:
              <p>
                <b>{currentTime}</b>
              </p>
            </p>
            <BootstrapTable
              keyField="indice"
              data={data}
              columns={columns}
              pagination={pagination}
            />
          </>
        ) : (
          message
        )}
      </Col>
    </Row>
  )
}

export default Clock
