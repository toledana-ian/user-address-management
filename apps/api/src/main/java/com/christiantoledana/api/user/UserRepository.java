package com.christiantoledana.api.user;

import com.christiantoledana.api.common.repository.InMemoryRepository;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository extends InMemoryRepository<UserModel> {

    @Override
    protected Long getId(UserModel entity) {
        return entity.getId();
    }

    @Override
    protected void setId(UserModel entity, Long id) {
        entity.setId(id);
    }
}
