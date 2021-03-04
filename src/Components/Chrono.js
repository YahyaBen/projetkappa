import React from 'react'
import firebase from "../Util/firebase";
import { useEffect, useState } from 'react'

const Chrono = ({ Time }) => {
    const [chrono, setChrono] = useState('')
    const [color, setColor] = useState('steelblue')
    let Diff =firebase.firestore.Timestamp.now().seconds - Number(Time)
    const timer = () => {
        Diff++
        if(Diff>120) setColor('red')
        var Minutes = Math.floor(Diff / 60)
        var Seconds = Diff % 60
        return Minutes + ":" + (Seconds < 10 ? "0" : "") + Seconds;
    }
    useEffect(() => {
        var Heeey = setInterval(() => {
            setChrono(timer())
        }, 1000)
        return () => {
            clearInterval(Heeey)
        }
    }, [])

    return (
        <div>
            <span style={{color:color}}>{chrono}</span>
        </div>
    )
}
export default Chrono
