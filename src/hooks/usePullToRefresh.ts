import { reactive } from 'vue'
import { Toast } from 'vant'
import { ListData } from '@/types/types'
import { UnwrapRef } from '@vue/reactivity'
import requestInstance from '@/http'
import { BaseRequest } from '@/http/request/type'

type PullType = 'refresh'|'load'

function usePullToRefresh<T> (url: string, options = {}, pageSize?: number) {
  const state = reactive({
    list: [] as Array<T>,
    loading: false,
    finished: false,
    page: 0,
    pageSize: pageSize ?? 10
  })

  const onLoad = async (pullType?: PullType) => {
    const _type = pullType ?? 'load'
    state.loading = true
    const result = await requestInstance.post<BaseRequest<ListData<T>>>({
      url: url,
      data: {
        page: ++state.page,
        limit: state.pageSize,
        ...options
      }
    })
    state.loading = false
    if (result.code === 200) {
      const data = result.data.list.data
      if (data.length === 0) {
        state.page = state.page - 1
        state.finished = true
      } else {
        if (_type === 'load') {
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
    await onLoad('refresh')
  }
  return {
    state,
    onLoad,
    onRefresh
  }
}

export default usePullToRefresh
