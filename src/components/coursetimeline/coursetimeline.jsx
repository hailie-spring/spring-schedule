import { View } from "@tarojs/components";
import React from "react";
import { AtCard } from "taro-ui";
import { AtTimeline } from 'taro-ui';
import './coursetimeline.scss';

export function CourseTimeline(props) {
    return (
        <View>
            <AtCard
                title='欢迎来到spring课表管理'
                note={props.note}
            >
                <AtTimeline
                    items={props.timelines}
                >
                </AtTimeline>
            </AtCard>
        </View>
    );
}