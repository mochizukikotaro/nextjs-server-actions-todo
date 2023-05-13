"use client";
import { useTransition } from "react";
import { toggleDone } from "./_action";
interface Props {
  id: string;
  name: string;
  done: boolean;
}
export default function CheckBox({ id, name, done }: Props) {
  let [isPending, startTransition] = useTransition();
  if (isPending) {
    return <>loading...</>;
  }
  return (
    <>
      <input
        id={id}
        type="checkbox"
        onChange={() => {
          startTransition(async () => {
            const response = await toggleDone(id, done);
            // TODO: toast
          });
        }}
        checked={done}
      />
      <label htmlFor={id} className={done ? "line-through" : ""}>
        {name}
      </label>
    </>
  );
}
