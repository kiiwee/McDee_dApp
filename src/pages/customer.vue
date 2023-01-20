
<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../store/index'

const messageInput = ref(null as any)
const cryptoStore = useCryptoStore()
const { payForMeal, connectWallet } = useCryptoStore()
const { account} = storeToRefs(cryptoStore)

</script>
<template>
<div class="flex flex-col items-center">
  <h1 class="text-5xl m-4">
      Customer Page
    </h1>
    <button v-if="!account" class="bg-green-300 rounded p-4" @click="connectWallet">
      Connect Wallet
    </button>
    <div v-if="account" class="mt-5">
      <button class="bg-yellow-300 rounded p-4 mt-10" @click="payForMeal()">
        Send
      </button>
    </div>
    </div>
</template>


<style scoped>

</style>