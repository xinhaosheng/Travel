let defaultCity = '上海'
// 存放数据
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {
}
export default {
  city: defaultCity
}
