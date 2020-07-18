import { useClient } from "@splitsoftware/splitio-react"
import React from "react";

const DELETE_TREATMENT='talia_todolist_delete';

export default function TodoItems({deleteItem,entries}){
  const client = useClient();
  const deleteTreatment = client.getTreatment(DELETE_TREATMENT);
  const allowDelete = deleteTreatment === 'on';

  const listItems = entries.map( (item) => {
    return <li key={item.key} className={allowDelete?"-deletable":null}>{item.text}
      {allowDelete && <button onClick={() => deleteItem(item.key)}>x</button>}
    </li>
  });

  return (
      <ul className="theList">
      {listItems}
    </ul>
  );
}
