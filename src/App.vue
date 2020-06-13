<template>
  <v-app>

    <input type="file" ref="fileDude" id="" multiple @change="fileSelect()">

    <div>
    <v-app-bar fixed
      color="blue accent-4"
      dense
      dark
    >
      

      <v-toolbar-title>K DISK</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="newFolderDialog = true">
        <v-icon>mdi-folder-plus</v-icon>
      </v-btn>

      <v-btn icon @click="upload()">
        <v-icon>mdi-upload</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>

    <v-content>


      <router-view/>

    </v-content>

    <v-bottom-navigation fixed
    
    dark
    shift
  >
    <v-btn >
      <span>Back</span>
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>

    <v-btn>
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn>
      <span>Forward</span>
      <v-icon>mdi-arrow-right-bold</v-icon>
    </v-btn>

  </v-bottom-navigation>


  <!-- UPLOAD DIALOG -->
  <v-dialog
        v-model="uploadDialog"
        scrollable  
        persistent :overlay="true"
        transition="dialog-transition"
    >
        <v-card color=" darken-3">
 
                <v-card-title primary-title>
                    Confirm
                </v-card-title>
                <v-card-text>
                  <v-list flat color="yellow">
                    <v-list-item-group color="blue">
                      <v-list-item
                        v-for="(file, i) in files"
                        :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-title v-text="file.name"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>
            <v-card-actions>
                <v-btn color="green" @click="uploadFiles()">Upload</v-btn>
                <v-btn color="red" @click="uploadDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- NEW FOLDER -->
    <v-dialog
        v-model="newFolderDialog"
        scrollable  
        persistent :overlay="true"
        transition="dialog-transition"
    >
        <v-card color=" darken-3">
 
            <v-card-title primary-title>
                New Folder
            </v-card-title>
                
            <v-text-field
            label="Filled"
            placeholder="Placeholder"
            filled
            v-model="newDir"
          ></v-text-field>

            <v-card-actions>
                <v-btn color="green" @click="createFolder()">Create</v-btn>
                <v-btn color="red" @click="newFolderDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    dir: ".",
    files: [],
    uploadDialog: false,
    newFolderDialog: false,
    newDir: "new folder"
  }),

  methods: {
    upload() {
      this.$refs.fileDude.click()
    },
    fileSelect() {
      this.files = this.$refs.fileDude.files
      this.uploadDialog = true
    },
    async uploadFiles() {
      
      let fd = new FormData()
      fd.append("dir", this.$history[this.$history.length - 1])

      for(let i = 0; i < this.files.length; i++) {
        fd.append("files", this.files[i], this.files[i].name)
      }

      this.uploadDialog = false
      let res = await this.$axios.post("/upload", fd)
      console.log(res)

    },

    async createFolder() {

      let dir = this.$history[this.$history.length - 1]
      let res = await this.$axios.post("/makefolder", {dir, newDir: this.newDir})
      console.log(res)
      this.newDir = "new folder"

    }
  },

  created() {
    this.$history.push(".")
  }
};
</script>
