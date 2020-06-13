<template>
  
  <v-container :fluid="true">

<br>
    <v-sheet color="blue darken-3">
        <h1><v-icon  size="100" color="black">mdi-harddisk</v-icon> Storage  <small class="">40% used</small></h1>
        <v-progress-linear height="30" value="40" color="green" rounded>
          <template v-slot="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
    </v-sheet>

    <br>

    <v-list disabled color="grey">
      <v-list-item-group color="primary">
        
        <v-list-item color="red">
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>
          <v-list-item-content color="secondary">
            <v-list-item-title >Pictures</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item color="red">
          <v-list-item-icon>
            <v-icon>mdi-video</v-icon>
          </v-list-item-icon>
          <v-list-item-content color="secondary">
            <v-list-item-title >Videos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item color="red">
          <v-list-item-icon>
            <v-icon>mdi-music</v-icon>
          </v-list-item-icon>
          <v-list-item-content color="secondary">
            <v-list-item-title >Music</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item color="red">
          <v-list-item-icon>
            <v-icon>mdi-note</v-icon>
          </v-list-item-icon>
          <v-list-item-content color="secondary">
            <v-list-item-title >Documents</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>

    <br>

    <v-sheet color="red">
      <h3><v-icon size="50">mdi-delete</v-icon> Recycle Bin</h3>
    </v-sheet>

  </v-container>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
