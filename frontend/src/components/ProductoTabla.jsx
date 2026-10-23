export default function ProductoTabla({ productos, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return <p>No hay productos registrados.</p>;
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{Number(p.precio).toFixed(2)}</td>
            <td>{p.stock}</td>
            <td className="acciones">
              <button onClick={() => onEditar(p)}>Editar</button>
              <button className="peligro" onClick={() => onEliminar(p)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
