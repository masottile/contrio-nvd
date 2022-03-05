# Frontend for Contrio

## Get started
1. run `npm install`
1. run `npm start`

## Folder structure documentation
Our contract creation interface is structured into Sections, Components, and Fields like so:
```json
{"section" : { 
        "component" : {"field": "value"}
}}
```

Our folder structure will relect this
```
\src\create
    \sections
        header.js
        <name of section>.js
        \headerComponent
            title.js
            freelancer.js
            client.js
        \<name of section>Components
            <name of component>.js
```

The `header.js` section file will reference the components in the `\headerComponent` folder. The component files will all contain info about the fields that component contains. Next step (once we set up a basic implementation) is to ensure we can still send entered data to the backend. We can also draw a diagram in Drive that illustrates the interactions between all these files and folders.