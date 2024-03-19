import './app.css'
import { useEffect, useState } from 'react'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function App () {
  const [fact, setFact] = useState('Initial Fact')
  const [factImage, setFactImage] = useState()

  useEffect(() => {
    // Obtener la cita
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    // Obtener la imagen
    if (!fact) return
    const firstWord = fact.split(' ')[0]
    console.log(firstWord)
    const imageUrl = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red`
    console.log(imageUrl)

    fetch(`${imageUrl}&json=true`)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        setFactImage(imageUrl)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos </h1>
      <section>
        {
          fact &&
            <p> {fact}</p>
        }
        {
          factImage &&
            <img src={factImage} alt={`Image extracted with the first word of ${fact}`} />
        }
      </section>
    </main>
  )
}
