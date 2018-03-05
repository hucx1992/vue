<template>
  <div id="live">
    <div class="vod">
      <video-player id="video" :options="videoOptions"></video-player>
    </div>
    <div class="vod-msg">
      <h3>浙江卫视</h3>
      <div class="lantv-msg-share"></div>
    </div>
    <a class="lantv-msg-btn" :href="$store.state.ApiService.aHref">打开中国蓝tv，观看超清流畅直播&nbsp;&nbsp;</a>
    <div class="commont">
      <div class="newCoommont">
        <span>有新评论更新</span>
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <img v-lazy="item.user.photo" alt="">
          <div class="msg">
            <h4>{{item.user.username}}</h4>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
      <a class="more" :href="$store.state.ApiService.aHref">——打开中国蓝TV，查看全部评论——</a>
    </div>
    <IdCard></IdCard>
  	<Footers></Footers>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import videoPlayer from 'vue-video-player';
import 'videojs-contrib-hls';
import Footers from "../common/footers";
import IdCard from "../common/idCard";
export default {
  name: 'live',
  data () {
    return {
      videoOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "application/x-mpegURL",
          src: '',
        }],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试...', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      },
      list: [],
      showCommontBtn: false,
      timeOut: ''
    }
  },
  components: {
    IdCard,
  	Footers
  },
  created(){
    const that = this;
    that.axios(that.Player+'/newplayer/live/h5/mconfig/101.json?a=123').then((res)=>{
      let playurl = res.data.playurl;
      let url = playurl.dispatch[0].url[0].ali_m3u8[0].标清;
      url = that.ALIM + url.replace('http://ali.m.l.cztv.com','');
      that.videoOptions.sources[0].src= url
      //获取节目列表

    }).catch((res)=>{
      console.log(res)
    })
  },
  mounted(){
    const that = this;
    that.axios(that.MY+'/api/list?xid=101&page=1&rows=50&type=video').then((res)=>{
      let data = res.data.data;
      this.list = data;
      console.log(data)
    }).catch((res)=>{
      console.log(res)
    })

  },
  activated(to, from, next){
    console.log('离开')
    this.timeOut = setTimeout(()=>{
      this.showCommontBtn = true
    }, 60000)
  },
  deactivated(){
    clearTimeout(this.timeOut)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#live{
  .vjs-big-play-button{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;

    span{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:before{
        display: block;
        font-size: .8rem;
        text-align: center;
        line-height: 1.2rem;
      }
    }
  }
  .vod-msg{
    display: flex;
    height: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    h3{
      position: relative;
      font-size: .36rem;
      line-height: 1rem;
      color: #5f5f5f;

      &:after{
        content: '直播中';
        height: .32rem;
        line-height: .32rem;
        color: #fff;
        background: linear-gradient(90deg, #fc4c31 0%, #ff1c7b 100%);
        font-size: .24rem;
        border-radius: .04rem;
        padding: .02rem .08rem;
        margin-left: .16rem;
      }
    }
    .lantv-msg-share{
      width: 0.44rem;
      height: 0.44rem;
      background: url('http://ohudong.cztv.com/1/249248/images/zhuanfa-3x.png') no-repeat;
      background-size: 100%;
    }
  }
  .lantv-msg-btn{
    display: block;
    width: 7rem;
    height: .88rem;
    line-height: .88rem;
    color: #fff;
    font-size: .28rem;
    text-align: center;
    background: linear-gradient(to right, #0db1ff, #2c93ee);
    border-radius: .88rem;
    margin: 0 auto;
    box-shadow: 0.04rem 0.1rem 0.4rem rgba(20, 170, 251, 0.4);
    margin-bottom: .5rem;
  }
  .commont{
    position: relative;
    background: #f5f5f5;
    padding: .2rem 0;
    li{
      display: flex;
      padding: .06rem 3.5% .2rem;
    }
    .msg{
      flex: 1;
    }
    img{
      width: .7rem;
      height: .7rem;
      border-radius: 50%;
      margin-right: 3%;
    }
    h4{
      font-size: .24rem;
      line-height: .4rem;
      color: #2c92ed;
    }
    p{
      position: relative;
      float: left;
      vertical-align: top;
      color: #666;
      max-width: 100%;
      background: #fff;
      padding: 0.1rem 4%;
      border-radius: 0.1rem;
      line-height: 0.36rem;
      font-size: .24rem;

      &:before{
        position: absolute;
        top: 0.16rem;
        left: -0.36rem;
        content: ' ';
        width: 0;
        height: 0;
        border-top: 0.2rem solid transparent;
        border-bottom: 0.2rem solid transparent;
        border-left: 0.2rem solid transparent;
        border-right: 0.2rem solid #fff;
      }
    }  
  }
  .newCoommont{
    display: none;
    position: absolute;
    top: -0.36rem;
    right: 0;
    padding: 0 0.24rem 0 0.64rem;
    height: 0.72rem;
    line-height: 0.72rem;
    text-align: center;
    font-size: 0.24rem;
    z-index: 9;
    border-radius: 2rem 0 0 2rem;
    background: rgba(255, 255, 255, 0.8);
    color: #2c92ed;
    box-shadow: 0 0.1rem 0.3rem #ddd;
    
    span{
      animation: toggle 3s infinite;
      &:before{
        position: absolute;
        top: 0.28rem;
        left: 13%;
        content: ' ';
        width: 0.18rem;
        height: 0.18rem;
        background: url('https://ohudong.cztv.com/1/249333/images/upjt.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .more{
    display: block;
    background: #fff;
    padding: .1rem 0;
    font-size: .28rem;
    text-align: center;
    line-height: .64rem;
    color: #229df2;
    margin-top: .16rem;
  }
}
@keyframes toggle {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
