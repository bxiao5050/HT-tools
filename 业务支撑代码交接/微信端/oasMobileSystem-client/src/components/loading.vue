<template>
  <div class="loading-background" :class="{show:isShow}">
    <div class="spinner">
      <img class="loading-icon" src="../assets/svg/loading.svg"></img>
    </div>
  </div>
</template>
<style>
.loading-background{
    background:rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index:1000;
    display: none;
    top:0;
    right:0;
    bottom: 0;
    left:0;
}
.loading-background.show{
    display: block;
}

  .spinner {
    position: absolute;
    top: 50%;
    left:50%;
    -webkit-transform: translate(-50%,-50%);
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }
  
.loading-icon{
    width:100%;
}

</style>
<script>
  export default {
    props: ['isShow']
  }

</script>
