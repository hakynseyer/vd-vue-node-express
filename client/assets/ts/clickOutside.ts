import { onMounted, onBeforeUnmount } from "vue";

export function useClickOutside(targetRef, component, idParent, callback) {
  if (!targetRef) return;

  const listener = (e) => {
    switch (component) {
      case "select":
        if (
          e.target.parentNode.id === idParent ||
          e.target.parentNode.parentNode.id === idParent
        )
          return;
        break;
    }

    if (
      e.target === targetRef.value ||
      e.composedPath().includes(targetRef.value)
    )
      return;

    if (typeof callback === "function") callback();
  };

  onMounted(() => window.addEventListener("click", listener));
  onBeforeUnmount(() => window.removeEventListener("click", listener));

  return { listener };
}
