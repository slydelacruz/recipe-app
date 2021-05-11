import React, { useContext } from 'react'
import { Context } from './Context'

export const Recipe = ({ setRecipeDetails }) => {
    const { recipes } = useContext(Context)

    const recipe = recipes.map((recipe, i) => {
        if (recipe.images !== undefined) {
            return (
                <div key={`recipe-${i}`} className="recipe" >
                    <div className="recipe__image" style={{ backgroundImage: `url(${recipe.images.full})` }}></div>
                    <div className="recipe__description">
                        <h2 className="recipe__title">{recipe.title}</h2>
                        <p className="recipe__text">{recipe.description}</p>
                        <button onClick={() => setRecipeDetails({ recipeId: recipe.uuid, show: true })} className="btn-more">Learn more</button>
                    </div>
                </div >
            )
        }
        else return null
    })

    return (
        <>
            {recipe}
        </>
    )
}
