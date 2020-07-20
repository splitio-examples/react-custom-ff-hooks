import React from "react";
import useTreatment from "./useTreatment";

const DELETE_TREATMENT='talia_todolist_delete';

export default function TodoItems({deleteItem,entries}){
  const allowDelete = useTreatment(DELETE_TREATMENT) === 'on';

  const listItems = entries.map( (item) => {
    return <li key={item.key}>{item.text}
      {allowDelete && <button onClick={() => deleteItem(item.key)}>x</button>}
    </li>
  });

  return (
      <ul className="theList">
      {listItems}
    </ul>
  );
}

