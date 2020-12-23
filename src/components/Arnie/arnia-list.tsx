// app/src/components/apiario-list.tsx

// Import deps
import React from 'react'

// Import components
import { ArniaListRow } from './arnia-list-row'

// Import styles
import './../../styles/apiario-list.css'

// Create interfaces
interface ArniaUI {
  id: number;
  name: string;
  location_id: number;
}

interface ArniaListUI {
  arnie: ArniaUI[];
  loading: boolean;
  handleArniaRemove: (id: number, name: string) => void;
}

// Create ApiarioList component
export const ArniaList = (props: ArniaListUI) => {
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
          {props.arnie.length > 0 ? (
            props.arnie.map((arnia: ArniaUI, idx) => (
              <ArniaListRow
                key={arnia.id}
                arnia={arnia}
                position={idx + 1}
                handleArniaRemove={props.handleArniaRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>Non ci sono Arnie disponibili. Creane uno!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}