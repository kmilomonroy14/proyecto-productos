package com.ejemplo.productos.service;

import com.ejemplo.productos.model.Producto;
import com.ejemplo.productos.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> listar() {
        return repository.findAll();
    }

    /** Crea si no trae id; actualiza si lo trae. */
    public Producto guardar(Producto producto) {
        if (producto.getId() != null && !repository.existsById(producto.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No existe un producto con id " + producto.getId());
        }
        return repository.save(producto);
    }

    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No existe un producto con id " + id);
        }
        repository.deleteById(id);
    }
}
