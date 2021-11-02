<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
    </keep-alive>
  </router-view>
</template>

<style lang="scss">
</style>
