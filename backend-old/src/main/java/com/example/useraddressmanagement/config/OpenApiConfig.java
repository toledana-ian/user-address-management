package com.example.useraddressmanagement.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI userAddressManagementOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("User Address Management API")
                        .description("Base service exposing CRUD operations for users and their addresses")
                        .version("v1.0")
                        .contact(new Contact().name("Admin Console")));
    }
}
