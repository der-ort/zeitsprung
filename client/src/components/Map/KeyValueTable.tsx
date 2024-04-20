import React from 'react';

interface Props {

}

// a helper function to map keys and values in a table :)
// can be reused for any object :)

const KeyValueTable: React.FC<Props> = ({ data, head }) => {
 
    return <>
    <table>
        {/* render head conditionally */}
      {head ? <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead> : ''}
      
      <tbody>
        {Object.entries(data).map(([key, value], index) => (
          <tr key={index}>
            <td><b>{key}</b></td>
            <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
};

export default KeyValueTable;