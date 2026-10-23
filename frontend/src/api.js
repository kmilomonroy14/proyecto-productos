const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function request(path, options = {}) {
  const respuesta = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status}`;
    try {
      const data = await respuesta.json();
      if (data.errores) {
        mensaje = Object.values(data.errores).join(". ");
      } else if (data.mensaje) {
        mensaje = data.mensaje;
      }
    } catch {
      // la respuesta no traía JSON
    }
    throw new Error(mensaje);
  }

  return respuesta.status === 204 ? null : respuesta.json();
}

export const listarProductos = () => request("/productos");

export const guardarProducto = (producto) =>
  request("/productos", { method: "POST", body: JSON.stringify(producto) });

export const eliminarProducto = (id) =>
  request(`/productos/${id}`, { method: "POST" });
