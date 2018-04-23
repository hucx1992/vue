<template>
    <div id="sign">
      <form>
        <input v-model="inputMsg" type="" name="" placeholder="请输入学号">
        <button @click="signBtn">登录</button>
      </form>
      <Float v-if="showFloat" :rlt='rlt'></Float>
    </div>
</template>

<script>
import Float from './common/float'
export default {
  name: 'sign',
  data () {
    return {
      showFloat: false,
      inputMsg: '',
      rlt: 0  //0 选择性别， 1 输入名字，2 重复登录
    }
  },
  components: {
    Float
  },
  methods: {
    signBtn () {
      if(this.inputMsg == ''){
        this.showFloat = true;
        return
      }
      this.$store.state.ApiService.showSec = 2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@keyframes show{
  50% {transform: translate(0,0);}
  100%{ opacity: 1; transform: translate(0,0);}
}
#sign{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/sign.png') top center no-repeat;
  background-size: auto 100%;

  input{
    position: absolute;
    top: 7.4rem;
    left: 14.8rem;
    width: 5.89rem;
    height: 1.28rem;
    border-radius: .55rem;
    border: 0 none;
    box-shadow: 0 0 .2rem #888;
    line-height: 1.28rem;
    font-size: .58rem;
    text-align: center;
    opacity: 0;
    transform: translate(-10%,0);
    animation: show 2s .2s forwards;
  }
  button{
    position: absolute;
    top: 7.4rem;
    left: 20.95rem;
    width: 2.99rem;
    height: 1.27rem;
    background: #a4bf20;
    font-size: .58rem;
    border-radius: .3rem;
    border: 0 none;
    box-shadow:  0 0 .1rem #40545b;
    color: #fff;
    opacity: 0;
    transform: translate(10%,0);
    animation: show 2s .5s forwards;
  }
}
</style>
