<template>
    <div class="container">
        <div class="row">
            <div class="form-group col-sm-6 offset-sm-3 py-2">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="newTwit" placeholder="What's happening?"></textarea>
              <button class="btn btn-success float-right mt-2" @click="postTwit">Tweet</button>
            </div>
            <!-- timeline item -->
            <div class="col-sm-6 offset-sm-3 py-2" v-for="timeline in timelines" :key="timeline.id">
                <div class="card shadow">
                    <div class="card-header p-3">
                      <span class="float-left"><a :href="timeline.user.url">{{timeline.user.name}} @{{timeline.user.screen_name}}</a></span>
                      <span class="float-right">{{timeline.created_at}}</span>
                    </div>
                    <div class="card-body">
                      <p class="card-text">
                        <a 
                        :href="'https://twitter.com/'+ timeline.user.screen_name+'/status/'+timeline.id_str"
                        target="_blank">{{timeline.text}}</a>
                        </p>
                    </div>
                    <div class="card-footer">
                      <i class="fas fa-retweet btn" @click="retweet(timeline)"></i><span class="iconTwit">{{timeline.retweet_count}}</span>
                      <i class="fas fa-heart btn" @click="favorites(timeline)"></i><span class="iconTwit">{{timeline.favorite_count}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

const baseUrl = "http://localhost:3000";

export default {
  name: "Home",

  data() {
    return {
      timelines: [],
      newTwit: null
    };
  },
  methods: {
    getTwit() {
      axios
        .get(`${baseUrl}/twitt`)
        .then(response => {
          console.log(response.data);
          this.timelines = response.data;
        })
        .catch(err => {
          console.log("error", err.response);
        });
    },
    postTwit() {
      console.log(this.newTwit);
      let twittPost = this.newTwit
      if (this.newTwit){
        axios.post(`${baseUrl}/twitt`,{status:twittPost})
        .then(response=>{
          console.log(response.data)
          this.timelines.unshift(response.data.twitt);
        })
        .catch(err=>{
          console.log('error',err.response);
        })
      }
      this.newTwit = null
    },
    retweet(timeline){
      console.log('retweet', timeline.id_str);
      axios.post(`${baseUrl}/twitt/retweet/${timeline.id_str}`)
      .then(response=>{
        let index = this.timelines.findIndex(x=>x.id_str === timeline.id_str);
        this.timelines[index].retweet_count = response.data.retweet_count
      })
      .catch(err=>{
        console.log('error: ', err)
      })
    },
    favorites(timeline){
      console.log('favorites', timeline);
      axios.post(`${baseUrl}/twitt/favorites/${timeline.id_str}`)
      .then(response=>{
        let index = this.timelines.findIndex(x=>x.id_str === timeline.id_str);
        this.timelines[index].favorite_count = response.data.favorite_count
      })
    }
  },
  created() {
    this.getTwit();
  }
};
</script>
<style scoped>
.bg-twitter {
  background-color: #e3f2fd;
}

.card-header {
  font-size: 12px;
}
.card-text a{
  text-decoration: none;
  text-decoration-style: none;
  color: inherit;
}
.card-footer .fas {
  margin-right: 0px;
}

span.iconTwit {
  margin-right: 15px;
}
</style>
