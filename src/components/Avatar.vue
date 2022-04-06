<template>
  <div class="example-avatar">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div class="avatar-upload" v-show="!edit">
      <div class="text-center p-2">
        <label for="avatar">
          <img v-if="imagen" :src="imagen" class="rounded-full w-32 h-32" />
          <img
            v-else
            :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"
            class="rounded-full"
          />
        </label>
      </div>
      <div class="text-center p-2">
        <file-upload
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png, image/gif, image/jpeg, image/webp"
          name="avatar"
          class="btn btn-primary"
          :drop="!edit"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload"
        >Actualizar {{ label }}</file-upload>
      </div>
    </div>

    <div class="avatar-edit" v-show="files.length && edit">
      <div class="avatar-edit-image w-full" v-if="files.length">
        <img ref="editImage" :src="files[0].url" />
      </div>
      <div class="text-center p-4">
        <button
          type="button"
          class="mx-2 p-2 rounded-md border hover:text-yellow border-yellow"
          @click.prevent="$refs.upload.clear"
        >Cancelar</button>
        <button
          type="submit"
          class="mx-2 p-2 bg-yellow text-black hover:text-white rounded-md border border-yellow"
          @click.prevent="editSave"
        >Guardar</button>
      </div>
    </div>
  </div>
</template>



<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component'
export default {
  components: {
    FileUpload,
  },
  props: {
    imagen: {
      type: String,
      required: false
    },
    label: {
      type: String,
      default: function () {
        return "Avatar";
      },
    }
  },
  data() {
    return {
      files: [],
      edit: false,
      cropper: false,
    }
  },
  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
            viewMode: 1,
          })
          this.cropper = cropper
        })
      } else {
        if (this.cropper) {
          this.cropper.destroy()
          this.cropper = false
        }
      }
    }
  },
  methods: {
    editSave() {
      this.edit = false
      let oldFile = this.files[0]
      let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      let arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })
      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true,
      })
    },
    alert(message) {
      alert(message)
    },
    inputFile(newFile, oldFile, prevent) {
      console.log('newFile', newFile);
      console.log('oldFile', oldFile);
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
      if (newFile && oldFile) {
        this.$emit('change-image', newFile.file)
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    }
  }
}
</script>