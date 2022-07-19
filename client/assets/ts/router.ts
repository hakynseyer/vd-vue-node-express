import { createRouter, createWebHashHistory } from "vue-router";
import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";
import { useStore } from "@Assets/ts/store";

import Login from "@Views/login/login.vue";
import Materials from "@Views/materials/materials.vue";
import Providers from "@Views/providers/providers.vue";
import Users from "@Views/users/users.vue";
import Ranks from "@Views/ranks/ranks.vue";

declare var THE_SERVER: any;

const routes = [
  { path: "/", name: "login", component: Login },
  {
    path: "/materials",
    name: "materials",
    component: Materials,
    meta: { requireAuth: true },
  },
  {
    path: "/providers",
    name: "providers",
    component: Providers,
    meta: { requireAuth: true },
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    meta: { requireAuth: true },
  },
  {
    path: "/ranks",
    name: "ranks",
    component: Ranks,
    meta: { requireAuth: true },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const toMetaParams: Array<string> = Object.keys(to.meta);

  if (toMetaParams.includes("requireAuth")) {
    if (to.meta.requireAuth) {
      const request: Request = Fetch.request(
        `${THE_SERVER.host}/login/token`,
        FETCH_METHODS.POST
      );

      try {
        const res = await fetch(request);
        const datos = await res.json();
        const pinia = useStore();

        if (res.status === 201) {
          pinia.user.name = datos.name;
          pinia.user.surnameFirst = datos.surnameFirst;
          pinia.user.rank = datos.rank;

          next();
        } else {
          console.error(datos.errors.token);
          pinia.$reset();

          next({ name: "login" });
        }
      } catch (e) {
        console.error("Hubo un error con el servidor :(");
        // TODO La idea es crear un modal mostrando el error anterior

        next({ name: "login" });
      }
    } else next();
  } else next();
});
