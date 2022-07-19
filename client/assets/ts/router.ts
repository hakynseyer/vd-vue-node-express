import { createRouter, createWebHashHistory } from "vue-router";
// import { Fetch, FETCH_METHODS } from "@Extras/ts/fetch";
// import { useStore } from "@Extras/ts/store";

import Login from "@Views/login/login.vue";
import Materials from "@Views/materials/materials.vue";
import Providers from "@Views/providers/providers.vue";
// import Clientes from '@Vistas/clientes/clientes.vue';

declare var THE_SERVER: any;

const routes = [
  { path: "/", name: "login", component: Login },
  { path: "/materials", name: "materials", component: Materials },
  { path: "/providers", name: "providers", component: Providers },
  // {
  //   path: '/panel',
  //   name: 'panel',
  //   component: Panel,
  //   meta: { requireAuth: true },
  // },
  // {
  //   path: '/clientes',
  //   name: 'clientes',
  //   component: Clientes,
  //   meta: { requireAuth: true },
  // },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const toMetaParams: Array<string> = Object.keys(to.meta);

//   if (toMetaParams.includes('requireAuth')) {
//     if (to.meta.requireAuth) {
//       const request: Request = Fetch.request(
//         `${THE_SERVER.host}/login/token`,
//         FETCH_METHODS.POST
//       );

//       try {
//         const res = await fetch(request);
//         const datos = await res.json();
//         const pinia = useStore();

//         if (res.status === 201) {
//           pinia.empleado.nombre = datos.token.empleado.nombre;
//           pinia.empleado.status = datos.token.empleado.status;
//           pinia.empleado.turno = datos.token.empleado.turno;
//           pinia.empleado.rol.area = datos.token.empleado.rol.area;
//           pinia.empleado.rol.permisos = datos.token.empleado.rol.permisos;
//           pinia.empleado.rol.rol = datos.token.empleado.rol.rol;

//           next();
//         } else {
//           console.error(datos.errors.token);
//           pinia.$reset();

//           next({ name: 'login' });
//         }
//       } catch (e) {
//         console.error('Hubo un error con el servidor :(');
//         // TODO La idea es crear un modal mostrando el error anterior

//         next({ name: 'login' });
//       }
//     } else next();
//   } else next();
// });
