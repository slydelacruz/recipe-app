import React, { useState, useEffect } from 'react'

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([])
    const [specials, setSpecials] = useState([])


    useEffect(() => {
        fetch('http://localhost:3001/recipes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data)
            })

        fetch('http://localhost:3001/specials')
            .then(response => response.json())
            .then(data => {
                setSpecials(data)
            })
    }, [])

    return <Context.Provider value={{ recipes, specials }}>{children}</Context.Provider>
}
