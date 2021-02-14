import React, { useEffect } from "react";

export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  const defaultUpdate: UpdateType = () => defaultValue
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  })
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue)
    return <ctx.Provider value={{ state, update }} {...props} />
  }
  return [ctx, Provider] as const
}

export const disableNextClick = () => {
  const listener = (evt: any)=> {
    evt.stopPropagation();
    document.removeEventListener('click', listener, true);
  };
  document.addEventListener('click', listener, true);
};
