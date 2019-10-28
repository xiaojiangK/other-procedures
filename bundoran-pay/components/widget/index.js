//Component Object
Component({
    properties: {
        widgetsData: {
            type: Object,
            value: []
        },
        goods: {
            type: Object,
            value: {}
        },
        member: {
            type: Object,
            value: {}
        },
        comment: {
            type: Object,
            value: {}
        }
    },
    data: {

    },
    methods: {
        tabsChange(e) {
            this.triggerEvent('tabsChange', e.detail);
        },
        menuChange(e) {
            this.triggerEvent('menuChange', e.detail);
        },
        timerSelect(e) {
            this.triggerEvent('timerSelect', e.detail);
        },
        hallSelect(e) {
            this.triggerEvent('hallSelect', e.detail);
        },
        goBuy(e) {
            this.triggerEvent('selectPicker', e.detail);
        },
        selectPicker(e) {
            this.triggerEvent('selectPicker', e.detail);
        }
    }
});