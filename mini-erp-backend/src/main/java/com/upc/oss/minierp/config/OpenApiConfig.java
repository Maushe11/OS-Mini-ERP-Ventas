package com.upc.oss.minierp.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI miniErpApi() {
        return new OpenAPI()

                // Información principal del API
                .info(new Info()
                        .title("Mini ERP API")
                        .description("Documentación de la API del sistema Mini ERP")
                        .version("1.0.0")

                        // Contacto del desarrollador / equipo
                        .contact(new Contact()
                                .name("[Grupo 5 - Open Source Software]")
                                .email("soporte@mini-erp.com")
                                .url("https://mini-erp.com")
                        )
                )

                // URLs disponibles del servidor
                .servers(java.util.List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor local de desarrollo")
                ))

                // Documentación externa opcional
                .externalDocs(new ExternalDocumentation()
                        .description("Repositorio del proyecto")
                        .url("https://github.com/Maushe11/OS-Mini-ERP-Ventas")
                );

    }
}