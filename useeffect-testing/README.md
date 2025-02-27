- In main.jsx change between App and App2 depending on what to demostrate.
- ``npm install``
- ``npm run dev`` in another terminal

App: will demonstrate all three possible second parameters of `useEffect`.
- without a second parameter, it will run after every time the component renders. 
- with an empty array, it will run once (after the first render of the component).
- with a dependency, it will run after the first render of the component and then only when the dependency changes. 

App2: will demonstrate that if `Component` were to be removed from the DOM, during e.g. conditional rendering, and then added again, it would behave as if it was a first render. I.e. all ``useEffect`` would run (and the state would have been lost). I.e. even `useEffect(..., [])` will run. 