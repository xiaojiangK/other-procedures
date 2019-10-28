import dayjs from './dayjs.js';

export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 倒计时
export function countDown(time, that) {
  const date1 = dayjs(time * 1000 + (60 * 30 * 1000));
  const date2 = dayjs(Date.now());
  if (date1 > date2) {
      const hour = date1.diff(date2, 'hour');
      const date3 = date2.add(hour, 'hour');
      const minute = date1.diff(date3, 'minute');
      const date4 = date3.add(minute, 'minute');
      const second = date1.diff(date4, 'second');
      that.setData({
        time: [hour < 10 ? '0'+hour : hour || '00', minute < 10 ? '0'+minute : minute || '00', second < 10 ? '0'+second : second || '00']
      });
  }
}
