import React, { useState, useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import { AtSegmentedControl } from 'taro-ui';
import { Picker, View, Text } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { AtDivider } from 'taro-ui';
import { getInitialCourses, getInitialTimetables } from "../../util/utils";
import { CourseForm } from "../../components/courseform/courseform";
import { CourseSignIn } from "../../components/coursesignin/coursesignin";
import { MyMessage } from "../../components/mymessage/mymessage";
import './courses.scss'
import { useCallback } from "react";

function courses(props) {
    const [current, setCurrent] = useState(0);
    const [courseName, setCourseName] = useState('');
    const [courses, setCourses] = useState(getInitialCourses());
    const [timetables, setTimetables] = useState(getInitialTimetables());
    const [length, setLength] = useState(Object.keys(courses).length);
    const [courseNames, setCourseNames] = useState(Object.keys(courses));
    const { name } = Taro.getCurrentInstance().router.params;
    const [message, setMessage] = useState({
        content: '',
        type: 'info',
        duration: 3000,
        isOpened: false
    });
    useEffect(() => {
        setCourseNames(Object.keys(courses));
        setLength(Object.keys(courses).length);
    }, [courses]);

    function handleClickSegment(value) {
        setCurrent(value);
    }

    const formatCourseForm = useCallback((tag) => {
        return <CourseForm
            current={current}
            courses={courses}
            setCourses={setCourses}
            courseName={courseName}
            setCourseName={setCourseName}
            length={length}
            message={message}
            setMessage={setMessage}
            timetables={timetables}
            setTimetables={setTimetables}
            tag={tag}></CourseForm>
    }, [current, courses, setCourses, courseName, setCourseName, length]);

    return (
        <View className='container'>
            <View className='page-body'>
                <View className='page-section'>
                    <AtDivider content={courseName ? `??????${courseName}??????` : '??????????????????'} />
                    <View>
                        <Picker mode='selector' range={courseNames} onChange={(event) => {
                            setCourseName(courseNames[event.detail.value])
                        }}>
                            <AtList>
                                <AtListItem
                                    title='??????'
                                    extraText={courseName ? courseName : '?????????'}
                                />
                            </AtList>
                        </Picker>
                    </View>
                </View>
                <AtDivider height='56' lineColor='#FFFFFF' />
                {
                    name === '??????' && courseName && <CourseSignIn
                        courses={courses}
                        courseName={courseName}
                        setCourses={setCourses}
                        consumedTimes={courses[courseName].consumedTimes}
                    >
                    </CourseSignIn>
                }
                {
                    name === '??????' &&
                    <View>
                        <AtSegmentedControl
                            values={[`??????`, `??????`, `??????`]}
                            onClick={handleClickSegment}
                            current={current}
                        />
                        {
                            current === 0 && courseName && formatCourseForm('update')
                        }
                        {
                            current === 1 && courseName && formatCourseForm('delete')
                        }
                        {
                            current === 2 && formatCourseForm('add')
                            // <CourseForm current={current} courses={courses} setCourses={setCourses} courseName='' setCourseName={setCourseName} length={Object.keys(courses).length} tag='add' ></CourseForm>
                        }
                    </View>
                }
            </View>
            <MyMessage duration={message.duration} isOpened={message.isOpened} message={message.content} onClose={() => { setMessage({ ...message, isOpened: false }) }} type={message.type}></MyMessage>
        </View>
    );
}

export default courses;