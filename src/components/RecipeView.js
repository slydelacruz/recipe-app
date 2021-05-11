import React, { useContext, useState } from 'react'
import { AddRecipeForm } from './AddRecipeForm'
import { Context } from './Context'
import { EditRecipeForm } from './EditRecipeForm'

export const RecipeView = ({ setOpenRecipeView }) => {
    const { recipes } = useContext(Context)
    const [editRecipeForm, setEditRecipeForm] = useState({ show: false, recipeId: null })
    const [addRecipeForm, setAddRecipeForm] = useState(false)

    const recipeItem = recipes.map((recipe, i) => {
        if (recipe.hasOwnProperty('title') === true) {
            return (
                <li key={`recipe-${i}`} className="recipes-list__item"><p>{recipe.title}</p>
                    <button onClick={() => setEditRecipeForm({ show: true, recipeId: recipe.uuid })} className="btn-edit">
                        <svg aria-hidden="true" data-prefix="fas" data-icon="edit" className="svg-inline--fa fa-edit fa-w-18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill="#dc2430" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" /></svg>
                    </button>
                </li >
            )
        }
        else return null
    })

    return (
        <div className="recipe-view">
            <button onClick={() => setOpenRecipeView(false)} className="recipe-view__close">
                <svg aria-hidden="true" data-prefix="fas" data-icon="long-arrow-alt-left" className="svg-inline--fa fa-long-arrow-alt-left fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#dc2430" d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            </button>
            <div className="recipe-view__content">
                <h1>Recipes</h1>
                <ul className="recipes-list">
                    {recipeItem}
                </ul>
            </div>
            {editRecipeForm.show && <EditRecipeForm editRecipeForm={editRecipeForm} setEditRecipeForm={setEditRecipeForm} />}
            {addRecipeForm && <AddRecipeForm setAddRecipeForm={setAddRecipeForm}/>}
            <button onClick={() => setAddRecipeForm(true)} className="btn-add">+</button>
        </div>
    )
}
