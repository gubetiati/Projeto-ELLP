import { useState } from "react";
import TextField from "../TextField/TextField";

export default function Form () {
    const [valor, setValor] = useState('')

    return(
        <form>
            <TextField label="Digite seu nome"/>
            <TextField label="Digite sua idade"/>
        </form>
    )
}