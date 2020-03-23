
- automatically colorize each shape
    - --> CAGED colors? 
        - Cyan, grAy, Green, bluE, reD 
- shadow dots
    - ~~in compact notation, add a '-' to the position: "X,3-,2-,0,1,0"~~
    - ~~uppercase X : display 'X'~~
    - ~~lowercase x : display nothing~~
    - specify which strings to show    
- css class per interval, per note name, per string, per fret    
    --> .i-X .n-X, .s-X .f-X
    --> for root: .r
    --> for non-played string: .x
    
- force string color    
    
- layout:
    - standard
    - compact
    - real (smae spacing as in a real fretboard)
    - right-hand
    - left-hand
    - mirror horizontal
    - mirror vertical

- intervals
    - roman: I, II, III, ...
    - arab: 1, 2, 3, ...
- minor intervals:
    - 3m
    - iii (lowercase)        
    
# refactor:

- Fretboard, FretNumbers and Shape component must return a SVG <g> element.

# Ideas:

    <Fretboard>
        <Shape />
        <Shape />
        <Connection from="A" to="A5" />
        <Pattern ... />
    </Fretboard>

-----

- https://www.fullstackreact.com/p/advanced-component-configuration-with-props-state-and-children/
- https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e

# typescript

    yarn add react react-dom @types/react @types/react-dom

- https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
- https://fettblog.eu/typescript-react/events/
- https://mattferderer.com/default-props-in-react-with-typescript

# react

- https://react-styleguidist.js.org/
    - see https://github.com/KaiHotz/react-rollup-boilerplate
