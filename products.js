import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import productModal from './productModal.js';
import delProductModal from './delProductModal.js';
import pageComponent from './pageComponent.js';

createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'emily-apitest',
      products: [],
      tempProduct: {
        demoImg: [],
        features: [],
      },
      // note：建立屬性 is_new 來切換"新增"和"編輯"的狀態
      is_new: true,
      productModal: '',
      delProductModal: '',
      // note：根據 API 文件顯示，使用路徑 /v2/api/{api_path}/admin/products ，連線成功後所取得的結果中會有一個 pagination 物件，裡面會有總頁數、目前頁碼位置、有無上一頁、有無下一頁、類別為何的資訊，預計將這些資料取出存放在這個 page 物件。
      pages: {},
    }
  },
  methods: {
    // 驗證登入
    checkAdmin() {
      axios.post(`${this.url}/api/user/check`)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'index.html';
        })
    },
    // 取得後台資料
    getData(page = 1) {
      // note：路徑有 all 代表全部資料，沒有 all 代表是有分頁的。另外，根據文件說明，若是使用 "含分頁" 的路徑，須另外帶入參數 1. page 2. category  
      axios.get(`${this.url}/api/${this.path}/admin/products?page=${ page }`)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
          console.log(res);
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    // 新增產品
    openModal(action, item) {
      if(action === '新增') {
        this.$refs.pModal.openModal();
        this.is_new = true;
        this.tempProduct = {
          demoImg: [],
          features: [],
        }

      }else if (action === '編輯') {
        this.$refs.pModal.openModal();
        this.is_new = false;
        this.tempProduct = { ...item };

      }else if(action === '刪除') {
        this.$refs.dModal.openModal();
        this.tempProduct = { ...item };
      }
    },
    updateData() {
      // 新增資料
      let apiUrl = `${this.url}/api/${this.path}/admin/product`;
      let http = 'post';

      if (this.is_new === false) {
        // 編輯資料
        // note：當 is_new 的值為 false 時，代表要編輯資料，所以使用 put，apiUrl 須加上參數 id
        apiUrl = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }

      axios[http](apiUrl, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$refs.pModal.closeModal();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    // 刪除資料
    deleteData() {
      axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          alert(res.data.message);
          this.$refs.dModal.closeModal();
          
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
  },
  mounted() {
    // 將 cookie 裡的 token 夾在 headers 裡
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)emilyToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
    axios.defaults.headers.common['Authorization'] = token;

    this.checkAdmin();
  },
  components: {
    pageComponent,
    productModal,
    delProductModal
  }
}).mount('#app');