import { reactive } from 'vue'

const state = reactive({
  images: [
    {
      id: 'id1',
      url: '/images/xrays/1.jpg',
      caption: '환자번호 0001'
    },
    {
      id: 'id2',
      url: '/images/xrays/2.png',
      caption: '환자번호 0002'
    },
    {
      id: 'id3',
      url: '/images/xrays/3.png',
      caption: '환자번호 0003'
    },
    {
      id: 'id4',
      url: '/images/xrays/4.png',
      caption: '환자번호 0004'
    },
    {
      id: 'id5',
      url: '/images/xrays/5.png',
      caption: '환자번호 0005'
    },
    {
      id: 'id6',
      url: '/images/xrays/6.png',
      caption: '환자번호 0006'
    },
    {
      id: 'id7',
      url: '/images/xrays/7.png',
      caption: '환자번호 0007'
    },
    {
      id: 'id8',
      url: '/images/xrays/8.png',
      caption: '환자번호 0007'
    },
    {
      id: 'id9',
      url: '/images/xrays/9.png',
      caption: '환자번호 0009'
    },
    {
      id: 'id10',
      url: '/images/xrays/10.png',
      caption: '환자번호 0010'
    }
  ],
  usePageTransition: false,
  iosBrowserSwipingBack: false
})

const getters = {
  getImage(imageId) {
    return state.images.filter(image => image.id === imageId)[0]
  }
}

const store = {
  state,
  getters
}

export default store