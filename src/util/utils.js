import { DAY_OF_WEEK_CHINESE, DEFAULT_COURSES, DEFAULT_TIMETABLES } from './constant.js';
import Taro from "@tarojs/taro";

export function getInitialCourses() {
    let courses = Taro.getStorageSync('course-info');
    if (courses) {
        courses = JSON.parse(courses);
    } else {
        courses = DEFAULT_COURSES;
    }
    // courses = DEFAULT_COURSES;
    return courses;
}

export function getInitialTimetables() {
    let timetables = Taro.getStorageSync('timetable-info');
    if (timetables) {
        timetables = JSON.parse(timetables);
    } else {
        timetables = DEFAULT_TIMETABLES;
    }
    // timetables = DEFAULT_TIMETABLES;
    return timetables;
}

export function generateTodayTimelines(timetable, courses) {
    const timelines = [];
    const keys = Object.keys(timetable);
    keys.sort();
    for (const key of keys) {
        const course = courses[timetable[key].course]
        timelines.push({
            title: key,
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
