<template>
  <div class="picker-component">
    <div class="picker-button" @click="pickerDisplayChangeFun(true)">
      <!--picker的slot内容-->
      <slot></slot>
    </div>
    <div class="picker-fixed-view" _data-type="component" v-show="pickerDisplayValue" @click="pickerDisplayChangeFun(false)">
      <div class="picker-view" @click.stop="">
        <div class="picker-header">
          <div class="picker-button cancle-button" @click="pickerDisplayChangeFun(false)">取消</div>
          <div class="picker-button" @click="confirmButtonClickFun">确定</div>
        </div>
        <div class="picker-section">
          <!-- 单列选择器 -->
          <div class="picker-item" v-if="mode=='selector'" @touchstart.stop.prevent="touchStartFun($event, 0, transFormList[0])"
            @touchmove.stop.prevent="touchMoveFun($event, 0, transFormList[0])" @touchend.stop.prevent="touchEndFun($event, 0, transFormList[0])">
            <div class="line top" v-if='rang.length>0'></div>
            <div class="line bottom" v-if='rang.length>0'></div>
            <div class="transform-view" v-bind:style="{transform: 'translate3d(0,'+transFormList[0]+'px,0)'}">
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <template v-if="rangKey">
                <div class="item" v-for="(item, index) in rang" v-bind:key="index">{{item[rangKey]}}</div>
              </template>
              <template v-if="!rangKey">
                <div class="item" v-for="(item, index) in rang" v-if="!rangKey" v-bind:key="index">{{item}}</div>
              </template>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
            </div>
          </div>
          <!-- 多列选择器 -->
          <template v-for="(pItem,pIndex) in rang" v-if="mode=='multiSelector'&&pIndex<3">
            <div class="picker-item" :key="pIndex" @touchstart.stop.prevent="touchStartFun($event, pIndex, transFormList[pIndex])"
              @touchmove.stop.prevent="touchMoveFun($event, pIndex, transFormList[pIndex])" @touchend.stop.prevent="touchEndFun($event, pIndex, transFormList[pIndex])">
              <div class="line top" v-if='rang[pIndex].length>0'></div>
              <div class="line bottom" v-if='rang[pIndex].length>0'></div>
              <div class="transform-view" v-bind:style="{transform: 'translate3d(0,'+transFormList[pIndex]+'px,0)'}">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <template v-if="rangKey">
                  <div class="item" v-for="(item, index) in rang[pIndex]" v-bind:key="index">{{item[rangKey]}}</div>
                </template>
                <template v-if="!rangKey">
                  <div class="item" v-for="(item, index) in rang[pIndex]" v-if="!rangKey" v-bind:key="index">{{item}}</div>
                </template>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
              </div>
            </div>
          </template>
          <!-- 日期选择器、日期时间选择器、时间选择器 -->
          <template v-for="(pItem,pIndex) in myDateRang" v-if="mode=='date'||mode=='dateTime'||mode=='time'">
            <div class="picker-item" :key="pIndex" @touchstart.stop.prevent="touchStartFun($event, pIndex, transFormList[pIndex])"
              @touchmove.stop.prevent="touchMoveFun($event, pIndex, transFormList[pIndex])" @touchend.stop.prevent="touchEndFun($event, pIndex, transFormList[pIndex])">
              <div class="line top" v-if='myDateRang[pIndex].length>0'></div>
              <div class="line bottom" v-if='myDateRang[pIndex].length>0'></div>
              <div class="transform-view" v-bind:style="{transform: 'translate3d(0,'+transFormList[pIndex]+'px,0)'}">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <template>
                  <div class="item" v-for="(item, index) in myDateRang[pIndex]" v-bind:key="index">{{item}}</div>
                </template>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'picker-view',
    data() {
      return {
        timer: "",
        myDateRang: [],
        pickerDisplayValue: false, // picker 选择器的显示及隐藏
        transFormList: [0, 0, 0, 0, 0, 0, 0, 0], //
        touchToggle: false, // 是否允许移动
        touchObj: {
          time: 0,
          touchX: 0,
          touchY: 0,
          touchIndex: 0,
          screenY: 0
        }
      }
    },
    props: {
      mode: {
        type: String,
        default: 'selector',
        validator(value) {
          /* 选择器的类型
           * date: 时间选择器(已实现)
           * dateTime: 日期时间选择器(已实现)
           * time: 时间选择器(已实现)
           * selector: 常规单列选择器(已实现)
           * multiSelector: 多列选择器（最多三列选择）(已实现)
           * tree: 级联选择器（最多三级选择）
           */
          return ['date', 'dateTime', 'time', 'selector', 'multiSelector'].indexOf(value) !== -1
        }
      },
      rang: {
        // 数据列表
        type: Array,
        default () {
          return [];
        }
      },
      rangKey: {
        // 当mode值为 selector、multiSelector、tree时有效
        type: String,
        default: ''
      },
      value: {
        // 值
        type: [Number, Array, String],
        default: ""
      },
      start: { //mode值为date、dateTime时有效
        type: String,
        default: "0000-01-01 00:00:00"
      },
      end: {
        type: String,
        default: "9999-12-31 23:59:59"
      }
    },
    methods: {
      pickerDisplayChangeFun(value) {
        this.pickerDisplayValue = value;
      },
      touchStartFun(event, selectotIndex, transformY) {
        if (this.timer) {
          return false;
        }
        this.touchObj.time = new Date().getTime();
        this.touchObj.touchX = event.touches[0].screenX;
        this.touchObj.touchY = event.touches[0].screenY;
        this.touchObj.screenY = event.touches[0].screenY;
        this.touchObj.touchIndex = selectotIndex;
      },
      touchMoveFun(event, selectotIndex, transformY) {
        let touchIndex = this.touchObj.touchIndex,
          screenY = event.touches[0].screenY;
        if (this.timer) {
          return false;
        }
        this.transFormList[touchIndex] += screenY - this.touchObj.screenY;
        this.touchObj.screenY = screenY;
        this.transFormList.push(0);
        this.transFormList.unshift();
        this.transformYFun(touchIndex);
      },
      touchEndFun(event, selectotIndex, transformY) {
        let endTime = new Date().getTime() - this.touchObj.time,
          moveY = this.touchObj.touchY - this.touchObj.screenY;
        if (this.timer) {
          return false;
        }
        if (endTime >= 300) {
          return this.transformEndFun(endTime);
        }
        endTime = parseInt(endTime / 15);
        let speet = parseInt(moveY / endTime);
        this.timer = setInterval(() => {
          this.transFormList[this.touchObj.touchIndex] -= speet;
          if (speet >= 300) {
            speet -= 20;
          } else if (speet >= 200) {
            speet -= 15;
          } else if (speet >= 150) {
            speet -= 12;
          } else if (speet >= 100) {
            speet -= 6;
          } else if (speet >= 50) {
            speet -= 4;
          } else if (speet > 28) {
            speet -= 2;
          } else if (speet > 1) {
            speet -= 1;
          } else if (speet <= -300) {
            speet += 20;
          } else if (speet <= -200) {
            speet += 15;
          } else if (speet <= -150) {
            speet += 12;
          } else if (speet <= -100) {
            speet += 6;
          } else if (speet <= -50) {
            speet += 4;
          } else if (speet <= -28) {
            speet += 2;
          } else if (speet < -1) {
            speet += 1;
          }
          if ((speet <= 3 && speet >= 0 || speet >= -3 && speet <= 0)) {
            this.clearIntervalFun();
            return this.transformEndFun();
          }
          this.transformYFun(this.touchObj.touchIndex);
        }, 30)
      },
      transformEndFun(direction) {
        let yuShu = parseInt(this.transFormList[this.touchObj.touchIndex] % 32),
          speet = -1;
        if (yuShu <= -16) {
          speet = 1;
        }
        this.timer = setInterval(() => {
          this.transFormList[this.touchObj.touchIndex] -= speet;
          if (parseInt(this.transFormList[this.touchObj.touchIndex] % 32) == 0) {
            this.clearIntervalFun(true);
          }
          this.transformYFun(this.touchObj.touchIndex);
        }, 30)
      },
      transformYFun(touchIndex) {
        let maxTransform = 0,
          minTransform = 0;
        if (this.mode == "selector") {
          //单列选择器
          maxTransform = (this.rang.length - 1) * 32;
        } else if (this.mode == "multiSelector") {
          maxTransform = (this.rang[touchIndex].length - 1) * 32;
        } else if (this.mode == "time"||this.mode == "date"||this.mode == "dateTime") {
          maxTransform = (this.myDateRang[touchIndex].length - 1) * 32;
        }
        if (this.transFormList[touchIndex] + maxTransform <= 0) {
          this.transFormList[touchIndex] = -maxTransform;
          this.clearIntervalFun(true);
        } else if (this.transFormList[touchIndex] >= minTransform) {
          this.transFormList[touchIndex] = minTransform;
          this.clearIntervalFun(true);
        }
        this.transFormList.push(0);
        this.transFormList.unshift();
      },
      clearIntervalFun(computedToggle) {
        clearInterval(this.timer);
        if ((this.mode == "date"||this.mode == "dateTime") && this.touchObj.touchIndex == 0 && computedToggle) {
          let year = this.myDateRang[0][Math.abs(parseInt(this.transFormList[0] / 32))];
          this.computedYearFun(year);
        } else if ((this.mode == "date"||this.mode == "dateTime") && this.touchObj.touchIndex == 1 && computedToggle) {
          let year = this.myDateRang[0][Math.abs(parseInt(this.transFormList[0] / 32))];
          this.computedDayFun(year);
        }
        this.timer = null;
      },
      confirmButtonClickFun() {
        let value = 0;
        if (this.mode == "selector") {
          //单列选择器
          if (this.rang.length == 0) {
            return this.pickerDisplayChangeFun(false);
          }
          value = Math.abs(parseInt(this.transFormList[0] / 32));
        } else if (this.mode == "multiSelector") {
          value = [];
          for (let i = 0; i < this.rang.length; i++) {
            value.push(Math.abs(parseInt(this.transFormList[i] / 32)));
          }
        } else if (this.mode == "time") {
          value = [];
          for (let i = 0; i < this.myDateRang.length; i++) {
            value.push(this.myDateRang[i][Math.abs(parseInt(this.transFormList[i] / 32))]);
          }
          value = value.join(":");
        }else if(this.mode == "date"){
          value = [];
          for (let i = 0; i < this.myDateRang.length; i++) {
            value.push(this.myDateRang[i][Math.abs(parseInt(this.transFormList[i] / 32))]);
          }
          value = value.join("-");
        }else if(this.mode == "dateTime"){
          value = [];
          for (let i = 0; i < this.myDateRang.length; i++) {
            value.push(this.myDateRang[i][Math.abs(parseInt(this.transFormList[i] / 32))]);
          }
          value = value[0]+"-"+ value[1]+"-"+ value[2]+" "+value[3]+":"+value[4]+":"+value[5];
        }
        this.pickerDisplayChangeFun(false);
        this.$emit("change", {
          dataset: this.$el.dataset,
          detail: {
            value
          }
        })
      },
      initFun() {
        if (this.mode == "selector") {
          let value = Number(this.value) || 0;
          value = value>=this.rang.length?this.rang.length-1:value;
          let transFormY = -value * 32;
          return this.transFormList = [transFormY];
        }
        if (this.mode == "multiSelector") {
          let transFormList = [0,0,0];
          this.value&&this.value.forEach((item,index)=>{
            let itemValue = Number(item) || 0;
            itemValue = itemValue>=this.rang[index].length?this.rang[index].length-1:itemValue;
            transFormList[index] = -itemValue * 32;
          })
          return this.transFormList = transFormList;
        }
        if (this.mode == "time") {
          //this.value = [0, 0, 0];
          let h = Number(this.value.slice(0, 2)) || 0,
            m = Number(this.value.slice(3, 5)) || 0,
            s = Number(this.value.slice(6, 8)) || 0;
          h = h>23?23:h;
          m = m>59?59:m;
          s = s>59?59:s;
          h *= -32;
          m *= -32;
          s *= -32;
          this.myDateRang = [this.getListFun(0, 24), this.getListFun(0, 60), this.getListFun(0, 60)];
          return this.transFormList = [h, m, s];
        }
        if (this.mode == "date") {
          let today = new Date(),
            thisYear = today.getFullYear(),
            valueYear = Number(this.value.slice(0, 4)) || thisYear,
            thisMonth = today.getMonth() + 1,
            valueMonth = (this.value.slice(5, 7)) || thisMonth,
            monthTransFormY = 0,
            thisDay = today.getDate(),
            valueDay = (this.value.slice(8, 10)) || thisDay,
            monthList = this.getListFun(1, 13),
            dayList = this.getListFun(1, 31),
            dayTransFormY = 0;
          monthList.forEach((item, index) => {
            let month = Number(item);
            if (month < valueMonth) {
              monthTransFormY -= 32;
            }
          })
          dayList.forEach((item, index) => {
            let day = Number(item);
            if (day < valueDay) {
              dayTransFormY -= 32;
            }
          })
          this.transFormList = [0, monthTransFormY, dayTransFormY];
          this.myDateRang = [
            [], monthList, dayList
          ];
          return this.computedYearFun(valueYear);
        }
        if(this.mode == "dateTime"){
          let h = Number(this.value.slice(11, 13)) || 0,
            m = Number(this.value.slice(14, 16)) || 0,
            s = Number(this.value.slice(17, 19)) || 0;
          h = h>23?23:h;
          m = m>59?59:m;
          s = s>59?59:s;
          h *= -32;
          m *= -32;
          s *= -32;
          let today = new Date(),
            thisYear = today.getFullYear(),
            valueYear = Number(this.value.slice(0, 4)) || thisYear,
            thisMonth = today.getMonth() + 1,
            valueMonth = (this.value.slice(5, 7)) || thisMonth,
            monthTransFormY = 0,
            thisDay = today.getDate(),
            valueDay = (this.value.slice(8, 10)) || thisDay,
            monthList = this.getListFun(1, 13),
            dayList = this.getListFun(1, 31),
            dayTransFormY = 0;
          monthList.forEach((item, index) => {
            let month = Number(item);
            if (month < valueMonth) {
              monthTransFormY -= 32;
            }
          })
          dayList.forEach((item, index) => {
            let day = Number(item);
            if (day < valueDay) {
              dayTransFormY -= 32;
            }
          })
          this.transFormList = [0, monthTransFormY, dayTransFormY,h, m, s];
          this.myDateRang = [
            [], monthList, dayList,this.getListFun(0, 24), this.getListFun(0, 60), this.getListFun(0, 60)
          ];
          return this.computedYearFun(valueYear);
        }
      },
      computedYearFun(activeYear) {
        activeYear = Number(activeYear);
        let startYear = activeYear - 50,
          endYear = activeYear + 50,
          transFormY = 0,
          list = [];
        let initStartYear =this.start.slice(0, 4);
        let initEndYear = this.end.slice(0, 4);
        if (startYear < initStartYear) {
          startYear = initStartYear;
        }
        if (startYear < 0) {
          startYear = 0;
        }
        if (endYear > initEndYear) {
          endYear = initEndYear;
        }
        if (endYear > 9999) {
          endYear = 9999;
        }
        for (let i = startYear; i < endYear; i++) {
          let listItem = i;
          if(listItem == 0){
            listItem = "0000";
          }else if (listItem < 10) {
            listItem = "000" + listItem;
          } else if (listItem < 100) {
            listItem = "00" + listItem;
          } else if (listItem < 1000) {
            listItem = "0" + listItem;
          }
          if (i < activeYear) {
            transFormY -= 32;
          }
          list.push(listItem);
        }
        this.myDateRang[0] = list;
        this.transFormList[0] = transFormY;
        this.computedDayFun(activeYear)
      },
      computedDayFun(activeYear) {
        let daylength = 31;
        let month = Number(this.myDateRang[1][Math.abs(parseInt(this.transFormList[1] / 32))]);
        switch (month) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            daylength = 31;
            break;
          case 4:
          case 6:
          case 9:
          case 11:
            daylength = 30;
            break;
          case 2:
            daylength = 28;
            break;
        }
        if ((activeYear % 400 == 0 || (activeYear % 4 == 0 && activeYear % 100 != 0)) && month == 2) {
          daylength = 29;
        }
        let dayList = this.getListFun(1, daylength + 1);
        if ((dayList.length-1) * 32 + this.transFormList[2] <= 0) {
          this.transFormList[2] = -(dayList.length-1) * 32;
        }
        this.myDateRang[2] = dayList;
      },
      getListFun(startNum, endNum) {
        let list = [];
        for (let i = startNum; i < endNum; i++) {
          let listItem = i;
          if (listItem < 10) {
            listItem = "0" + listItem;
          }
          list.push(listItem);
        }
        return list;
      }
    },
    created() {
      this.initFun();
    },
    watch: {
      rang() {
        this.initFun();
      },
      mode(newValue) {
        this.initFun();
      },
      value() {
        this.initFun();
      }
    }
  }
