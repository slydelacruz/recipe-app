import React, { useState } from 'react'

export const AddRecipeForm = ({setAddRecipeForm}) => {

    const cancelForm = () => {
        setAddRecipeForm(false)
    }

    return (
        <div className="form-container">
            <form className="recipe-form">
                <div className="form-group">
                    <div className="input-group">
                        <label>Title:</label>
                        <input type="text" name="title" />
                    </div>
                    <div className="input-group with-textarea">
                        <label>Description:</label>
                        <textarea rows="3"></textarea>
                    </div>

                    <div className="custom-group col-3">
                        <div className="input-group">
                            <label>Servings:</label>
                            <input type="number" name="servings" />
                        </div>
                        <div className="input-group">
                            <label>Prep Time:</label>
                            <input type="text" name="prepTime" />
                        </div>
                        <div className="input-group">
                            <label>Cook Time:</label>
                            <input type="text" name="cookTime" />
                        </div>
                    </div>
                </div>

                <h6>Directions</h6>
                <div className="form-group">
                    <div className="input-group">
                        <span>1.</span>
                        <input type="text" name="instructions" />
                    </div>
                    <div className="input-group">
                        <label>Optional:</label>
                        <div className="options">
                            <input type="radio" id="yes" name="options" value={true} />
                            <label htmlFor="yes">Yes</label>
                            <input type="radio" id="no" name="options" value={false} />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>


                <h6>Ingredients</h6>
                <div className="form-group ingredients">
                    <div className="input-group">
                        <label>Name:</label>
                        <input type="text" name="name" />
                    </div>

                    <div className="custom-group col-2">
                        <div className="input-group">
                            <label>Amount:</label>
                            <input type="number" name="amount" />
                        </div>
                        <div className="input-group">
                            <label>Measurement:</label>
                            <input type="text" name="measurement" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Specials Title:</label>
                        <input type="text" name="specialTitle" />
                    </div>
                    <div className="custom-group col-2">

                        <div className="input-group">
                            <label htmlFor="specialType">Type:</label>

                            <select value="event" name="specialType" id="specialType">
                                <option value="event">Event</option>
                                <option value="local">Local</option>
                                <option value="promocode">Promo Code</option>
                                <option value="sale">Sale</option>
                            </select>

                        </div>

                            <div className="input-group">
                                <label>Code:</label>
                                <input type="text" name="specialCode" />
                            </div> 
                    </div>

                    <div className="input-group">
                        <label>Description:</label>
                        <textarea rows="3"></textarea>
                    </div>
                </div>

                <div className="form-group btn">
                    <input type="reset" className="form-btn btn-cancel" value="Cancel" onClick={cancelForm} />
                    <input className="form-btn btn-submit" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}


