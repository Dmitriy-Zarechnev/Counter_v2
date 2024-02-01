import React, {useEffect, useState} from 'react'
import S from './App.module.css'
import Counter from './components/counter/Counter'
import {SetCounter} from './components/setCounter/SetCounter'


export type ErrorType = {
    maxValueError: boolean
    minValueError: boolean
}

function App() {
    // ------------ Default values ---------------
    const maxCountDefault = 5
    const minCountDefault = 0
    const counterStep = 1

    const ErrorDefault = {
        maxValueError: false,
        minValueError: false
    }
    //  ----- Keys for LocalStorage -----------
    const COUNTER_VALUE = 'counterValue'
    const MAX_COUNTER_VALUE = 'maxCounterValue'
    const MIN_COUNTER_VALUE = 'minCounterValue'

    // ----------- useStates ----------------
    const [counter, setCounter] = useState<number>(minCountDefault)
    const [maxCount, setMaxCount] = useState<number>(maxCountDefault)
    const [minCount, setMinCount] = useState<number>(minCountDefault)

    const [onInputFocus, setOnInputFocus] = useState<boolean>(false)
    const [error, setError] = useState<ErrorType>(ErrorDefault)


    //  ------ Get 'counter values' from localStorage ------
    useEffect(() => {
        let counterValueString = localStorage.getItem(COUNTER_VALUE)
        let maxValueString = localStorage.getItem(MAX_COUNTER_VALUE)
        let minValueString = localStorage.getItem(MIN_COUNTER_VALUE)

        if (counterValueString) setCounter(JSON.parse(counterValueString))
        if (maxValueString) setMaxCount(JSON.parse(maxValueString))
        if (minValueString) setMinCount(JSON.parse(minValueString))
    }, [])


    //  ------  Set 'counter values' into localStorage ------
    useEffect(() => {
        setItemToLocalStorage(COUNTER_VALUE, counter)
    }, [counter])

    useEffect(() => {
        setItemToLocalStorage(MAX_COUNTER_VALUE, maxCount)
        setItemToLocalStorage(MIN_COUNTER_VALUE, minCount)

        setError(prevState => ({
            ...prevState,
            maxValueError: maxCount < 0 || maxCount - minCount <= 0,
            minValueError: minCount < 0 || maxCount - minCount <= 0 || minCount < 0
        }))

    }, [maxCount, minCount])

    function setItemToLocalStorage(key: string, value: number) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    function setValuesIntoLocal() {
        setOnInputFocus(false)
        setCounter(minCount)
    }


    //  ------ Change and Set 'counter' value into useState ------
    function changeCounter() {
        counter <= maxCount && setCounter(counter + counterStep)
    }

    function resetCounter() {
        setCounter(minCount)
    }


    //  ------  Set input 'value' into useState ------
    function onChangeInputMaxCount(value: number) {
        setMaxCount(value)
    }

    function onChangeInputMinCount(value: number) {
        setMinCount(value)
    }



    //  ------  Set OnInputFocus 'value' into useState ------
    function onFocusInputChange() {
        setOnInputFocus(true)
    }


    return (
        <div className={S.app}>
            <SetCounter
                onInputFocus={onInputFocus}
                maxCount={maxCount}
                minCount={minCount}
                onChangeInputMaxCount={onChangeInputMaxCount}
                onChangeInputMinCount={onChangeInputMinCount}
                onFocusInputChange={onFocusInputChange}
                setValuesIntoLocal={setValuesIntoLocal}
                error={error}
            />

            <Counter counter={counter}
                     maxCount={maxCount}
                     minCount={minCount}
                     changeCounter={changeCounter}
                     resetCounter={resetCounter}
                     onInputFocus={onInputFocus}
                     error={error}
            />
        </div>
    )
}


export default App





