import { useEffect, useState } from "react";
import ProductoForm from "./components/ProductoForm.jsx";
import ProductoTabla from "./components/ProductoTabla.jsx";
import { eliminarProducto, guardarProducto, listarProductos } from "./api.js";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    try {
      setError("");
      setProductos(await listarProductos());
    } catch (e) {
      setError("No se pudo cargar la lista: " + e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleGuardar = async (producto) => {
    await guardarProducto(producto); // si falla, el formulario muestra el error
    setProductoEnEdicion(null);
    await cargarProductos();
  };

  const handleEliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    try {
      setError("");
      await eliminarProducto(producto.id);
      if (productoEnEdicion?.id === producto.id) setProductoEnEdicion(null);
      await cargarProductos();
    } catch (e) {
      setError("No se pudo eliminar: " + e.message);
    }
  };

  return (
    <main className="contenedor">
      <h1>Registro de Productos</h1>

      <ProductoForm
        productoEnEdicion={productoEnEdicion}
        onGuardar={handleGuardar}
        onCancelar={() => setProductoEnEdicion(null)}
      />

      {error && <p className="error">{error}</p>}

      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <ProductoTabla
          productos={productos}
          onEditar={setProductoEnEdicion}
          onEliminar={handleEliminar}
        />
      )}
    </main>
  );
}
