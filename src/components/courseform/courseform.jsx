import { View, Form, Button } from '@tarojs/components'
import React, { useEffect, useState, useCallback } from "react";
import Taro from '@tarojs/taro';
import { MyInput } from '../myinput/myinput';
import './courseform.scss';

export function CourseForm(props) {
    const { tag, courses, courseName, length, setCourseName, setCourses, message, setMessage, timetables, setTimetables } = props;
    const getInitialCourseInfo = useCallback(() => {
        return {
            name: courseName,
            duration: tag === 'add' ? 0 : courses[courseName].duration,
            destination: tag === 'add' ? '' : courses[courseName].destination,
            totalTimes: tag === 'add' ? 0 : courses[courseName].totalTimes,
            consumedTimes: tag === 'add' ? 0 : courses[courseName].consumedTimes,
            paymentTimes: tag === 'add' ? 0 : courses[courseName].paymentTimes
        };
    }, [courseName, courses, tag]);
    const [courseInfo, setCourseInfo] = useState(getInitialCourseInfo());
    const [disabled, setDisabled] = useState(tag === 'add' && length >= 6 ? true : false);
    const prefix = 'course-form';
    useEffect(() => {
        setDisabled(tag === 'add' && length >= 20 ? true : false);
    }, [tag, length]);

    useEffect(() => {
        setCourseInfo(
            getInitialCourseInfo()
        );
    }, [getInitialCourseInfo]);

    function handleSubmit(event) {
        const newCourses = JSON.parse(JSON.stringify(courses));
        let text = '';
        function toBeNumber(prefix) {
            return `${prefix}必须是一个整数`;
        }
        if (!courseName) {
            text = `课程名字必须存在`;
        } else if (tag === 'add') {
            if (courseName in courses) {
                text = `只能添加不存在的课程信息`;
            }
        } else if (tag === 'delete') {
            if (!(courseName in courses)) {
                text = '只能删除已存在的课程信息';
            }
        } else if (tag === 'update') {
            if (!(courseName in courses)) {
                text = '只能更新已存在的课程信息';
            }
        }
        if (tag !== 'delete') {
            if (isNaN(Number(courseInfo.duration))) {
                text = toBeNumber('时长');
            } else if (isNaN(Number(courseInfo.totalTimes))) {
                text = toBeNumber('已订课时数');
            } else if (isNaN(Number(courseInfo.paymentTimes))) {
                text = toBeNumber('已付课时数');
            } else if (isNaN(Number(courseInfo.consumedTimes))) {
                text = toBeNumber('已销课时数');
            }
        }
        if (text) {
            setMessage({...message, content: text, isOpened: true, type: 'error'});
            return;
        }
        if (tag !== 'delete') {
            newCourses[courseName] = {
                name: courseName,
                duration: Number(courseInfo.duration),
                destination: courseInfo.destination,
                totalTimes: Number(courseInfo.totalTimes),
                paymentTimes: Number(courseInfo.paymentTimes),
                consumedTimes: Number(courseInfo.consumedTimes)
            }
            if (tag === 'add') {
                setCourseName(courseName);
            }
        } else {
            delete newCourses[courseName];
            const newTimetables = JSON.parse(JSON.stringify(timetables));
            for(const day of Object.keys(newTimetables)){
                const timetable = newTimetables[day];
                const newTimetable = {};
                Object.keys(timetable).forEach((key) => {
                    if(timetable[key].course !== courseName){
                        newTimetable[key] = {
                            course: courseName
                        }
                    }
                });
                newTimetables[day] = newTimetable
            }
            setTimetables(newTimetables);
            Taro.setStorageSync('timetable-info', JSON.stringify(newTimetables));
            setCourseName('');
        }
        setCourses(newCourses);
        Taro.setStorageSync('course-info', JSON.stringify(newCourses));
        if (tag === 'add') {
            text = `${courseName}课程增加成功`;
        } else if (tag === 'update') {
            text = `${courseName}课程更新成功`;
        } else if (tag === 'delete') {
            text = `${courseName}课程删除成功`;
        }
        setMessage({...message, content: text, isOpened: true, type: 'info'});
        return;
    }

    return (
        <View>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <MyInput
                    id={`${prefix}-name`}
                    name='name'
                    title='课程名字'
                    type='text'
                    placeholder={tag === 'add' ? '课程名字' : courseName}
                    value={courseName}
                    disabled={tag === 'add' ? false : true}
                    onChange={(value) => {
                        setCourseName(value);
                        setCourseInfo({ ...courseInfo, name: courseName });
                        return value;
                    }}
                />
                <MyInput
                    name={`${prefix}-duration`}
                    title='课程时长(分钟)'
                    type='number'
                    placeholder={courseInfo.duration ? courseInfo.duration : '课程时长(分钟)'}
                    value={`${courseInfo.duration}`}
                    disabled={tag === 'delete' ? true : false}
                    onChange={(value) => {
                        setCourseInfo({ ...courseInfo, duration: value });
                        return value;

                    }}
                />
                <MyInput
                    name={`${prefix}-destination`}
                    title='课程地点'
                    type='text'
                    placeholder={courseInfo.destination ? courseInfo.destination : '课程地点'}
                    value={courseInfo.destination}
                    disabled={tag === 'delete' ? true : false}
                    onChange={(value) => {
                        setCourseInfo({ ...courseInfo, destination: value });
                        return value;
                    }}
                />

                <MyInput
                    name={`${prefix}-totalTimes`}
                    title='已订课时数'
                    type='number'
                    placeholder={courseInfo.totalTimes ? courseInfo.totalTimes : '已订课时数'}
                    value={courseInfo.totalTimes}
                    disabled={tag === 'delete' ? true : false}
                    onChange={(value) => {
                        setCourseInfo({ ...courseInfo, totalTimes: value });
                        return value;
                    }}
                />
                <MyInput
                    name={`${prefix}-paymentTimes`}
                    title='已付课时数'
                    type='number'
                    placeholder={courseInfo.paymentTimes ? courseInfo.paymentTimes : '已付课时数'}
                    value={courseInfo.paymentTimes}
                    disabled={tag === 'delete' ? true : false}
                    onChange={(value) => {
                        setCourseInfo({ ...courseInfo, paymentTimes: value });
                        return value;
                    }}
                />
                <MyInput
                    name={`${prefix}-consumedTimes`}
                    title='已销课时数'
                    type='number'
                    placeholder={courseInfo.consumedTimes ? courseInfo.consumedTimes : '已销课时数'}
                    value={courseInfo.consumedTimes}
                    disabled={tag === 'delete' ? true : false}
                    onChange={(value) => {
                        setCourseInfo({ ...courseInfo, consumedTimes: value });
                        return value;
                    }}
                />
                <Button style={{ backgroundColor: disabled ? 'grey' : '#6190E8', color: 'white' }} size='default' formType='submit' disabled={disabled} onClick={handleSubmit}>
                    {tag === 'add' ? '增加' : tag === 'delete' ? '删除以及关联课表' : '更新'}
                </Button>
            </Form>
        </View>

    );
}