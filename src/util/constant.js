export const DAY_OF_WEEK = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
}

export const DAY_OF_WEEK_CHINESE = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六'
}

export const DEFAULT_TIMETABLES = {
    monday: {
        '16:40': {
            course: '写字'
        }
    },
    tuesday: {},
    wednesday: {
        '16:50': {
            course: '啦啦操'
        }
    },
    thursday: {
        '16:50': {
            course: '画画'
        }
    },
    friday: {
        '18:40': {
            course: '乐高'
        }
    },
    saturday: {
        '10:10': {
            course: '拼音'
        }
    },
    sunday: {},
}

// export const DEFAULT_TIMETABLES = {
//     monday: [
//         {
//             time: '16:40',
//             course: '写字'
//         }

//     ],
//     tuesday: [],
//     wednesday: [
//         {
//             time: '16:50',
//             course: '啦啦操'
//         }
//     ],
//     thursday: [
//         {
//             time: '16:50',
//             course: '画画'
//         }
//     ],
//     friday: [
//         {
//             time: '18:40',
//             course: '乐高'
//         }
//     ],
//     saturday: [
//         {
//             time: '10:10',
//             course: '拼音'
//         }
//     ],
//     sunday: [],
// }

export const DEFAULT_COURSES = {
    '写字': {
        name: '写字',
        duration: 90, // unit: minutes
        destination: '写字艺术',
        totalTimes: 3,
        consumedTimes: 3,
        paymentTimes: 3
    },
    '啦啦操': {
        name: '啦啦操',
        duration: 90, // unit: minutes
        destination: '星栩艺术',
        totalTimes: 40,
        consumedTimes: 10,
        paymentTimes: 40
    },
    '画画': {
        name: '画画',
        duration: 90, // unit: minutes
        destination: '夏加尔艺术',
        totalTimes: 40,
        consumedTimes: 10,
        paymentTimes: 40
    },
    '乐高': {
        name: '乐高',
        duration: 90, // unit: minutes
        destination: '贝乐机器人',
        totalTimes: 40,
        consumedTimes: 10,
        paymentTimes: 40
    },
    '拼音': {
        name: '拼音',
        duration: 90, // unit: minutes
        destination: '星天树',
        totalTimes: 15,
        consumedTimes: 2,
        paymentTimes: 15
    }
}
