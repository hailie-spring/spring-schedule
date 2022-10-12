import { View } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import { AtSegmentedControl } from 'taro-ui';
import { AtDivider, AtIcon } from 'taro-ui';
import Taro from "@tarojs/taro";
import { generateTodayTimelines, getInitialCourses, getInitialTimetables } from '../../util/utils.js';
import { DAY_OF_WEEK, DAY_OF_WEEK_CHINESE } from '../../util/constant.js';
import { CourseTimeline } from "../../components/coursetimeline/coursetimeline.jsx";
import { TimetableForm } from "../../components/timetableform/timetableform.jsx";
import './days.scss';

function days(props) {
    const { index } = Taro.getCurrentInstance().router.params;
    const [current, setCurrent] = useState(0);
    const [timetables, setTimetables] = useState(getInitialTimetables());
    const [courses, setCourses] = useState(getInitialCourses());
    const [timelines, setTimelines] = useState(generateTodayTimelines(timetables[DAY_OF_WEEK[index]], courses));

    useEffect(() => {
        setTimelines(generateTodayTimelines(timetables[DAY_OF_WEEK[index]], courses));
    }, [timetables, courses])

    const formatTimetable = useCallback((tag) => {
        return <TimetableForm
            current={current}
            timetables={timetables}
            setTimetables={setTimetables}
            courses={courses}
            dayofweek={DAY_OF_WEEK[index]}
            keys={Object.keys(timetables[DAY_OF_WEEK[index]])}
            tag={tag}
        ></TimetableForm>
    });
    return (
        <View>
            <CourseTimeline timelines={timelines} note={`这是${DAY_OF_WEEK_CHINESE[index]}课程安排`}></CourseTimeline>
            <AtDivider height='56' lineColor='#FFFFFF'>
            </AtDivider>
            <AtSegmentedControl
                values={['更新课表', '删除课表']}
                current={current}
                onClick={(value) => { setCurrent(value) }}
            />
            {
                current === 0 && formatTimetable('update')
            }
            {
                current === 1 && formatTimetable('delete')
            }

        </View>
    );
}

export default days;