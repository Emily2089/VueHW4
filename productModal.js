
export default {
  props:['tempProduct', 'updateData', 'is_new'],
  data() {
    return {
      productModal: '',
    }
  },
  methods: {
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    }
  },
  template: /*html*/`<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span v-if="is_new">新增產品</span>
          <span v-else>編輯產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="mainImg" class="form-label">主要圖片</label>
                <input type="text" id="mainImg" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.mainImg">
              </div>
              <img class="img-fluid" :src="tempProduct.mainImg" alt="">
            </div>
            <h3>多圖新增</h3>
            <!-- note： Array.isArray() 可用來確認傳入的內容是否為一個陣列-->
            <div v-if="Array.isArray(tempProduct.demoImg)" class="mb-3">
              <div v-for="(image, key) in tempProduct.demoImg" :key="key" class="mb-3">
                <div class="mb-3">
                  <label :for="'demoImg'+key" class="form-label">圖片網址</label>
                  <input type="text" :id="'demoImg'+key" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.demoImg[key]">
                </div>
                <img class="img-fluid" :src="image" alt="">
              </div>
              <!-- note：跳出視窗後，因為 tempProduct 的 demoImg 仍是空陣列，所以 !tempProduct.demoImg.length 的結果為 true，因此顯示 "新增圖片" 的按鈕。第一次按下 "新增圖片" 後，會在 demoImg 產生一個第0筆資料其 value 為空字串，等輸入文字後，透過 v-model 將輸入的文字綁定進去，第0筆資料就完成了，有 key 有 value，因此 tempProduct.demoImg[tempProduct.demoImg.length - 1] 就會存在，結果為 true -->
              <div v-if="!tempProduct.demoImg.length || tempProduct.demoImg[tempProduct.demoImg.length - 1]">
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.demoImg.push('')">
                  新增圖片
                </button>
              </div>
              <div v-else>
                <!-- note：Array.prototype.pop() 會移除並回傳陣列的最後一個元素。此方法會改變陣列的長度。 -->
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.demoImg.pop()">
                  刪除圖片
                </button>
              </div>
            </div>
            <div v-else>
              <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.demoImg.pop()">
                刪除圖片
              </button>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="intro" class="form-label">遊戲簡介</label>
              <textarea id="intro" type="text" class="form-control"
                placeholder="請輸入產品描述" v-model="tempProduct.intro">
              </textarea>
            </div>
            <div class="mb-3">
              <h5>遊戲特色</h5>
              <div v-if="Array.isArray(tempProduct.features)" class="mb-3">
                <div v-for="(feature, key) in tempProduct.features" :key="key" class="mb-3">
                  <label :for="'feature'+key" class="form-label">特色 {{ key+1 }}</label>
                  <textarea :id="'feature'+key" type="text" class="form-control"
                    placeholder="請輸入說明內容" v-model="tempProduct.features[key]">
                  </textarea>
                </div>
                <div v-if="!tempProduct.features.length || tempProduct.features[tempProduct.features.length -1]">
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.features.push('')">新增遊戲特色</button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.features.pop()">刪除遊戲特色</button>
                </div>
              </div>
              <!-- <div v-else>
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.features.pop()">
                  刪除遊戲特色
                </button>
              </div> -->
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="true" :false-value="false" v-model="tempProduct.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateData">
          確認
        </button>
      </div>
    </div>
  </div>
</div>`,
  mounted() {
    // note：refs 是 Vue 提供的一個 API，可以讓我們在 Vue 中選取 DOM 元素。
    this.productModal = new bootstrap.Modal(this.$refs.productModal, { backdrop: 'static' });
  }
};