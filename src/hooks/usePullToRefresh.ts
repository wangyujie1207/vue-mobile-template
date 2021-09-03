import { reactive } from 'vue'
import { post } from '@/http/request'
import { Toast } from 'vant'
import { ListData } from '@/types/types'
import { UnwrapRef } from '@vue/reactivity'

enum PullTypeEnum {PULL_REFRESH, PULL_UP}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function usePullToRefresh<T> (url: string, options = {}, pageSize?: number) {
  const state = reactive({
    list: [] as Array<T>,
    loading: false,
    finished: false,
    page: 0,
    pageSize: pageSize ?? 10
  })

  const onLoad = async (pullType?: PullTypeEnum) => {
    const _type = pullType ?? PullTypeEnum.PULL_UP
    state.loading = true
    const result = await post<ListData<T>>(url, {
      page: ++state.page,
      limit: state.pageSize,
      ...options
    })
    state.loading = false
    if (result.code === 200) {
      const data = result.data.list.data
      if (data.length === 0) {
        state.page = state.page - 1
        state.finished = true
      } else {
        if (_type === PullTypeEnum.PULL_UP) {
          state.list = state.list.concat(data as UnwrapRef<Array<T>>)
        } else {
          state.list = data as UnwrapRef<Array<T>>
        }
        if (data.length < state.pageSize) {
          state.finished = true
        }
      }
    } else {
      state.finished = true
      Toast(result.message)
    }
  }

  const onRefresh = async () => {
    state.finished = false
    state.loading = true
    state.page = 0
    await onLoad(PullTypeEnum.PULL_REFRESH)
  }
  return {
    state,
    onLoad,
    onRefresh
  }
}

export default usePullToRefresh
