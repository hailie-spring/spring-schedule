import { View, Picker, Form, Button } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui';
import React, { useEffect, useState, useCallback } from "react";
import Taro from '@tarojs/taro';
import { AtDivider } from 'taro-ui';
import { MyMessage } from '../mymessage/mymessage';
import './timetableform.scss';

export function TimetableForm(props) {
    const { timetables, setTimetables, dayofweek, courses, tag, keys } = props;
    const [time, setTime] = useState(keys.length !== 0 ? keys.sort()[0] : '');
    const [courseName, setCourseName] = useState(keys.length !== 0 ? timetables[dayofweek][keys.sort()[0]].course : '');
    const [disabled, setDisabled] = useState(false);
    const [length, setLength] = useState(keys.length);
    const [message, setMessage] = useState({
        content: '',
        type: 'info',
        duration: 3000,
        isOpened: false
    });
     
    useEffect(() => {
        if (length >= 12) {
            setDisabled(true);
            // setMessage({ ...message, content: '一天最多只能增加12门课程', isOpened: true, type: 'error' });
        } else {
            setDisabled(false);
        }
    }, [length]);

    useEffect(() => {
        setTime(keys.length !== 0 ? keys[0] : '');
        setCourseName(keys.length !== 0 ? timetables[dayofweek][keys[0]].course : '');
        setLength(keys.length);
    }, [keys]);

    function handleSubmit(event) {
        const newTimetable = JSON.parse(JSON.stringify(timetables));
        if (!time) {
            setMessage({ ...message, content: '请先选择课程时间', isOpened: true, type: 'error' });
            return;
        }
        if (!courseName) {
            setMessage({ ...message, content: '请先选择课程名字', isOpened: true, type: 'error' });
            return;
        }
        const timetable = newTimetable[dayofweek];
        if (tag === 'delete') {
            if (!(time in timetable) || timetable[time].course !== courseName) {
                setMessage({ ...message, content: '只能删除已经存在的课表', isOpened: true, type: 'error' });
                return;
            }
            delete timetable[time];
        } else {
            timetable[time] = {
                course: courseName
            }
        }
        newTimetable[dayofweek] = timetable;
        setTimetables(newTimetable);
        Taro.setStorageSync('timetable-info', JSON.stringify(newTimetable));
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
                <Button style={{ backgroundColor: disabled ? 'grey' : '#6190E8', color: 'white' }} size='default' formType='submit' disabled={disabled} onClick={handleSubmit}>
                    {tag === 'delete' ? '删除' : '更新'}
                </Button>
            </Form>
            <MyMessage duration={message.duration} isOpened={message.isOpened} message={message.content} onClose={() => { setMessage({ ...message, isOpened: false }) }} type={message.type}></MyMessage>
        </View>
    );
}