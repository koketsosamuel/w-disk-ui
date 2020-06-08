<template>
  <v-container fluid="">
      <v-list>
          <v-list-item-group color="primary">
                <v-list-item color="red" v-for="i in list" :key="i.name" @click="navigate(i)">
                   
                    <v-list-item-icon v-if="i.type == 'folder'">
                        <v-icon>mdi-folder</v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon v-else>
                        <v-icon>mdi-{{getFileType(i.name)}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content color="secondary">
                        <v-list-item-title >{{i.name}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-avatar >
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

                                <v-list-item @click="navigate(i)" v-if="i.type = 'folder'">
                                    <v-list-item-title>Open</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="getFileType(i.name) == 'music'">
                                    <v-list-item-title>Play</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="getFileType(i.name) == 'video'">
                                    <v-list-item-title>Play</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="getFileType(i.name) == 'image'">
                                    <v-list-item-title>Open</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="dir = i.dir; dialog = true;">
                                    <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title>Details</v-list-item-title>
                                </v-list-item>
                                
                            </v-list>
                        </v-menu>
                    </v-list-item-avatar>
                    
                </v-list-item>
            </v-list-item-group>
      </v-list>

    <!-- SNACK BAR FOR NOTIFICATIONS -->
    <v-snackbar
      v-model="snackBar"
      bottom
    >
      {{ resMsg }}
    </v-snackbar>

    <v-dialog
        v-model="dialog"
        scrollable  
        persistent :overlay="true"
        transition="dialog-transition"
    >
        <v-card color=" darken-3">
 
                <v-card-title primary-title>
                    Confirm
                </v-card-title>
                <v-card-text>
                    Are you sure you want to delete? Action is irreversible!
                </v-card-text>
            <v-card-actions>
                <v-btn color="green" @click="remove()">Yes</v-btn>
                <v-btn color="red" @click="dialog = false">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
    data: () => ({
        list: [],
        resMsg: "",
        snackBar: false,
        dialog: false,
        dir: ""
    }),

    methods: {
        getFileType(file) {

            let image = ["jpg", "png", "gif","webp", "tiff", "jpeg", "ico", "svg"]
            let video = ["mp4", "3gp", "webm", "mkv", "avi", "mov"]
            let document = ["pdf", "docx", "txt"]
            let audio = ["mp3", "wav", "m4a", "aiff", "aac", "ogg", "wma"]

            let fileExt = file.split(".")
            fileExt = String(fileExt[fileExt.length - 1]).toLowerCase()

            if(image.includes(fileExt)) {
                return "image"
            }  else if(video.includes(fileExt)) {
                return "video"
            } else if(document.includes(fileExt)) {
                return "note"
            } else if(audio.includes(fileExt)) {
                return "music"
            } else {
                return "file-outline"
            }

        },

        sortList() {
            
            let folderItem = {
                folders: [],
                items: []
            }

            let index = 0
            let item = {}

            for(let i = 0; i < this.list.length; i++) {
                
                index = this.list.length - 1 - i
                item = this.list[index]

                if(item.type == "folder") {
                    folderItem.folders.push(item)
                    //this.list.splice(index, 1)
                } else {
                    folderItem.items.push(item)
                }

            }

            this.sortByName(folderItem.folders)
            this.sortByName(folderItem.items)
   
            this.list = [...folderItem.folders, ...folderItem.items]

        },

        sortByName(arr) {        

            let current
            let next
            let sortAgain = false

            for(let i = 0; i < arr.length; i++) {
                                
                if((i + 1) < arr.length) {
                
                    current = arr[i]
                    next = arr[i + 1]

                    if(current.name > next.name) {
                        sortAgain = true
                        arr[i] = next
                        arr[i + 1] = current
                    }

                }

            }

            if(sortAgain) {
                this.sortByName(arr)
            } else {
                return arr
            }

        },

        async navigate(i) {

            this.$history.push(i.dir)

            if(i.type == "folder") {
           
                this.$router.push("/explore/"+(this.$history.length))
                
            }
        },

        async remove() {

            let res = await this.$axios.post("/delete", {dirs: [this.dir]})
            
            if(res.status == 200) {
                this.resMsg = "deleted!"
                this.snackBar = true
                this.init()
            } else {
                this.resMsg = "not deleted!"
                this.snackBar = true
            }

        },

        async init() {
            
            let res = await this.$axios.post("/explore", {dir: this.$history[Number(this.$route.params.n) - 1]})
        
            if(!res.data.error) {
                this.list = await res.data.list
                this.sortList()
            }

        }

    },

    async created() {

        await this.init()

    },

    watch: { 
    '$route': {
        handler:async function() {

            let index = Number(this.$route.params.n) - 1

            if(index == 0) {
                this.$history = ["."]
            }

            if(index < 0 || index >= this.$history.length) {
                this.$router.push("/")
            } else {

                let res = await this.$axios.post("/explore", {dir: this.$history[index]})

                if(!res.data.error) {
                    this.list = await res.data.list
                    this.sortList()
                } else {
                    this.list = []
                } 

            }
            
        },
        deep: true,
        immediate: true
    }
  },
}
</script>

<style>

</style>