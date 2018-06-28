<template>
    <div class="container">
        <div class="row">
            <!-- timeline item -->
            <div class="col-sm-6 offset-sm-3 py-2" 
            v-if="timelines.length > 0"
            v-for="timeline in timelines" 
            :key="timeline.id">
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
            <div class="col-sm-6 offset-sm-3 py-2" v-else>
                Search Not Found
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { eventBus } from "../main";

const baseUrl = "http://localhost:3000";

export default {
  data() {
    return {
      timelines: [],
      query: null
    };
  },
  mounted() {
    console.log('mounted')
    if (this.$route.query.q){
        this.query = this.$route.query.q
        this.getSearch()
    }
    eventBus.$on("triggerSearch", query => {
      this.query = query;
      this.getSearch();
    });
  },
  methods: {
    getSearch() {
      let query = this.query
      axios
        .get(`${baseUrl}/twitt/search?q=${query}`)
        .then(response => {
          console.log(response.data.statuses);
          this.timelines = response.data.statuses;
        })
        .catch(err => {
          console.log("error", err.response);
        });
    }
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
.card-text a {
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

