package com.christiantoledana.api.common.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public abstract class InMemoryRepository<T> {
    private final Map<Long, T> store = new ConcurrentHashMap<>();
    private final AtomicLong idSequence = new AtomicLong(0);

    protected abstract Long getId(T entity);
    protected abstract void setId(T entity, Long id);

    public List<T> findAll() {
        return new ArrayList<>(store.values());
    }

    public Optional<T> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public boolean existsById(Long id) {
        return store.containsKey(id);
    }

    public T save(T entity) {
        Long id = getId(entity);
        if (id == null) {
            id = idSequence.incrementAndGet();
            setId(entity, id);
        } else {
            final long existingId = id;
            idSequence.updateAndGet(current -> Math.max(current, existingId));
        }
        store.put(id, entity);
        return entity;
    }

    public void deleteById(Long id) {
        store.remove(id);
    }
}
