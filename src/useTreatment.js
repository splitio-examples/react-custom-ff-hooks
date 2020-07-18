import { useContext, useDebugValue } from 'react';
import { SplitContext } from "@splitsoftware/splitio-react"

export default function useTreatment(treatmentName){
  const { client } = useContext(SplitContext);

  const treatmentValue = client.getTreatment(treatmentName);
  useDebugValue(`${treatmentName}: ${treatmentValue}`);

  return treatmentValue;
}
