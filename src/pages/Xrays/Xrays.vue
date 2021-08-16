<template>
  <page>
    <page-header>
      <template #title>흉부 X-RAY</template>
    </page-header>
    <page-body>
      <div class="row">
        <router-link
          v-for="image in store.state.images"
          :key="image.id"
          :to="`/xrays/${ image.id }`"
          class="col-6"
        >
          <q-img
            :src="image.url"
            :ratio="1"
          />
        </router-link>
      </div>
    </page-body>
  </page>
</template>

<script>
import store from 'src/doctorStore/xray.js'

export default {
  name: 'Xrays',
  setup() {
    return {
      store
    }
  }
}
</script>
