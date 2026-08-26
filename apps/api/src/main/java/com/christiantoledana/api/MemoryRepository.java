package com.christiantoledana.api;

import com.christiantoledana.api.user.UserModel;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class MemoryRepository {

    private final Map<Long, UserModel> users = new ConcurrentHashMap<>();
    private final AtomicLong userIdSequence = new AtomicLong();
    private final AtomicLong addressIdSequence = new AtomicLong();

}
