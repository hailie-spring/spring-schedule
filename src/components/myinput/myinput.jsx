import classNames from 'classnames';
import React from 'react';
import { Input, Label, Text, View } from '@tarojs/components';
import './myinput.scss';

export function MyInput(props) {
    //   public static defaultProps: AtInputProps
    //   public static propTypes: InferProps<AtInputProps>
    //   // TODO: 有待考证是否为合理方式处理 #840
    let inputClearing = false

    const handleInput = (event) =>
        props.onChange(event.detail.value, event)

    const handleFocus = (event) => {
        if (typeof props.onFocus === 'function') {
            props.onFocus(event.detail.value, event)
        }
    }

    const handleBlur = (event) => {
        if (typeof props.onBlur === 'function') {
            props.onBlur(event.detail.value, event)
        }
        if (event.type === 'blur' && !inputClearing) {
            props.onChange(
                event.detail.value,
                event
            )
        }
        inputClearing = false
    }

    const handleConfirm = (event) => {
        if (typeof props.onConfirm === 'function') {
            props.onConfirm(event.detail.value, event)
        }
    }

    const handleClick = (event) => {
        if (!props.editable && typeof props.onClick === 'function') {
            props.onClick(event)
        }
    }

    const handleClearValue = (event) => {
        inputClearing = true
        props.onChange('', event)
    }

    const handleKeyboardHeightChange = (
        event
    ) => {
        if (typeof props.onKeyboardHeightChange === 'function') {
            props.onKeyboardHeightChange(event)
        }
    }

    const handleErrorClick = (event) => {
        if (typeof props.onErrorClick === 'function') {
            props.onErrorClick(event)
        }
    }

    //   public render(): JSX.Element {
    const {
        className,
        customStyle,
        name,
        cursorSpacing,
        confirmType,
        cursor,
        selectionStart,
        selectionEnd,
        adjustPosition,
        border,
        title,
        error,
        clear,
        placeholder,
        placeholderStyle,
        placeholderClass,
        autoFocus,
        focus,
        value,
        required
    } = props
    const { type, maxlength, disabled, password } = props

    const rootCls = classNames(
        'at-input',
        {
            'at-input--without-border': !border
        },
        className
    )
    const containerCls = classNames('at-input__container', {
        'at-input--error': error,
        'at-input--disabled': disabled
    })
    const overlayCls = classNames('at-input__overlay', {
        'at-input__overlay--hidden': !disabled
    })
    const placeholderCls = classNames('placeholder', placeholderClass)

    return (
        <View className={rootCls} style={customStyle}>
            <View className={containerCls}>
                <View className={overlayCls} onClick={handleClick}></View>
                {title && (
                    <Label
                        className={`at-input__title ${required && 'at-input__title--required'
                            }`}
                        for={name}
                    >
                        {title}
                    </Label>
                )}
                <Input
                    className='at-input__input'
                    id={name}
                    name={name}
                    type={type}
                    password={password}
                    placeholderStyle={placeholderStyle}
                    placeholderClass={placeholderCls}
                    placeholder={placeholder}
                    cursorSpacing={cursorSpacing}
                    maxlength={maxlength}
                    autoFocus={autoFocus}
                    focus={focus}
                    value={value}
                    confirmType={confirmType}
                    cursor={cursor}
                    selectionStart={selectionStart}
                    selectionEnd={selectionEnd}
                    adjustPosition={adjustPosition}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onConfirm={handleConfirm}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    onKeyboardHeightChange={handleKeyboardHeightChange}
                />
                {clear && value && (
                    <View className='at-input__icon' onTouchEnd={handleClearValue}>
                        <Text className='at-icon at-icon-close-circle at-input__icon-close'></Text>
                    </View>
                )}
                {error && (
                    <View
                        className='at-input__icon'
                        onTouchStart={handleErrorClick}
                    >
                        <Text className='at-icon at-icon-alert-circle at-input__icon-alert'></Text>
                    </View>
                )}
                <View className='at-input__children'>{props.children}</View>
            </View>
        </View>
    )
}


MyInput.defaultProps = {
    className: '',
    customStyle: '',
    value: '',
    name: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    title: '',
    cursorSpacing: 50,
    confirmType: 'done',
    cursor: 0,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    maxlength: 140,
    type: 'text',
    disabled: false,
    border: true,
    editable: true,
    error: false,
    clear: false,
    autoFocus: false,
    focus: false,
    required: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { }
}

