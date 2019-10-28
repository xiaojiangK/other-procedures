//Component Object
const audio = wx.createInnerAudioContext();
let isPlay = false;

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
    data: {
        style: {},
        params: {},
        iconClass: 'kaishi',
        currentTime: '00:00'
    },
    methods: {
        s_to_hs(s) {
            //计算分钟
            //算法：将秒数除以60，然后下舍入，既得到分钟数
            var h;
            h = Math.floor(s/60);
            //计算秒
            //算法：取得秒%60的余数，既得到秒数
            s = s%60;
            //将变量转换为字符串
            h += '';
            s += '';
            //如果只有一位数，前面增加一个0
            h = (h.length==1)?'0'+h:h;
            s = (s.length==1)?'0'+s:s;
            return h+':'+s;
        },
        play() {
            if (audio.paused) {
                audio.play();
                isPlay = true;
                this.setData({ iconClass: 'zanting' });
            } else {
                if (this.data.params.pausestop == '1') {
                    audio.stop();
                } else {
                    audio.pause();
                }
                isPlay = false;
                this.setData({ iconClass: 'kaishi' });
            }
        }
    },
    pageLifetimes: {
        show() {
            if (isPlay) {
                audio.play();
            }
        },
        hide() {
            audio.pause();
        }
    },
    ready() {
        if (this.data.params.loopplay == '1') {
            audio.loop = true;
        } else {
            audio.loop = false;
        }
        audio.src = this.data.params.audiourl;
        if (this.data.params.playerstyle == '0') {
            audio.onTimeUpdate(() => {
                const currentTime = audio.currentTime;
                this.setData({
                    currentTime: this.s_to_hs(Number.parseInt(currentTime))
                });
            });
        }
        audio.onEnded(() => {
            this.setData({ iconClass: 'kaishi' });
            this.setData({ currentTime: '00:00' });
        });
    }
});