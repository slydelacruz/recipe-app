import React, { useContext, useState } from 'react'
import { Context } from './Context'

export const EditRecipeForm = ({ editRecipeForm, setEditRecipeForm }) => {
    const { recipes, specials } = useContext(Context)
    const detail = recipes.find(details => details.uuid === editRecipeForm.recipeId)
    const [title, setTitle] = useState(detail.title)
    const [description, setDescription] = useState(detail.description)
    const [servings, setServings] = useState(detail.servings)
    const [prepTime, setPrepTime] = useState(detail.prepTime)
    const [cookTime, setCookTime] = useState(detail.cookTime)
    const [ingredients, setIngredients] = useState(detail.ingredients)
    const [directions, setDirections] = useState(detail.directions)
    const [specialsEvent, setSpecialsEvent] = useState(specials)

    const updateRecipe = id => {
        let newRecipe = { title, description, servings, prepTime, cookTime, ingredients, directions }

        fetch(`http://localhost:3001/recipes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newRecipe),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.json())

    }

    const cancelForm = () => {
        setEditRecipeForm({ show: false, recipeId: null })
    }

    const handleInstructions = (e, i) => {
        let newInstructions = [...directions];
        newInstructions[i].instructions = e.target.value;
        setDirections(newInstructions);
    }

    const handleOptions = (e, i) => {
        let newOptions = [...directions];
        newOptions[i].optional = e.target.value;
        setDirections(newOptions);
    }

    const handleIngName = (e, i) => {
        let newIngName = [...ingredients]
        newIngName[i].name = e.target.value;
        setIngredients(newIngName);
    }

    const handleIngAmount = (e, i) => {
        let newIngAmount = [...ingredients]
        newIngAmount[i].amount = e.target.value;
        setIngredients(newIngAmount);
    }

    const handleIngMeasurement = (e, i) => {
        let newIngMeasurement = [...ingredients]
        newIngMeasurement[i].measurement = e.target.value;
        setIngredients(newIngMeasurement);
    }

    const handleSpTitle = (e, i) => {
        let newSpTitle = [...specialsEvent]
        for (let id in newSpTitle) {
            if (newSpTitle[id].uuid === i) {
                newSpTitle[id].title = e.target.value
                break
            }
        }
        setSpecialsEvent(newSpTitle);
    }

    const handleSpType = (e, i) => {
        let newSpType = [...specialsEvent]
        for (let id in newSpType) {
            if (newSpType[id].uuid === i) {
                newSpType[id].type = e.target.value
                break
            }
        }
        setSpecialsEvent(newSpType);
    }

    const handleSpCode = (e, i) => {
        let newSpCode = [...specialsEvent]
        for (let id in newSpCode) {
            if (newSpCode[id].uuid === i) {
                newSpCode[id].code = e.target.value
                break
            }
        }
        setSpecialsEvent(newSpCode);
    }

    const handleSpText = (e, i) => {
        let newSpText = [...specialsEvent]
        for (let id in newSpText) {
            if (newSpText[id].uuid === i) {
                newSpText[id].text = e.target.value
                break
            }
        }
        setSpecialsEvent(newSpText);
    }

    const ingredientsEl = ingredients.map((ingredient, i) => {
        const getSpecial = specialsEvent.find(special => ingredient.uuid === special.ingredientId)

        const specialEvent = () => {
            return (
                <>
                    <div className="input-group">
                        <label>Specials Title:</label>
                        <input type="text" name="specialTitle" value={getSpecial.title} onChange={e => handleSpTitle(e, getSpecial.uuid)} />
                    </div>
                    <div className="custom-group col-2">

                        <div className="input-group">
                            <label htmlFor="specialType">Type:</label>

                            <select value={getSpecial.type} name="specialType" id="specialType" onChange={e => handleSpType(e, getSpecial.uuid)}>
                                <option value="event">Event</option>
                                <option value="local">Local</option>
                                <option value="promocode">Promo Code</option>
                                <option value="sale">Sale</option>
                            </select>

                        </div>

                        {getSpecial.type === "promocode" ?
                            <div className="input-group">
                                <label>Code:</label>
                                <input type="text" name="specialCode" value={getSpecial.code || ''} onChange={e => handleSpCode(e, getSpecial.uuid)} />
                            </div> : ''
                        }
                    </div>

                    <div className="input-group">
                        <label>Description:</label>
                        <textarea rows="3" value={getSpecial.text} onChange={e => handleSpText(e, getSpecial.uuid)}></textarea>
                    </div>
                </>
            )
        }

        return (

            <div key={`ingredient-${i}`} className="form-group ingredients">
                <div className="input-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={ingredient.name} onChange={e => handleIngName(e, i)} />
                </div>

                <div className="custom-group col-2">
                    <div className="input-group">
                        <label>Amount:</label>
                        <input type="number" name="amount" value={ingredient.amount} onChange={e => handleIngAmount(e, i)} />
                    </div>
                    <div className="input-group">
                        <label>Measurement:</label>
                        <input type="text" name="measurement" value={ingredient.measurement} onChange={e => handleIngMeasurement(e, i)} />
                    </div>
                </div>
                {getSpecial !== undefined && specialEvent()}
            </div>
        )
    })

    const directionsEl = directions.map((direction, i) => {
        return (
            <div key={`directions-${i}`} className="form-group">
                <div className="input-group">
                    <span>{i + 1}.</span>
                    <input type="text" name="instructions" value={direction.instructions} onChange={e => handleInstructions(e, i)} />
                </div>
                <div className="input-group">
                    <label>Optional:</label>
                    <div className="options">
                        <input type="radio" id={`yes${i}`} name={`option${i}`} value={true} onClick={e => handleOptions(e, i)} defaultChecked={direction.optional && true} />
                        <label htmlFor={`yes${i}`}>Yes</label>
                        <input type="radio" id={`no${i}`} name={`option${i}`} value={false} onClick={e => handleOptions(e, i)} defaultChecked={!direction.optional && true} />
                        <label htmlFor={`no${i}`}>No</label>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="form-container">
            <form className="recipe-form" onSubmit={() => updateRecipe(detail.uuid)}>
                <div className="form-group">
                    <div className="input-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="input-group with-textarea">
                        <label>Description:</label>
                        <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>

                    <div className="custom-group col-3">
                        <div className="input-group">
                            <label>Servings:</label>
                            <input type="number" name="servings" value={servings} onChange={e => setServings(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Prep Time:</label>
                            <input type="text" name="prepTime" value={prepTime} onChange={e => setPrepTime(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Cook Time:</label>
                            <input type="text" name="cookTime" value={cookTime} onChange={e => setCookTime(e.target.value)} />
                        </div>
                    </div>
                </div>

                <h6>Directions</h6>
                {directionsEl}


                <h6>Ingredients</h6>
                {ingredientsEl}

                <div className="form-group btn">
                    <input type="reset" className="form-btn btn-cancel" value="Cancel" onClick={cancelForm} />
                    <input className="form-btn btn-submit" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}


