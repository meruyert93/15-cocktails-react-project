import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
    const {id} = useParams();
    const [loading, setLoading] = React.useState(false)
    const [cocktail, setCocktail] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        async function getCockail() {
             try {
                const response = await fetch(`${url}${id}`)
                const data = await response.json()
                if (data.drinks) {
                   const {
                       strDrink: name,  
                       strDrinkThumb: image,    
                       strAlcoholic: info,  
                       strCategory: category,   
                       strGlass: glass,     
                       strInstruction: instructions,    
                       strIngredint1,
                       strIngredint2,
                       strIngredint3,
                       strIngredint4,
                       strIngredint5,
                    } = data.drinks[0]
                    const ingredients = [
                        strIngredint1,
                        strIngredint2,
                        strIngredint3,
                        strIngredint4,
                        strIngredint5,
                    ] 
                    const newCocktail = {
                        name, image, info, category, glass, instructions, ingredients
                    }
                    setCocktail(newCocktail);
                } 
                else {
                    setCocktail(null);
                }
                setLoading(false);
             } catch(error){
                console.log(error);
                setLoading(false);

             }
        }
        getCockail()
    }, [id])

    return (
        <div>
            <h2>{id}</h2>
        </div>
    )
}

export default SingleCocktail
