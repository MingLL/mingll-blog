
const MODE = import.meta.env.MODE

let BASE_URL = ''

const TIME_OUT = 5000

if (MODE === 'development' ) {
  BASE_URL= '/api'
} else if (MODE === 'production') {
  BASE_URL = 'https://example.com/prod'
} else {
  BASE_URL = 'https://example.com/test'
}

export {BASE_URL, TIME_OUT}