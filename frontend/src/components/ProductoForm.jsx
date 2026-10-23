import { useEffect, useState } from "react";

const VACIO = { nombre: "", precio: "", stock: "" };

export default function ProductoForm({ productoEnEdicion, onGuardar, onCancelar }) {
  const [valores, setValores] = useState(VACIO);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Al pulsar "Editar" en la tabla, se carga el producto en el formulario
  useEffect(() => {
    if (productoEnEdicion) {
      setValores({
        nombre: productoEnEdicion.nombre,
        precio: String(productoEnEdicion.precio),
        stock: String(productoEnEdicion.stock),
      });
    } else {
      setValores(VACIO);
    }
    setError("");
  }, [productoEnEdicion]);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!valores.nombre.trim()) return "El nombre es obligatorio";
    const precio = Number(valores.precio);
    if (valores.precio === "" || Number.isNaN(precio) || precio < 0)
      return "El precio debe ser un número mayor o igual a 0";
    const stock = Number(valores.stock);
    if (valores.stock === "" || !Number.isInteger(stock) || stock < 0)
      return "El stock debe ser un entero mayor o igual a 0";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mensaje = validar();
    if (mensaje) {
      setError(mensaje);
      return;
    }

    const producto = {
      nombre: valores.nombre.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
    };
    if (productoEnEdicion) producto.id = productoEnEdicion.id;

    try {
      setEnviando(true);
      setError("");
      await onGuardar(producto);
      setValores(VACIO);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>{productoEnEdicion ? "Editar producto" : "Nuevo producto"}</h2>

      <label>
        Nombre
        <input name="nombre" value={valores.nombre} onChange={handleChange} />
      </label>

      <label>
        Precio
        <input
          name="precio"
          type="number"
          step="0.01"
          min="0"
          value={valores.precio}
          onChange={handleChange}
        />
      </label>

      <label>
        Stock
        <input
          name="stock"
          type="number"
          step="1"
          min="0"
          value={valores.stock}
          onChange={handleChange}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="acciones">
        <button type="submit" disabled={enviando}>
          {productoEnEdicion ? "Actualizar" : "Guardar"}
        </button>
        {productoEnEdicion && (
          <button type="button" className="secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
