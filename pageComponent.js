
export default {
  props: ['pages', 'getData'],
  template: /*html*/`<nav aria-label="Page navigation example">
  <ul class="pagination">
    <!-- note：disabled 的條件也可寫成 page.current_page === 1，但這樣做的缺點就是它被寫死了，如果在做尾頁的條件限制也是這樣寫，則每次總頁數改變時，都必須調整這個 disabled 的條件，因此不推薦這樣寫 -->
    <li class="page-item" :class="{ disabled: !pages.has_pre }">
      <a class="page-link" href="" @click.prevent="getData(pages.current_page - 1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="page in pages.total_pages" :key="'page' + page" :class="{ active: page === pages.current_page }">
      <a class="page-link" href="" @click.prevent="getData(page)">{{ page }}</a>
    </li>
    <li class="page-item" :class="{ disabled: !pages.has_next }">
      <a class="page-link" href="" @click.prevent="getData(pages.current_page + 1)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,

}