import { useEffect, useState } from "react";
import axios from 'axios';

export default function MainPage(props) {
    const [question, setQuestion] = useState([])
    const [questions, setQuestions] = useState([])

    const getTenQuestions = async () => {
        try {
            const response = await fetch("https://jservice.io/api/random?count=10")
            const data = await response.json()
            setQuestions(data)
        } catch (err) {
            console.log(err)
        }
    }

    const getData = async () => {
        try {
            const response = await fetch("https://jservice.io/api/random")
            const data = await response.json()
            setQuestion(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const [hide, setHide] = useState(true)
    const [score, setScore] = useState(0)

    const increaseScore = (data) => {
        setScore(score + parseInt(data))
    }
    const decreaseScore = (data) => {
        setScore(score - parseInt(data))
    }
    const toggleQuestion = (data) => {
        setHide(data)
    }
    const resetScore = () => {
        setScore(0)
    }

    return (
        <>
            {question.map((item, idx) => {
                return (
                    <>
                        <h1> Welcome to Jeopardy</h1>
                        <h2 >Score: <span style={score >= 0 ? { color: "white" } : { color: "red" }}>{score}</span></h2>
                        <div className="buttonContainer">
                            <button className="button1" onClick={() => { decreaseScore(item.value) }}>Decrease</button>
                            <button className="button2" onClick={() => { increaseScore(item.value) }}>Increase</button>
                            <button className="button3" onClick={() => { resetScore() }}>Reset</button>
                        </div>
                        <h2>Let's Play!</h2>
                        <button className="button4" onClick={() => { return getData(), setHide(true) }}>Get Question</button>
                        <h2>Category: <span>{item.category.title}</span></h2>
                        <h2 className="points">Points: <span>{item.value}</span></h2>
                        <h2>Question: <span>{item.question}</span></h2>
                        <button className="button5" onClick={() => { setHide(!hide) }}>Click to Toggle Answer</button>
                        {!hide ?
                            <div><h3>Answer: <span>{item.answer}</span></h3></div> : ''}

                    </>
                );
            })
            }
        </>
    )
}