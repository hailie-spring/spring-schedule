import { DAY_OF_WEEK_CHINESE, DEFAULT_COURSES, DEFAULT_TIMETABLES } from './constant.js';
import Taro from "@tarojs/taro";

export function getInitialCourses() {
    let courses = Taro.getStorageSync('course-info');
    if (courses) {
        courses = JSON.parse(courses);
    } else {
        courses = DEFAULT_COURSES;
    }
    courses = DEFAULT_COURSES;
    return courses;
}

export function getInitialTimetables() {
    let timetables = Taro.getStorageSync('timetable-info');
    if (timetables) {
        timetables = JSON.parse(timetables);
    } else {
        timetables = DEFAULT_TIMETABLES;
    }
    timetables = DEFAULT_TIMETABLES;
    return timetables;
}

export function generateTodayTimelines(timetables, courses) {
    const timelines = [];
    // console.log(JSON.stringify(timetables));
    // console.log(JSON.stringify(courses));
    for (const item of timetables) {
        const course = courses[item.course]
        timelines.push({
            title: item.time,
            content: [course.name, `时长: ${course.duration}分钟`, `地点: ${course.destination}`]
        });
    }
    return timelines;
}

export function generateTodayStates(timetable) {
    const states = {};
    for (const item of timetable) {
        states[item.course] = { current: 0 }
    }
    return states;
}

export function generateTodayTips() {
    const today = new Date();
    return `今天是${today.toISOString().split('T')[0]}  ${DAY_OF_WEEK_CHINESE[today.getDay()]}`;
}
