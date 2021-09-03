import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
import { on, off } from '../utils'

import clickoutsideDirective from '../directive'

export default defineComponent({
  directives: {
    clickoutside: clickoutsideDirective
  },
  props: {
    currentPageSize: Number,
    pageSizeChange: Function,
    pageSizeOptions: Array as PropType<Array<number>>
  } as const,
  setup() {
    const paginationConfig = ref(null)
    const isShowConfig = ref(false)
    
    onMounted(() => {
      on(paginationConfig.value, 'click', closeConfigMenu)
    })
    onUnmounted(() => {
      off(paginationConfig.value, 'click', closeConfigMenu)
    })
    const closeConfigMenu = (e: Event) => {
      isShowConfig.value = isShowConfig.value ? false : !!e
    }

    return {
      paginationConfig,
      isShowConfig,
      closeConfigMenu
    }
  },
  render() {
    const {
      closeConfigMenu,
      currentPageSize,
      pageSizeChange,
      pageSizeOptions,
      isShowConfig,
      $slots
    } = this

    return (
      <div class="devui-pagination-config" v-clickoutside={closeConfigMenu} ref="paginationConfig">
        <div class="devui-setup-icon">
          <i class="icon-setting" style="font-weight: bold;"></i>
        </div>
        {
          isShowConfig &&
          <div class="devui-config-container">
            {$slots.default?.()}
            
            <div class="pagination-config-item">
              <div class="config-item-title">每页条数</div>
              <div class="devui-page-number">
                {
                  pageSizeOptions.map((v: number) => {
                    return (
                      <div
                        class={{choosed: v === currentPageSize}}
                        key={v}
                        onClick={pageSizeChange.bind(null, v)}
                      >{v}</div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
})