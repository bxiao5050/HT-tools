<template>
  <div class="user-info">
    <div class="avertar">
      <img :src="userInfo.avatar_url">
    </div>
    <div class="info">
      <p v-text="userInfo.nick_name"></p>
    </div>
  </div>
</template>
<script>
  import { mapGetters} from 'vuex';
  export default{
    replace: true,
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
  }

</script>
