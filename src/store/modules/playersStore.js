import { db } from '../../plugins/firebase';

import {
	getFirestore,
	collection,
	onSnapshot,
	query,
	where,
	doc,
	getDocs,
	orderBy,
	limit,
	startAfter,
	getDoc,
	addDoc,
	setDoc,
	updateDoc,
	increment,
	arrayUnion
} from "firebase/firestore";

const state = {
	players: [],
	playersListener: () => { },
	error: null,
};

const getters = {
	getPlayers(state) {
		return state.plsyers;
	},
	getPlayer(state, id) {
		return state.players.find((player) => player.id === id);
	},
};

const actions = {
	async loadPlayers({ commit }, payload) {
		console.log("loadPlayers");
		let q;
		if (payload.lastPlayer) {
			const docRef = doc(db, "players", payload.lastPlayer.id);
			const docSnap = await getDoc(docRef);
			q = query(collection(db, "players"),
				orderBy('ranking', "asc"),
				startAfter(docSnap),
				limit(payload.limit)
			)
		} else {
			commit("SET_PLAYERS", []);
			q = query(collection(db, "players"),
				orderBy('ranking', "asc"),
				limit(payload.limit)
			)
		}

		const querySnapshot = await getDocs(q);

		console.log(querySnapshot);
		let players = [];
		return doSnapShot(querySnapshot);

		//commit("SET_PLAYERS_LISTENER", query);

		function doSnapShot(querySnapshot) {
			console.log("doSnapShotPlayers");
			console.log(querySnapshot.docs);
			querySnapshot.docs.forEach((doc) => {
				let p = doc.data();
				console.log(`Player: ${doc.id} => ${doc.data()}`);
				p.id = doc.id;
				players.push(p);
				commit("ADD_PLAYER", p);
			});
			//commit("SET_PLAYERS", players);
			return players;
		}
	},
	async fetchPlayersOptions({ commit }, payload) {
		console.log("loadPlayersOptions", payload);
		let q;
		// if (payload.idsInscritos.length > 0) {
		// 	q = query(collection(db, "players"), where("id", "not-in", payload.idsInscritos));
		// } else {
			
			q = query(collection(db, "players"), orderBy('ranking','asc'));
		//}

		const queryPlayersSnapshot = await getDocs(q);

		console.log(queryPlayersSnapshot);
		let players = [];
		return doSnapShot(queryPlayersSnapshot);

		function doSnapShot(queryPlayersSnapshot) {
			console.log("doSnapShot");
			console.log(queryPlayersSnapshot.docs);
			queryPlayersSnapshot.docs.forEach((doc) => {
				let p = doc.data();
				console.log(`Player: ${doc.id} => ${doc.data()}`);
				p.id = doc.id;
				p.para_select = p.nombre + ' (' + p.ranking + ')';
				if (!payload.idsInscritos.includes(p.id)) {
					players.push(p);
				}
			});
			return players;
		}
	},
	async fetchAllPlayersOptions({ commit }, payload) {
		console.log("loadPlayersOptions", payload);
		let q;
		// if (payload.idsInscritos.length > 0) {
		// 	q = query(collection(db, "players"), where("id", "not-in", payload.idsInscritos));
		// } else {
			
			q = query(collection(db, "players"), orderBy('ranking','asc'));
		//}

		const queryPlayersSnapshot = await getDocs(q);

		console.log(queryPlayersSnapshot);
		let players = [];
		return doSnapShot(queryPlayersSnapshot);

		function doSnapShot(queryPlayersSnapshot) {
			console.log("doSnapShot");
			console.log(queryPlayersSnapshot.docs);
			queryPlayersSnapshot.docs.forEach((doc) => {
				let p = doc.data();
				console.log(`Player: ${doc.id} => ${doc.data()}`);
				p.id = doc.id;
				p.para_select = p.nombre + ' (' + p.ranking + ')';
				//if (!payload.idsInscritos.includes(p.id)) {
					players.push(p);
				//}
			});
			return players;
		}
	},
	async fetchSociosOptions({ commit }, payload) {
		console.log("loadSociosOptions", payload);
		const docRef = doc(db, "clubs", payload.club);
		const q = query(collection(docRef, "solicitudes"), where('aprobado', '==', true));
		const querySociosSnapshot = await getDocs(q);

		console.log(querySociosSnapshot);
		let socios = [];
		return doSnapShot(querySociosSnapshot);

		function doSnapShot(querySociosSnapshot) {
			console.log("doSnapShot");
			console.log(querySociosSnapshot.docs);
			querySociosSnapshot.docs.forEach((doc) => {
				let p = doc.data();
				console.log(`Socio: ${doc.id} => ${doc.data()}`);
				p.id = doc.id;
				socios.push(p);
			});
			return socios;
		}
	},
	async loadProfileByUid({ commit }, payload) {
		try {
			console.log('loadProfileByUid',payload);
			let q = query(collection(db, "players"), where("uid", "==", payload));
			const docSnap = await getDocs(q);

			if (docSnap.docs) {
				let userData = docSnap.docs[0].data();
				userData.id = docSnap.docs[0].id;
				console.log("Profile UID data:", userData);
				return userData;
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
				return null;
			}
		} catch (e) {
			console.error("Error loading profile by UID: ", e);
		}
	},
	async loadProfile({ commit }, payload) {
		try {
			console.log('loadProfile',payload);

			const docRef = doc(db, "players", payload);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				let userData = docSnap.data();
				userData.id = docSnap.id;
				console.log("Profile data:", userData);
				return userData;
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
				return null;
			}
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	},
	addPlayer({ commit }, payload) {
		const db = getFirestore();
		try {
			addDoc(collection(db, "players"), {
				nombre: payload.user.displayName ?? "",
				bod: null,
				nacionalidad: "ec",
				sexo: "H",
				avatar: payload.user.photoURL ?? null,
			})
				.then((docRef) => {
					console.log("Document written with ID: ", docRef);
				})
				.catch((error) => {
					console.log("error init Player");
					console.log(error);
				});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	},
	async updatePlayer({ commit }, payload) {
		const db = getFirestore();
		try {
			return await setDoc(doc(db, "players", payload.user.uid), {
				nombre: payload.user.displayName ?? "",
				bod: null,
				nacionalidad: "ec",
				sexo: "H",
				avatar: payload.user.photoURL ?? null,
			})
				.then((docRef) => {
					console.log("Document written with ID: ", docRef);
					return docRef;
				})
				.catch((error) => {
					console.log("error init Player");
					console.log(error);
					return null;
				});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	},
	async importPlayers({ commit }, payload) {

		console.log('payloadlll', payload);
		
		const clubRef = doc(db, "clubs", payload.club.id);

		console.log('clubRef',clubRef)
		payload.players.forEach(p => {
			console.log('p', p);

			let player_data = {
				nombre: p[2],
				bod: null,
				nacionalidad: "ec",
				sexo: "H",
				avatar: p[8] ? p[8] : null,
				total_torneos: p[6] ? parseInt(p[6]) : 0,
				total_partidos: 0,
				total_victorias: 0,
				total_derrotas: 0,
				ranking: parseInt(p[0]),
				puntos: parseInt(p[5]),
				n_socio: parseInt(p[3]),
				clubs: [{
					id: payload.club.id,
					nombre: payload.club.nombre,
					slug: payload.club.slug,
					logo: payload.club.logo
				}],
				bulk:1
			};

			if (p[7]) {
				player_data['uid'] = p[7];
			}

			addDoc(collection(db, "players"), player_data)
			.then((docRef) => {
				console.log("Player with ID: ", docRef.id);
				console.log("Player with ID: ", );

				//datos de solicitud de jugador
				const jugador = {
                    jugador_id: docRef.id,
                    nombre: p[2],
					avatar: p[8] ? p[8] : null,
					serie_id: p[4],
					ranking: parseInt(p[0]),
					puntos: parseInt(p[5]),
					n_socio: parseInt(p[3]),
					aprobado:true,
					estado: 'activo',
                    fecha: new Date()
                };

				//solicitud de afilicacion aprobada
				const solRef = doc(clubRef, "solicitudes",docRef.id);
				setDoc(solRef,jugador)

				//instancia de serie asignada al jugador
				const serieRef = doc(clubRef, "series",jugador.serie_id);
            
				//añado jugador a serie
				updateDoc(serieRef, {
					jugadores: arrayUnion(jugador)
				}).then((docRes) => {
					console.log("Jugador agregado a serie: ", docRes);
				})

				//incrementamos el total de miembros en el club
				updateDoc(clubRef, {
					total_miembros: increment(1),
				});

				return docRef;
			})
		})
	}
};
const mutations = {
	SET_PLAYERS_LISTENER(state, listener) {
		if (listener) {
			state.playersListener = listener;
		} else {
			state.playersListener();
		}
	},
	SET_PLAYERS(state, payload) {
		console.log("setPlayers", payload);
		state.players = payload;
	},
	ADD_PLAYER(state, payload) {
		state.players.push(payload);
	},
	setError(state, payload) {
		state.error = payload;
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
