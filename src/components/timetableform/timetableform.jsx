import { View,  Picker, Form, Button } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui';
import React, { useEffect, useState, useCallback } from "react";
import Taro from '@tarojs/taro';
import { AtDivider } from 'taro-ui';
import './timetableform.scss';

export function TimetableForm(props) {
    const {timetables, setTimetables, dayofweek, courses, tag} = props;
    const [time, setTime] = useState(props.timetables[props.dayofweek].length !== 0 ? props.timetables[props.dayofweek][0].time : '');
    const [courseName, setCourseName] = useState(props.timetables[props.dayofweek].length !== 0 ? props.timetables[props.dayofweek][0].course : '');
    const [disabled, setDisabled] = useState(false);
    const [length, setLength] = useState(timetables[dayofweek].length);

    useEffect(() => {
        if (length >= 3) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [length]);

    useEffect(() => {
        setTime(timetables[dayofweek].length !== 0 ? timetables[props.dayofweek][0].time : '');
        setCourseName(timetables[dayofweek].length !== 0 ? timetables[props.dayofweek][0].course : '');
        setLength(timetables[dayofweek].length);
    }, [timetables]);

    function handleSubmit(event) {
        const newTimetable = JSON.parse(JSON.stringify(timetables));
        if (!time || !courseName) {
            return;
        }
        if (tag === 'delete') {
            let index = -1;
            let targetIndex = -1;
            for (const item of newTimetable[dayofweek]) {
                index += 1;
                if (item.time === time && item.course === courseName) {
                    targetIndex = index;
                    break;
                }
            }
            if (targetIndex !== -1) {
                newTimetable[dayofweek].splice(targetIndex, 1);
            }
        } else {
            let exist = false;
            for (const item of newTimetable[props.dayofweek]) {
                if (item.time === time && item.course === courseName) {
                    exist = true;
                    break;
                } else if (item.time === time && item.course !== courseName) {
                    exist = true;
                    item.course = courseName;
                    break;
                }
            }
            if (!exist) {
                newTimetable[dayofweek].push({
                    time,
                    course: courseName
                })
            }
        }
        newTimetable[props.dayofweek].sort(function (first, second) {
            return first.time[1] - second.time[1];
        });
        setTimetables(newTimetable);
        Taro.setStorageSync('timetable-info', JSON.stringify(timetables));
    }

    return (
        <View>
            <AtDivider height='56' lineColor='#FFFFFF' />
            <Form onSubmit={(event) => handleSubmit(event)}>
                <View></View>
                <View className='page-section'>
                    <View>
                        <Picker mode='time' onChange={(event) => {
                            setTime(event.detail.value);
                        }}>
                            <AtList>
                                <AtListItem title='请选择上课时间' extraText={time} />
                            </AtList>
                        </Picker>
                    </View>
                </View>
                <View className='page-section'>
                    <View>
                        <Picker mode='selector' range={Object.keys(courses)} onChange={
                            (event) => {
                                // console.log(JSON.stringify(event));
                                setCourseName(Object.keys(courses)[event.detail.value]);
                            }} >
                            <AtList>
                                <AtListItem
                                    title='请选择课程'
                                    extraText={courseName}
                                />
                            </AtList>
                        </Picker>
                    </View>
                </View>
                <Button style={{backgroundColor: '#6190E8', color: 'white'}}  size='default' formType='submit' disabled={disabled} onClick={handleSubmit}>
                    {tag === 'delete' ? '删除' : '更新'}
                </Button>
            </Form>
        </View>
    );
}