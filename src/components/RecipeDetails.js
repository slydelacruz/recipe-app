import React, { useContext } from 'react'
import { Context } from './Context'

export const RecipeDetails = ({ recipeDetails, setRecipeDetails }) => {
    const { recipes, specials } = useContext(Context)
    const detail = recipes.find(details => details.uuid === recipeDetails.recipeId)
    const closeRecipeHandler = () => {
        setRecipeDetails({ recipeId: null, show: false })
    }

    const directions = detail.directions.map((direction, i) => {
        return (
            <li key={`directions-${i}`}><span>{i + 1}.</span> <div>{direction.instructions} {direction.optional && <span className="optional"> (Optional) </span>}</div></li>
        )
    })

    const ingredients = detail.ingredients.map((ingredient, i) => {
        const getSpecial = specials.find(special => ingredient.uuid === special.ingredientId)
        const specialEvent = () => {
            return (
                <div className="special-event">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="exclamation-circle" className="svg-inline--fa fa-exclamation-circle fa-w-16" xmlns="http:www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" /></svg>
                    <div>
                        <h5>{getSpecial.title}<span> ({getSpecial.type})</span>{getSpecial.type === "promocode" ? <span className="promo-code"> - ${getSpecial.code}</span> : ''}</h5>
                        <p>{getSpecial.text}</p>
                    </div>

                </div>
            )
        }
        return (
            <li key={`ingredients-${i}`}>
                <svg aria-hidden="true" data-prefix="fas" data-icon="check" className="svg-inline--fa fa-check fa-w-16" xmlns="http:www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#dc2430" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" /></svg>
                <div className="ingredients__content">
                    <p className="ingredients__name">{ingredient.name} {ingredient.amount != null && <>- <span className="amount"> ({ingredient.amount}) </span></>} <span className="measurement">{ingredient.measurement}</span> </p>
                    {getSpecial !== undefined && specialEvent()}
                </div>
            </li>
        )
    })

    return (
        <div className="recipe-overlay">
            <div className="recipe-details">
                <button onClick={closeRecipeHandler} className="recipe-details__close">close</button>
                <div className="recipe-details__content">
                    <div className="recipe-details__header">
                        <h2>{detail.title}</h2>
                        <div className="recipe-details__sub-title">
                            <p>Cook Time: <span>{detail.cookTime} mins.</span></p>
                            <p>Preparation Time: <span>{detail.prepTime} mins.</span></p>
                            <p>Servings: <span>{detail.servings}</span></p>
                        </div>
                    </div>
                    <h4>Directions:</h4>
                    <ul className="directions">
                        {directions}
                    </ul>

                    <h4>Ingredients:</h4>
                    <ul className="ingredients">
                        {ingredients}
                    </ul>
                </div>
            </div>
        </div >
    )
}