</script>

<style scoped="scoped">
  .picker-fixed-view[_data-type="component"] {
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    max-width: 750px;
    transform: translateX(-50%);
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.45);
  }

  .picker-fixed-view[_data-type="component"]>.picker-view {
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0 0 24px 0 rgb(0, 0, 0, 0.15);
    user-select: none;
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-header>.picker-button {
    padding: 0 16px;
    box-sizing: border-box;
    line-height: 36px;
    font-size: 12px;
    color: #18a0ff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-header>.cancle-button {
    color: #999999;
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-section {
    position: relative;
    display: flex;
    padding: 0 12px;
    box-sizing: border-box;
    background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0px, rgba(255, 255, 255, 0.65) 94px, rgba(255, 255, 255, 0) 94px, rgba(255, 255, 255, 0) 126px, rgba(255, 255, 255, 0.65) 126px, rgba(255, 255, 255, 0.95) 220px);
    mix-blend-mode: multiply;
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-section>.picker-item {
    width: 1px;
    flex: 1 0 auto;
    height: 220px;
    overflow: hidden;
    mix-blend-mode: screen;
    position: relative;
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-section>.picker-item>.line {
    position: relative;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1px;
    z-index: 9;
    max-width: 100px;
    background: #18a0ff;
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-section>.picker-item>.line.top {
    transform: translate(-50%, -12px);
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-section>.picker-item>.line.bottom {
    transform: translate(-50%, 14px);
  }

  .picker-fixed-view[_data-type="component"]>.picker-view>.picker-section>.picker-item .item {
    height: 32px;
    line-height: 32px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 12px;
    box-sizing: border-box;
    color: #333333;
  }
</style>
