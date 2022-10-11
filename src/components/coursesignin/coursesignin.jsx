import React, { useState } from "react";
import Taro from '@tarojs/taro';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import { Button, View, Text } from "@tarojs/components";

export function CourseSignIn(props) {
    const { courseName, courses, setCourses, consumedTimes } = props;
    const [isOpened, setIsOpened] = useState(false);

    function handleOpened() {
        setIsOpened(true);
    }

    function handleCancel() {
        setIsOpened(false);
    }

    function handleConfirm() {
        const newCourses = JSON.parse(JSON.stringify(courses));
        if (courseName in newCourses) {
            newCourses[courseName].consumedTimes = consumedTimes + 1;
        }
        setCourses(newCourses);
        Taro.setStorageSync('course-info', JSON.stringify(newCourses));
        setIsOpened(false);
    }

    return (
        <View>
            <Text
                style={{
                    fontSize: 'large',
                    // marginLeft: 10,
                    // paddingBottom: 10
                }}>{`${courseName}已使用课时数: ${consumedTimes}`}</Text>
            <Button style={{ backgroundColor: '#6190E8', color: 'white' }} size='default' onClick={handleOpened}>签到</Button>
            <AtModal isOpened={isOpened}>
                <AtModalHeader>{`${courseName}签到`}</AtModalHeader>
                <AtModalContent>
                    {`确定${courseName}签到吗?`}
                </AtModalContent>
                <AtModalAction>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button onClick={handleConfirm}>确定</Button>
                </AtModalAction>
            </AtModal>
        </View >
    )
}