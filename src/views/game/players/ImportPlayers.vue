<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        Breadcrumb,
    },
    data(){
        return {
            tableData:[],
            tableRow: [],
            BreadcrumbTitle: "Importar Jugadores",
            BreadcrumbSubTitle: "Jugadores",
        }
    },
    mounted(){
        let externalScript = document.createElement('script')
        externalScript.setAttribute('src', 'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js')
        document.head.appendChild(externalScript)

        window.addEventListener('load',  this.onLoad())
    },
    methods:{
        ...mapActions(["importPlayers"]),
        importarUsuarios(){
            this.importPlayers(this.tableData)
        },
        handleDrop(f){ 
            var reader = new FileReader(),
            name = f.name, vm = this;
            reader.onload = (e) =>{
                var data = e.target.result;
                console.log('data',data);
                var workbook = XLSX.read(data, { type: 'binary' });
                console.log('workbook',workbook);


                var sheetName = workbook.SheetNames[0],
                    sheet = workbook.Sheets[sheetName];
                var temp = [];
                for (var row = 1; ; row++) {
                    if (sheet['A' + row] == null) { 
                        break; 
                    }
                    
                    for (var col = 65; col <= 90; col++) {
                        var c = String.fromCharCode(col);// get 'A', '131,
                        var key = '' + c + row;
                        if (sheet[key] == null) { 
                            break; 
                        }
                        vm.tableRow.push(sheet[key]['w']); 
                    }
                    vm.tableData.push(vm.tableRow);
                    vm.tableRow = [] 
                } 
            };
            reader.readAsBinaryString(f); 
        },
        onLoad(){
            var target = this.$refs.target;
            target.addEventListener('dragenter', function (){
                this.classList.remove('hover'); 
            });
            target.addEventListener('dragleave', function (){
                this.classList.add('hover') 
            });
            
            target.addEventListener('dragover', function (e) {
                this.classList.remove('hover');
                e.preventDefault(); 
            }); 
            
            target.addEventListener('drop', (e) => {
                e.preventDefault();
                this.handleDrop(e.dataTransfer.files[0]);
            }); 
        }
    }

}
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

        <div ref="target" id="target" class="hover">
            <button @click="importarUsuarios" v-if="tableData.length > 0" class="text-black p-2 bg-red-800 rounded-tl hover:text-white">
                Importar {{ tableData.length }} jugadores
            </button>
            <table>
                <tr v-for="data,f in tableData" :key="f">
                    <td v-for="row,c in data" :key="c">{{ row }}</td>
                </tr>
            </table>
        </div>
</template>

<style>
#target {
  width: 700px;
  background-color: #f8f8f8;
  margin: 200px auto;
  overflow:hidden;
  border-radius:5px;
  box-shadow:2px 2px 5px #888;
}
.hover::before {
  content: 'Arrastre el listado de jugadores (xlsx).';
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  line-height: 400px;
  font-size: 24px;
  color: black;
}
#target>table{
  min-height:250px;
  width:400px;
  border:1px solid #ccc;
  border-radius:3px;
  margin:75px auto;
  color:black;
}
#target>table td{
  text-align:center;
  border-top:1px solid #ccc;
  border-left:1px solid #ccc;
}
#target>table tr:first-child>td{
  border-top:0px solid #ccc;
}
#target>table tr>td:first-child{
  border-left:0px solid #ccc;
}
</style>