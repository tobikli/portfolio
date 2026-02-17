<script setup lang="ts">
import { certificates } from '@/data/certificates';
import { showPopup } from '@/composables/usePopup'
import CertificatesDetail from './CertificatesDetail.vue';
</script>

<template>
  <div class="text-center">
    <div v-for="cert in certificates" :key="cert.name">
      <button
        class="py-3 w-full"
        @click="
          showPopup({
            title: cert.name,
            component: CertificatesDetail,
            componentProps: {
              issuer: cert.issuer,
              pdf: cert.pdf,
              link: cert.link,
              date: cert.date
            },
          })
        "
      >
        <div class="grid grid-cols-[65%_20%] gap-4 w-full">
          <a class="text-right underline-offset-5 underline hover:cursor-pointer">{{
            cert.name
          }}</a>
          <a class="text-left">{{ cert.date.toLocaleDateString() }}</a>
        </div>
      </button>
    </div>
  </div>
</template>
