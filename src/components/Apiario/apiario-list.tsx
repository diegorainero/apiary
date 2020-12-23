// app/src/components/apiario-list.tsx

// Import deps
import React from 'react'

// Import components
import { ApiarioListRow } from './apiario-list-row'

// Import styles
import './../../styles/apiario-list.css'

// Create interfaces
interface ApiarioUI {
  id: number;
  name: string;
  location: string;
  lat: string;
  long: string;
}

interface ApiarioListUI {
  apiari: ApiarioUI[];
  loading: boolean;
  handleApiarioRemove: (id: number, name: string) => void;
  HandleApiarioSelect: (id: string, name: string) => void;
}

// Create ApiarioList component
export const ApiarioList = (props: ApiarioListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Nome Apiario</th>

            <th className="table-head-item">Location</th>

            <th className="table-head-item">Latitudine</th>

            <th className="table-head-item">Longitudine</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.apiari.length > 0 ? (
            props.apiari.map((apiario: ApiarioUI, idx) => (
              <ApiarioListRow
                key={apiario.id}
                apiario={apiario}
                position={idx + 1}
                handleApiarioRemove={props.handleApiarioRemove}
                HandleApiarioSelect={props.HandleApiarioSelect}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>Non ci sono Apiari disponibili. Creane uno!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}