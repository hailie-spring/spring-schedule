import Taro, { Events } from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import './mymessage.scss';
import { useState } from "react";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

export function MyMessage(props) {

    // function bindMessageListener() {

    //     Taro.eventCenter.on('atMessage', (options) => {
    //         const { message, type, duration } = options
    //         const newState = {
    //             _isOpened: true,
    //             _message: message,
    //             _type: type,
    //             _duration: duration || this.state._duration
    //         }
    //         this.setState(newState, () => {
    //             clearTimeout(this._timer)
    //             this._timer = setTimeout(() => {
    //                 this.setState({
    //                     _isOpened: false
    //                 })
    //             }, this.state._duration)
    //         })
    //     })
    //     // 绑定函数
    //     Taro.atMessage = Taro.eventCenter.trigger.bind(
    //         Taro.eventCenter,
    //         'atMessage'
    //     )
    // }
    // const [info, setInfo] = useState({
    //     message: props.message,
    //     duration: props.duration,
    //     type: props.type,
    //     isOpened: true

    // });
    // const [isOpened, setIsOpened] = useState(props.isOpened);
    // const [message, setMessage] = useState(props.message);
    // const [duration, setDuration] = useState(props.duration);
    // const [type, setType] = useState(props.type);
    const  {isOpened, message, duration, type, onClose} = props;
    const timerAutoHide = useRef();
    const setAutoHideTimer = useCallback(() => {
        if (duration == null) {
            return;
        }

        clearTimeout(timerAutoHide.current);
        timerAutoHide.current = setTimeout(() => {
            onClose();
        }, duration);
    }, [duration]);

    useEffect(() => {
        if (isOpened) {
            setAutoHideTimer();
        }
        return () => {
            clearTimeout(timerAutoHide.current);
        };
    }, [isOpened, setAutoHideTimer]);

    const { className, customStyle } = props
    const rootCls = classNames(
        {
            'at-message': true,
            'at-message--show': isOpened,
            'at-message--hidden': !isOpened
        },
        `at-message--${type}`,
        className
    )
    return (
        <View className={rootCls} style={customStyle}>
            {message}
        </View>
    );
}