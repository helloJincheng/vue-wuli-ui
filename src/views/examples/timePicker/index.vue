<template>
    <div class="gc-panel">
        <div class="gc-panel__title">TimePicker 时间段控件</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">常用用法(年、月、日)</div>
            <!-- 年份 -->
            <mTimePicker 
                type="year" 
                format="yyyy" 
                formater="yyyy" 
                placeholder="选择年份" 
                innerText="获取年份"
                @on-click="handle"></mTimePicker>
            <!-- 月份 -->
            <mTimePicker 
                type="month" 
                format="yyyy-MM" 
                formater="yyyy-MM-dd" 
                placeholder="选择月份" 
                innerText="获取月份"
                @on-click="handle"></mTimePicker>
            <!-- 日期 -->
            <mTimePicker 
                type="date" 
                format="yyyy-MM-dd" 
                formater="yyyy-MM-dd" 
                placeholder="选择日期" 
                innerText="获取日期"
                @on-click="handle"></mTimePicker>
        </div>
        <div class="gc-container">
            <sDivider></sDivider>
            <div class="gc-container__title">其他用法</div>
            <!-- 月份 -->
            <mTimePicker 
                type="month" 
                format="yyyy-MM" 
                formater="yyyy-MM" 
                placeholder="选择月份" 
                innerText="默认时间"
                :config="confData"
                @on-click="handle"></mTimePicker>
            <mTimePicker type="datetime" format="yyyy-MM-dd HH:mm" formater="yyyy-MM-dd hh:mm" :hasLabel="true" innerText="搜索" @on-click="handle">
                <template v-slot:innerLeft>
                    <span>开始时间：</span>
                </template>
                <template v-slot:innerRight>
                    <span style="padding-left: 10px;">结束时间：</span>
                </template>
            </mTimePicker>
        </div>
        <div class="gc-container">
            <sDivider></sDivider>
            <div class="gc-container__title">设置开始时间和结束时间限制</div>
            <div style="margin-top: 10px;">
                <sDatePicker type="date" :options="startTimeOptions" @on-change="startTimeChange" placeholder="开始时间" style="margin-right: 15px" v-model="starttime" transfer></sDatePicker>
                <sDatePicker type="date" :options="endTimeOptions" @on-change="endTimeChange" placeholder="结束时间" v-model="endtime" transfer></sDatePicker>
            </div>
        </div>
        <div class="gc-container" style="margin-bottom: 25px">
            <sDivider></sDivider>
            <div class="gc-container__title">基于移动端的时间控件(请用打开手机预览模式)</div>
            <template v-if="!$route.meta.menuHide && dataBase.h5">
                <van-field label="开始时间" :value="currentDate1 || confData.start" placeholder="开始时间" readonly clickable @click="startVisible = true" />
                <van-field label="结束时间" :value="currentDate2 || confData.end" placeholder="结束时间" readonly clickable @click="endVisible = true" />
                <!-- 开始时间 -->
                <van-popup v-model="startVisible" position="bottom" :overlay="true">
                    <u-picker-date
                        :type="dateType"
                        v-model="startVisible"
                        :max-date="maxDate"
                        :date-value="currentDate1"
                        @on-confirm="startConfirmHandle" />
                </van-popup> 
                <!-- 结束时间 -->
                <van-popup v-model="endVisible" position="bottom" :overlay="true">
                    <u-picker-date
                        type="date"
                        v-model="endVisible"
                        :min-date="minDate"
                        :date-value="currentDate2"
                        @on-confirm="endConfirmHandle" />
                </van-popup> 
            </template>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import pickerDate from '@h5/PickerDate'

export default {
    data () {
        return {
            startTimeOptions: {},   // 开始日期设置
            endTimeOptions: {},     // 结束日期设置
            starttime: '',          // 开始日期
            endtime: '',            // 结束日期
            startVisible: false,
            endVisible: false,
            currentDate1: '',       // 开始时间
            currentDate2: '',       // 结束时间
            minDate: undefined,     // 可选的最小时间
            maxDate: undefined      // 可选的最大时间
        }
    },
    methods: {
        handle(data) {
            const parmas = {
                start: data.start,
                end: data.end
            };
            this.$Message.info(`开始时间：${parmas.start}，结束时间：${parmas.end}`)
        },
        startTimeChange(event) {
            // 设置开始时间
            this.starttime = event;
            this.endTimeOptions = {
                disabledDate: date => {
                    // 时间戳转换比较
                    let startTime = this.starttime ? new Date(this.starttime).valueOf() : '';
                    return date && (date.valueOf() < startTime);
                }
            }
        },
        endTimeChange(event) { 
            // 设置结束时间
            this.endtime = event;
            let endTime = this.endtime ? new Date(this.endtime).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
            this.startTimeOptions = {
                disabledDate(date) {
                    return date && date.valueOf() > endTime;
                }
            }
        },
        startConfirmHandle(data) {
            this.currentDate1 = data.time;
            this.minDate = data.date;
        },
        endConfirmHandle(data) {
            this.currentDate2 = data.time
            this.maxDate = data.date;
        }
    },
    computed: {
        confData() {
            const t = this.dataBase;
            let beginTime = new Date().getFullYear();
            let nowTime = t.dateToStr(new Date(), 'yyyy-MM');
            const date = {
                start: `${beginTime}-01-01`,
                end: `${nowTime}-01`
            }
            return date
        }
    },
    components: {
        'uPickerDate': pickerDate
    }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common/_mixins.less';
.gc-block {
    display: inline-block;
    & + .gc-block {
        margin-left: 15px;
    }
}
</style>
