<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          label="흉부 X-ray"
        />
      </template>
      <template #title>상세 이미지</template>
    </page-header>
    <page-body>
      <transition
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <div
          v-if="image"
        >
          <q-img
            :src="image.url"
            class="no-pointer-events"
            no-transition
            no-spinner
          />
          <div class="q-pa-lg">
            <q-btn 
              color="primary" 
              label="Primary" 
              @click="loadData"
            />
            <div class="text-h5 q-mb-md">{{ image.caption }}</div>
            <p>애국가의 가사는 1900년대 초에 쓰여졌다. 작사자는 크게 윤치호라는 설과 안창호라는 설 두 가지가 있으며, 국사편찬위원회의 공식적인 입장으로는 미상이다. 작사자 윤치호 설은 윤치호가 애국가의 가사를 1907년에 써서 후에 그 자신의 이름으로 출판했다는 것이다. 한편 안창호가 썼다는 주장은 안창호가 애국가를 보급하는 데에 앞장섰다는 데에 중점을 두고 있다. 1908년에 출판된 가사집 《찬미가》에 수록된 것을 비롯한 많은 일제 강점기의 애국가 출판물은 윤치호를 작사자로 돌리고 있는 등 윤치호 설에는 증거가 많은 반면[4] 안창호 설에는 실증적인 자료가 부족하다.</p>
          </div>
        </div>
      </transition>
    </page-body>
  </page>
</template>

<script>
import { onActivated, onDeactivated, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from 'src/doctorStore/xray.js'
import { axios, api } from 'boot/axios'
import { useQuasar } from 'quasar'
// import fs from 'fs-extra'

export default {
  name: 'Xray',
  setup() {
    var Buffer = require('buffer/').Buffer

    const $q = useQuasar() 
    const data = ref(null)
    const file = ref(null)
    let image = ref()
    
    async function getBase64(url) {
      return axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
    }

    file.value = getBase64('/images/xrays/2.png')
    
    onActivated(() => {
      let route = useRoute()
      image.value = store.getters.getImage(route.params.id)
    })

    onDeactivated(() => {
      image.value = null
    })
    
    async function loadData () {
      const file = await getBase64('/images/xrays/1.jpg')
      const base64 = 'data:image/jpg;base64,' + file;
      const blob = await fetch(base64).then(res => res.blob())

      // console.log('base64 ======> ', base64)
      // console.log('blob ======> ', blob)
      const formData = new FormData() 
      formData.append('file', blob);


      api.post('/predict', formData , { 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
       })
        .then((response) => {
          console.log('response.data : ', response.data)
          data.value = response.data
        })
        .catch((e) => {
          console.log('error : ', e)
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'x-ray 예측이 안되었습니다.',
            icon: 'report_problem'
          })
        })
      // api.post(config)
      //   .then((response) => {
      //     console.log('response.data : ', response.data)
      //     data.value = response.data
      //   })
      //   .catch((e) => {
      //     console.log('error : ', e)
      //     // $q.notify({
      //     //   color: 'negative',
      //     //   position: 'top',
      //     //   message: 'Loading failed',
      //     //   icon: 'report_problem'
      //     // })
      //   })
    }
  

    return {
      store,
      image,
      data,
      loadData
    }
  }
}
</script>
