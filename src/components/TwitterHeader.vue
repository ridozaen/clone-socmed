<template>
        <section id="header">
            <nav class="navbar navbar-expand-sm fixed-top navbar-light" style="background-color: #e3f2fd;">
                <div class="container-fluid">
                    <ul class="navbar-nav float-left">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-home"></i> Home
                            </router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav navbar-center">
                        <li class="nav-item">
                            <router-link to="/"><span class="float-right">Timeline</span></router-link>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                      v-model="search">
                      <i class="fas fa-search btn btn-outline-secondary p-2"
                      @click.prevent="searchTwitt"></i>
                    </form>
                </div>
            </nav>
        </section>
</template>
<script>
/* eslint-disable */

import {eventBus} from '../main'

export default {
    name : 'Twitter-Header',
    data(){
        return{
            search: null
        }
    },
    methods : {
        searchTwitt(){
            this.$router.push({name:'Search', query:{q:this.search}})
            eventBus.$emit("triggerSearch",this.search);
        }
    }
};
</script>

<style scoped>
.navbar-nav.navbar-center {
  font-family: "Pacifico", cursive;
  position: absolute;
  left: 50%;
  /* width: 100%; */
  transform: translatex(-50%);
  font-size: 25px;
  letter-spacing: 0.01em;
}
a.dropdown-item{
    color:#007bff;
}
a.dropdown-item:hover{
    background-color:#007bff;
    color: #fff
}
</style>


