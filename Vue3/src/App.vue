<template>
  <div>App 自定义Hooks函数</div>
  <div>坐标:{{ X }}--{{ Y }}</div>
  <div id="view" style="width: 300px;height: 300px;background-color: aquamarine;"></div>

  <div>{{ FileName }}--{{ FileType }}</div>
  <div>{{ ReadText }}</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import GetCoordinates from "./hooks/GetCoordinates";
import useRequset from "./hooks/useRequset";
import useDropLoading from "./hooks/useDropLoading";


export default defineComponent({
  name: 'AppName',
  setup() {
    interface Address {
      id: number;
      address: string;
      distance: string;
    }
    interface Products {
      id: number;
      title: string;
      price: string;
    }
    // 需求1:用户在页面中点击页面,把点击坐标显示出来
    const { X, Y } = GetCoordinates()




    const { FileName, FileType, ReadText } = useDropLoading(document?.querySelector('#view'))







    onMounted(() => {
      console.log('useDropLoading', FileName);
      console.log('useDropLoading', FileType);
      console.log('useDropLoading', ReadText);
    });





    // 需求2:封装ajax请求的hooks函数
    const ObjData = useRequset<Address>('/data/address.json')
    const ArrData = useRequset<Products[]>('/data/products.json')
    console.log(ObjData, ArrData)



    return { X, Y, FileName, FileType, ReadText }
  },
})
</script>