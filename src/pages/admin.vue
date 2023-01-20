
<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../store/index'

const messageInput = ref(null as any)
const cryptoStore = useCryptoStore()
const { addSupplier, connectWallet } = useCryptoStore()
const { account } = storeToRefs(cryptoStore)
const mAddress = ref(null as any)
const mAmount = ref(null as any)

</script>
<template>
  <div class="flex flex-col items-center">
    <h1 class="text-5xl m-4">
      Admin Page
    </h1>
    <button v-if="!account" class="bg-green-300 rounded p-4" @click="connectWallet">
      Connect Wallet
    </button>
    <div v-if="account" class="">

      <div class="my-20">
        <input v-model="mAddress" name="guestBookInfo" class="py-4 px-4  shadow border rounded" >
        <input v-model="mAmount" name="guestBookInfo" class="py-4 px-4  shadow border rounded" maxlength="20">
        <button class="bg-yellow-300 rounded p-4 mt-10 px-20" @click="addSupplier(mAddress,mAmount)">
          Send
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>