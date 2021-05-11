import React, { useState, useEffect } from 'react'
import { Recipe } from './Recipe'
import { RecipeDetails } from './RecipeDetails'
import { RecipeView } from './RecipeView'

export const RecipeList = () => {
    const [recipeDetails, setRecipeDetails] = useState({ show: false, recipeId: null })
    const [openRecipeView, setOpenRecipeView] = useState(false)

    const viewRecipes = () => {
        if(openRecipeView) {
            document.body.classList.add('scroll-disabled')
        }
        else {
            document.body.classList.remove('scroll-disabled')
        }
        setOpenRecipeView(true)
    }

    useEffect(() => {
        if (recipeDetails.show === true) {
            document.body.classList.add('scroll-disabled')
            document.querySelector('.recipe-list').classList.add('blur')
        }
        else {
            document.body.classList.remove('scroll-disabled')
            document.querySelector('.recipe-list').classList.remove('blur')
        }
    }, [recipeDetails])
    return (
        <>
            {recipeDetails.show && <RecipeDetails recipeDetails={recipeDetails} setRecipeDetails={setRecipeDetails} />}
            {openRecipeView && <RecipeView setOpenRecipeView={setOpenRecipeView}/>}
            <div className="recipe-list">
                <Recipe setRecipeDetails={setRecipeDetails} />
            </div>
            <button onClick={viewRecipes} className="btn-update">Add/Update<span>Recipes</span></button>
        </>
    )
}
