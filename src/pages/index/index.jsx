import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtGrid } from "taro-ui";
import { AtDivider, AtIcon } from 'taro-ui';
import { CourseTimeline } from "../../components/coursetimeline/coursetimeline.jsx";
import { DAY_OF_WEEK } from '../../util/constant.js';
import { generateTodayTimelines, generateTodayTips, getInitialCourses, getInitialTimetables } from '../../util/utils.js';
import './index.scss';

function index() {
    const index = new Date().getDay();
    const [timetables, setTimetables] = useState(getInitialTimetables());
    const [courses, setCourses] = useState(getInitialCourses());
    const [timelines, setTimelines] = useState(generateTodayTimelines(timetables[DAY_OF_WEEK[index]], courses));

    function navigateToPages(item, index) {
        let dayIndex = index;
        if (item.value === "签到") {
            Taro.navigateTo({
                url: `/pages/courses/courses?name=签到`
            });
        } else if (item.value === "课程") {
            Taro.navigateTo({
                url: `/pages/courses/courses?name=课程`
            });
        } else {
            Taro.navigateTo({
                url: `/pages/days/days?index=${dayIndex}`
            });
        }
    }

    return (
        <View className='overview-row'>
            <CourseTimeline timelines={timelines} note={generateTodayTips()}></CourseTimeline>
            <AtDivider>
                <AtIcon value='calendar'></AtIcon>
            </AtDivider>
            <AtGrid mode='rect' data={[
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'eye' },
                    value: "周日"
                },
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'eye' },
                    value: "周一"
                },
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'eye' },
                    value: "周二"
                },
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'eye' },
                    value: "周三"
                },
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'eye' },
                    value: "周四"
                },
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'eye' },
                    value: "周五"
                },
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'eye' },
                    value: "周六"
                },
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'edit' },
                    value: "签到"
                }
                ,
                {
                    iconInfo: { size: 25, color: '#78A4FA', value: 'list' },
                    value: "课程"
                }
            ]} onClick={navigateToPages}></AtGrid>
        </View>
    )

}

export default index;