// bookshelf-app/src/components/bookshelf-list-row.tsx

// Import deps
import React from 'react'

// Create interfaces
interface ArniaListRowUI {
  position: number;
  arnia: {
    id: number;
    name: string;
    location_id: number;
  }
  handleArniaRemove: (id: number, name: string) => void;
}

// Create BookshelfListRow component
export const ArniaListRow = (props: ArniaListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.arnia.name}
    </td>

    <td className="table-item">
      {props.arnia.location_id}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleArniaRemove(props.arnia.id, props.arnia.name)}>
        Rimuovi Arnia
      </button>
    </td>
  </tr>
)