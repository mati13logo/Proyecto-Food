import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { getRecipes, getTypes, postRecipes } from "../../actions";
import './CreateRecipe.css'


function validate(input) {
    let errors = {}
    let patron = new RegExp('^[ñíóáéú a-zA-Z ]+$')

    if (!input.name) errors.name = 'Name is require'
    else if (!patron.test(input.name)) {
        errors.name = 'Invalid character entered'
    }
    if (!input.score) errors.score = 'Score is require'
    else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.score)) {
        errors.score = 'The number must be between 0 and 100'
    }
    if (!input.summary) errors.summary = 'Summary is require'
    if (!input.healthScore) errors.healthScore = 'HealthScore is require'
    else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.healthScore)) {
        errors.healthScore = 'The number must be between 0 and 100'
    }
    if (!input.steps) errors.steps = 'Steps is require'
    if (!input.image) errors.image = 'Image is require'
    else if (!/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/.test(input.image)) {
        errors.image = 'This is not a picture'
    } else if (!/.*(png|jpg|jpeg|gif)$/.test(input.image)) {
        errors.image = 'This is not a picture'
    }
    if (!input.diets.length) errors.diets = 'You must select at least one diet type';


    return errors
}


export default function CreateRecipes() {
    const dispatch = useDispatch();
    const typesAll = useSelector((state) => state.types)
    const history = useHistory()
    const [errors, setErrors] = useState({
        name: 'Name is require'
    })

    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: 0,
        healthScore: 0,
        image: '',
        steps: '',
        diets: [],
    })


    useEffect(() => {
        dispatch(getTypes())
        dispatch(getRecipes())
    }, []);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleCheck(e) {
        let newarray = input.diets;
        let find = newarray.indexOf(e.target.value);

        if (find >= 0) {
            newarray.splice(find, 1);

        } else {
            newarray.push(e.target.value)
        }

        setInput({
            ...input,
            diets: newarray
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }

    function handleNumber(e) {
        try {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        } catch {
            console.log('error')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postRecipes(input))
        alert('Recipe Created')
        setInput({
            name: '',
            summary: '',
            score: 0,
            healthScore: 0,
            image: '',
            steps: '',
            diets: [],
        })
        history.push('/home')
    }


    return (
        <div className="contenedorPrin">
            <div className="contenedorPlantilla">
                <h1>Create Recipe</h1>


                <form className="form">
                    <div className="input">
                        <div className="divLabel" >
                            <label>Name</label>
                            <input
                                type="text"
                                value={input.name}
                                name='name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pError">
                            {errors.name && (<p className="error">{errors.name}</p>)}
                        </div>

                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label>Score</label>
                            <input
                                type="number"
                                value={input.score}
                                name='score'
                                onChange={e => handleNumber(e)}
                            />
                        </div>
                        <div className="pError">
                            {errors.score && (<p className="error">{errors.score}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label> Summary</label>
                            <input
                                type="text"
                                value={input.summary}
                                name='summary'
                                onChange={handleChange}
                                maxLength="250"
                            />
                        </div>
                        <div className="pError">

                            {errors.summary && (<p className="error">{errors.summary}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label> HealthScore</label>
                            <input
                                type="number"
                                value={input.healthScore}
                                name='healthScore'
                                onChange={e => handleNumber(e)}
                            />
                        </div>
                        <div className="pError">

                            {errors.healthScore && (<p className="error">{errors.healthScore}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label>Steps</label>
                            <input
                                type="text"
                                value={input.steps}
                                name='steps'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pError">

                            {errors.steps && (<p className="error">{errors.steps}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label>Image</label>
                            <input
                                type="text"
                                value={input.image}
                                name='image'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pError">
                            {errors.image && (<p className="error">{errors.image}</p>)}

                        </div>
                    </div>
                    <div className="labelInput">
                        {typesAll?.map(el =>
                            (<label className="label"> <input className="inputDiets" type='checkbox' key={el.name} value={el.name} onChange={e => { handleCheck(e) }} /> {el.name} </label>))}
                    </div>
                    <div>
                            {errors.diets && (<p className="rojo">{errors.diets}</p>)}

                    </div>


                    <div >
                        <button className="boton" type='submit' disabled={Object.keys(errors).length === 0 ? false : true} onClick={e => handleSubmit(e)}>Recipes Create</button>
                    </div>

                </form>
            </div>
            <Link to='/home'><button className="boton">  Back </button></Link>
        </div>
    )
}