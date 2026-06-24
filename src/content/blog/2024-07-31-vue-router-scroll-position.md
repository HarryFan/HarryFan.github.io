---
title: '解決 Vue.js 應用中返回首頁時滾動位置不對的問題'
description: '從詳細頁返回首頁時，頁面總是跳到頂部，而不是回到原本的滾動位置。用 Vue Router 的 meta 保存 scroll position，再在首頁 onMounted 恢復就解決了。'
pubDate: 2024-07-31
heroImage: '/blog/2024-07-31-vue-router-scroll-position.webp'
---

## 滾動位置的問題

在一個專案中，我們需要從詳細頁面返回首頁時保持滾動位置。這個問題看起來很簡單，但處理起來還是有點棘手。

每次從詳細頁面返回首頁時，頁面都會滾動到頂部，而不是返回到點擊「了解更多」按鈕時的滾動位置。這樣使用者體驗不太好，尤其頁面很長時。

## 解決過程

先保存當前頁面的滾動位置，然後在返回首頁時恢復。

### router/index.js

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/detail/:id', name: 'detail', component: DetailView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to, from) => {
  if (to.name === 'home' && from.meta.scrollPosition) {
    // 不重置滾動位置，讓 scrollToContent 處理滾動
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
});

export default router;
```

### DetailView.vue：點擊時保存滾動位置

```vue
<template>
  <div>
    <button @click="navigateToHome">返回首頁</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navigateToHome = () => {
  const scrollPosition = { top: window.scrollY, left: window.scrollX };
  route.meta.scrollPosition = scrollPosition;
  router.push({ name: 'home' });
};
</script>
```

### HomeView.vue：恢復到保存的位置

```vue
<script setup>
import { onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const scrollToContent = async () => {
  await nextTick();
  const savedPosition = route.meta.scrollPosition;
  if (savedPosition) {
    window.scrollTo({ top: savedPosition.top, left: savedPosition.left, behavior: 'smooth' });
  }
};

onMounted(() => {
  scrollToContent();
});
</script>
```

## 結語

這個過程讓我學到不少，尤其是如何在 Vue Router 中保存和恢復滾動位置。如果你在專案中遇到類似問題，可以試試這種方法。
