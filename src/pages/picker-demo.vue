<template>
  <div id="picker-demo-page" class="app-page">
    <div class="app-page-header">
      <navigation-bar page-title="picker"></navigation-bar>
    </div>
    <div class="app-page-section">
      <scroll-view v-bind:scroll-y="true">
        <div class="app-list-title">单列选择器</div>
        <picker v-bind:rang="pickerList1" :value="pickerIndex1" data-key="pickerIndex1" v-on:change="pickerChangeFun">
          <div class="picker-view1">{{pickerList1[pickerIndex1]||'请选择'}}</div>
        </picker>
        <div class="app-list-title">单列选择器（对象型）</div>
        <picker v-bind:rang="pickerList2" :value="pickerIndex2" rang-key="name" data-key="pickerIndex2" v-on:change="pickerChangeFun">
          <div class="picker-view1">{{pickerList2[pickerIndex2]?pickerList2[pickerIndex2].name:'请选择'}}</div>
        </picker>
        <div class="app-list-title">多列选择器</div>
        <picker v-bind:rang="pickerList3" :value="pickerIndex3" mode="multiSelector" data-key="pickerIndex3" v-on:change="pickerChangeFun">
          <div class="picker-view1">{{pickerList3[0][pickerIndex3[0]]}}--{{pickerList3[1][pickerIndex3[1]]}}</div>
        </picker>
        <div class="app-list-title">多列选择器（对象型）</div>
        <picker v-bind:rang="pickerList4" :value="pickerIndex4" rang-key="name" mode="multiSelector" data-key="pickerIndex4" v-on:change="pickerChangeFun">
          <div class="picker-view1">{{pickerList4[0][pickerIndex4[0]].name}}--{{pickerList4[1][pickerIndex4[1]].name}}</div>
        </picker>
        <div class="app-list-title">时间选择器</div>
        <picker mode="time" :value="pickerIndex5" data-key="pickerIndex5" v-on:change="pickerChangeFun">
          <div class="picker-view1">{{pickerIndex5||'请选择'}}</div>
        </picker>
        <div class="app-list-title">日期选择器</div>
        <picker mode="date" :value="pickerIndex6" data-key="pickerIndex6" v-on:change="pickerChangeFun">
          <div class="picker-view1">{{pickerIndex6||'请选择'}}</div>
        </picker>
        <div class="app-list-title">日期时间选择器</div>
        <picker mode="dateTime" :value="pickerIndex7" data-key="pickerIndex7" v-on:change="pickerChangeFun">
          <div class="picker-view1">{{pickerIndex7||'请选择'}}</div>
        </picker>
        <div class="app-media-bottom-view"></div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import componentPicker from "@/components/picker"
  import componentNavigationBar from "@/components/navigation-bar"
  import componentScrollView from "@/components/scroll-view"
  export default {
    name: "picker-demo-page",
    components: {
      'navigation-bar': componentNavigationBar,
      'scroll-view': componentScrollView,
      'picker': componentPicker
    },
    data() {
      return {
        pickerList1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        pickerIndex1: 2,
        pickerList2: [{
          id: "01",
          name: "张三"
        }, {
          id: "02",
          name: "李四"
        }, {
          id: "03",
          name: "王五"
        }, {
          id: "04",
          name: "赵六"
        }],
        pickerIndex2: 3,
        pickerList3: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        ],
        pickerIndex3: [2, 3],
        pickerList4: [
          [{
            "id": "01",
            "name": "周"
          }, {
            "id": "01",
            "name": "吴"
          }, {
            "id": "02",
            "name": "郑"
          }, {
            "id": "03",
            "name": "王"
          }, {
            "id": "04",
            "name": "赵"
          }, {
            "id": "05",
            "name": "钱"
          }, {
            "id": "06",
            "name": "孙"
          }, {
            "id": "07",
            "name": "李"
          }],
          [{
            id: "01",
            name: "壹"
          }, {
            id: "02",
            name: "贰"
          }, {
            id: "03",
            name: "叁"
          }, {
            id: "04",
            name: "肆"
          }, {
            id: "05",
            name: "伍"
          }]
        ],
        pickerIndex4: [0, 0],
        pickerIndex5: "08:30:00",
        pickerIndex6: "0100-09-09",
        pickerIndex7: "2019-04-15 09:30:00"
      }
    },
    methods: {
      pickerChangeFun(res) {
        let key = res.dataset.key,
          value = res.detail.value;
        this[key] = value;
      }
    }
  }
</script>

<style scoped="scoped">
  #picker-demo-page {
    background: #FFFFFF;
  }
  .picker-view1 {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    margin: 0 auto;
  }
</style>
