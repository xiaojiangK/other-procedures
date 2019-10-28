//Component Object
import { countDown } from '../../../utils/util.js'
var timer = null;

Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                this.setData({
                    style: newVal.style,
                    params: newVal.params
                });
            }
        }
    },
    pageLifetimes: {
      hide() {
        clearInterval(timer);
      },
      show() {
        this.startCountDown();
      }
    },
    lifetimes: {
      // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
      attached() {
        this.startCountDown()
      }
    },
    data: {
        style: {},
        params: {},
        time: [0,0,0]
    },
    methods: {
        startCountDown() {
            clearInterval(timer);
            timer = setInterval(() => {
                countDown(1568000000, this);
            }, 1000);
        }
    }
});