// bookshelf-app/src/components/bookshelf-list-row.tsx

// Import deps
import React from 'react'

// Create interfaces
interface ApiarioListRowUI {
  position: number;
  apiario: {
    id: number;
    name: string;
    location: string;
    lat: string;
    long: string;
  }
  handleApiarioRemove: (id: number, name: string) => void;
  HandleApiarioSelect: (id: string, name: string) => void;
}

// Create BookshelfListRow component
export const ApiarioListRow = (props: ApiarioListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
    <button
        className="btn btn-remove"
        onClick={() => props.HandleApiarioSelect(String(props.apiario.id), props.apiario.name)}>
        {props.apiario.name}
      </button>
    </td>

    <td className="table-item">
      {props.apiario.location}
    </td>

    <td className="table-item">
      {props.apiario.lat}
    </td>

    <td className="table-item">
      {props.apiario.long}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleApiarioRemove(props.apiario.id, props.apiario.name)}>
        Rimuovi Apiario
      </button>
    </td>
  </tr>
)