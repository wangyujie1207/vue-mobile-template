import { App } from 'vue'
import { Button, Loading, NavBar, Toast, List } from 'vant'

const components = [Button, Loading, NavBar, Toast, List]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
