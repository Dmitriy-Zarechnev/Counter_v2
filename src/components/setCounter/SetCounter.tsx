import React from 'react'
import S from '../counter/Counter.module.css'
import Button from '../button/Button'
import {Input} from '../input/Input'
import {ErrorType} from '../../App'

type SetCounterPropsType = {
    onInputFocus: boolean
    maxCount: number
    minCount: number
    onChangeInputMaxCount: (value: number) => void
    onChangeInputMinCount: (value: number) => void
    onFocusInputChange: () => void
    setValuesIntoLocal: () => void
    error: ErrorType
    }

export const SetCounter = (props: SetCounterPropsType) => {
    const isCounterError = Object.values(props.error).some(error => error);

    return (
        <section className={S.counter}>
            <span className={`${S.counter__display} ${S.counter__inputs}`}>
                <Input title={'max value'}
                       value={props.maxCount}
                       onChange={props.onChangeInputMaxCount}
                       error={props.error.maxValueError}
                       onFocusInputChange={props.onFocusInputChange}
                       setValuesIntoLocal={props.setValuesIntoLocal}
                />

                <Input title={'start value'}
                       value={props.minCount}
                       onChange={props.onChangeInputMinCount}
                       error={props.error.minValueError}
                       onFocusInputChange={props.onFocusInputChange}
                       setValuesIntoLocal={props.setValuesIntoLocal}
                />
            </span>

            <div className={S.counter__btn_box}>
                <Button name={'SET'}
                        disabled={!props.onInputFocus || isCounterError}
                        onClick={props.setValuesIntoLocal}
                />
            </div>
        </section>
    )
}

