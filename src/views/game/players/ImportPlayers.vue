<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { useStore, mapGetters, mapActions } from "vuex";
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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

            let players = this.tableData.slice(0,this.totalImportar);
            this.importPlayers({
                players: players,
                club: this.clubData
            }).then(r=>{
                 Swal.fire(
                    'Jugadores importados',
                    players.length + ' jugadores importados correctamente.',
                    'success'
                )
            })
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

                        var value = sheet[key]['w'];
                        
                        //Categoria debe estar en la celda E
                        if(c == 'E'){
                            let serie = vm.seriesData.find(s => s.nombre.trim() == value.trim());
                            console.log(value, serie);
                            if(serie){
                                value = serie.id;
                            }else{
                                alert('error al encontrar Categoría de jugador '+row)
                            }
                        }
                        vm.tableRow.push(value); 
                    }
                    vm.tableData.push(vm.tableRow);
                    vm.tableRow = [] 
                } 
                this.totalImportar = vm.tableData.length;
            };
            reader.readAsBinaryString(f); 
        },
        onLoad(){
            setTimeout(()=>{
                var target = this.$refs.target;
                console.log('target',target);
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
            },2500);
        }
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const clubData = ref(null);
        const showModal = ref(false);
        const totalImportar = ref(0);
        const seriesData = ref([]);

        const loadClubData = (clubId) => {
            store.dispatch('fetchClub', clubId).then((value) => {
                console.log('value');
                console.log(value);
                clubData.value = value;
            });
        }

        loadClubData(route.params.id);

        const loadPlayersSerieData = () => {
            store.dispatch('loadSeriesClub', {
                club: route.params.id
            }).then((grupos) => {
                console.log('gruposClub');
                console.log(grupos);
                seriesData.value = grupos;
            });
        };

        loadPlayersSerieData();



        // fetch the user information when params change
        watch(
            () => route.params.id,
            async newId => {
                console.log('newId', newId);
                if(newId){
                    loadClubData(newId);
                }
            }
        )

        return {
            clubData,
            showModal,
            totalImportar,
            seriesData
        }
    }

}
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <div class="container relative" v-if="clubData">
        <!-- Team Varses Team Start -->
        <div class="container mb-12">
            <div class="flex justify-center items-center w-full p-0">
                <img class="lg:mr-9 mr-5 w-24 h-24 rounded-lg border-4 border-light-blue-500" :src="clubData.logo"
                    :alt="clubData.nombre" />
            </div>
        </div>
        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10">
            {{ clubData.nombre }}</h2>

        <div class="description mt-6">
            <h3 class="text-2xl text-white uppercase font-bold mb-5">Importar Jugadores</h3>
            <p class="leading-8 flex justify-between"><span>Sube un excel con la siguientes celdas y en el mismo orden</span> <span>Asegúrate que la columna Categoría solo puede contener: <strong class="px-1" v-for="serie in seriesData" :key="serie.id">{{ serie.nombre }}</strong></span></p>
            <table class="mx-auto">
                <thead>
                    <tr class="border border-primary">
                        <th class="border border-primary">Ranking General</th>
                        <th class="border border-primary">Ranking Categoría</th>
                        <th class="border border-primary">Nombre Jugador</th>
                        <th class="border border-primary">N° Socio</th>
                        <th class="border border-primary">Categoría</th>
                        <th class="border border-primary">Puntos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-dotted text-center border-primary">1</td>
                        <td class="border border-dotted text-center border-primary">1</td>
                        <td class="border border-dotted text-center border-primary">Andres Naranjo</td>
                        <td class="border border-dotted text-center border-primary">20</td>
                        <td class="border border-dotted text-center border-primary">A</td>
                        <td class="border border-dotted text-center border-primary">2380</td>
                    </tr>
                    <tr>
                        <td class="border border-dotted text-center border-primary">2</td>
                        <td class="border border-dotted text-center border-primary">2</td>
                        <td class="border border-dotted text-center border-primary">Steven Barrionuevo</td>
                        <td class="border border-dotted text-center border-primary">32</td>
                        <td class="border border-dotted text-center border-primary">A</td>
                        <td class="border border-dotted text-center border-primary">1940</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Team Varses Team End -->
        <div ref="target" id="target" class="hover">
            <div>
                <button @click="importarUsuarios" v-if="tableData.length > 0" class="text-black p-2 bg-red-800 rounded-tl hover:text-white">
                    Importar {{ totalImportar }} jugadores
                </button>
                <input class="text-black" min="0" :max="tableData.length" type="number" v-model="totalImportar" placeholder="Ej: 19">
            </div>
            <table>
                <tr v-for="data,f in tableData" :key="f">
                    <td v-for="row,c in data" :key="c">{{ row }}</td>
                </tr>
            </table>
        </div>

    </div>
</template>

<style>
#target {
  width: 700px;
  background-color: #f8f8f8;
  margin: 40px auto;
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