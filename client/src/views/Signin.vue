<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <v-logotype class="mb-4" width="64" height="64" />
    <form @submit.prevent="signin" class="bg-white w-full md:w-1/3 p-4">
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            leading-tight
            focus:border-black
            focus:outline-none
            focus:shadow
          "
          id="email"
          type="email"
          required
          placeholder="email"
          v-model="form.email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            leading-tight
            focus:border-black
            focus:outline-none
            focus:shadow
          "
          id="password"
          required
          type="password"
          placeholder="******************"
          v-model="form.password"
        >
      </div>
      <div class="flex items-center justify-between">
        <button
          class="
            bg-black
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none
            focus:shadow-outline
          "
          type="submit"
        >
          Sign In
        </button>
        <router-link
          class="
            inline-block
            align-baseline
            font-bold
            text-sm
            text-gray-600
            hover:text-black
          "
          :to="{ name: 'Signup' }"
        >
          or Sign Up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import VLogotype from '@/components/Logotype.vue';

export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),
  methods: {
    signin() {
      return this.$fetch('/signin/', {
        hasToken: false,
        method: 'POST',
        body: JSON.stringify(this.form),
      })
        .then((response) => response.json())
        .then(({ token }) => {
          window.localStorage.setItem('token', token);
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => window.console.log(error));
    },
  },
  components: { VLogotype },
};
</script>
